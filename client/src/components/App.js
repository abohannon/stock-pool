import React, { Component } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Header from './Header';
import Graph from './Graph';
import StockList from './StockList';
import { VANILLA_GREY } from '../constants/style';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${VANILLA_GREY};
  padding: 0 2rem;
  box-sizing: border-box;
  `;

const Container = styled.section`
    max-width: 1280px;
    width: 100%;
    height: 400px;
    margin: 0 auto;
    margin-top: 5%;
  `;
class App extends Component {
    state = {
      data: {},
      currentStocks: [],
      symbol: '',
      range: '1m',
      fetchingStockData: false,
      error: '',
    };

    componentDidMount() {
      if (process.env.NODE_ENV === 'production') {
        this.socket = io.connect('/');
      } else {
        this.socket = io.connect('http://localhost:5000');
      }

      this.socket.on('updateStocks', (data) => {
        this.updateCurrentStocksState(data);
      });

      this.socket.on('setRange', data => this.setRangeState(data));

      this.socket.on('fetchStockData', (data) => {
        this.updateDataState(data);
      });

      this.socket.on('removeStock', ({ index, symbol }) => {
        this.removeStockAndUpdateState(index, symbol);
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.range !== prevState.range) {
        this.fetchStockData();
      }
    }

    setRange = (range) => {
      this.socket.emit('setRange', range);
      this.setRangeState(range);
    }

    // Methods for updating stock data state
    setRangeState = (range) => {
      this.setState({ range });
    }

    updateCurrentStocksState = (searchValue, callback) => {
      const newState = [...this.state.currentStocks, searchValue];
      this.setState({ currentStocks: newState }, callback);
    }

    updateDataState = (json) => {
      this.setState({
        data: json,
        fetchingStockData: false,
        error: '',
      });
    }

    removeStockAndUpdateState = (index, symbol) => {
      this.setState({
        currentStocks: this.removeFromCurrentStocks(index),
        data: this.removeFromMainData(symbol),
      });
    }

    // Check if stock is valid ticker before proceeding
    queryStock = async (symbol) => {
      const endpoint = `https://api.iextrading.com/1.0/stock/${symbol}/company`;

      const response = await fetch(endpoint);

      if (response.status !== 200) {
        this.setState({
          error: 'Ticker not found',
        });
      }
      return response.status === 200;
    }

    // Check if searchValue already exists and wait for response on whether the value is a valid ticker, then update array of current stocks.
    updateStocks = async (data) => {
      const { searchValue } = data;
      if (this.state.currentStocks.includes(searchValue)) {
        this.setState({
          error: 'Ticker already chosen',
        });
        return;
      }

      if (await this.queryStock(searchValue)) {
        this.socket.emit('updateStocks', searchValue);
        this.updateCurrentStocksState(searchValue, () => this.fetchStockData(data));
      }
    }

    // If searchValue doesn't already exist in the currentStocks array and it's a valid ticker, send it along with the current selected range to the API and get the corresponding data.
    fetchStockData = async () => {
      this.setState({ fetchingStockData: true });

      const { range } = this.state;
      const symbols = this.state.currentStocks.toString();
      const chartInterval = range === '2y' ? 10 : 1;

      const endpoint = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote,news,chart&range=${range}&last=5&chartInterval=${chartInterval}`;

      try {
        const response = await fetch(endpoint);
        const json = await response.json();

        this.socket.emit('fetchStockData', json);

        this.updateDataState(json);
      } catch (error) {
        this.setState({
          error,
          fetchingStockData: false,
        });
      }
    }

    // Remove the stock by index from the currentStocks array and by symbol (key) from the main data object.
    removeStock = (index, symbol) => {
      this.socket.emit('removeStock', { index, symbol });
      this.removeStockAndUpdateState(index, symbol);
    }

    removeFromCurrentStocks = (index) => {
      const currentStocks = [...this.state.currentStocks];
      currentStocks.splice(index, 1);
      return currentStocks;
    }

    removeFromMainData = (symbol) => {
      const newState = { ...this.state.data };
      delete newState[symbol];
      return newState;
    }

    render() {
      const { data, error } = this.state;
      return (
        <Wrapper className="app">
          <Container>
            <Header
              updateStocks={this.updateStocks}
              setRange={this.setRange}
              error={error}
            />
            <Graph stockData={data} />
            <StockList
              stockData={data}
              removeStock={this.removeStock}
            />
          </Container>
        </Wrapper>
      );
    }
}

export default App;


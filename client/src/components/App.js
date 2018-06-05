import React, { Component } from 'react';
import styled from 'styled-components';
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

    componentDidUpdate(prevProps, prevState) {
      if (this.state.range !== prevState.range) {
        this.fetchStockData();
      }
    }

  setRange = (range) => {
    this.setState({ range });
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

  updateStocks = async (data) => {
    const { searchValue } = data;
    if (this.state.currentStocks.includes(searchValue)) {
      this.setState({
        error: 'Ticker already chosen',
      });
      return;
    }

    if (await this.queryStock(searchValue)) {
      const newState = [...this.state.currentStocks, searchValue];
      this.setState({ currentStocks: newState }, () => this.fetchStockData(data));
    }
  }

  fetchStockData = async () => {
    this.setState({ fetchingStockData: true });

    const { range } = this.state;
    const symbols = this.state.currentStocks.toString();
    const chartInterval = range === '2y' || range === '5y' ? 10 : 1;

    const endpoint = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote,news,chart&range=${range}&last=5&chartInterval=${chartInterval}`;

    try {
      const response = await fetch(endpoint);
      const json = await response.json();

      this.setState({
        data: json,
        fetchingStockData: false,
        error: '',
      });
    } catch (error) {
      console.log('Error fetching stock data', error);
      this.setState({
        error,
        fetchingStockData: false,
      });
    }
  }

  removeStock = (index, symbol) => {
    this.setState({
      currentStocks: this.removeFromCurrentStocks(index),
      data: this.removeFromMainData(symbol),
    });
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
    const { data, error, range } = this.state;
    return (
      <Wrapper className="app">
        <Container>
          <Header updateStocks={this.updateStocks} setRange={this.setRange} error={error} />
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


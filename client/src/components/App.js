import React, { Component } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Header from './Header';
import Graph from './Graph';
import StockList from './StockList';
import NewsDisplay from './NewsDisplay';
import Notification from './Notification';
import {
  VANILLA_GREY,
  GREY_LIGHT,
  RED,
  BLUE,
  BLUE_LIGHT,
  WHITE,
} from '../constants/style';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: ${VANILLA_GREY};
  padding-top: 0;
  padding-right: 2rem;
  padding-left: 2rem;
  padding-bottom: 6rem;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 600px) {
    padding: 0 .5rem;
  }
  `;

const Container = styled.section`
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    margin-top: 5%;
  `;

const Footer = styled.footer`
  margin-top: 6rem;
  font-size: .8rem;
  color: ${GREY_LIGHT};
  width: 100%;
  text-align: center;
  bottom: 0;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: ${GREY_LIGHT};

  &:hover {
   color: ${BLUE};
  }
`;

const NotificationLink = styled.a`
  color: ${BLUE_LIGHT};

  &:hover {
    color: ${WHITE};
  }
`;
class App extends Component {
    state = {
      data: {},
      currentStocks: [],
      range: '',
      fetchingStockData: false,
      error: '',
      poolName: 'pool_1',
    };

    componentDidMount() {
      if (process.env.NODE_ENV === 'production') {
        this.socket = io.connect('/');
      } else {
        this.socket = io.connect('http://localhost:5000');
      }

      this.fetchDataFromDB(this.state.poolName);

      this.socket.on('updatePool', (data) => {
        this.updateCurrentStocksState(data);
      });
    }

    componentDidUpdate(prevProps, prevState) {
      // Call the API when the time range changes only if we've searched for a stock already
      if (this.state.range !== prevState.range && this.state.currentStocks.length > 0) {
        this.fetchStockData();
      } else if (this.state.currentStocks.length > 0 &&
        this.state.currentStocks.length !== prevState.currentStocks.length) {
        // If the array of current stocks isn't empty and the array size changes, call the API with the current stock symbols. Calling the API with an empty array will cause an error.
        this.fetchStockData();
      }

      if (prevState.currentStocks.length > 0 && this.state.currentStocks.length < 1) {
        this.clearData();
      }
    }

    fetchDataFromDB = async (poolName) => {
      this.setState({ fetchingStockData: true });

      try {
        const response = await fetch(`/api/fetchPool?poolName=${poolName}`);
        if (response.status !== 200) throw response.body.error;
        const json = await response.json();

        const { currentStocks, range } = json;

        this.setState({
          currentStocks,
          range,
        });
      } catch (error) {
        this.setState({
          error,
          fetchingStockData: false,
        });
      }
    }

    setRange = (range) => {
      const socketPayload = {
        stocks: this.state.currentStocks,
        range,
      };

      this.socket.emit('updatePool', socketPayload);
    }

    // Methods for updating stock data state
    clearData = () => {
      this.setState({
        data: {},
      });
    }

    updateCurrentStocksState = (data, callback) => {
      const { stocks, range } = data;

      this.setState({
        currentStocks: stocks,
        range,
      }, callback);
    }

    updateDataState = (json) => {
      this.setState({
        data: json,
        fetchingStockData: false,
        error: '',
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
        const socketPayload = {
          stocks: [...this.state.currentStocks, searchValue],
          range: this.state.range,
        };

        this.socket.emit('updatePool', socketPayload);
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

        this.updateDataState(json);
      } catch (error) {
        this.setState({
          error,
          fetchingStockData: false,
        });
      }
    }

    removeStock = (index) => {
      const currentStocks = [...this.state.currentStocks];

      currentStocks.splice(index, 1);

      const socketPayload = {
        stocks: currentStocks,
        range: this.state.range,
      };

      this.socket.emit('updatePool', socketPayload);
    }

    render() {
      const { data, error } = this.state;
      return (
        <Wrapper className="app">
          <Notification>
            This site lets you collaborate in real-time using websockets. <NotificationLink href={window.location.href} target="_blank">Click here</NotificationLink> to open a new tab and give it a go.
          </Notification>
          <Container>
            <Header
              updateStocks={this.updateStocks}
              setRange={this.setRange}
              currentRange={this.state.range}
              error={error}
            />
            <Graph stockData={data} />
            <StockList
              stockData={data}
              removeStock={this.removeStock}
            />
            <NewsDisplay stockData={data} />
          </Container>
          <Footer>made with <span style={{ color: RED }}>&hearts;</span> by <FooterLink href="https://github.com/abohannon">adam</FooterLink></Footer>
        </Wrapper>
      );
    }
}

export default App;


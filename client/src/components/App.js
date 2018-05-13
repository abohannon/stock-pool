import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Graph from './Graph';
import StockList from './StockList';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 0 2rem;
  box-sizing: border-box;
  `;

const Container = styled.section`
    max-width: 1280px;
    width: 100%;
    height: 400px;
    margin: 0 auto;
    margin-top: 10%;
  `;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentStocks: [],
      timeseries: 'TIME_SERIES_DAILY',
      symbol: '',
      fetchingStockData: false,
      error: '',
    };
  }

  updateCurrentStocks = (symbol) => {
    const newState = [...this.state.currentStocks, symbol];
    this.setState({ currentStocks: newState });
  }

  fetchStockData = (value) => {
    this.setState({ fetchingStockData: true });

    const fetchData = {
      timeSeries: 'TIME_SERIES_DAILY',
      symbol: value,
    };

    const endpoint = '/api/fetchMarketData';

    const options = {
      body: JSON.stringify(fetchData),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    fetch(endpoint, options)
      .then(response => response.json())
      .then((json) => {
        if (!json.data['Error Message']) {
          this.updateCurrentStocks(value);

          const newState = [...this.state.data, json];
          this.setState({
            data: newState,
            fetchingStockData: false,
            error: '',
          });
        } else {
          throw new Error('Invalid input. Company stock symbol required.');
        }
      })
      .catch((error) => {
        console.log('Error fetching stock data');
        this.setState({
          error,
          fetchingStockData: false,
        });
      });
  }

  render() {
    return (
      <Wrapper className="app">
        <Container>
          <Header fetchStockData={this.fetchStockData} />
          <Graph />
          <StockList />
        </Container>
      </Wrapper>
    );
  }
}

export default App;

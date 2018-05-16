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
    state = {
      data: [],
      currentStocks: [],
      symbol: '',
      fetchingStockData: false,
      error: '',
    };


  updateCurrentStocks = (symbol) => {
    const newState = [...this.state.currentStocks, symbol];
    this.setState({ currentStocks: newState });
  }

  removeStock = (index) => {
    const currentStocks = [...this.state.currentStocks];
    currentStocks.splice(index, 1);

    const data = [...this.state.data];
    data.splice(index, 1);

    this.setState({
      currentStocks,
      data,
    });
  }

  fetchStockData = async (value) => {
    if (this.state.currentStocks.includes(value)) return;

    this.setState({ fetchingStockData: true });

    const data = {
      symbol: value,
    };

    const endpoint = '/api/fetchMarketData';

    const options = {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    try {
      const response = await fetch(endpoint, options);
      if (response.status !== 200) throw new Error('Ticker not found');
      const json = await response.json();

      const newState = [...this.state.data, json];

      this.setState({
        data: newState,
        fetchingStockData: false,
        error: '',
      });

      this.updateCurrentStocks(value);
    } catch (error) {
      console.log('Error fetching stock data', error);
      this.setState({
        error,
        fetchingStockData: false,
      });
    }
  }

  render() {
    return (
      <Wrapper className="app">
        <Container>
          <Header fetchStockData={this.fetchStockData} />
          <Graph />
          <StockList
            stockData={this.state.data}
            removeStock={this.removeStock}
          />
        </Container>
      </Wrapper>
    );
  }
}

export default App;

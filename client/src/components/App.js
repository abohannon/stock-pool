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
      chartData: [],
      symbol: '',
      fetchingStockData: false,
      error: '',
    };

  updateCurrentStocks = (symbol) => {
    const newState = [...this.state.currentStocks, symbol];
    this.setState({ currentStocks: newState });
  }

  removeStock = (index, symbol) => {
    // remove stock from currentStocks
    const currentStocks = [...this.state.currentStocks];
    currentStocks.splice(index, 1);

    // remove stock from main data array
    const data = [...this.state.data];
    data.splice(index, 1);

    // remove stock from chartData
    const clonedChartData = [...this.state.chartData];

    const chartData = clonedChartData.map((item) => {
      /*
      * Need to clone each item here because the spread above only does a shallow copy of the array
      * but does not affect the nested objects. This means the modifications inside this would map mutate
      * the original object (state) references which is an anti pattern.
      */
      const clonedItem = { ...item };
      delete clonedItem[symbol];

      if (Object.keys(clonedItem).length < 2) {
        delete clonedItem.date;
      }

      return clonedItem;
    });

    this.setState({
      currentStocks,
      data,
      chartData,
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
    } catch (error) {
      console.log('Error fetching stock data', error);
      this.setState({
        error,
        fetchingStockData: false,
      });
    }

    this.updateCurrentStocks(value);
    this.formatGraphData();
  }

  // format raw stock data for recharts
  formatGraphData = () => {
    const chartData = [...this.state.data]
      .reduce((obj, stock) => stock.chart.map((item, i) => {
        const chartObj = {};

        chartObj.date = item.date;
        chartObj[stock.quote.symbol] = item.close;

        return { ...this.state.chartData[i], ...chartObj };
      }), {});

    this.setState({ chartData });
  }

  render() {
    const { data, chartData } = this.state;
    return (
      <Wrapper className="app">
        <Container>
          <Header fetchStockData={this.fetchStockData} />
          <Graph chartData={chartData} />
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

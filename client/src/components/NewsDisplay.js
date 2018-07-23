import React, { Component } from 'react';
import styled from 'styled-components';
import { BOX_SHADOW, WHITE } from '../constants/style';

import NewsItem from './NewsItem';

const Wrapper = styled.div`
  padding: 2rem;
  border-radius: 2px;
  background-color: ${WHITE};
  box-shadow: ${BOX_SHADOW};
  box-sizing: border-box;
  height: auto;
  min-height: 100px;
  width: 100%;

  @media (max-width: 768px) {
    font-size: .8rem;
  }
`;


class NewsDisplay extends Component {
  state = {
    news: [],
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.stockData).length !== Object.keys(this.props.stockData).length) {
      this.getNews();
    }
  }

  getNews = () => {
    const { stockData } = this.props;

    const news = Object.keys(stockData)
      .reduce((arr, item) => [...arr, ...stockData[item].news], []);

    this.setState({ news });
  }

  renderNewsItems = () => {
    const { news } = this.state;
    return news.map((item, index) => (
      <NewsItem key={index} payload={item} />
    ));
  }

  render() {
    if (this.state.news.length < 1) {
      return null;
    }

    return (
      <Wrapper>
        {this.renderNewsItems()}
      </Wrapper>
    );
  }
}

export default NewsDisplay;


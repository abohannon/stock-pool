import React from 'react';
import styled from 'styled-components';
import { GREY_DARK, GREY, GREY_LIGHT, GREY_LIGHTEST, BLUE } from '../constants/style';

const Wrapper = styled.article`
  border-bottom: 1px solid ${GREY_LIGHTEST};
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
`;

const Summary = styled.div`
  color: ${GREY};
  line-height: 1.5;
`;

const Headline = styled.h3`
  margin-top: 0;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${GREY_DARK};
  
  &:hover {
   color: ${BLUE};
  }
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  color: ${GREY_LIGHT};
  font-size: 12px;
  margin-bottom: .5rem;
`;

const Source = styled.div`
  margin-right: .5rem;
`;
const ImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 1rem;
  flex-shrink: 0;
  border-radius: 2px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(70%);
`;

const NewsItem = (props) => {
  const {
    headline, summary, source, datetime, url, image,
  } = props.payload;

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={image} alt="" />
      </ImageWrapper>
      <div className="news-content">
        <div>
          <StyledLink href={url} alt={headline}><Headline>{headline}</Headline></StyledLink>
        </div>
        <Metadata>
          <Source>{source}</Source>
          <div>{datetime}</div>
        </Metadata>
        <Summary>{summary}</Summary>
      </div>
    </Wrapper>
  );
};

export default NewsItem;

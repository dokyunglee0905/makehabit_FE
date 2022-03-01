import React from "react";
import styled from "styled-components";
import { Button, Input, Text, Image, Grid } from "../elements";

const Main = () => {
  return (
    <React.Fragment>
      <Container>
        <Header>
          <Image size="40" src="imges/logoEx.png" alt=""></Image>
          <Input
            placeholder="도전하고 싶은 습관을 검색해보세요!"
            width="65%"
          ></Input>
          <Image size="40" src="imges/search.png" alt=""></Image>
        </Header>
        <Banner src="imges/banner_02.png" alt=""></Banner>
        <Text margin="5% 5%" bold>
          카테고리
        </Text>
        <CategoryWrap>
          <Img src="imges/category_test.png"></Img>
          <Img src="imges/category_test.png"></Img>
          <Img src="imges/category_test.png"></Img>
          <Img src="imges/category_test.png"></Img>
        </CategoryWrap>
        <CategoryWrap>
          <Img src="imges/category_test.png"></Img>
          <Img src="imges/category_test.png"></Img>
          <Img src="imges/category_test.png"></Img>
          <Img src="imges/category_test.png"></Img>
        </CategoryWrap>
        <RecommendWrap>
          <RecommendTitle>
            <Text bold>추천 작심삼일</Text>
            <Text>더보기</Text>
          </RecommendTitle>
          <Img src="imges/Recommend_test.png"></Img>
          <RecommendTitle>
            <Text bold>캐릭터 갤러리</Text>
            <Text>더보기</Text>
          </RecommendTitle>
          <Img src="imges/Recommend_test.png"></Img>
        </RecommendWrap>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  overflow-x: hidden;
  margin: 0% 3% 0% 3%;
`;

const Header = styled.div`
  margin: 10% 0% 2% 0%;
  display: flex;
`;

//슬라이드 배너 작업
const Banner = styled.img`
  display: block;
  margin: 8% auto;
`;

const CategoryWrap = styled.div`
  margin-top: 2%;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  padding: 0% 4%;
  size: 20px;
`;

//추천 작심삼일
const RecommendWrap = styled.div`
  margin-top: 4%;
  justify-content: center;
`;

const RecommendTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0% 5% 0% 5%;
`;

export default Main;

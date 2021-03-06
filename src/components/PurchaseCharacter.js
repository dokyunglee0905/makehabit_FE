import React from "react";

import styled from "styled-components";
// import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";

import PageBack from "./PageBack";

const PurchaseCharacter = () => {
  const Item = process.env.PUBLIC_URL + "/items";
  return (
    <Container>
      <PageBack />
      <Point>Point</Point>
      <ImgContainer>
        <ItemImg src={Item + "/캐릭터_분홍.png"} alt="바디컬러"></ItemImg>
        <ItemImg src={Item + "/악세사리_화분.png"} alt="악세사리"></ItemImg>
        <ItemImg src={Item + "/의상_가드닝룩.png"} alt="의상"></ItemImg>
      </ImgContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 48.5vh;
`;
const Point = styled.div`
  position: absolute;
  width: 6.875rem;
  height: 2rem;
  margin: 2.6vh 0 0 5%;
  background: #fff;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 3.125rem;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 48.5vh;
  position: relative;
  display: flex;
  justify-content: center;
`;

const ItemImg = styled.img`
  height: 100%;
  position: absolute;
  z-index: 1;
`;
export default PurchaseCharacter;

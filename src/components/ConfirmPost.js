import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";

import styled from "styled-components";
import { history } from "../redux/configureStore";

const ConfirmPost = (props) => {
  const { thumbnail, title, round, content, status, startAt } = props;

  // 버튼 텍스트, 우측 상단 진행상태 텍스트 달기 위한 조건
  const statusText = [
    { progress: "진행예정", buttonText: `${startAt.slice(0, 10)} 시작` },
    { progress: "종료", buttonText: "종료된 챌린지" },
  ];

  let statusContent = "";
  if (status === 1) {
    statusContent = statusText[0];
  } else if (status === 2) {
    statusContent = statusText[1];
  }

  return (
    <GridBox>
      {/* 완료된 챌린지 */}
      {status === 2 ? (
        <ImageContainer style={{ position: "relative" }}>
          <Completed>완료</Completed>
          <PostImage
            src={thumbnail}
            onClick={() => {
              history.push(`/post/${props.challengeId}`);
            }}
          ></PostImage>
        </ImageContainer>
      ) : (
        <ImageContainer>
          <PostImage
            src={thumbnail}
            onClick={() => {
              history.push(`/post/${props.challengeId}`);
            }}
          ></PostImage>
        </ImageContainer>
      )}
      <TextContainer>
        <div>
          <Title>{title}</Title>

          <Round>
            {/* 진행예정인 챌린지 */}
            {status === 1 || status === 2 ? (
              <div>{statusContent.progress}</div>
            ) : (
              <>
                <span>{round}세트</span> 진행중
              </>
            )}
          </Round>
        </div>
        <Content
          style={{ color: "#707070", fontSize: "0.8rem", lineHeight: "150%" }}
        >
          {content}
        </Content>
        {/* <Content
          style={{ color: "#707070", fontSize: "0.8rem", lineHeight: "150%" }}
        >
          글자수테스트를 해볼거예요 신나겠죠? 글자수테스트를 해볼거예요
          신나겠죠? 글자수테스트를 해볼거예요 신나겠죠? 글자수테스트를
          해볼거예요 신나겠죠?
        </Content> */}

        {status === 1 || status === 2 ? (
          <Button
            width="100%"
            bg="#ddd"
            fontSize="1rem"
            fontWeight="600"
            cursor="default"
          >
            {statusContent.buttonText}
          </Button>
        ) : (
          <Button
            width="100%"
            bg="#FF8B37"
            fontSize="1rem"
            fontWeight="600"
            _onClick={() => {
              history.push(`/confirm/${props.challengeId}`);
            }}
          >
            오늘의 인증하기
          </Button>
        )}
      </TextContainer>
    </GridBox>
  );
};

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4%;
  margin: 5vh 0;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 15vh;
  grid-column: 1/1;
`;
const PostImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 15vh;
  object-fit: cover;
  border-radius: 10px;
`;
const Completed = styled.div`
  width: 100%;
  height: 15vh;
  grid-column: 1/1;
  border-radius: 10px;
  background-color: #000;
  position: absolute;
  opacity: 0.7;

  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Round = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  & > span {
    color: #ff8b37;
  }
`;

const Content = styled.div`
  // display: -webkit-box;
  // display: block;
  // width: 250px;
  // word-wrap: break-word;
  // line-height: 1.2em;
  // height: 3.6em;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // text-align: left;
  // -webkit-line-clamp: 2;
  // -webkit-box-orient: vertical;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  max-height: 2.4em;
`;
export default ConfirmPost;

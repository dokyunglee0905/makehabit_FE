// 이미지 클릭 시 업로드 되도록 기본 세팅 수정
// textarea 우측 마진 안 맞는 부분 수정
// 모달 배경 클릭 시에도 창 꺼짐 추가

import React from "react";

import { Grid, Text, Input, Image } from "../elements";

import styled from "styled-components";

const Confirm = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Grid padding="16px" position="relative">
        <ConfirmText>인증하기</ConfirmText>
        <Title>뷰 페이지 다 만들기</Title>
        <SubTitle>
          오늘의 도전을 성공하신 oo님! 인증사진을 올리고 포인트?
        </SubTitle>

        <input type="file"></input>
        <Image shape="rectangle"></Image>

        <Example>
          챌린지 인증 예시가 궁금하다면?
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={openModal}
          >
            [아이콘]
          </span>
        </Example>

        <CommentTitle>코멘트</CommentTitle>
        <div>예쁘게 어쩌구~~예쁘게 어쩌구~~</div>
        <Textarea rows="8"></Textarea>
      </Grid>

      <Grid>
        <Button>인증완료하기</Button>
      </Grid>

      {modalOpen ? (
        <Modal>
          <section>
            <div onClick={closeModal}>X</div>
            <Grid padding="30px 30px 0px 30px">
              <div>챌린지 인증예시</div>
              <div>
                호스트가 챌린지 개설 시 작성한 인증방법 호스트가 챌린지 개설 시
                작성한 인증방법 호스트가 챌린지 개설 시 작성한 인증방법 호스트가
                챌린지 개설 시 작성한 인증방법 호스트가 챌린지 개설 시 작성한
                인증방법 호스트가 챌린지 개설 시 작성한 인증방법
              </div>
            </Grid>
          </section>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

// 인증하기 텍스트
const ConfirmText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
`;

// 타이틀
const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
`;
const SubTitle = styled.div`
  margin-bottom: 10px;
`;

// 챌린지 예시 도움말
const Example = styled.div`
  text-align: right;
`;

// 코멘트 작성란
const CommentTitle = styled.div`
  margin-top: 20px;
`;
const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  margin-bottom: 100px;
`;
const Button = styled.button`
  position: absolute;
  bottom: 0px;

  width: 100%;
  height: 80px;
  border: none;

  color: white;
  background: orange;
`;

const Modal = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  display: flex;

  section {
    width: 80%;
    height: 50%;
    margin: auto;
    align-self: center;
    background: #fff;
    border-radius: 10px;
  }

  section > div {
    &:nth-child(1) {
      cursor: pointer;
      text-align: right;
      margin: 20px;
      font-size: 1.3rem;
    }
  }

  section > div > div {
    &:nth-child(1) {
      font-weight: bold;
      margin-bottom: 20px;
    }
    &:nth-child(2) {
    }
  }
`;

export default Confirm;
import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./LoginModal";

import { ReactComponent as HomeImg } from "../img/icon_home.svg";
// /public/images/icon_home.svg";
//
const ButtonNavigation = () => {
  //버튼아이콘
  const home = process.env.PUBLIC_URL + "/images/icon_home.svg";
  const write = process.env.PUBLIC_URL + "/images/icon_write.svg";
  const flag = process.env.PUBLIC_URL + "/images/icon_flag.svg";
  const shop = process.env.PUBLIC_URL + "/images/icon_shop.svg";
  const mypage = process.env.PUBLIC_URL + "/images/icon_mypage.svg";

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const Img01 = process.env.PUBLIC_URL + "/images";
  // console.log("button", is_login);

  const [clickedTab, changeTab] = React.useState("home");
  //모달창에 접근하는 ref
  const modalRef = React.useRef();
  // console.log("모달ref!!!", modalRef);

  const confirmPage = () => {
    if (is_login) {
      // dispatch(challengeActions.setTab("navi"));
      // dispatch(challengeActions.naviChallengeDB());
      history.push(`/mychallenge/navi`);
    } else {
      // console.log("로그인");
      modalRef.current.openModal();
    }
  };
  const writePage = () => {
    // console.log("writePage", is_login);
    if (is_login) {
      history.push(`/postwrite`);
    } else {
      modalRef.current.openModal();
    }
  };

  const characterPage = () => {
    // console.log("writePage", is_login);
    if (is_login) {
      history.push(`/character`);
    } else {
      modalRef.current.openModal();
    }
  };

  const myPage = () => {
    // console.log("writePage", is_login);
    if (is_login) {
      history.push(`/mypage`);
    } else {
      modalRef.current.openModal();
    }
  };

  return (
    <React.Fragment>
      <Footer>
        <GradientBox />
        <ButtonWrap>
          <ButtonIcon
            onClick={() => {
              history.push("/");
              changeTab("home");
            }}
          >
            <div>
              {/* <img
                src={home}
                alt=""
                style={{
                  // color: clickedTab === "home" ? "#FF8B37" : "#9C9C9C",
                  fill: "orange",
                }}
                fill="orange"
              /> */}
              <HomeImg fill="blue" />
            </div>

            <div
              style={{
                color: clickedTab === "home" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "home" ? "600" : "400",
              }}
            >
              홈
            </div>
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              writePage();
              changeTab("open");
            }}
          >
            <div>
              <img
                src={write}
                alt=""
                style={{
                  color: clickedTab === "open" ? "#FF8B37" : "#9C9C9C",
                }}
              />
            </div>

            <div
              style={{
                color: clickedTab === "open" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "open" ? "600" : "400",
              }}
            >
              개설
            </div>
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              confirmPage();
              changeTab("confirm");
            }}
          >
            <div
              style={{
                color: clickedTab === "confirm" ? "#FF8B37" : "#9C9C9C",
              }}
            >
              <img src={flag} alt="" />
            </div>
            <div
              style={{
                color: clickedTab === "confirm" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "confirm" ? "600" : "400",
              }}
            >
              인증
            </div>
          </ButtonIcon>
          {/* 채팅 추가 연결 필요 */}
          <ButtonIcon
            onClick={() => {
              characterPage();
              changeTab("character");
            }}
          >
            <div
              style={{
                color: clickedTab === "character" ? "#FF8B37" : "#9C9C9C",
              }}
            >
              <img src={shop} alt="" />
            </div>
            <div
              style={{
                color: clickedTab === "character" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "character" ? "600" : "400",
              }}
            >
              캐릭터샵
            </div>
          </ButtonIcon>
          <ButtonIcon
            style={{
              color: clickedTab === "mypage" ? "#FF8B37" : "#9C9C9C",
            }}
            onClick={() => {
              myPage();
              changeTab("mypage");
            }}
          >
            <div>
              <img src={mypage} alt="" />
            </div>
            <div
              style={{
                color: clickedTab === "mypage" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "mypage" ? "600" : "400",
              }}
            >
              내 페이지
            </div>
          </ButtonIcon>
        </ButtonWrap>
      </Footer>

      <LoginModal ref={modalRef}>
        <Grid padding="30px 30px 0px 30px">
          <Text size="20" bold alignCenter>
            앗 로그인이 필요해요!
          </Text>
          <Button margin="10px 0px" _onClick={() => history.push("/login")}>
            로그인하러가기
          </Button>
        </Grid>
      </LoginModal>
    </React.Fragment>
  );
};

const Footer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 420px;
`;

const GradientBox = styled.div`
  width: 100%;
  max-width: 420px;
  height: 2.72vh;
  background: linear-gradient(
    360deg,
    rgba(222, 222, 222, 0.43) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: auto;
  width: 100%;
  height: 11.84vh;
  background-color: #fff;
`;

const ButtonIcon = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;

  & > div {
    &:nth-child(2) {
      font-size: 0.813rem;
      line-height: 1.063rem;
      letter-spacing: -0.005rem;
    }
  }
`;

export default ButtonNavigation;

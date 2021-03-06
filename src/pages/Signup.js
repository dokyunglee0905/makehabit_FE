import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, ContainerGrid } from "../elements";
import MetaTag from "../shared/MetaTag";

import styled from "styled-components";
import { debounce } from "lodash";

import { actionCreators as userActions } from "../redux/modules/user";

import { ReactComponent as CheckImg } from "../img/icon_check.svg";
import { ReactComponent as CloseImg } from "../img/icon_close.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const dispatch = useDispatch();

  const [user_email, setEmail] = useState("");
  const debounceEmail = debounce((e) => {
    setEmail(e.target.value);
  }, 500);
  const IdKeyPress = React.useCallback(debounceEmail, []);
  const changeEmail = (e) => {
    IdKeyPress(e);
  };

  const emailCheck = useSelector((state) => state.user.emailCheck);

  const [user_nickname, setNickname] = useState("");
  const debounceNickname = debounce((e) => {
    setNickname(e.target.value);
  }, 500);
  const NicknameKeyPress = React.useCallback(debounceNickname, []);
  const changeNickname = (e) => {
    NicknameKeyPress(e);
  };
  const nicknameCheck = useSelector((state) => state.user.nicknameCheck);

  const [user_pwd, setPwd] = useState("");
  const debouncePwd = debounce((e) => {
    setPwd(e.target.value);
  }, 500);
  const PwdKeyPress = React.useCallback(debouncePwd, []);
  const changePwd = (e) => {
    PwdKeyPress(e);
  };
  const [user_pwdcheck, setPwdcheck] = useState("");
  const debouncePwdcheck = debounce((e) => {
    setPwdcheck(e.target.value);
  }, 500);
  const PwdcheckKeyPress = React.useCallback(debouncePwdcheck, []);
  const changePwdcheck = (e) => {
    PwdcheckKeyPress(e);
  };

  const signup = () => {
    if (user_email === "") {
      window.alert("이메일을 입력해주세요!");
      return;
    }

    if (user_nickname === "") {
      window.alert("아이디를 입력해주세요!");
      return;
    }

    if (user_pwd !== user_pwdcheck || user_pwd === "" || user_pwdcheck === "") {
      window.alert("비밀번호와 비밀번호 재입력의 값이 다릅니다!");
      return;
    }
    dispatch(
      userActions.signupDB(user_email, user_nickname, user_pwd, user_pwdcheck)
    );
  };

  let [isHidden, setIsHidden] = React.useState(true);
  let [pwdMode, setPwdMode] = React.useState("text");
  let [correct, setCorrect] = React.useState(false);

  const [isActive, setActive] = React.useState(false);

  React.useEffect(() => {
    if (isHidden === false) {
      setPwdMode("text");
    } else {
      setPwdMode("password");
    }

    if (user_pwd === user_pwdcheck) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }

    if (
      user_email !== "" &&
      user_pwd !== "" &&
      user_pwdcheck !== "" &&
      user_nickname !== ""
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [isHidden, user_pwdcheck, user_pwd, user_email, user_nickname]);

  const changeBool = () => {
    setIsHidden(!isHidden);
  };
  React.useEffect(() => {
    dispatch(userActions.emailCheckDB(user_email));
  }, [user_email]);

  React.useEffect(() => {
    dispatch(userActions.nicknameCheckDB(user_nickname));
  }, [user_nickname]);
  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 회원가입" />

      <ContainerGrid>
        <Grid textAlign="center" padding="2.48vh 0">
          <p style={{ fontSize: "2.6vh", fontWeight: "bold", margin: "0" }}>
            회원가입
          </p>
        </Grid>

        <Grid
          margin="4.02vh 0 5.45vh 0"
          fontSize="2.6vh"
          fontWeight="700"
          lineHeight="4.02vh"
        >
          <span style={{ color: "#FF8B37", fontWeight: "700" }}>
            함께 도전하며,
          </span>
          <br />
          <span style={{ color: "#FF8B37", fontWeight: "700" }}>
            {" "}
            새로운 습관
          </span>
          을 만나보세요.
        </Grid>

        <Grid>
          <Title>아이디(이메일)</Title>
          <Grid position="relative">
            <InputBox
              placeholder="이메일 주소를 입력해주세요"
              onChange={changeEmail}
            />
            {user_email ? (
              emailCheck === 1 ? (
                <CheckResult style={{ color: "#245EF5" }}>
                  <CheckImg
                    width="1.89vh"
                    height="1.89vh"
                    style={{ fill: "#245EF5" }}
                  />
                  <p>사용 가능한 이메일</p>
                </CheckResult>
              ) : emailCheck === 0 ? (
                <CheckResult style={{ color: "#E42E2E" }}>
                  <CloseImg
                    width="1.89vh"
                    height="1.89vh"
                    style={{ fill: "#E42E2E" }}
                  />
                  <p>이메일 형식을 확인해주세요</p>
                </CheckResult>
              ) : (
                <CheckResult style={{ color: "#E42E2E" }}>
                  <CloseImg
                    width="1.89vh"
                    height="1.89vh"
                    style={{ fill: "#E42E2E" }}
                  />
                  <p>이미 사용중인 이메일 입니다</p>
                </CheckResult>
              )
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        <Title
          style={{
            marginTop: "7.22vh",
          }}
        >
          비밀번호
        </Title>

        <Grid position="relative">
          <InputBox
            type={pwdMode}
            placeholder="8~16자, 문자/숫자/특수문자를 모두 포함해주세요."
            onChange={changePwd}
          />

          {isHidden ? (
            <AiFillEye
              onClick={changeBool}
              style={{
                position: "absolute",
                top: "0.947vh",
                right: "10px",
                cursor: "pointer",
              }}
            />
          ) : (
            <AiFillEyeInvisible
              onClick={changeBool}
              style={{
                position: "absolute",
                top: "0.947vh",
                right: "10px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        <Title
          style={{
            marginTop: "4.26vh",
          }}
        >
          비밀번호 확인
        </Title>
        <Grid position="relative">
          <InputBox
            type={pwdMode}
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={changePwdcheck}
          />
          {isHidden ? (
            <AiFillEye
              onClick={changeBool}
              style={{
                position: "absolute",
                top: "0.947vh",
                right: "10px",
                cursor: "pointer",
              }}
            />
          ) : (
            <AiFillEyeInvisible
              onClick={changeBool}
              style={{
                position: "absolute",
                top: "0.947vh",
                right: "10px",
                cursor: "pointer",
              }}
            />
          )}

          {user_pwdcheck ? (
            correct ? (
              <CheckResult style={{ color: "#245EF5" }}>
                <CheckImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#245EF5" }}
                />
                <p>비밀번호가 일치합니다</p>
              </CheckResult>
            ) : (
              <CheckResult style={{ color: "#E42E2E" }}>
                <CloseImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#E42E2E" }}
                />
                <p>비밀번호가 일치하지 않습니다</p>
              </CheckResult>
            )
          ) : (
            <></>
          )}
        </Grid>

        <Title
          style={{
            marginTop: "7.22vh",
          }}
        >
          마지막으로 닉네임을 알려주세요!
        </Title>
        <Grid position="relative">
          <InputBox
            placeholder="3~15자의 영어,한글,숫자만 사용가능합니다"
            onChange={changeNickname}
          />
          {user_nickname ? (
            nicknameCheck === 1 ? (
              <CheckResult style={{ color: "#245EF5" }}>
                <CheckImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#245EF5" }}
                />
                <p>사용 가능한 닉네임입니다</p>
              </CheckResult>
            ) : nicknameCheck === 0 ? (
              <CheckResult style={{ color: "#E42E2E" }}>
                <CloseImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#E42E2E" }}
                />
                <p>닉네임 형식을 확인해주세요</p>
              </CheckResult>
            ) : (
              <CheckResult style={{ color: "#E42E2E" }}>
                <CloseImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#E42E2E" }}
                />
                <p>이미 사용중인 닉네임 입니다</p>
              </CheckResult>
            )
          ) : (
            <></>
          )}
        </Grid>

        <Grid textAlign="center" margin="7.22vh 0 0">
          <Text size="1.89vh">
            계정이 있으신가요? &nbsp;
            <a href={"/login"}>로그인</a>
          </Text>
        </Grid>
      </ContainerGrid>

      <Footer>
        <Grid>
          {isActive ? (
            <JoinButton onClick={signup}>시작하기</JoinButton>
          ) : (
            <NotButton disabled>시작하기</NotButton>
          )}
        </Grid>
      </Footer>
    </React.Fragment>
  );
};

const Title = styled.div`
  font-weight: bold;
  font-size: 2.13vh;
  line-height: 2.79vh;
  margin-bottom: 0.71vh;
`;

const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid #9c9c9c;
  width: 100%;
  padding: 0.59vh 0;
  color: #000;
  font-size: 1.5vh;
  line-height: 2.65vh;

  ::placeholder {
    color: #9c9c9c;
  }

  @media screen and (max-width: 420px) {
    font-size: 1.3vh;
  }
`;

const CheckResult = styled.div`
  position: absolute;
  left: 0;
  margin: 0;
  display: flex;
  align-items: center;

  p {
    font-size: 1.54vh;
    margin: 0.94vh 0 0.94vh 0.82vh;
  }
`;

const JoinButton = styled.button`
  background: #ff8b37;
  width: 100%;
  height: 8.88vh;
  border: none;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: #fff;
  font-size: 2.6vh;
  font-weight: 700;
`;
const NotButton = styled.button`
  background: #f7f7f7;
  width: 100%;
  height: 8.88vh;
  border: none;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: #9c9c9c;
  font-size: 2.6vh;
  font-weight: 700;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  align-items: center;
`;

export default Signup;

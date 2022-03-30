import React from "react";

import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import LoginModal from "../components/LoginModal";

import moment from "moment";

const CategoryPost = (props) => {
  //좋아요 버튼 on/off
  // let [isLike, setIsLike] = React.useState(false);
  function getParametersForUnsplash({ width, height, quality, format }) {
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
  }

  const dispatch = useDispatch();

  //로그인모달창에 접근하는 ref
  const loginModal = React.useRef();
  const {
    thumbnail,
    title,
    challengeId,
    startAt,

    isLike,
    participants,
    round,
  } = props;
  // console.log("카테고리포스트", props);

  //이미지경로
  const DisLikeImg =
    process.env.PUBLIC_URL + "/images/icon_outline_heart_shadow.png";
  const LikeImg = process.env.PUBLIC_URL + "/images/icon_fill_heart_shadow.png";
  const Icon = process.env.PUBLIC_URL + "/images";

  //로그인 체크
  const is_login = useSelector((state) => state.user.is_login);

  //찜하기 (좋아요) 기능
  const like = () => {
    if (is_login) {
      dispatch(postActions.likeDB(challengeId));
    } else {
      loginModal.current.openModal();
    }
  };
  //찜하기 해제 기능
  const disLike = () => {
    if (is_login) {
      dispatch(postActions.dislikeDB(challengeId));
    } else {
      loginModal.current.openModal();
    }
  };

  const date = new Date(startAt);
  const koStartAt = date.toLocaleString();
  const todayDate = new Date();
  const today = moment(todayDate, "YYYY-MM-DD").format("YYYY-MM-DD");
  const setDay = moment(koStartAt, "YYYY-MM-DD").format("YYYY-MM-DD");
  const diffDay = moment(setDay).diff(today, "days");

  return (
    <React.Fragment>
      {/* 클릭 시 이동 일단 임의로 설정 */}
      <Card>
        <ThumbnailBox>
          <Img
            // 기존 이미지 크기 두배로 리사이징
            alt="썸네일"
            src={
              thumbnail +
              getParametersForUnsplash({
                width: 334,
                height: 334,
                quality: 80,
                format: "jpg",
              })
            }
            onClick={() => {
              history.push(`/challenges/${challengeId}`);
            }}
          />
          {isLike ? (
            <Like
              src={LikeImg}
              alt="좋아요 아이콘"
              onClick={() => {
                disLike();
              }}
            />
          ) : (
            <Like
              src={DisLikeImg}
              alt="좋아요취소 아이콘"
              onClick={() => {
                like();
              }}
            />
          )}
        </ThumbnailBox>

        <Title>{title}</Title>
        <TagWrap>
          {today < setDay ? (
            <Tag>{diffDay}일 뒤 시작</Tag>
          ) : (
            <Tag>습관삼끼 {round}세트</Tag>
          )}

          <ParticipantsTag>
            <img src={Icon + "/icon_mypage.svg"} alt="icon" />
            {participants}명
          </ParticipantsTag>
        </TagWrap>

        {/* <Tag>
            {tags}
          </Text>
        </Tag> */}
      </Card>
      <LoginModal ref={loginModal} in_page />
    </React.Fragment>
  );
};

CategoryPost.defaultProps = {
  puls: "...",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaw8iLInSA0YTMGUXPAGcrG4ZvLC8PGrs8lZloBXFYYxI3DNCV7nVLmM83ojgAxMkQaA8&usqp=CAU",
  title: "",
  tags: "",
};

const Card = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
  width: 100%;
`;

const ThumbnailBox = styled.div`
  width: 100%;
  height: 167px;
  position: relative;
  border-radius: 5px;
  z-index: 9;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  position: relative;
  z-index: 9;
`;

const Like = styled.img`
  size: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 90;
`;

// const Tag = styled.div`
//   display: inline-flex;
//   background-color: beige;
//   margin: 0% 3%;
//   width: 90px;
//   height: 20px;
//   border-radius: 5px;
//   align-items: center;
// `;
const Title = styled.div`
  margin-top: 10px;
  word-break: break-all;
  font-size: 18px;
  font-weight: bold;
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const TagWrap = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    width: 40%;
    align-items: center;
  }
`;

const Tag = styled.div`
  width: 100%;
  min-width: 100px;
  font-size: 16px;
  font-weight: 500;
  /* height: 100%; */
  background-color: #efefef;
  border-radius: 5px;
  padding: 3%;
  text-align: center;
  justify-content: center;
  margin-right: 5px;
  color: #707070;
`;

const ParticipantsTag = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  color: #707070;
`;
export default CategoryPost;

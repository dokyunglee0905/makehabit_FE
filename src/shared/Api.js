import axios from "axios";

const instance = axios.create({
  // baseURL: "http://52.79.227.179/",
  baseURL: "https://makehabitapi.shop/",
  // timeout: 5000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json, text/plain,*/*",
  },
});
instance.interceptors.request.use(
  function (config) {
    // console.log("configINNNNN");
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// instance token refresh
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error", error.config, error.response);
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 401) {
      console.log("401error", config);
      const refreshToken = `Bearer ${localStorage.getItem("token")}`;

      originalRequest.headers = { Authorization: refreshToken };
      // console.log("I'mIN!!!!!", originalRequest, originalRequest.headers);
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

// const res = { data: "어쩌구"}
// res.data

//참고
//user.js ------------------------------------------------------------------------------------------------------------------------------------------
export const apis = {
  // user.js
  login: (email, password) =>
    instance.post("/api/users/login", { email, password }),
  loginKakao: (email) => instance.post("/api/users/loginKakao", { email }),
  signup: (email, nickname, password, confirmPassword) =>
    instance.post("/api/users/signup", {
      email,
      nickname,
      password,
      confirmPassword,
    }),

  //이메일 체크
  emailCheck: (email) => instance.post("/api/users/checkEmail", { email }),

  //닉네임 체크
  nicknameCheck: (nickname) =>
    instance.post("/api/users/checkNickname", { nickname }),

  //로그인
  login: (email, password) =>
    instance.post("/api/users/login", { email, password }),
  //소셜로그인
  loginKakao: () => instance.get("/api/users/kakao"),
  //로그인 상태체크
  loginCheck: () => instance.get("/api/users/checkLogin"),

  // 메인 -------------------------------------------------------------------------------------------------------

  //메인-검색기능
  mainSearch: (searchWord) => instance.get(`/api/search?title=${searchWord}`),

  // 메인-추천작심삼일
  // ()안에는 변수로 받아오는 값이 있을 때 추가! (위에꺼 참고하기)
  // "length=3" 이부분은 메인에서 swap 넘길 때의 갯수인지 백분들과 확인

  mainRecommend: (recommendLength) =>
    instance.get(`api/main/recommendation?length=${recommendLength}`),

  // 카테고리 -------------------------------------------------------------------------------------------------------

  //카테고리페이지-목록조희
  category: (categoryId) => instance.get(`/api/category/${categoryId}`),

  //메인카테고리
  maincategory: (recommendLength, categoryId) =>
    instance.get(`/api/category/${categoryId}?length=${recommendLength}`),

  // 마감임박(보류)
  // 실시간(보류)

  // 작성페이지 -------------------------------------------------------------------------------------------------------
  //작성페이지
  createChallenge: (
    title,
    category,
    thumbnail,
    startAt,
    content,
    howtoContent,
    tag
  ) =>
    instance.post(`/api/challenges`, {
      title,
      category,
      thumbnail,
      startAt,
      content,
      howtoContent,
      tag,
    }),

  //이미지업로드
  imageUpload: (image) => instance.post("/api/image", image),

  // 상세페이지 -------------------------------------------------------------------------------------------------------
  //상세페이지 조회
  detail: (challengId) => instance.get(`/api/challenges/${challengId}`),

  //상세페이지-참여하기버튼
  join: (challengId) => instance.post(`/api/challenges/${challengId}/join`),
  //상세페이지-참여 취소하기
  joinCancel: (challengId) =>
    instance.delete(`/api/challenges/${challengId}/join`),
  // 상세페이지-찜하기 버튼&취소버튼
  getLike: () => instance.get("/api/mypage/like"),
  like: (challengeId) => instance.post(`/api/challenges/${challengeId}/like`),
  dislike: (challengeId) =>
    instance.delete(`/api/challenges/${challengeId}/like`),

  //상세페이지 챌린지 수정
  postedit: (
    challengId,
    title,
    category,
    thumbnail,
    startAt,
    content,
    howtoContent
  ) =>
    instance.put(`/api/challenges/${challengId}`, {
      title,
      category,
      thumbnail,
      startAt,
      content,
      howtoContent,
    }),

  // 인증페이지 -------------------------------------------------------------------------------------------------------
  // 인증하기 페이지 조회
  getConfirm: (challengeId) =>
    instance.get(`/api/proofshot/${challengeId}/auth`),
  // 인증업로드
  confirm: (challengeId, imgUrl, challengeTitle, comment) =>
    instance.post(`/api/proofshot/${challengeId}/proof`, {
      imgUrl,
      challengeTitle,
      comment,
    }),

  // 챌린지 전체 보기 -------------------------------------------------------------------------------------------------------
  // 하단네비 > 인증(내 챌린지보기)
  naviChallenge: () => instance.get("/api/mypage/challenge"),
  // 마이페이지 > 인증(내 기록보기)
  myChallenge: () => instance.get("/api/mypage/proofShot"),
  // 나의 기록보기 상세 조회 (피드/스토리 형식)
  oneFeed: (proofShotId) =>
    instance.get(`/api/mypage/proofShot/${proofShotId}`),
  // 나의 기록보기 수정
  changeFeed: (proofShotId, comment) =>
    instance.patch(`/api/proofshot/${proofShotId}`, { comment }),

  //내 챌린지 보기 > 필터
  challengeFilter: (status) =>
    instance.get(`/api/mypage/mychallenge/${status}`),

  // 마이페이지 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //마이페이지-캐릭터정보조회
  mypageCharacter: () => instance.get("/api/mypage/character"),
  //마이페이지 - 캐릭터 정보 조회
  mypageUserInfo: () => instance.get("/api/mypage/userinfo"),

  //캐릭터 샵 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //캐릭터샵-아이템목록받기
  getItemList: () => instance.get("/api/character"),

  //아이템 목록 받기
  GetItemList: () => instance.get("/api/character"),
  //아이템 구매 및 저장하기
  PurchaseItem: (totalPrice, items) =>
    instance.post(`/api/character`, { totalPrice, items }),

  // 랭킹정보 불러오기 --------------------------------------------------------------------
  GetRanking: (length) =>
    instance.get(`/api/users/callUserRanking?length=${length}`),
};

export default instance;

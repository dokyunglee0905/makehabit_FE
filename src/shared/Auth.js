//Auth.js

//카카오 로그인
const CLIENT_ID = "15e5e13769ba7b73152744d46e3514b7";
//REDIRECT_URI 주소 백엔드랑 주소일치시키기
const REDIRECT_URI = "http://localhost:3000/api/users/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
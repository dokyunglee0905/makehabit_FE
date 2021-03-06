import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

const SET_CHALLENGE = "SET_CHALLENGE";
const SET_TAB = "SET_TAB";
const SET_FEED = "SET_FEED";
const SET_CONFIRM = "SET_CONFIRM";
const SET_PROOF = "SET_PROOF";
const SET_COMPLETE = "SET_COMPLETE";

const setChallenge = createAction(SET_CHALLENGE, (challenge_list) => ({
  challenge_list,
}));
const setProofshots = createAction(SET_PROOF, (proof_list) => ({ proof_list }));
const setTab = createAction(SET_TAB, (page) => ({ page }));
const setFeed = createAction(SET_FEED, (feed) => ({ feed }));
const setConfirm = createAction(SET_CONFIRM, (challenge_info) => ({
  challenge_info,
}));
const setComplete = createAction(SET_COMPLETE, (confirm_info) => ({
  confirm_info,
}));

const initialState = {
  challenge_info: null,
  page: null,
  challenge_list: null,
  proof_list: null,
  feed: null,
  totalCnt: null,
  point: null,
  isUpload: false,
};

const getConfirmDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getConfirm(challengeId)
      .then(function (res) {
        dispatch(setConfirm(res.data));
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

const confirmDB = (challengeId, imgForm, challengeTitle, comment) => {
  return function (dispatch, getState, { history }) {
    apis
      .imageUpload(imgForm)
      .then(function (res) {
        apis
          .confirm(challengeId, res.data.imgUrl, challengeTitle, comment)
          .then(function (res) {
            dispatch(setComplete(res.data));
            history.push("/completed/confirm");
          })
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const naviChallengeDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .naviChallenge()
      .then(function (res) {
        dispatch(setChallenge(res.data.challenges));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const myChallengeDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .myChallenge()
      .then(function (res) {
        dispatch(setProofshots(res.data.proofShots));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const myfeedDB = (proofShotId) => {
  return function (dispatch, getState, { history }) {
    apis
      .oneFeed(proofShotId)
      .then(function (res) {
        dispatch(setFeed(res.data.proofShot));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const changeCommentDB = (proofshotId, comment) => {
  return function (dispatch, getState, { history }) {
    apis
      .changeFeed(proofshotId, comment)
      .then(function (res) {
        dispatch(myfeedDB(proofshotId));
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

export default handleActions(
  {
    [SET_CONFIRM]: (state, action) =>
      produce(state, (draft) => {
        draft.challenge_info = action.payload.challenge_info;
      }),
    [SET_TAB]: (state, action) =>
      produce(state, (draft) => {
        draft.page = action.payload.page;
      }),

    [SET_CHALLENGE]: (state, action) =>
      produce(state, (draft) => {
        draft.challenge_list = action.payload.challenge_list;
      }),
    [SET_PROOF]: (state, action) =>
      produce(state, (draft) => {
        draft.proof_list = action.payload.proof_list.reverse();
      }),
    [SET_FEED]: (state, action) =>
      produce(state, (draft) => {
        draft.feed = action.payload.feed;
      }),
    [SET_COMPLETE]: (state, action) =>
      produce(state, (draft) => {
        draft.isUpload = true;
        draft.totalCnt = action.payload.confirm_info.totalCnt;
        draft.point = action.payload.confirm_info.point;
      }),
  },
  initialState
);

const actionCreators = {
  setConfirm,
  getConfirmDB,
  confirmDB,
  setTab,
  setChallenge,
  naviChallengeDB,
  setProofshots,
  myChallengeDB,
  setFeed,
  myfeedDB,
  setComplete,
  changeCommentDB,
};

export { actionCreators };

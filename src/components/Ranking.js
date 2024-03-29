import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";

const Ranking = (props) => {
  const Item = process.env.PUBLIC_URL + "/items/large";
  const { equippedItems, nickname, proofCnt, rank } = props;

  function getParametersForUnsplash({ width, height, quality, format }) {
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
  }

  return (
    <RankingList>
      <div>
        {rank === 1 ? (
          <Medal src="images/icon_1st.png" alt="Icon_1st" />
        ) : rank === 2 ? (
          <Medal src="images/icon_2st.png" alt="Icon_2st" />
        ) : rank === 3 ? (
          <Medal src="images/icon_3st.png" alt="Icon_3st" />
        ) : (
          <RankNum>{rank}</RankNum>
        )}

        <Profile>
          <ItemImg
            src={
              Item +
              equippedItems[0]?.itemImgUrl +
              getParametersForUnsplash({
                width: 100,
                height: 100,
                quality: 80,
                format: "webp",
              })
            }
          />
          <ItemImg
            src={
              Item +
              equippedItems[1]?.itemImgUrl +
              getParametersForUnsplash({
                width: 100,
                height: 100,
                quality: 80,
                format: "png",
              })
            }
          />
          <ItemImg
            src={
              Item +
              equippedItems[2]?.itemImgUrl +
              getParametersForUnsplash({
                width: 100,
                height: 100,
                quality: 80,
                format: "webp",
              })
            }
          />
          <ItemImg
            src={
              Item +
              equippedItems[3]?.itemImgUrl +
              getParametersForUnsplash({
                width: 100,
                height: 100,
                quality: 80,
                format: "webp",
              })
            }
          />
          <ItemImg
            src={
              Item +
              equippedItems[4]?.itemImgUrl +
              getParametersForUnsplash({
                width: 50,
                height: 50,
                quality: 80,
                format: "webp",
              })
            }
          />
        </Profile>
        <Text
          margin="0 0 0 18px"
          color="#1D1B1B"
          size="18px"
          width="130px"
          bold
        >
          {nickname}
        </Text>
        <Text
          padding="0px 20px 0px 0px "
          margin="0px"
          alignRight
          color="#FF8B37"
          size="18px"
          bold
          width=""
        >
          {proofCnt}번
        </Text>
      </div>
    </RankingList>
  );
};

const MedalRank = styled.img`
  weight: 3.81vh;
  height: 3.31vh;
  margin-left: 20px;
`;

const RankingList = styled.div`
  width: 100%;
  height: 8.76vh;
  background-color: #ffff;
  /* display: grid; */
  align-content: center;
  justify-content: space-between;
  border-bottom: 2px #f7f7f7 solid;

  & > div {
    width: 100%;
    max-width: 420px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    height: 100%;
    display: grid;
    align-content: center;
    justify-content: space-between;
    grid-template-columns: 17.4% 12.8% 1fr 17.4%;
    // position: absolute;
    align-items: center;
  }
`;
const RankNum = styled.p`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #707070;
`;

const Medal = styled.img`
  width: 40px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: auto;
`;
const Profile = styled.div`
  border-radius: 5px;
  width: 50px;
  height: 50px;
  margin-right: 18px;
  position: relative;
`;

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  /* z-index: 1; */
  border-radius: 10px;
  object-fit: cover;
`;
export default Ranking;

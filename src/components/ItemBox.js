// 아이템 선택창 - 네모박스
import React from "react";
import styled from "styled-components";
import { actionCreators as characterActions } from "../redux/modules/character";

import { useDispatch, useSelector } from "react-redux";
import Horizontable from "./Horizontable";

// import { ReactComponent as LockImg } from "../public/images/icon_lock.svg";

const ItemBox = () => {
  const Icons = process.env.PUBLIC_URL + "/images";

  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.character?.itemList);
  const category = itemList[0].category;
  // console.log("아이템리스트", itemList);
  // console.log("카테고리", category);

  // 현재 장착중인 아이템
  const isEquipAll = useSelector((state) => state.character?.isEquip);
  const isEquip = isEquipAll.find((e) => e.category === category);
  // 미리보기
  const preview = useSelector((state) => state.character);
  console.log("미리보기", preview);
  const previewBg = useSelector((state) => state.character?.backgroundItem);
  const previewClothes = useSelector((state) => state.character?.clothesItem);
  const previewAcc = useSelector((state) => state.character?.accItem);
  // const previewEmotion = useSelector((state) => state.character?.emotionItem);

  const Item = process.env.PUBLIC_URL + "/items/small";
  const [item, setItem] = React.useState(null);

  // 카테고리 바뀔 때마다 아이템 세팅
  React.useEffect(() => {
    if (category === "clothes") {
      if (preview.clothesItem === null) {
        setItem(isEquip?.itemImgUrl);
      } else {
        setItem(previewClothes);
      }
    }
    if (category === "background") {
      if (preview.backgroundItem === null) {
        setItem(isEquip?.itemImgUrl);
      } else {
        setItem(previewBg);
      }
    }
    if (category === "acc") {
      if (preview.accItem === null) {
        setItem(isEquip?.itemImgUrl);
      } else {
        setItem(previewAcc);
      }
    }
    // if (category === "emotion") {
    //   if (preview.emotionItem === null) {
    //     setItem(isEquip?.itemImgUrl);
    //   } else {
    //     setItem(previewEmotion);
    //   }
    // }
  }, [category]);

  // CharacterContainer에 반영하기 위한 작업
  React.useEffect(() => {
    if (category === "background") {
      dispatch(characterActions.backgroundPreview(item));
    } else if (category === "clothes") {
      dispatch(characterActions.clothesPreview(item));
    } else if (category === "acc") {
      dispatch(characterActions.accPreview(item));
    } else if (category === "emotion") {
      dispatch(characterActions.emotionPreview(item));
    }
  }, [item]);

  return (
    <ItemContainer>
      <Horizontable>
        {itemList.map((e, i) => (
          <OneItem key={i}>
            <div>
              {/* 아이템 이미지 박스 */}
              <div
                style={{
                  position: "relative",
                  border:
                    e.itemImgUrl === item
                      ? "5px solid #6825D6"
                      : "5px solid #f7f7f7",
                }}
              >
                <img
                  src={Item + itemList[i].itemImgUrl}
                  onClick={() => {
                    setItem(e.itemImgUrl);
                  }}
                  alt={itemList[i].itemImgUrl}
                ></img>

                {e.isOwned ? (
                  ""
                ) : (
                  <img
                    src={Icons + "/icon_lock.svg"}
                    alt="잠금아이콘"
                    style={{
                      position: "absolute",
                      top: "9px",
                      right: "9px",
                      width: "2.37vh",
                      height: "2.37vh",
                      // color: "gray",
                    }}
                  />
                  // <LockImg />
                )}
              </div>
              <div>{e.itemName}</div>
              <div>{e.price}</div>
            </div>
          </OneItem>
        ))}
      </Horizontable>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  max-width: 420px;
  height: 44.5vh;
  background: #f7f7f7;
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;

  & > div {
    display: inline-block;
  }
`;

const OneItem = styled.div`
  width: 36%;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  margin: 4vh 3%;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & > div > div {
    &:nth-child(1) {
      // 자물쇠 아이콘 대비 - relative
      position: relative;
      width: 100%;
      height: 19vh;
      background: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:nth-child(2) {
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.5rem;
      color: #707070;
      margin-top: 0.625rem;
    }

    &:nth-child(3) {
      font-size: 1.25rem;
      font-weight: 700;
      margin-top: 0.625rem;
    }
  }

  img {
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
  }
`;
export default ItemBox;

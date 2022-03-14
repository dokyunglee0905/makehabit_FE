import React from "react";

import { history } from "../redux/configureStore";
import styled from "styled-components";

import { IoIosArrowBack } from "react-icons/io";

const PageBack = (props) => {
  const { color, padding } = props;
  const styles = { color, padding };

  return (
    <Back
      {...styles}
      onClick={() => {
        history.goBack();
      }}
    >
      <IoIosArrowBack
        style={{
          width: "30",
          height: "30",
          size: "10px",
        }}
      />
    </Back>
  );
};

PageBack.defaultProps = {
  color: "#FF8B37",
  padding: null,
  // padding: "1.912em 5%",
};

const Back = styled.div`
  cursor: pointer;
  z-index: 10;
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  position: absolute;
`;

export default PageBack;
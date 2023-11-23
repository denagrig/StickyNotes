import styled from "styled-components"

export const Buttons = styled.div`
  z-index: 2;
`

export const LeftButtons = styled.button`
  padding: 10px;
  background: ${(props) => (props.color === "grey" ? "#ededed" : "#add8e6")};
  color: black;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  box-shadow: 0px 0px 5px #c1c1c1;
  border: 1px solid black;
  margin-right: 20px;
  @media (max-width: 480px) {
    font-size: 20px;
    display: flex;
    width: 220px;
    text-align: center;
  }
  @media (min-width: 481px) and (max-width: 1024px) {
    font-size: 20px;
    width: 220px;
    margin-right: 72px;
    text-align: center;
  }
`
export const ClearButton = styled.button`
  float: right;
  padding: 10px;
  background: #ededed;
  color: black;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  box-shadow: 0px 0px 5px #c1c1c1;
  border: 1px solid black;
  @media (max-width: 480px) {
    font-size: 20px;
    float: left;
    width: 220px;
    text-align: center;
  }
  @media (min-width: 481px) and (max-width: 1024px) {
    font-size: 20px;
    width: 220px;
    text-align: center;
  }
`

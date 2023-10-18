import styled from "styled-components"

export const Buttons = styled.div`
  z-index: 2;
`

export const LeftButtons = styled.button`
  padding: 10px;
  background: #ededed;
  color: black;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  position: relative;
  box-shadow: 0px 0px 5px #c1c1c1;
  border: 1px solid black;
  margin-right: 20px;
  @media (max-width: 1200px) {
    font-size: 35px;
  }
`

export const ClearButton = styled.button`
  float: right;
  padding: 10px;
  background: #ededed;
  color: black;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  position: relative;
  box-shadow: 0px 0px 5px #c1c1c1;
  border: 1px solid black;
`

import styled from "styled-components"

export const Container = styled.div`
  width: 300px;
  border: none;
  position: absolute;
  top: 30px;
  left: 50px;
`

export const Header = styled.div`
  background: lightgreen;
  border-bottom: 3px solid #333;
  height: 15px;
  color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  cursor: move;
`
export const TextArea = styled.textarea`
  width: 280px;
  padding: 10px;
  line-height: 1.5;
  background: lightgreen;
  outline: none;
  height: 250px;
  resize: none;
  border: none;
`

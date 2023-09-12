import styled from "styled-components"

export const Container = styled.div`
  width: 300px;
  border: 2px solid #333;
  position: absolute;
  top: 30px;
  left: 50px;
  background: lightgreen;
  display: inline-block;
`

export const MovableHeader = styled.div`
  border-bottom: 2px solid #333;
  height: 15px;
  color: black;
  padding: 10px;
  width: 95%;
  cursor: grab;
`
export const TextArea = styled.textarea`
  width: 280px;
  padding: 10px;
  line-height: 1.5;
  outline: none;
  height: 250px;
  resize: none;
  border: none;
  background: lightgreen;
  owerflow: auto;
`

export const DeleteButton = styled.div`
  border-bottom: 3px solid #333;
  border-left: 2px solid #333;
  height: 15px;
  color: black;
  padding: 10px;
  width: 5%;
  display : flex;
  align-items : center;
  font-size:30px;
  cursor: pointer;
` 


export const Header = styled.div`
  display: flex;
` 
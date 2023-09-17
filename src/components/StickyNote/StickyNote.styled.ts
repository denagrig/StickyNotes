import styled from "styled-components"

export const Container = styled.div<{ $top?: string; $left?: string; $height?: string; $width?: string; }>`
  width: ${(props) => props.$width || "300px"};
  height: ${(props) => props.$height || "300px"};
  border: 3px solid #333;
  position: absolute;
  top: ${(props) => props.$top || "10px"};
  left: ${(props) => props.$left ||"10px"};
  background: lightgreen;
  display: inline-block;
  border-radius: 10px;
`

export const MovableHeader = styled.div`
  border-bottom: 2px solid #333;
  height: 15px;
  color: black;
  padding: 0 0 10px 0;
  width: 100%;
  cursor: grab;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 80%; 
  box-sizing: border-box;
  padding: 10px 0 10px 0;
  line-height: 1.5;
  outline: none;
  resize: none;
  border: none;
  background: lightgreen;
  owerflow: auto;
`

export const DeleteButton = styled.div`
  border-bottom: 2px solid #333;
  border-left: 2px solid #333;
  height: 15px;
  color: black;
  padding: 0 0 10px 0;
  width: 30px;
  text-align: top;
  vertical-align: top;
  align-items: centre;
  line-height: 15px; 
  font-size: 30px;
  cursor: pointer;
`

export const Header = styled.div`
  display: flex;
`

export const Resize = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: inherit;
  border: 2px solid #333;
  position: absolute;
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
`

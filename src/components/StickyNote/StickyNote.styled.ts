import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

export const Container = styled.div<{ $top?: string; $left?: string; $height?: string; $width?: string; $color?: string }>`
  width: ${(props) => props.$width || "300px"};
  height: ${(props) => props.$height || "300px"};
  border: 3px solid #333;
  position: absolute;
  top: ${(props) => props.$top || "30px"};
  left: ${(props) => props.$left ||"30px"};
  background:  ${(props) => props.$color || "lightgreen"};;
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
  padding: 5px 10px 5px 10px;
  line-height: 1.5;
  outline: none;
  resize: none;
  border: none;
  background: inherit;
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

export const ChangeColorContainer = styled.div`
  border-bottom: 2px solid #333;
  border-right: 2px solid #333;
  height: 15px;
  color: black;
  padding: 0 0 10px 0;
  width: 30px;
  line-height: 15px; 
  font-size: 30px;
`

export const ChangeColorInput = styled.input`
  width: 24px;
  position: relative;
  opacity: 0;
  cursor: pointer;
`

export const BrushIcon = styled(FontAwesomeIcon)`
  color: black;
  font-size: 1.2rem;
  position: absolute;
  top: 3px;
  left: 5px;
  pointer-events: none;
`

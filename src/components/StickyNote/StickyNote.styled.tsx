import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

export const Container = styled.div<{
  $top?: string;
  $left?: string;
  $height?: string;
  $width?: string;
  $color?: string;
}>`
  width: ${(props) => props.$width || "300px"};
  height: ${(props) => props.$height || "300px"};
  border: 3px solid #333;
  position: absolute;
  top: ${(props) => props.$top || "30px"};
  left: ${(props) => props.$left || "30px"};
  background: ${(props) => props.$color || "lightgreen"};
  border-radius: 10px;
`

export const MovableHeader = styled.div`
  border-bottom: 2px solid #333;
  height: 15px;
  padding: 0 0 10px 0;
  flex: 1;
  cursor: grab;
  @media (max-width: 1024px) {
    height: 35px;
  }
`

export const TextAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;
`

export const TextArea = styled.textarea<{ $fontSize?: number;}>`
  width: 100%;
  height: calc(100% - 35px);
  box-sizing: border-box;
  line-height: 1.5;
  outline: none;
  resize: none;
  border: none;
  background: inherit;
  overflow: ${(props) => props.$fontSize == 16 ? "auto" : "hidden"};
  font-size: ${(props) => props.$fontSize + "px" || "24px"};
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c2c2c2;
  }
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
  @media (max-width: 1024px) {
    height: 35px;
  }
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
  @media (max-width: 1024px) {
    height: 20px;
    width: 20px;
    right: -12px;
    bottom: -12px;
  }
`

export const ChangeColorContainer = styled.div`
  border-bottom: 2px solid #333;
  border-right: 2px solid #333;
  height: 15px;
  padding: 0 0 10px 0;
  width: 30px;
  line-height: 15px;
  @media (max-width: 1024px) {
    height: 35px;
  }
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
  @media (max-width: 1024px) {
    top: 8px;
    left: 0px;
    font-size: 1.5rem;
  }
`

export const DeleteIcon = styled(FontAwesomeIcon)`
  color: black;
  position: relative;
  left: 1px;
  @media (max-width: 1024px) {
    top: 8px;
    left: 2px;
    font-size: 2rem;
  }
`

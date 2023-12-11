import styled from "styled-components"
import { Mode } from "src/data"

export const BackgroundImg = styled.div<{
  $mode?: Mode;
}>`
  background-color: lightgray;
  position: absolute;
  cursor: ${(props) => {
    const mode = props.$mode
    if (mode == Mode.Move) {
      return "grab"
    } else if (mode == Mode.Add) {
      return "copy"
    } else {
      return "grabbing"
    }
  }};
  width: 10000px;
  height: 10000px;
`
export const MainPageContainer = styled.div``

export const SpaceContainer = styled.div``

export const NoPanContainer = styled.div``

import styled from "styled-components"
import background from "src/assets/background.jpg"
import { Mode } from "src/data"


export const BackgroundImg = styled.div<{
  $mode?: Mode;
}>`
  background-image: url(${background});
  background-repeat:repeat;
  position: absolute;
  cursor: ${(props) => props.$mode === Mode.Move ? "grab" : "copy"};
  width: 10000px;
  height: 10000px;
`
export const MainPageContainer = styled.div`
`

export const SpaceContainer = styled.div`
`

export const NoPanContainer = styled.div`
`
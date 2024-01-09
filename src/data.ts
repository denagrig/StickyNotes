import { NoteData, VpData } from "./types"

export const enum SpaceStatus {
  Ready = 0,
  ViewPortCreated = -1,
  SpaceCreated = -2,
}
export const enum Mode {
  Move = 0,
  Add = 1,
  Grabbing = 2,
}

export const noteMinSize = {
  height: 200,
  width: 150,
}

export const minFontSize = 16
export const maxFontSize = 24

export const colors = [
  "lightgreen",
  "lightblue",
  "lightyellow",
  "aquamarine",
  "ivory",
  "lightskyblue",
  "mediumpurple",
  "wheat",
  "peru",
  "mintcream",
  "darkcyan",
]

export const testNotes: NoteData[] = [
  {
    id: 1,
    xCord: "0px",
    yCord: "0px",
    height: "300px",
    width: "300px",
    text: "Test",
    fontSize: 24,
    color: "green",
  },
]

export const testVpData: VpData = {
  xCord: 1,
  yCord: 1,
  zoomFactor: 1,
}

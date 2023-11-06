import { NoteData } from "src/types"
export const enum SpaceStatus { Ready = 0, ViewPortCreated = -1, SpaceCreated = -2}
export const enum Mode { Move = 0, Add = 1}

export const noteMinSize = {
  height: 200,
  width: 150
}

export const notesData : NoteData[] = [
  {
    id: 0,
    xCord: "100px",
    yCord: "100px",
    text: "hello",
    height: "300px",
    width: "300px",
    color: "lightgreen"
  },
]
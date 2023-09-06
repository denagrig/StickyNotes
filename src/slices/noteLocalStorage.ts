import { NoteData } from "src/types"

export const saveNote = async (NoteData: NoteData) => {
  return new Promise<NoteData[]>((resolve) => {
    const notesArray: NoteData[] = JSON.parse(
      localStorage.getItem("notesArray") || "[]"
    )
    const id = NoteData.id
    notesArray[id] = NoteData
    localStorage.setItem("notesArray", JSON.stringify(notesArray))
    resolve(notesArray)
    return notesArray
  })
}

export const loadNotes = async () => {
  return new Promise<NoteData[]>((resolve) => {
    const notesArray: NoteData[] = JSON.parse(
      localStorage.getItem("notesArray") || "[]"
    )
    resolve(notesArray)
    return notesArray
  })
}

export const pushNote = async () => {
  return new Promise<NoteData[]>((resolve) => {
    const notesArray: NoteData[] = JSON.parse(
      localStorage.getItem("notesArray") || "[]"
    )
    console.log("here")
    const newNote: NoteData = {
      id: notesArray.length,
      xCord: "10px",
      yCord: "10px",
      text: ""
    }
    console.log("and here")
    notesArray.push(newNote)
    console.log(notesArray.length)
    localStorage.setItem("notesArray", JSON.stringify(notesArray))
    resolve(notesArray)
    return notesArray
  })
}
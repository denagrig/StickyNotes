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
    //timeout
    const notesArray: NoteData[] = JSON.parse(
      localStorage.getItem("notesArray") || "[]"
    )
    const newNote: NoteData = {
      id: notesArray.length,
      xCord: "5px",
      yCord: "5px",
      text: ""
    }
    notesArray.push(newNote)
    localStorage.setItem("notesArray", JSON.stringify(notesArray))
    resolve(notesArray)
    return notesArray
  })
}

export const popNote = async (id: number) => {
  return new Promise<NoteData[]>((resolve) => {
    let notePos = 0
    let splicePos = 0
    const notesArray: NoteData[] = JSON.parse(
      localStorage.getItem("notesArray") || "[]"
    )
    notesArray.map(note => {
      if(note.id == id) {
        splicePos = notePos
      }
      else if(note.id > id)
        notesArray[notePos].id--
      notePos++
    })
    notesArray.splice(splicePos, 1)
    localStorage.setItem("notesArray", JSON.stringify(notesArray))
    resolve(notesArray)
    return notesArray
  })
}
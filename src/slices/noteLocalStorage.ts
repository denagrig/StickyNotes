import { NoteData } from "src/types"

export const saveNote = async (NoteData: NoteData) => {
  return new Promise<NoteData[]>((resolve) => {
    const notesRecord: NoteData[] = JSON.parse(
      localStorage.getItem("notesRecord") || "[]"
    )
    const id = NoteData.id
    let notePlace = 0
    let curNote = 0
    notesRecord.map((note) => {
      if (note.id == id) {
        notePlace = curNote
      }
      curNote++
    })
    notesRecord[notePlace] = NoteData
    localStorage.setItem("notesRecord", JSON.stringify(notesRecord))
    resolve(notesRecord)
    return notesRecord
  })
}

export const loadNotes = async () => {
  return new Promise<NoteData[]>((resolve) => {
    const notesRecord: NoteData[] = JSON.parse(
      localStorage.getItem("notesRecord") || "[]"
    )
    resolve(notesRecord)
    return notesRecord
  })
}

export const pushNote = async () => {
  return new Promise<NoteData[]>((resolve) => {
    const notesRecord: NoteData[] = JSON.parse(
      localStorage.getItem("notesRecord") || "[]"
    )
    let notesId: number = JSON.parse(
      localStorage.getItem("notesID") || "0"
    )
    const newNote: NoteData = {
      id: notesId,
      xCord: "10px",
      yCord: "50px",
      height: "300px",
      width: "300px",
      text: "",
      color: "lightgreen",
    }
    notesRecord.push(newNote)
    notesId++
    localStorage.setItem("notesRecord", JSON.stringify(notesRecord))
    localStorage.setItem("notesID", JSON.stringify(notesId))
    resolve(notesRecord)
    return notesRecord
  })
}

export const popNote = async (id: number) => {
  return new Promise<NoteData[]>((resolve) => {
    let notePos = 0
    let splicePos = 0
    const notesRecord: NoteData[] = JSON.parse(
      localStorage.getItem("notesRecord") || "[]"
    )
    notesRecord.map((note) => {
      if (note.id == id) {
        splicePos = notePos
      }
      notePos++
    })
    notesRecord.splice(splicePos, 1)
    localStorage.setItem("notesRecord", JSON.stringify(notesRecord))
    resolve(notesRecord)
    return notesRecord
  })
}

export const clearAllNotes = async () => {
  return new Promise<NoteData[]>((resolve) => {
    const notesRecord: NoteData[] = []
    localStorage.setItem("notesRecord", JSON.stringify(notesRecord))
    resolve(notesRecord)
    return notesRecord
  })
}

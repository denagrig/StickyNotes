import { colors } from "src/data"
import { CordsPair, NoteData } from "src/types"

export const saveNote = async (noteData: NoteData) => {
  return new Promise<NoteData[]>((resolve) => {
    const notesRecord: NoteData[] = JSON.parse(
      localStorage.getItem("notesRecord") || "[]"
    )
    const id = noteData.id
    let notePlace = 0
    let curNote = 0
    notesRecord.map((note) => {
      if (note.id == id) {
        notePlace = curNote
      }
      curNote++
    })
    notesRecord[notePlace] = noteData
    console.log("saved notes")
    localStorage.setItem("notesRecord", JSON.stringify(notesRecord))
    resolve(notesRecord)
  })
}

export const loadNotes = async () => {
  return new Promise<NoteData[]>((resolve) => {
    const notesRecord: NoteData[] = JSON.parse(
      localStorage.getItem("notesRecord") || "[]"
    )
    console.log("loaded notes")
    resolve(notesRecord)
  })
}

export const pushNote = async (cords: CordsPair) => {
  return new Promise<NoteData[]>((resolve) => {
    const notesRecord: NoteData[] = JSON.parse(
      localStorage.getItem("notesRecord") || "[]"
    )
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    let notesId: number = JSON.parse(localStorage.getItem("notesID") || "0")
    const newNote: NoteData = {
      id: notesId,
      xCord: cords.xCord + "px",
      yCord: cords.yCord + "px",
      height: "300px",
      width: "300px",
      text: "",
      fontSize: 24,
      color: randomColor,
    }
    console.log("note pushed")
    notesRecord.push(newNote)
    notesId++
    localStorage.setItem("notesRecord", JSON.stringify(notesRecord))
    localStorage.setItem("notesID", JSON.stringify(notesId))
    resolve(notesRecord)
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
  })
}

export const clearAllNotes = async () => {
  return new Promise<NoteData[]>((resolve) => {
    localStorage.removeItem("notesRecord")
    console.log("note cleared")
    resolve([])
  })
}

export const moveToTop = async (id: number) => {
  return new Promise<NoteData[]>((resolve) => {
    let curPos = 0
    let notePos = 0
    const notesRecord: NoteData[] = JSON.parse(
      localStorage.getItem("notesRecord") || "[]"
    )
    let noteData: NoteData = notesRecord[0]
    notesRecord.map((note) => {
      if (note.id == id) {
        noteData = notesRecord[curPos]
        notePos = curPos
      }
      curPos++
    })
    curPos = 0
    notesRecord.map((note) => {
      if (curPos > notePos) {
        notesRecord[curPos - 1] = note
      }
      curPos++
    })
    notesRecord[notesRecord.length - 1] = noteData
    localStorage.setItem("notesRecord", JSON.stringify(notesRecord))
    resolve(notesRecord)
  })
}

import { testNote1, testNotes } from "src/data"
import reducer, { addNote, deleteNote, loadNoteData, setNoteData } from "src/slices/noteSlice"

describe("Note slice test", () => {
  describe("reducers", () => {
    const initialState = { Notes: [] }

    it("save notes record to state", () => {
      const action = { type: setNoteData.fulfilled.type, payload: testNotes}
      const state = reducer(initialState, action)
      expect(state).toEqual({ Notes: testNotes })
    })
    it("add new note", () => {
      const action = { type: addNote.fulfilled.type, payload: testNote1}
      const state = reducer(initialState, action)
      expect(state).toEqual({ Notes: testNote1})
    })
    it("load notes", () => {
      const action = { type: loadNoteData.fulfilled.type, payload: testNote1}
      const state = reducer(initialState, action)
      expect(state).toEqual({ Notes: testNote1})
    })
    it("delete note", () => {
     
      const action = {type: deleteNote.fulfilled.type, payload: testNote1}
      const state = reducer(initialState, action)
      expect(state).toEqual({ Notes: testNote1})
    })

  })
})
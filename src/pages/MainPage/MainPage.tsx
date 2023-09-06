
import StickyNote from "src/components/StickyNote/StickyNote"
import { useAppSelector } from "src/hooks"
import { NoteData } from "src/types"
import { AddButton } from "src/pages/MainPage/MainPage.styled."
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/store"
import { addNote } from "src/slices/noteSlice"

const MainPage = () => {
  const notesData: NoteData[] = useAppSelector((state) => state.note.Notes)
  const dispatch = useDispatch<AppDispatch>()

  const handleAddNote = () => {
    dispatch(addNote())
  }

  return(
    <div>
      {notesData.map((note : NoteData) => (
        <StickyNote note={note} key = {note.id}/>
      ))}
      <AddButton onClick={handleAddNote}>
        Добавить Заметку +
      </AddButton>
    </div>
  )
}

export default MainPage

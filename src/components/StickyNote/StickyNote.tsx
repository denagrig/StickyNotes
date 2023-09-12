import { useRef } from "react"
import { TextArea, Header, Container, DeleteButton, MovableHeader } from "src/components/StickyNote/StickyNote.styled"
import { deleteNote, setNoteData } from "src/slices/noteSlice"
import { AppDispatch } from "src/store"
import { useDispatch } from "react-redux"
import { NoteData } from "src/types"

const StickyNote = ({note} : {note : NoteData}) => {
  const noteRef = useRef<HTMLHeadingElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  const handleMouseDown = (event : React.MouseEvent) => {
    const shiftX = event.clientX - noteRef.current!.getBoundingClientRect().left
    const shiftY = event.clientY - noteRef.current!.getBoundingClientRect().top

    const moveAt = (pageX:number, pageY:number) => {
        noteRef.current!.style.left = pageX - shiftX + "px"
        noteRef.current!.style.top = pageY - shiftY + "px"
    }

    moveAt(event.pageX, event.pageY)

    const onMouseMove = (event : MouseEvent) => {
      moveAt(event.pageX, event.pageY)
    }
    
    document.addEventListener("mousemove", onMouseMove)

    noteRef.current!.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove)
      const newNote: NoteData = {
        id: note.id,
        xCord: noteRef.current!.style.left,
        yCord: noteRef.current!.style.top,
        text: note.text
      }
      dispatch(setNoteData(newNote))
    }
  }

  const handleChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote: NoteData = {
      id: note.id,
      xCord: noteRef.current!.style.left,
      yCord: noteRef.current!.style.top,
      text: event.target.value
    }
    dispatch(setNoteData(newNote))
  }

  const handleDelete = () => {
    dispatch(deleteNote(note.id))
  }

  return (
    <Container ref = {noteRef} style={{
      left: note.xCord,
      top: note.yCord}}>
      <Header>
        <MovableHeader
          onMouseDown={handleMouseDown}
        />
        <DeleteButton onClick={handleDelete}>x</DeleteButton>
      </Header>
      <TextArea defaultValue = {note.text} onChange={handleChange} />
    </Container>
  )
}
  
export default StickyNote
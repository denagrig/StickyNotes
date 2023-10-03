import { useRef } from "react"
import {
  TextArea,
  Header,
  Container,
  DeleteButton,
  MovableHeader,
  Resize,
  ChangeColorContainer,
  ChangeColorInput,
  BrushIcon,
} from "src/components/StickyNote/StickyNote.styled"
import { deleteNote, setNoteData } from "src/slices/noteSlice"
import { AppDispatch } from "src/store"
import { useDispatch } from "react-redux"
import { NoteData } from "src/types"
import { noteMinSize } from "src/data"
import { faMinus, faPaintBrush } from "@fortawesome/free-solid-svg-icons"
import "@melloware/coloris/dist/coloris.css"
import Coloris from "@melloware/coloris"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { SpaceContext } from "react-zoomable-ui"

const StickyNote = ({ note }: { note: NoteData }) => {
  const noteRef = useRef<HTMLHeadingElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const context = React.useContext(SpaceContext)

  Coloris.init()
  Coloris.coloris({
    el: "#coloris",
    swatchesOnly: true,
    swatches: [
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
    ],
  })

  const newNote: NoteData = {
    id: note.id,
    xCord: note.xCord,
    yCord: note.yCord,
    height: note.height,
    width: note.width,
    text: note.text,
    color: note.color,
  }

  const handleMovement = (event: React.MouseEvent) => {
    const vp = context.viewPort

    const shiftX = event.clientX - noteRef.current!.getBoundingClientRect().left - vp.left
    const shiftY = event.clientY - noteRef.current!.getBoundingClientRect().top - vp.top

    const moveAt = (pageX: number, pageY: number) => {
      noteRef.current!.style.left = pageX - shiftX + "px"
      noteRef.current!.style.top = pageY - shiftY + "px"
      //add vp.zoomFactor 
    }

    moveAt(event.pageX, event.pageY)

    const onMouseMove = (event: MouseEvent) => {
      moveAt(event.pageX, event.pageY)
    }

    document.addEventListener("mousemove", onMouseMove)

    noteRef.current!.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove)
      newNote.xCord = noteRef.current!.style.left
      newNote.yCord = noteRef.current!.style.top
      dispatch(setNoteData(newNote))
    }
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    newNote.text = event.target.value
    dispatch(setNoteData(newNote))
  }

  const handleDelete = () => {
    dispatch(deleteNote(note.id))
  }

  const handleResize = (event: React.MouseEvent) => {
    const width = noteRef.current!.getBoundingClientRect().left
    const height = noteRef.current!.getBoundingClientRect().top
    const resize = (pageX: number, pageY: number) => {
      if (pageX - width > noteMinSize.width)
        noteRef.current!.style.width = pageX - width + "px"
      if (pageY - height > noteMinSize.height)
        noteRef.current!.style.height = pageY - height + "px"
    }

    resize(event.pageX, event.pageY)
    

    const onMouseMove = (event: MouseEvent) => {
      resize(event.pageX, event.pageY)
    }

    document.addEventListener("mousemove", onMouseMove)

    noteRef.current!.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove)
      newNote.height = noteRef.current!.style.height
      newNote.width = noteRef.current!.style.width
      dispatch(setNoteData(newNote))
    }
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    newNote.color = event.target.value,
    dispatch(setNoteData(newNote))
  }

  return (
    <Container
      ref={noteRef}
      $left={note.xCord}
      $top={note.yCord}
      $height={note.height}
      $width={note.width}
      $color={note.color}
    >
      <Header>
        <ChangeColorContainer>
          <ChangeColorInput
            type="text"
            data-coloris
            onInput={handleColorChange}
          />
          <BrushIcon icon={faPaintBrush} />
        </ChangeColorContainer>
        <MovableHeader onMouseDown={handleMovement} />
        <DeleteButton onClick={handleDelete}>
          <FontAwesomeIcon icon={faMinus} />
        </DeleteButton>
      </Header>
      <TextArea defaultValue={note.text} onChange={handleTextChange} />
      <Resize onMouseDown={handleResize} />
    </Container>
  )
}

export default StickyNote

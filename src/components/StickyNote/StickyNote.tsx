import { useCallback, useRef, useState } from "react"
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
import { NoteData, VpData } from "src/types"
import { noteMinSize } from "src/data"
import { faMinus, faPaintBrush } from "@fortawesome/free-solid-svg-icons"
import "@melloware/coloris/dist/coloris.css"
import Coloris from "@melloware/coloris"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { SpaceContext } from "react-zoomable-ui"

const StickyNote = ({ note, spaceData}: { note: NoteData,  spaceData: VpData}) => {
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

  const [noteChanges, setNoteChanges] = useState<NoteData>({
    id: note.id,
    xCord: note.xCord,
    yCord: note.yCord,
    height: note.height,
    width: note.width,
    text: note.text,
    color: note.color,
  })

  const handleMovement = useCallback(
    (event: React.MouseEvent) => {
      const vp = context.viewPort

      const shiftX =
        event.clientX - noteRef.current!.getBoundingClientRect().left - vp.left
      const shiftY =
        event.clientY - noteRef.current!.getBoundingClientRect().top - vp.top
      console.log("Context x cord:", vp.left, "real x cord", spaceData.xCord)
      console.log("Context y cord:", vp.top, "real y cord", spaceData.yCord)
      console.log("Context zoom:", vp.zoomFactor, "real zoom", spaceData.zoomFactor)
      //real cords are updating only after rerender, same with zoom

      const moveAt = (pageX: number, pageY: number) => {
        noteRef.current!.style.left = (pageX - shiftX) / vp.zoomFactor + "px"
        noteRef.current!.style.top = (pageY - shiftY) / vp.zoomFactor + "px"
        //add vp.zoomFactor for zoom <1

      }

      moveAt(event.pageX, event.pageY)

      const onMouseMove = (event: MouseEvent) => {
        moveAt(event.pageX, event.pageY)
      }

      document.addEventListener("mousemove", onMouseMove)

      noteRef.current!.onmouseup = () => {
        document.removeEventListener("mousemove", onMouseMove)
        const newNote = Object.assign({}, noteChanges)
        newNote.xCord = noteRef.current!.style.left
        newNote.yCord = noteRef.current!.style.top
        setNoteChanges(newNote)
        dispatch(setNoteData(newNote))
      }
    },
    [noteChanges]
  )

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newNote = Object.assign({}, noteChanges)
      newNote.text = event.target.value
      setNoteChanges(newNote)
      dispatch(setNoteData(newNote))
    },
    [noteChanges]
  )

  const handleMovementTouch = useCallback(
    (event: React.TouchEvent) => {
      const vp = context.viewPort

      const shiftX =
        event.touches[0].clientX - noteRef.current!.getBoundingClientRect().left - vp.left
      const shiftY =
        event.touches[0].clientY - noteRef.current!.getBoundingClientRect().top - vp.top

      const moveAt = (pageX: number, pageY: number) => {
        noteRef.current!.style.left = (pageX - shiftX) / vp.zoomFactor + "px"
        noteRef.current!.style.top = (pageY - shiftY) / vp.zoomFactor + "px"
        //add vp.zoomFactor for zoom <1
      }

      moveAt(event.touches[0].pageX, event.touches[0].pageY)

      const onTouchMove = (event: TouchEvent) => {
        moveAt(event.touches[0].pageX, event.touches[0].pageY)
      }

      document.addEventListener("touchmove", onTouchMove)

      noteRef.current!.ontouchend = () => {
        document.removeEventListener("touchmove", onTouchMove)
        const newNote = Object.assign({}, noteChanges)
        newNote.xCord = noteRef.current!.style.left
        newNote.yCord = noteRef.current!.style.top
        setNoteChanges(newNote)
        dispatch(setNoteData(newNote))
      }
    },
    [noteChanges]
  )

  const handleDelete = () => {
    dispatch(deleteNote(note.id))
  }

  const handleResize = useCallback(
    (event: React.MouseEvent) => {
      const vp = context.viewPort

      const width = noteRef.current!.getBoundingClientRect().left
      const height = noteRef.current!.getBoundingClientRect().top
      const resize = (pageX: number, pageY: number) => {
        if ( (pageX - width) / vp.zoomFactor > noteMinSize.width)
          noteRef.current!.style.width = (pageX - width) / vp.zoomFactor + "px"
        if ((pageY - height) / vp.zoomFactor > noteMinSize.height)
          noteRef.current!.style.height = (pageY - height) / vp.zoomFactor  + "px"
      }

      resize(event.pageX, event.pageY)

      const onMouseMove = (event: MouseEvent) => {
        resize(event.pageX, event.pageY)
      }

      document.addEventListener("mousemove", onMouseMove)

      noteRef.current!.onmouseup = () => {
        document.removeEventListener("mousemove", onMouseMove)
        const newNote = Object.assign({}, noteChanges)
        newNote.height = noteRef.current!.style.height
        newNote.width = noteRef.current!.style.width
        setNoteChanges(newNote)
        dispatch(setNoteData(newNote))
      }
    },
    [noteChanges]
  )

  const handleResizeTouch = useCallback(
    (event: React.TouchEvent) => {
      const vp = context.viewPort

      const width = noteRef.current!.getBoundingClientRect().left
      const height = noteRef.current!.getBoundingClientRect().top
      const resize = (pageX: number, pageY: number) => {
        if ( (pageX - width) / vp.zoomFactor > noteMinSize.width)
          noteRef.current!.style.width = (pageX - width) / vp.zoomFactor + "px"
        if ((pageY - height) / vp.zoomFactor > noteMinSize.height)
          noteRef.current!.style.height = (pageY - height) / vp.zoomFactor  + "px"
      }

      resize(event.touches[0].pageX, event.touches[0].pageY)

      const onTouchMove = (event: TouchEvent) => {
        resize(event.touches[0].pageX, event.touches[0].pageY)
      }

      document.addEventListener("touchmove", onTouchMove)

      noteRef.current!.ontouchend = () => {
        document.removeEventListener("touchmove", onTouchMove)
        const newNote = Object.assign({}, noteChanges)
        newNote.height = noteRef.current!.style.height
        newNote.width = noteRef.current!.style.width
        setNoteChanges(newNote)
        dispatch(setNoteData(newNote))
      }
    },
    [noteChanges]
  )

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newNote = Object.assign({}, noteChanges)
      newNote.color = event.target.value
      setNoteChanges(newNote)
      dispatch(setNoteData(newNote))
    },
    [noteChanges]
  )

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
        <MovableHeader onMouseDown={handleMovement} onTouchStart={handleMovementTouch}/>
        <DeleteButton onClick={handleDelete}>
          <FontAwesomeIcon icon={faMinus} />
        </DeleteButton>
      </Header>
      <TextArea defaultValue={note.text} onChange={handleTextChange} />
      <Resize onMouseDown={handleResize} onTouchStart={handleResizeTouch} />
    </Container>
  )
}

export default StickyNote

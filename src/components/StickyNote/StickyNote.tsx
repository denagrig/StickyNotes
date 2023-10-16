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
import { useAppSelector } from "src/hooks"

const StickyNote = ({note}: { note: NoteData}) => {
  const noteRef = useRef<HTMLHeadingElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const spaceData: VpData = useAppSelector((state) => state.space.spaceData)
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
        event.clientX - noteRef.current!.getBoundingClientRect().left - spaceData.xCord
      const shiftY =
        event.clientY - noteRef.current!.getBoundingClientRect().top - spaceData.yCord

      const moveAt = (pageX: number, pageY: number) => {
        noteRef.current!.style.left = (pageX - shiftX) / vp.zoomFactor + "px"
        noteRef.current!.style.top = (pageY - shiftY) / vp.zoomFactor + "px"
        console.log("context:", vp.left, "real: ", spaceData.xCord)
        //add vp.zoomFactor for zoom <1
      }

      moveAt(event.pageX, event.pageY)

      const onMouseMove = (event: MouseEvent) => {
        moveAt(event.pageX, event.pageY)
      }

      document.addEventListener("mousemove", onMouseMove)
      //move to effect
      //save on mouse down
      noteRef.current!.onmouseup = () => {
        document.removeEventListener("mousemove", onMouseMove)
        const newNote = Object.assign({}, noteChanges)
        newNote.xCord = noteRef.current!.style.left
        newNote.yCord = noteRef.current!.style.top
        setNoteChanges(newNote)
        dispatch(setNoteData(newNote))
      }
    },
    [noteChanges, spaceData]
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
      const shiftX =
        event.touches[0].clientX - noteRef.current!.getBoundingClientRect().left - spaceData.xCord
      const shiftY =
        event.touches[0].clientY - noteRef.current!.getBoundingClientRect().top - spaceData.yCord

      const moveAt = (pageX: number, pageY: number) => {
        noteRef.current!.style.left = (pageX - shiftX) / spaceData.zoomFactor + "px"
        noteRef.current!.style.top = (pageY - shiftY) / spaceData.zoomFactor + "px"
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
    [noteChanges, spaceData]
  )

  const handleDelete = () => {
    dispatch(deleteNote(note.id))
  }

  const handleResize = useCallback(
    (event: React.MouseEvent) => {
      const width = noteRef.current!.getBoundingClientRect().left
      const height = noteRef.current!.getBoundingClientRect().top
      const resize = (pageX: number, pageY: number) => {
        if ( (pageX - width) / spaceData.zoomFactor > noteMinSize.width)
          noteRef.current!.style.width = (pageX - width) / spaceData.zoomFactor + "px"
        if ((pageY - height) / spaceData.zoomFactor > noteMinSize.height)
          noteRef.current!.style.height = (pageY - height) / spaceData.zoomFactor  + "px"
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
    [noteChanges, spaceData]
  )

  const handleResizeTouch = useCallback(
    (event: React.TouchEvent) => {
      const width = noteRef.current!.getBoundingClientRect().left
      const height = noteRef.current!.getBoundingClientRect().top
      const resize = (pageX: number, pageY: number) => {
        if ( (pageX - width) / spaceData.zoomFactor > noteMinSize.width)
          noteRef.current!.style.width = (pageX - width) / spaceData.zoomFactor + "px"
        if ((pageY - height) / spaceData.zoomFactor > noteMinSize.height)
          noteRef.current!.style.height = (pageY - height) / spaceData.zoomFactor  + "px"
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
    [noteChanges, spaceData]
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

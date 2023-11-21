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
  TextAreaContainer,
  DeleteIcon
} from "src/components/StickyNote/StickyNote.styled"
import { deleteNote, maxZIndex, setNoteData } from "src/slices/noteSlice"
import { AppDispatch } from "src/store"
import { useDispatch } from "react-redux"
import { CordsPair, NoteData, VpData } from "src/types"
import { noteMinSize } from "src/data"
import { faMinus, faPaintBrush } from "@fortawesome/free-solid-svg-icons"
import "@melloware/coloris/dist/coloris.css"
import Coloris from "@melloware/coloris"
import React from "react"
import { useAppSelector } from "src/hooks"

const StickyNote = ({ note }: { note: NoteData }) => {
  const noteRef = useRef<HTMLHeadingElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const spaceData: VpData = useAppSelector((state) => state.space.vpData)
  const shiftRef = React.useRef<CordsPair>({
    xCord: 0,
    yCord: 0,
  })
  const [noteChanges, setNoteChanges] = useState<NoteData>({
    id: note.id,
    xCord: note.xCord,
    yCord: note.yCord,
    height: note.height,
    width: note.width,
    text: note.text,
    color: note.color
  })

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

  const moveAt = useCallback((pageX: number, pageY: number) => {
    noteRef.current!.style.left = pageX - shiftRef.current.xCord + "px"
    noteRef.current!.style.top = pageY - shiftRef.current.yCord + "px"
  }, [])

  const onMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if ("touches" in event) {
        moveAt(event.touches[0].pageX, event.touches[0].pageY)
      } else {
        moveAt(event.pageX, event.pageY)
      }
    },
    [moveAt]
  )

  const noteHeaderPressStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      let processedEvent
      headerRef.current!.style.cursor = "grabbing"
      dispatch(maxZIndex(note.id))
      if ("touches" in event) {
        processedEvent = event.touches[0]
        document.addEventListener("touchmove", onMove)
      } else {
        processedEvent = event
        document.addEventListener("mousemove", onMove)
      }

      shiftRef.current.xCord =
        processedEvent.clientX -
        noteRef.current!.getBoundingClientRect().left -
        spaceData.xCord
      shiftRef.current.yCord =
        processedEvent.clientY -
        noteRef.current!.getBoundingClientRect().top -
        spaceData.yCord

      moveAt(processedEvent.pageX, processedEvent.pageY)
    },
    [dispatch, moveAt, note.id, onMove, spaceData]
  )

  const noteHeaderPressEnd = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      headerRef.current!.style.cursor = "grab"
      if ("touches" in event) {
        document.removeEventListener("touchmove", onMove)
      } else {
        document.removeEventListener("mousemove", onMove)
      }

      const newNote = Object.assign({}, noteChanges)
      newNote.xCord = noteRef.current!.style.left
      newNote.yCord = noteRef.current!.style.top

      dispatch(setNoteData(newNote))
    },
    [dispatch, noteChanges, onMove]
  )

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newNote = Object.assign({}, noteChanges)
      newNote.text = event.target.value
      setNoteChanges(newNote)
      dispatch(setNoteData(newNote))
    },
    [dispatch, noteChanges]
  )

  const handleDelete = () => {
    dispatch(deleteNote(note.id))
  }

  const resize = useCallback(
    (pageX: number, pageY: number) => {
      const width = parseFloat(noteChanges.width.replace("px", ""))
      const height = parseFloat(noteChanges.height.replace("px", ""))
      if (width + (pageX - shiftRef.current.xCord) / spaceData.zoomFactor >= noteMinSize.width)
        noteRef.current!.style.width = width + (pageX - shiftRef.current.xCord) / spaceData.zoomFactor + "px"
      if (height + (pageY - shiftRef.current.yCord) / spaceData.zoomFactor >= noteMinSize.height)
          noteRef.current!.style.height = height + (pageY - shiftRef.current.yCord) / spaceData.zoomFactor + "px"
    },
    [noteChanges.height, noteChanges.width, spaceData.zoomFactor]
  )

  const onResize = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if ("touches" in event) {
        resize(event.touches[0].pageX, event.touches[0].pageY)
      } else {
        resize(event.pageX, event.pageY)
      }
    },
    [resize]
  )

  const resizePressEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if ("touches" in event) {
        document.removeEventListener("touchmove", onResize)
        document.removeEventListener("touchend", resizePressEnd)
      } else {
        document.removeEventListener("mousemove", onResize)
        document.removeEventListener("mouseup", resizePressEnd)
      }
      const newNote = Object.assign({}, noteChanges)
      newNote.height = noteRef.current!.style.height
      newNote.width = noteRef.current!.style.width
      setNoteChanges(newNote)
      dispatch(setNoteData(newNote))
    },
    [dispatch, noteChanges, onResize]
  )

  const resizePressStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      let processedEvent
      if ("touches" in event) {
        processedEvent = event.touches[0]
        document.addEventListener("touchmove", onResize)
        document.addEventListener("touchend", resizePressEnd)
      } else {
        processedEvent = event
        processedEvent.preventDefault()
        document.addEventListener("mousemove", onResize)
        document.addEventListener("mouseup", resizePressEnd)
      }

      shiftRef.current.xCord = 
        processedEvent.clientX
      shiftRef.current.yCord =
        processedEvent.clientY
    },
    [onResize, resizePressEnd]
  )

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newNote = Object.assign({}, noteChanges)
      newNote.color = event.target.value
      setNoteChanges(newNote)
      dispatch(setNoteData(newNote))
    },
    [dispatch, noteChanges]
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
        <MovableHeader
          ref = {headerRef}
          onMouseDown={noteHeaderPressStart}
          onTouchStart={noteHeaderPressStart}
          onMouseUp={noteHeaderPressEnd}
          onTouchEnd={noteHeaderPressEnd}
        />
        <DeleteButton onClick={handleDelete}>
          <DeleteIcon icon={faMinus} />
        </DeleteButton>
      </Header>
      <TextAreaContainer>
        <TextArea defaultValue={note.text} onChange={handleTextChange} />
      </TextAreaContainer>
      <Resize
        onMouseDown={resizePressStart}
        onTouchStart={resizePressStart}
      />
    </Container>
  )
}

export default StickyNote

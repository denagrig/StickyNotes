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

const StickyNote = ({ note, noteCount }: { note: NoteData, noteCount: number }) => {
  const noteRef = useRef<HTMLHeadingElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const spaceData: VpData = useAppSelector((state) => state.space.vpData)
  const mode: number = useAppSelector((state) => state.space.mode)
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
    color: note.color,
    zIndex: note.zIndex
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
      dispatch(maxZIndex(note.id))
      noteRef.current!.style.zIndex = noteCount + 1 + ""
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
    [dispatch, moveAt, note.id, onMove, spaceData, noteCount]
  )

  const noteHeaderPressEnd = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      
      if ("touches" in event) {
        document.removeEventListener("touchmove", onMove)
      } else {
        document.removeEventListener("mousemove", onMove)
      }

      noteRef.current!.style.zIndex = note.zIndex + ""
      
      const newNote = Object.assign({}, noteChanges)
      newNote.xCord = noteRef.current!.style.left
      newNote.yCord = noteRef.current!.style.top
      newNote.zIndex = note.zIndex
      setNoteChanges(newNote)
      dispatch(setNoteData(newNote))
    },
    [dispatch, noteChanges, onMove, note]
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
      const width = noteRef.current!.getBoundingClientRect().left
      const height = noteRef.current!.getBoundingClientRect().top
      if ((pageX - width) / spaceData.zoomFactor >= noteMinSize.width)
        noteRef.current!.style.width =
          (pageX - width) / spaceData.zoomFactor + "px"
      if ((pageY - height) / spaceData.zoomFactor >= noteMinSize.height)
        noteRef.current!.style.height =
          (pageY - height) / spaceData.zoomFactor + "px"
    },
    [spaceData.zoomFactor]
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

  const resizePressStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      let processedEvent
      if ("touches" in event) {
        processedEvent = event.touches[0]
        document.addEventListener("touchmove", onResize)
      } else {
        processedEvent = event
        document.addEventListener("mousemove", onResize)
      }

      shiftRef.current.xCord =
        processedEvent.clientX -
        noteRef.current!.getBoundingClientRect().left -
        spaceData.xCord
      shiftRef.current.yCord =
        processedEvent.clientY -
        noteRef.current!.getBoundingClientRect().top -
        spaceData.yCord
    },
    [onResize, spaceData]
  )

  const resizePressEnd = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if ("touches" in event) {
        document.removeEventListener("touchmove", onResize)
      } else {
        document.removeEventListener("mousemove", onResize)
      }
      const newNote = Object.assign({}, noteChanges)
      newNote.height = noteRef.current!.style.height
      newNote.width = noteRef.current!.style.width
      setNoteChanges(newNote)
      dispatch(setNoteData(newNote))
    },
    [dispatch, noteChanges, onResize]
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
      $isActive={mode}
      $zIndex={note.zIndex}
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
        onMouseUp={resizePressEnd}
        onTouchEnd={resizePressEnd}
      />
    </Container>
  )
}

export default StickyNote

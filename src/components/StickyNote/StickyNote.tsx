import { useCallback, useRef } from "react"
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
import { CordsPair, NoteData, VpData } from "src/types"
import { noteMinSize } from "src/data"
import { faMinus, faPaintBrush } from "@fortawesome/free-solid-svg-icons"
import "@melloware/coloris/dist/coloris.css"
import Coloris from "@melloware/coloris"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useAppSelector } from "src/hooks"

const StickyNote = ({ note }: { note: NoteData }) => {
  const noteRef = useRef<HTMLHeadingElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const spaceData: VpData = useAppSelector((state) => state.space.vpData)
  //const [shiftCords, setShiftCords] = useState<CordsPair>({xCord: 0, yCord: 0})
  const shiftRef = React.useRef<CordsPair>({ xCord: 0, yCord: 0 })

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

  const noteChangesRef = useRef<NoteData>({
    id: note.id,
    xCord: note.xCord,
    yCord: note.yCord,
    height: note.height,
    width: note.width,
    text: note.text,
    color: note.color,
  })

  const moveAt = useCallback(
    (pageX: number, pageY: number) => {
      noteRef.current!.style.left = pageX - shiftRef.current.xCord + "px"
      noteRef.current!.style.top = pageY - shiftRef.current.yCord + "px"
    },
    [shiftRef]
  )

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
    [moveAt, onMove, spaceData]
  )

  const noteHeaderPressEnd = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if ("touches" in event) {
        document.removeEventListener("touchmove", onMove)
      } else {
        document.removeEventListener("mousemove", onMove)
      }

      noteChangesRef.current.xCord = noteRef.current!.style.left
      noteChangesRef.current.yCord = noteRef.current!.style.top
      dispatch(setNoteData(noteChangesRef.current))
    },
    [dispatch, onMove]
  )

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      noteChangesRef.current.text = event.target.value
      dispatch(setNoteData(noteChangesRef.current))
    },
    [dispatch]
  )

  const handleDelete = () => {
    dispatch(deleteNote(note.id))
  }

  const handleResize = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const width = noteRef.current!.getBoundingClientRect().left
      const height = noteRef.current!.getBoundingClientRect().top
      let processedEvent

      const onMouseMove = (event: MouseEvent) => {
        resize(event.pageX, event.pageY)
      }

      const onTouchMove = (event: TouchEvent) => {
        resize(event.touches[0].pageX, event.touches[0].pageY)
      }

      if ("touches" in event) {
        processedEvent = event.touches[0]
        document.addEventListener("touchmove", onTouchMove)
      } else {
        processedEvent = event
        document.addEventListener("mousemove", onMouseMove)
      }
      const resize = (pageX: number, pageY: number) => {
        if ((pageX - width) / spaceData.zoomFactor > noteMinSize.width)
          noteRef.current!.style.width =
            (pageX - width) / spaceData.zoomFactor + "px"
        if ((pageY - height) / spaceData.zoomFactor > noteMinSize.height)
          noteRef.current!.style.height =
            (pageY - height) / spaceData.zoomFactor + "px"
      }

      resize(processedEvent.pageX, processedEvent.pageY)

      noteRef.current!.onmouseup = () => {
        document.removeEventListener("mousemove", onMouseMove)
        noteChangesRef.current.height = noteRef.current!.style.height
        noteChangesRef.current.width = noteRef.current!.style.width
        dispatch(setNoteData(noteChangesRef.current))
      }

      noteRef.current!.ontouchend = () => {
        document.removeEventListener("touchmove", onTouchMove)
        noteChangesRef.current.height = noteRef.current!.style.height
        noteChangesRef.current.width = noteRef.current!.style.width
        dispatch(setNoteData(noteChangesRef.current))
      }
    },
    [spaceData, dispatch]
  )

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      noteChangesRef.current.color = event.target.value
      dispatch(setNoteData(noteChangesRef.current))
    },
    [dispatch]
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
          onMouseDown={noteHeaderPressStart}
          onTouchStart={noteHeaderPressStart}
          onMouseUp={noteHeaderPressEnd}
          onTouchEnd={noteHeaderPressEnd}
        />
        <DeleteButton onClick={handleDelete}>
          <FontAwesomeIcon icon={faMinus} />
        </DeleteButton>
      </Header>
      <TextArea defaultValue={note.text} onChange={handleTextChange} />
      <Resize onMouseDown={handleResize} onTouchStart={handleResize} />
    </Container>
  )
}

export default StickyNote

import { useRef } from "react"
import { useDispatch } from "react-redux"
import {
  LeftButtons,
  Buttons,
  ClearButton,
} from "src/components/PageHeader/PageHeader.styled"
import { Mode } from "src/data"
import { clearNotes } from "src/slices/noteSlice"
import { setMode } from "src/slices/spaceSlice"
import { AppDispatch } from "src/store"

const PageHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  const addButtonRef = useRef<HTMLButtonElement>(null)

  const enableMovement = () => {
    dispatch(setMode(Mode.Move))
  }

  const enableAddNote = () => {
    dispatch(setMode(Mode.Add))
  }

  const handleClear = () => {
    dispatch(clearNotes())
  }

  return (
    <Buttons>
      <LeftButtons onClick={enableAddNote} ref={addButtonRef}>
        Добавить Заметку
      </LeftButtons>
      <LeftButtons onClick={enableMovement}>Режим перемещения</LeftButtons>
      <ClearButton onClick={handleClear}>Очистить</ClearButton>
    </Buttons>
  )
}

export default PageHeader

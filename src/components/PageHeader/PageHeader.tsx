import { useDispatch } from "react-redux"
import {
  LeftButtons,
  Buttons,
  ClearButton,
} from "src/components/PageHeader/PageHeader.styled"
import { Mode } from "src/data"
import { useAppSelector } from "src/hooks"
import { clearNotes } from "src/slices/noteSlice"
import { setMode } from "src/slices/spaceSlice"
import { AppDispatch } from "src/store"

const PageHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  const curMode: Mode = useAppSelector((state) => state.space.mode)

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
      {curMode == Mode.Add ? (
        <>
          <LeftButtons color = {"lightBlue"} onClick={enableAddNote}>
          Добавить Заметку
          </LeftButtons>
          <LeftButtons color = {"grey"} onClick={enableMovement}>
          Режим перемещения
          </LeftButtons>
        </>) : (
        <>
          <LeftButtons color = {"grey"} onClick={enableAddNote}>
            Добавить Заметку
          </LeftButtons>
          <LeftButtons color = {"lightBlue"} onClick={enableMovement}>
            Режим перемещения
          </LeftButtons></>
      )}
      <ClearButton onClick={handleClear}>Очистить</ClearButton>
    </Buttons>
  )
}

export default PageHeader

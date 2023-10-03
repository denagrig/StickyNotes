import { useRef } from "react"
import { useDispatch } from "react-redux"
import { AddButton, Buttons, ClearButton } from "src/components/PageHeader/PageHeader.styled"
import { addNote, clearNotes } from "src/slices/noteSlice"
import { AppDispatch } from "src/store"

const PageHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  const addButtonRef = useRef<HTMLButtonElement>(null)

  const handleAddNote = () => {
    delayClick()
    dispatch(addNote())
  }

  const handleClear = () => {
    dispatch(clearNotes())
  }

  const delayClick = () => {
    addButtonRef.current!.disabled = true
    addButtonRef.current!.style.boxShadow = "inset 0px 0px 5px #c1c1c1"
    setTimeout(function () {
      addButtonRef.current!.disabled = false
      addButtonRef.current!.style.boxShadow = "0px 0px 5px #c1c1c1"
    }, 250)
  }

  return (
    <Buttons>
      <AddButton onClick={handleAddNote} ref={addButtonRef}>
        Добавить Заметку
      </AddButton>
      <ClearButton  onClick= {handleClear}>
        Очистить
      </ClearButton>
    </Buttons>
  )
}

export default PageHeader

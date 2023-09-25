import { useDispatch } from "react-redux"
import {AddButton} from "src/components/PageHeader/PageHeader.styled"  
import { addNote } from "src/slices/noteSlice"
import { AppDispatch } from "src/store"

const PageHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleAddNote = () => {
    dispatch(addNote())
  }

  return (
    <AddButton onClick={handleAddNote}>Добавить Заметку</AddButton>
  )
}
  
export default PageHeader
  
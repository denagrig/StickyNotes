import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { AddButton, Buttons, ClearButton } from "src/components/PageHeader/PageHeader.styled"
import { addNote, clearNotes } from "src/slices/noteSlice"
import { AppDispatch } from "src/store"
import { CordsPair, VpData } from "src/types"

const PageHeader = ({spaceData}: { spaceData: VpData}) => {
  const dispatch = useDispatch<AppDispatch>()
  const addButtonRef = useRef<HTMLButtonElement>(null)
  const [canAddNote, setCanAddNote] = useState<boolean>(false)

  const createNoteAtCords = (noteX: number, noteY: number) => {
    const createCords: CordsPair = {
      xCord: noteX + spaceData.xCord,
      yCord: noteY + spaceData.yCord,
    }
    dispatch(addNote(createCords))
  }


  const onClick = (event: MouseEvent) => {
    const element = event.target as HTMLElement   
    createNoteAtCords(event.pageX, event.pageY)
    console.log("el:",element.className)
  }


  const handleAddNote = () => {
   
    if(canAddNote == false)
    {
      setCanAddNote(true) 
      document.addEventListener("click", onClick)
    }
    else
    {
      setCanAddNote(false)
      document.removeEventListener("click", onClick)
    } 
  }

  const handleClear = () => {
    dispatch(clearNotes())
  }

  return (
    <Buttons>
      <AddButton onClick={handleAddNote} ref={addButtonRef}>
        Добавить Заметку
      </AddButton>
      <ClearButton onClick= {handleClear}>
        Очистить
      </ClearButton>
    </Buttons>
  )
}

export default PageHeader

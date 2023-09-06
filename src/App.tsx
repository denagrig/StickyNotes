import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/store"
import { loadNoteData } from "src/slices/noteSlice"
import MainPage from "src/pages/MainPage/MainPage"

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
 
  useEffect(()=>{
    dispatch(loadNoteData())
  }, [])


  return (
    <MainPage />
  )
}

export default App
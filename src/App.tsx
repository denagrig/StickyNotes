import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/store"
import { loadNoteData } from "src/slices/noteSlice"
import MainPage from "src/pages/MainPage/MainPage"
import { loadSpaceData } from "src/slices/spaceSlice"
import { useAppSelector } from "./hooks"
import { CordsPair } from "./types"

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(loadNoteData())
    dispatch(loadSpaceData())
  }, [])

  const spaceData: CordsPair = useAppSelector((state) => state.space.vpData)

  if(spaceData.xCord != -1)
  {
    return (
      <MainPage />
    )
  }
}

export default App

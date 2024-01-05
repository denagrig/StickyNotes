import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/store"
import { loadNoteData } from "src/slices/noteSlice"
import MainPage from "src/pages/MainPage/MainPage"
import { loadSpaceData, setSpaceData } from "src/slices/spaceSlice"
import { useAppSelector } from "src/hooks"
import { CordsPair, VpData } from "src/types"

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(loadNoteData())
    dispatch(loadSpaceData())
    const url = window.location.search
    const params = url.split("?")
    if(params.length == 1) {
      window.location.search ="?0?0?0"
      for(let i = 0; i < 3; i++)
        params.push("0")
    }

    const newSpaceData: VpData = {
      xCord: JSON.parse(params[1]) || 0,
      yCord: JSON.parse(params[2]) || 0,
      zoomFactor: JSON.parse(params[3]) || 0,
    }
    dispatch(setSpaceData(newSpaceData))
  }, [dispatch])

 

  const spaceData: CordsPair = useAppSelector((state) => state.space.vpData)
  if (spaceData.xCord != -1) {
    return <MainPage />
  }
}

export default App

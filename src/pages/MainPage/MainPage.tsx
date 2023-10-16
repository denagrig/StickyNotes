import StickyNote from "src/components/StickyNote/StickyNote"
import { useAppSelector } from "src/hooks"
import { NoteData, VpData } from "src/types"
import "@melloware/coloris/dist/coloris.css"
import { NoPanArea, Space } from "react-zoomable-ui"
import PageHeader from "src/components/PageHeader/PageHeader"
import { BackgroundImg } from "./MainPage.styled"
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/store"
import { setSpaceData } from "src/slices/spaceSlice"
import React from "react"

const MainPage = () => {
  //localStorage.clear()
  const notesData: NoteData[] = useAppSelector((state) => state.note.Notes)
  const spaceData: VpData = useAppSelector((state) => state.space.spaceData)
  const dispatch = useDispatch<AppDispatch>()
  const spaceRef = React.useRef<Space | null>(null)
  
  const updateCords = () => {
    const newSpaceData: VpData = {
      xCord: spaceRef.current?.viewPort?.left as number,
      yCord: spaceRef.current?.viewPort?.top as number,
      zoomFactor: spaceData.zoomFactor
    }
    dispatch(setSpaceData(newSpaceData))
  }

  const updateZoom = () => {
    const newSpaceData: VpData = {
      xCord: spaceData.xCord,
      yCord: spaceData.yCord,
      zoomFactor: spaceRef.current?.viewPort?.zoomFactor as number
    }
    console.log(spaceRef.current?.viewPort?.zoomFactor)
    dispatch(setSpaceData(newSpaceData))
  }
    

  //document.addEventListener("wheel", updateZoom)

  //move space data to header & note

  return (
    <div onMouseUp={() => updateCords()} onWheel={() => updateZoom}>
      <Space onCreate={vp => {
        vp.setBounds({ x: [0, 10000], y: [0, 10000], zoom: [0.125, 3]})
        vp.camera.moveBy(spaceData.xCord, spaceData.yCord, spaceData.zoomFactor)}
      } ref = {spaceRef}>
        <BackgroundImg>
          <NoPanArea>
            {notesData.map((note: NoteData) => (
              <StickyNote note={note} key={note.id} />
            ))}
          </NoPanArea>
        </BackgroundImg>
      </Space>
      <PageHeader/>
    </div>
  )
}

export default MainPage

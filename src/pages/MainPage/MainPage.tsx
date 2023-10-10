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

const MainPage = () => {
  //localStorage.clear()
  const notesData: NoteData[] = useAppSelector((state) => state.note.Notes)
  const spaceData: VpData = useAppSelector((state) => state.space.spaceData)
  const dispatch = useDispatch<AppDispatch>()
  
  const updateCords = (top: number, left: number, zoom: number) => {
    const newSpaceData: VpData = {
      xCord: left,
      yCord: top,
      zoomFactor: zoom
    }
    dispatch(setSpaceData(newSpaceData))
  }

  //zooms correctly onlyafter reload

  return (
    <div>
      <Space onCreate={vp => {
        vp.setBounds({ x: [0, 10000], y: [0, 10000], zoom: [0.125, 3]})
        vp.camera.moveBy(spaceData.xCord, spaceData.yCord)}
      }
      onUpdated={(vp) => updateCords(vp.top, vp.left, vp.zoomFactor)}>
        <BackgroundImg>
          <NoPanArea>
            {notesData.map((note: NoteData) => (
              <StickyNote note={note} spaceData = {spaceData} key={note.id} />
            ))}
          </NoPanArea>
        </BackgroundImg>
      </Space>
      <PageHeader spaceData = {spaceData}/>
    </div>
  )
}

export default MainPage

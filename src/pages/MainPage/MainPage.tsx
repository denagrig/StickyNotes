import StickyNote from "src/components/StickyNote/StickyNote"
import { useAppSelector } from "src/hooks"
import { CordsPair, NoteData, VpData } from "src/types"
import "@melloware/coloris/dist/coloris.css"
import { NoPanArea, Space } from "react-zoomable-ui"
import PageHeader from "src/components/PageHeader/PageHeader"
import { BackgroundImg } from "./MainPage.styled"
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/store"
import { setSpaceData } from "src/slices/spaceSlice"
import React, { useCallback, useEffect } from "react"
import { Mode } from "src/data"
import { addNote } from "src/slices/noteSlice"

const MainPage = () => {
  //localStorage.clear()
  const notesData: NoteData[] = useAppSelector((state) => state.note.Notes)
  const spaceData: VpData = useAppSelector((state) => state.space.vpData)
  const mode: number = useAppSelector((state) => state.space.mode)
  const dispatch = useDispatch<AppDispatch>()
  const spaceRef = React.useRef<Space | null>(null)
  const spaceContainer = React.useRef<HTMLDivElement | null>(null)

  const handleAddNote = useCallback((event : MouseEvent) => {
    if(mode == Mode.Add) {
      const createCords: CordsPair = {
        xCord: event.pageX + spaceData.xCord,
        yCord: event.pageY + spaceData.yCord,
      }
      dispatch(addNote(createCords))
    }
  },[mode, dispatch, spaceData.xCord, spaceData.yCord])


  useEffect(() => {
    const currentSpace = spaceContainer.current
    if (mode == Mode.Move) {
      currentSpace?.removeEventListener("click", handleAddNote)
      spaceRef.current?.viewPort?.setBounds({ x: [0, 10000], y: [0, 10000], zoom: [1, 1] })
    } else {
      spaceRef.current?.viewPort?.setBounds({ x: [spaceData.xCord, spaceData.xCord + window.screen.width], 
        y: [spaceData.yCord, spaceData.yCord + window.screen.height], 
        zoom: [spaceData.zoomFactor, spaceData.zoomFactor] })
      currentSpace?.addEventListener("click", handleAddNote)
    }
    return () => {currentSpace?.removeEventListener("click", handleAddNote)}
  }, [mode, spaceData, handleAddNote])

  const updateCords = () => {
    const newSpaceData: VpData = {
      xCord: spaceRef.current?.viewPort?.left || 0,
      yCord: spaceRef.current?.viewPort?.top || 0,
      zoomFactor: 1,
      //zoomFactor: spaceData.zoomFactor
    }
    dispatch(setSpaceData(newSpaceData))
  }

  const updateZoom = () => {
    const newSpaceData: VpData = {
      xCord: spaceData.xCord,
      yCord: spaceData.yCord,
      zoomFactor: spaceRef.current?.viewPort?.zoomFactor as number,
    }
    console.log(spaceRef.current?.viewPort?.zoomFactor)
    dispatch(setSpaceData(newSpaceData))
  }

  //document.addEventListener("wheel", updateZoom)

  return (
    <div onMouseUp={() => updateCords()} onTouchEnd={() => updateCords()}  onWheel={() => updateZoom}>
      <div ref={spaceContainer}>
        <Space
          onCreate={(vp) => {
            vp.setBounds({ x: [0, 10000], y: [0, 10000], zoom: [0.125, 3] })
            vp.camera.moveBy(
              spaceData.xCord,
              spaceData.yCord,
              1 - spaceData.zoomFactor
            )
          }}
          ref={spaceRef}
        >
          <BackgroundImg>
            <NoPanArea>
              {notesData.map((note: NoteData) => (
                <StickyNote note={note} key={note.id} />
              ))}
            </NoPanArea>
          </BackgroundImg>
        </Space>
      </div>
      <PageHeader />
    </div>
  )
}

export default MainPage

import StickyNote from "src/components/StickyNote/StickyNote"
import { CordsPair, NoteData, VpData } from "src/types"
import "@melloware/coloris/dist/coloris.css"
import { NoPanArea, Space } from "react-zoomable-ui"
import PageHeader from "src/components/PageHeader/PageHeader"
import {
  BackgroundImg,
  MainPageContainer,
  NoPanContainer,
  SpaceContainer,
} from "src/pages/MainPage/MainPage.styled"
import { useDispatch } from "react-redux"
import { AppDispatch } from "src/store"
import { setMode, setSpaceData } from "src/slices/spaceSlice"
import React, { useCallback, useEffect, useState } from "react"
import { Mode } from "src/data"
import { addNote } from "src/slices/noteSlice"
import { useAppSelector } from "src/hooks"

const MainPage = () => {
  const notesData: NoteData[] = useAppSelector((state) => state.note.Notes)
  const spaceData: VpData = useAppSelector((state) => state.space.vpData)
  const mode: number = useAppSelector((state) => state.space.mode)
  const dispatch = useDispatch<AppDispatch>()
  const spaceRef = React.useRef<Space | null>(null)
  const noPanRef = React.useRef<HTMLDivElement | null>(null)
  const spaceContainerRef = React.useRef<HTMLDivElement | null>(null)
  const [eventStartCords, setEventStartCords] = useState<CordsPair>({
    xCord: 0,
    yCord: 0,
  })

  const handlePressStart = useCallback((event: MouseEvent | TouchEvent) => {
    let processedEvent

    if ("touches" in event) {
      processedEvent = event.touches[0]
    } else {
      processedEvent = event
    }

    const currentCords: CordsPair = {
      xCord: processedEvent.pageX,
      yCord: processedEvent.pageY,
    }
    setEventStartCords(currentCords)
  }, [])

  const handlePressEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (mode == Mode.Add) {
        let processedEvent

        if ("touches" in event) {
          processedEvent = event.changedTouches[0]
        } else {
          processedEvent = event
        }

        if (
          !noPanRef.current!.contains(event.target as Node) &&
          eventStartCords.xCord == processedEvent.pageX &&
          eventStartCords.yCord == processedEvent.pageY
        ) {
          const createCords: CordsPair = {
            xCord:
              processedEvent.pageX / spaceData.zoomFactor + spaceData.xCord,
            yCord:
              processedEvent.pageY / spaceData.zoomFactor + spaceData.yCord,
          }
          dispatch(addNote(createCords))
        }
      }
    },
    [dispatch, eventStartCords, mode, spaceData]
  )

  const updateSpaceData = useCallback(() => {
    const newSpaceData: VpData = {
      xCord: spaceRef.current?.viewPort?.left || 0,
      yCord: spaceRef.current?.viewPort?.top || 0,
      zoomFactor: spaceRef.current?.viewPort?.zoomFactor || 1,
    }
    history.pushState({}, "", 
      "?" +
      newSpaceData.xCord +
      "?" +
      newSpaceData.yCord +
      "?" +
      newSpaceData.zoomFactor)
    dispatch(setSpaceData(newSpaceData))
  }, [dispatch])

  useEffect(() => {
    const currentSpace = spaceContainerRef.current
    document.addEventListener("wheel", updateSpaceData)
    if (mode == Mode.Add) {
      currentSpace?.addEventListener("mousedown", handlePressStart)
      currentSpace?.addEventListener("touchstart", handlePressStart)
      currentSpace?.addEventListener("mouseup", handlePressEnd)
      currentSpace?.addEventListener("touchend", handlePressEnd)
    }
    return () => {
      currentSpace?.removeEventListener("mousedown", handlePressStart)
      currentSpace?.removeEventListener("touchstart", handlePressStart)
      currentSpace?.removeEventListener("mouseup", handlePressEnd)
      currentSpace?.removeEventListener("touchend", handlePressEnd)
      document.removeEventListener("wheel", updateSpaceData)
    }
  }, [handlePressEnd, handlePressStart, mode, spaceData, updateSpaceData])

  const changeCursor = () => {
    if (mode == Mode.Move) dispatch(setMode(Mode.Grabbing))
    else if (mode == Mode.Grabbing) dispatch(setMode(Mode.Move))
  }

  return (
    <MainPageContainer
      onMouseUp={() => updateSpaceData()}
      onTouchEnd={() => updateSpaceData()}
    >
      <SpaceContainer
        ref={spaceContainerRef}
        onMouseDown={changeCursor}
        onTouchStart={changeCursor}
        onMouseUp={changeCursor}
        onTouchEnd={changeCursor}
      >
        <Space
          onCreate={(vp) => {
            vp.setBounds({ x: [0, 10000], y: [0, 10000], zoom: [0.125, 3] })
            vp.camera.moveBy(0, 0, spaceData.zoomFactor - 1)
            vp.camera.updateTopLeft(0, 0)
            vp.camera.moveBy(spaceData.xCord, spaceData.yCord)
          }}
          ref={spaceRef}
        >
          <BackgroundImg $mode={mode} >
            <NoPanContainer ref={noPanRef}>
              <NoPanArea>
                {notesData.map((note: NoteData) => (
                  <StickyNote note={note} key={note.id} />
                ))}
              </NoPanArea>
            </NoPanContainer>
          </BackgroundImg>
        </Space>
      </SpaceContainer>
      <PageHeader />
    </MainPageContainer>
  )
}

export default MainPage

import StickyNote from "src/components/StickyNote/StickyNote"
import { useAppSelector } from "src/hooks"
import { NoteData } from "src/types"
import "@melloware/coloris/dist/coloris.css"
import { NoPanArea, Space } from "react-zoomable-ui"
import PageHeader from "src/components/PageHeader/PageHeader"
import { BackgroundImg } from "./MainPage.styled"
//import background from "src/assets/background.jpg"

const MainPage = () => {
  //localStorage.clear()
  const notesData: NoteData[] = useAppSelector((state) => state.note.Notes)

  return (
    <div>
      <Space onCreate={vp => vp.setBounds({ x: [0, 10000], y: [0, 10000]})}>
        <BackgroundImg>
          <NoPanArea>
            {notesData.map((note: NoteData) => (
              <StickyNote note={note} key={note.id} />
            ))}
          </NoPanArea>
        </BackgroundImg>
      </Space>
      <PageHeader />
    </div>
  )
}

export default MainPage

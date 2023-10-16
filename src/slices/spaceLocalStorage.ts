import { VpData } from "src/types"

export const saveSpaceData = async (spaceData: VpData) => {
  return new Promise<VpData>((resolve) => {
    localStorage.setItem("spaceData", JSON.stringify(spaceData))
    resolve(spaceData)
  })
}

export const getSpaceData = async () => {
  return new Promise<VpData>((resolve) => {
    const spaceData: VpData = JSON.parse(
      localStorage.getItem("spaceData") || "{xCord: 0, yCord: 0, zoomFactor: 1,}"   //doesnt return object if empty
    )
    resolve(spaceData)
  })
}

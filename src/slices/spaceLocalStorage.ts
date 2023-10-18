import { VpData, SpaceData } from "src/types"

export const saveSpaceData = async (spaceData: VpData) => {
  return new Promise<VpData>((resolve) => {
    localStorage.setItem("spaceData", JSON.stringify(spaceData))
    resolve(spaceData)
  })
}

export const getSpaceData = async () => {
  return new Promise<SpaceData>((resolve) => {
    const spaceDataFromLocalStorage = localStorage.getItem("spaceData")
    const spaceData: VpData = spaceDataFromLocalStorage
      ? JSON.parse(spaceDataFromLocalStorage)
      : { xCord: 0, yCord: 0, zoomFactor: 1 }
    const mode: number = JSON.parse(localStorage.getItem("mode") || "0")
    const newSpaceData: SpaceData = {
      vpData: spaceData,
      mode: mode,
    }
    resolve(newSpaceData)
  })
}

export const changeMode = async (mode: number) => {
  return new Promise<number>((resolve) => {
    localStorage.setItem("mode", JSON.stringify(mode))
    resolve(mode)
  })
}

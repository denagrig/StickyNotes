type NoteData = {
    id: number
    xCord: string
    yCord: string
    height: string
    width: string
    text: string
    color: string
}

type VpData = {
    xCord: number
    yCord: number
    zoomFactor: number
}

type CordsPair = {
    xCord: number
    yCord: number
}

export type {NoteData, VpData, CordsPair}

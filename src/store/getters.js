export const playState = state => state.playState

export const playList = state => state.playList

export const currentIndex = state => state.currentIndex

export const playerData = (state) => {
  return state.playList[state.currentIndex] || {}
}

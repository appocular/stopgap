export const state = {
  currentPage: '',
  snapshot: null,
  currentCheckpoint: null,
  getCurrentCheckpoint: ({currentCheckpoint, snapshot}) => {
    return snapshot ? snapshot.checkpoints[currentCheckpoint] : null
  }
}

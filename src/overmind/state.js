export const state = {
  currentPage: '',
  snapshot: null,
  baseline: null,
  currentCheckpoint: null,
  getCurrentCheckpoint: ({currentCheckpoint, snapshot}) => {
    return snapshot ? snapshot.checkpoints[currentCheckpoint] : null
  }
}

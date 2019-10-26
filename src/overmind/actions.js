
export const loadSnapshot = async ({ state, actions, effects }, snapshotId) => {
  state.snapshot = null
  const snapshot = await effects.getSnapshotById(snapshotId)
  if (snapshot) {
    actions.setSnapshot(snapshot)
  }
  else {
    actions.setError('Error loading snapshot.')
  }
}

export const showMessage = ({state}) => {
  state.currentPage = 'message'
}

export const showSnapshot = async ({ state, actions }, params) => {
  state.currentPage = 'snapshot'
  if (!state.snapshot || state.snapshot.id !== params.snapshotId) {
    await actions.loadSnapshot(params.snapshotId)
  }
}

export const showCheckpoint = async ({ state, actions }, params) => {
  state.currentPage = 'checkpoint'
  if (!state.snapshot) {
    await actions.loadSnapshot(params.snapshotId)
  }
  if (!state.snapshot.checkpoints[params.checkpointId]) {
    actions.setError('Error loading checkpoint.')
  }
  else {
    actions.setCurrentCheckpoint(params.checkpointId)
  }
}

export const approveCurrentCheckpoint = async ({state, effects}) => {
  effects.checkpointAction(state.getCurrentCheckpoint, 'approve')
  const snapshotId = state.snapshot.id
  state.snapshot = null
  effects.router.open('/' + snapshotId)
}

export const rejectCurrentCheckpoint = async ({state, effects}) => {
  effects.checkpointAction(state.getCurrentCheckpoint, 'reject')
  const snapshotId = state.snapshot.id
  state.snapshot = null
  effects.router.open('/' + snapshotId)
}

export const ignoreCurrentCheckpoint = async ({state, effects}) => {
  effects.checkpointAction(state.getCurrentCheckpoint, 'ignore')
  const snapshotId = state.snapshot.id
  state.snapshot = null
  effects.router.open('/' + snapshotId)
}

export const setSnapshot = ({state}, snapshot) => {
  // Make checkpoints be indexed by slug.
  snapshot.checkpoints = snapshot.checkpoints.reduce((map, checkpoint) => {
    map[checkpoint.slug] = checkpoint
    return map
  }, {})
  state.snapshot = snapshot
}

export const setCurrentCheckpoint = ({state}, checkpointId) => {
  state.currentCheckpoint = checkpointId
}

export const setError = ({state}, message) => {
  state.currentPage = 'error'
  state.errorMessage = message
}

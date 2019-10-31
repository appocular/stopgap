
export const loadSnapshot = async ({ state, actions, effects }, snapshotId) => {
  const snapshot = await effects.getSnapshotById(snapshotId)
  if (snapshot) {
    actions.setSnapshot(snapshot)
    if (snapshot.baseline_url) {
      actions.loadBaseline(snapshot.baseline_url)
    } else {
      state.baseline = null
    }
  }
  else {
    actions.setError('Error loading snapshot.')
  }
}

export const loadBaseline = async ({state, effects}, snapshotUrl) => {
  state.baseline = await effects.getSnapshotByUrl(snapshotUrl)
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

export const approveCurrentCheckpoint = async ({state, actions, effects}) => {
  await effects.checkpointAction(state.getCurrentCheckpoint, 'approve')
  actions.gotoNextUnknownCheckpoint()
}

export const rejectCurrentCheckpoint = async ({state, actions, effects}) => {
  await effects.checkpointAction(state.getCurrentCheckpoint, 'reject')
  actions.gotoNextUnknownCheckpoint()
}

export const ignoreCurrentCheckpoint = async ({state, actions, effects}) => {
  await effects.checkpointAction(state.getCurrentCheckpoint, 'ignore')
  actions.gotoNextUnknownCheckpoint()
}

export const gotoNextUnknownCheckpoint = async ({state, actions, effects}) => {
  const slugs = Object.keys(state.snapshot.checkpoints)
  const index = slugs.indexOf(state.currentCheckpoint)
  const next = slugs.slice(index + 1).find((slug) => {
    return state.snapshot.checkpoints[slug].status === 'unknown'
  })

  if (next) {
    effects.router.open('/' + state.snapshot.id + '/' + next)
  } else {
    // Refresh snapshot before going back.
    await actions.loadSnapshot(state.snapshot.id)
    effects.router.open('/' + state.snapshot.id)
  }
}

export const setSnapshot = ({state}, snapshot) => {
  // Group checkpoints by browser_size and indexed by slug.
  const grouped = snapshot.checkpoints.reduce((map, checkpoint) => {
    const size = checkpoint.meta && checkpoint.meta.browser_size ? checkpoint.meta.browser_size : ''
    if (!map.hasOwnProperty(size)) {
      map[size] = []
    }
    map[size][checkpoint.slug] = checkpoint
    return map
  }, {})
  snapshot.checkpoints = Object.values(grouped).reduce((map, checkpoints) => {
    map = {...map, ...checkpoints}
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

import { createConnect, createHook } from 'overmind-react'
import Appocular from './Appocular'
import page from 'page'

export const config = {
  onInitialize: ({ state, actions, effects }, instance) => {
    effects.router.initialize({
      '/': actions.showMessage,
      '/:snapshotId': actions.showSnapshot,
      '/:snapshotId/:checkpointId': actions.showCheckpoint
    });

  },
  state: {
    currentPage: '',
    snapshot: null,
    currentCheckpoint: null,
    getCurrentCheckpoint: ({currentCheckpoint, snapshot}) => {
      return snapshot ? snapshot.checkpoints[currentCheckpoint] : null
    }
  },
  actions: {
    loadSnapshot: async ({ state, actions, effects }, snapshotId) => {
      state.snapshot = null
      const snapshot = await effects.getSnapshotById(snapshotId)
      if (snapshot) {
        actions.setSnapshot(snapshot)
      }
      else {
        actions.setError('Error loading snapshot.')
      }
    },

    showMessage: ({state}) => {
      state.currentPage = 'message'
    },

    showSnapshot: async ({ state, actions }, params) => {
      state.currentPage = 'snapshot'
      if (!state.snapshot || state.snapshot.id != params.snapshotId) {
        await actions.loadSnapshot(params.snapshotId)
      }
    },

    showCheckpoint: async ({ state, actions }, params) => {
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
    },

    approveCurrentCheckpoint: async ({state, effects}) => {
      effects.checkpointAction(state.getCurrentCheckpoint, 'approve')
      effects.router.open('/' + state.snapshot.id)
    },

    rejectCurrentCheckpoint: async ({state, effects}) => {
      effects.checkpointAction(state.getCurrentCheckpoint, 'reject')
      effects.router.open('/' + state.snapshot.id)
    },

    ignoreCurrentCheckpoint: async ({state, effects}) => {
      effects.checkpointAction(state.getCurrentCheckpoint, 'ignore')
      effects.router.open('/' + state.snapshot.id)
    },

    setSnapshot: ({state}, snapshot) => {
      // Make checkpoints be indexed by id.
      snapshot.checkpoints = snapshot.checkpoints.reduce((map, checkpoint) => {
        map[checkpoint.id] = checkpoint
        return map
      }, {})
      state.snapshot = snapshot
    },

    setCurrentCheckpoint: ({state}, checkpointId) => {
      state.currentCheckpoint = checkpointId
    },

    setError: ({state}, message) => {
      state.currentPage = 'error'
      state.errorMessage = message
    }
  },
  effects: {
    router: {
      initialize(routes) {
        Object.keys(routes).forEach(url => {
          page(url, ({ params }) => routes[url](params))
        })
        page.start()
      },
      open: (url) => page.show(url)
    },

    getSnapshotById: (snapshotId) => {
      return Appocular.getSnapshotById(snapshotId)
    },

    checkpointAction: (checkpoint, action) => {
      return Appocular.checkpointAction(checkpoint, action)
    }
  }
}

export const connect = createConnect()
export const useOvermind = createHook()

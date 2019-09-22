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
    snapshotLoaded: false,
    snapshot: null,
    currentCheckpoint: null,
    getCurrentCheckpoint: ({currentCheckpoint, snapshot}) => {
      return snapshot ? snapshot.checkpoints[currentCheckpoint] : null
    }
  },
  actions: {
    loadSnapshot: async ({ state, effects }, snapshotId) => {
      state.snapshot = null
      state.snapshotLoaded = false
      const snapshot = await effects.getSnapshotById(snapshotId)
      if (snapshot) {
        // Make checkpoints be indexed by id.
        snapshot.checkpoints = snapshot.checkpoints.reduce((map, checkpoint) => {
          map[checkpoint.id] = checkpoint
          return map
        }, {})
        state.snapshot = snapshot
        state.snapshotLoaded = true
      }
      else {
        state.currentPage = 'error'
        state.errorMessage = 'Error loading snapshot.'
      }
    },

    showMessage: ({state}) => {
      state.currentPage = 'message'
    },

    showSnapshot: async ({ state, actions }, params) => {
      state.currentPage = 'snapshot'
      await actions.loadSnapshot(params.snapshotId)
    },

    showCheckpoint: async ({ state, actions }, params) => {
      state.currentPage = 'checkpoint'
      if (!state.snapshotLoaded) {
        await actions.loadSnapshot(params.snapshotId)
      }
      state.currentCheckpoint = params.checkpointId
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

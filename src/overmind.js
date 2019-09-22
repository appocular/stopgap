import { createConnect } from 'overmind-react'
import { createHook } from 'overmind-react'
import Appocular from './Appocular'
import page from 'page'

export const config = {
  onInitialize: ({ state, actions, effects }, instance) => {
    effects.router.initialize({
      '/': actions.showMessage,
      '/:snapshotId': actions.showSnapshot
    });

  },
  state: {
    currentPage: '',
    snapshotLoaded: false,
    snapshot: null
  },
  actions: {
    loadSnapshot: async ({ state, effects }, snapshotId) => {
      state.snapshot = null
      state.snapshotLoaded = false
      const snapshot = await effects.getSnapshotById(snapshotId)
      if (snapshot) {
        state.snapshot = snapshot
        state.snapshotLoaded = true
      }
    },

    showMessage: ({state}) => {
      state.currentPage = 'message'
    },

    showSnapshot: async ({ state, actions }, params) => {
      await actions.loadSnapshot(params.snapshotId)
      state.currentPage = 'snapshot'
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
    }
  }
}

export const connect = createConnect()
export const useOvermind = createHook()

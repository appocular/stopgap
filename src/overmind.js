import { Overmind } from 'overmind'
import { createConnect } from 'overmind-react'
import { createHook } from 'overmind-react'
import Appocular from './Appocular'

export const config = {
  state: {
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
    }
  },
  effects: {
    getSnapshotById: (snapshotId) => {
      return Appocular.getSnapshotById(snapshotId)
    }
  }
}

export const connect = createConnect()
export const useOvermind = createHook()

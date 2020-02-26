import { createConnect, createHook } from 'overmind-react'
import { merge, namespaced } from 'overmind/config'
import { state } from './state';
import { onInitialize } from './onInitialize';
import * as actions from './actions';
import * as effects from './effects';
import * as bugreport from './bugreport'

export const connect = createConnect()
export const useOvermind = createHook()

export const config = merge(
  {
    onInitialize,
    state,
    actions,
    effects,
  },
  namespaced({
    bugreport
  })
)

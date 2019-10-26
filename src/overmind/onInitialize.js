export const onInitialize = ({ state, actions, effects }, instance) => {
  effects.router.initialize({
    '/': actions.showMessage,
    '/:snapshotId': actions.showSnapshot,
    '/:snapshotId/:checkpointId': actions.showCheckpoint
  })
}

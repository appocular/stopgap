import page from 'page'
import Appocular from '../Appocular'

export const router = {
  initialize(routes) {
    Object.keys(routes).forEach(url => {
      page(url, ({ params }) => routes[url](params))
    })
    page.start()
  },
  open: (url) => page.show(url)
}

export const getSnapshotById = async (snapshotId) => {
  return Appocular.getSnapshotById(snapshotId)
}

export const getSnapshotByUrl = async (snapshotUrl) => {
  return Appocular.get(snapshotUrl)
}

export const checkpointAction = async (checkpoint, action) => {
  return Appocular.checkpointAction(checkpoint, action)
}


const put = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      crossDomain: true,
      headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_FRONTEND_TOKEN,
      }
    })
    if (!response.ok) {
      throw new Error("Network error")
    }
    // No response expected.
    return
  }
  catch (error) {
    return null
  }
}

const get = async (url) => {
  try {
    const response = await fetch(url, {
      crossDomain:true,
      headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_FRONTEND_TOKEN,
      }
    })
    if (!response.ok) {
      throw new Error("Network error")
    }
    return await response.json();
  }
  catch (error) {
    return null
  }
}

const getSnapshotById = async (id) => {
  return get(process.env.REACT_APP_APPOCULAR_URL + '/snapshot/' + id)
}

const checkpointAction = async (snapshot, action) => {
  await put(snapshot.actions[action])
  return await get(snapshot.self)
}

export const Appocular = {
  get,
  getSnapshotById,
  checkpointAction,
}

export default Appocular

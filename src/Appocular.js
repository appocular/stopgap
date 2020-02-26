
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

const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_FRONTEND_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

const getSnapshotById = async (id) => {
  return get(process.env.REACT_APP_APPOCULAR_URL + '/snapshot/' + id)
}

const checkpointAction = async (snapshot, action) => {
  await put(snapshot.actions[action])
}

const submitBug = async (url, email, description) => {
  await post(process.env.REACT_APP_APPOCULAR_URL + '/bugreport', {url, email, description})
}

export const Appocular = {
  get,
  getSnapshotById,
  checkpointAction,
  submitBug,
}

export default Appocular

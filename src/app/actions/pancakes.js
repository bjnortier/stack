import fetch from 'isomorphic-fetch'

export const readPancakesSuccess = (pancakes) => {
  return {
    type: 'READ_PANCAKES_SUCCESS',
    pancakes
  }
}

const readPancakesError = (message) => {
  return {
    type: 'READ_PANCAKES_ERROR',
    message
  }
}

const readPancakes = () => {
  return dispatch => {
    dispatch({
      type: `TRY_READ_PANCAKES`
    })
    let status
    return fetch('/api/pancakes', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(json => {
        if (status === 200) {
          dispatch(readPancakesSuccess(json))
        } else {
          dispatch(readPancakesError(json))
        }
      }, err => {
        console.error(err)
        dispatch(readPancakesError(err.message))
      })
  }
}

export const readPancakesIfNeeded = () => {
  return (dispatch, getState) => {
    const readingAll = getState().pancakes.readingAll
    switch (readingAll) {
      case 'in-progress':
      case 'done':
        return
      default:
        return dispatch(readPancakes())
    }
  }
}

export const rereadPancakes = () => {
  return (dispatch, getState) => {
    const readingAll = getState().pancakes.readingAll
    switch (readingAll) {
      case 'in-progress':
        return
      default:
        return dispatch(readPancakes())
    }
  }
}

export const readPancakeSuccess = (pancake) => {
  return {
    type: 'READ_PANCAKE_SUCCESS',
    pancake
  }
}

const readPancakeError = (id, message) => {
  return {
    type: 'READ_PANCAKE_ERROR',
    id,
    message
  }
}

const readPancake = (id) => {
  return dispatch => {
    dispatch({
      type: `TRY_READ_PANCAKE`,
      id
    })
    let status
    return fetch(`/api/pancake/${id}`, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(json => {
        if (status === 200) {
          dispatch(readPancakeSuccess(json))
        } else {
          dispatch(readPancakeError(id, json))
        }
      }, err => {
        console.error(err)
        dispatch(readPancakeError(id, err.message))
      })
  }
}

export const readPancakeIfNeeded = (id) => {
  return (dispatch, getState) => {
    const readingOne = getState().pancakes.readingOne[id]
    switch (readingOne) {
      case 'in-progress':
      case 'done':
        return
      default:
        return dispatch(readPancake(id))
    }
  }
}

export const rereadPancake = (id) => {
  return (dispatch, getState) => {
    const readingOne = getState().pancakes.readingOne[id]
    switch (readingOne) {
      case 'in-progress':
        return
      default:
        return dispatch(readPancake(id))
    }
  }
}

const createPancakeSuccess = (json) => {
  return {
    type: 'CREATE_PANCAKE_SUCCESS',
    pancake: json
  }
}

const createPancakeError = (message) => {
  return {
    type: 'CREATE_PANCAKE_ERROR',
    message
  }
}

export const createPancake = (object) => {
  return (dispatch) => {
    dispatch({
      type: 'SUBMIT_CREATE_PANCAKE',
      pancake: object
    })
    let status
    return fetch('/api/pancakes', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(json => {
        if (status === 201) {
          dispatch(createPancakeSuccess(json))
        } else {
          dispatch(createPancakeError(json))
        }
      }, err => {
        console.error(err)
        dispatch(createPancakeError(err.message))
      })
  }
}

const patchPancakeSuccess = pancake => {
  return {
    type: 'PATCH_PANCAKE_SUCCESS',
    pancake
  }
}

const patchPancakeError = (id, message) => {
  return {
    type: 'PATCH_PANCAKE_ERROR',
    id,
    message
  }
}

export const patchPancake = (id, params) => {
  return (dispatch) => {
    dispatch({
      type: 'SUBMIT_PATCH_PANCAKE',
      id,
      params
    })
    let status
    return fetch(`/api/pancake/${id}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...params })
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(json => {
        if (status === 200) {
          dispatch(patchPancakeSuccess(json))
        } else {
          dispatch(patchPancakeError(id, json))
        }
      }, err => {
        console.error(err)
        dispatch(patchPancakeError(id, err.message))
      })
  }
}

const deletePancakeSuccess = id => {
  return {
    type: 'DELETE_PANCAKE_SUCCESS',
    id
  }
}

const deletePancakeError = (id, message) => {
  return {
    type: 'DELETE_PANCAKE_ERROR',
    id,
    message
  }
}

export const deletePancake = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'SUBMIT_DELETE_PANCAKE',
      id
    })
    let status
    return fetch(`/api/pancake/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        status = response.status
        return response.json()
      })
      .then(json => {
        if (status === 200) {
          dispatch(deletePancakeSuccess(id))
        } else {
          dispatch(deletePancakeError(id, json))
        }
      }, err => {
        console.error(err)
        dispatch(deletePancakeError(id, err.message))
      })
  }
}

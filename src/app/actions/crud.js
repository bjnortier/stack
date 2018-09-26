import fetch from 'isomorphic-fetch'

// ---------- HTTP METHODS ----------

const httpGet = (path) => {
  return fetch(path, {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      return Promise.all([response.status, response.json()])
    })
}

const httpPost = (path, object) => {
  return fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
    .then(response => {
      return Promise.all([response.status, response.json()])
    })
}

const httpPatch = (path, params) => {
  return fetch(path, {
    method: 'PATCH',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...params })
  })
    .then(response => {
      return Promise.all([response.status, response.json()])
    })
}

const httpDelete = (path) => {
  return fetch(path, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return Promise.all([response.status, response.json()])
    })
}

// ---------- READ ALL ----------

export const readAllSuccess = (type, objects) => {
  return {
    type: `READ_${type.toUpperCase()}S_SUCCESS`,
    objects
  }
}

const readAllError = (type, message) => {
  return {
    type: `READ_${type.toUpperCase()}S_ERROR`,
    message
  }
}

export const readAll = (type) => {
  return dispatch => {
    dispatch({
      type: `TRY_READ_${type.toUpperCase()}S`
    })
    httpGet(`/api/${type}s`)
      .then(([status, json]) => {
        if (status === 200) {
          dispatch(readAllSuccess(type, json))
        } else {
          dispatch(readAllError(type, json))
        }
      }, err => {
        console.error(err)
        dispatch(readAllError(type, err.message))
      })
  }
}

export const readAllIfNeeded = (type) => {
  return (dispatch, getState) => {
    const readingAll = getState()[`${type}s`].readingAll
    switch (readingAll) {
      case 'in-progress':
      case 'done':
        return
      default:
        return dispatch(readAll(type))
    }
  }
}

export const rereadAll = (type) => {
  return (dispatch, getState) => {
    const readingAll = getState()[`${type}s`].readingAll
    switch (readingAll) {
      case 'in-progress':
        return
      default:
        return dispatch(readAll(type))
    }
  }
}

// ---------- READ ONE ----------

export const readOneSuccess = (type, object) => {
  return {
    type: `READ_${type.toUpperCase()}_SUCCESS`,
    object
  }
}

const readOneError = (type, id, message) => {
  return {
    type: `READ_${type.toUpperCase()}_ERROR`,
    id,
    message
  }
}

const readOne = (type, id) => {
  return dispatch => {
    dispatch({
      type: `TRY_READ_${type.toUpperCase()}`,
      id
    })
    httpGet(`/api/type/${id}`)
      .then(([status, json]) => {
        if (status === 200) {
          dispatch(readOneSuccess(type, json))
        } else {
          dispatch(readOneError(type, id, json))
        }
      }, err => {
        console.error(err)
        dispatch(readOneError(type, id, err.message))
      })
  }
}

export const readOneIfNeeded = (type, id) => {
  return (dispatch, getState) => {
    const readingOne = getState()[`${type}s`].readingOne[id]
    switch (readingOne) {
      case 'in-progress':
      case 'done':
        return
      default:
        return dispatch(readOne(type, id))
    }
  }
}

export const rereadOne = (type, id) => {
  return (dispatch, getState) => {
    const readingOne = getState()[`${type}s`].readingOne[id]
    switch (readingOne) {
      case 'in-progress':
        return
      default:
        return dispatch(readOne(type, id))
    }
  }
}

// ---------- CREATE ----------

const createSuccess = (type, object) => {
  return {
    type: `CREATE_${type.toUpperCase()}_SUCCESS`,
    object
  }
}

const createError = (type, message) => {
  return {
    type: `CREATE_${type.toUpperCase()}_ERROR`,
    message
  }
}

export const create = (type, params) => {
  return (dispatch) => {
    dispatch({
      type: `SUBMIT_CREATE_${type.toUpperCase()}`,
      params
    })
    httpPost(`/api/${type}s`)
      .then(([status, json]) => {
        if (status === 201) {
          dispatch(createSuccess(type, json))
        } else {
          dispatch(createError(type, json))
        }
      }, err => {
        console.error(err)
        dispatch(createError(type, err.message))
      })
  }
}

// ---------- PATCH ----------

const patchSuccess = (type, object) => {
  return {
    type: `PATCH_${type.toUpperCase()}_SUCCESS`,
    object
  }
}

const patchError = (type, id, message) => {
  return {
    type: `PATCH_${type.toUpperCase()}_ERROR`,
    id,
    message
  }
}

export const patch = (type, id, params) => {
  return (dispatch) => {
    dispatch({
      type: `SUBMIT_PATCH_${type.toUpperCase()}`,
      id,
      params
    })
    httpPatch(`/api/${type}/${id}`, params)
      .then(([status, json]) => {
        if (status === 200) {
          dispatch(patchSuccess(type, json))
        } else {
          dispatch(patchError(type, id, json))
        }
      }, err => {
        console.error(err)
        dispatch(patchError(type, id, err.message))
      })
  }
}

// ---------- DELETE ----------

const deleteSuccess = (type, id) => {
  return {
    type: `DELETE_${type.toUpperCase()}_SUCCESS`,
    id
  }
}

const deleteError = (type, id, message) => {
  return {
    type: `DELETE_${type.toUpperCase()}_ERROR`,
    id,
    message
  }
}

export const del = (type, id) => {
  return (dispatch) => {
    dispatch({
      type: `SUBMIT_DELETE_${type.toUpperCase()}`,
      id
    })
    httpDelete(`/api/${type}/${id}`)
      .then(([status, json]) => {
        if (status === 200) {
          dispatch(deleteSuccess(type, id))
        } else {
          dispatch(deleteError(type, id, json))
        }
      }, err => {
        console.error(err)
        dispatch(deleteError(type, id, err.message))
      })
  }
}

import { combineReducers } from 'redux'

const readingAll = (state0 = 'initial', action) => {
  switch (action.type) {
    case 'TRY_READ_PANCAKES': return 'in-progress'
    case 'READ_PANCAKES_SUCCESS': return 'done'
    case 'READ_PANCAKES_ERROR': return 'error'
    default: return state0
  }
}

const creating = (state0 = 'initial', action) => {
  switch (action.type) {
    case 'SUBMIT_CREATE_PANCAKE': return 'in-progress'
    case 'CREATE_PANCAKE_SUCCESS': return 'done'
    case 'CREATE_PANCAKE_ERROR': return 'error'
    default: return state0
  }
}

const patching = (state0 = {}, action) => {
  switch (action.type) {
    case 'SUBMIT_PATCH_PANCAKE': {
      return {
        ...state0,
        [action.id]: 'in-progress'
      }
    }
    case 'PATCH_PANCAKE_SUCCESS': {
      const state1 = { ...state0 }
      delete state1[action.pancake.id]
      return state1
    }
    case 'PATCH_PANCAKE_ERROR': {
      return {
        ...state0,
        [action.id]: 'error'
      }
    }
    default: return state0
  }
}

const deleting = (state0 = {}, action) => {
  switch (action.type) {
    case 'SUBMIT_DELETE_PANCAKE': {
      return {
        ...state0,
        [action.id]: 'in-progress'
      }
    }
    case 'DELETE_PANCAKE_SUCCESS': {
      const state1 = { ...state0 }
      delete state1[action.id]
      return state1
    }
    case 'DELETE_PANCAKE_ERROR': {
      return {
        ...state0,
        [action.id]: 'error'
      }
    }
    default: return state0
  }
}

const objects = (state0 = {}, action) => {
  switch (action.type) {
    case 'READ_PANCAKES_SUCCESS': {
      return action.pancakes.reduce((acc, pancake) => {
        acc[pancake.id] = pancake
        return acc
      }, {})
    }
    case 'READ_PANCAKE_SUCCESS':
    case 'PATCH_PANCAKE_SUCCESS': {
      const state1 = { ...state0 }
      state1[action.pancake.id] = action.pancake
      return state1
    }
    case 'CREATE_PANCAKE_SUCCESS': {
      const state1 = { ...state0 }
      state1[action.pancake.id] = action.pancake
      return state1
    }
    case 'DELETE_PANCAKE_SUCCESS': {
      const state1 = { ...state0 }
      delete state1[action.id]
      return state1
    }
    default:
      return state0
  }
}

export default combineReducers({
  readingAll,
  creating,
  patching,
  deleting,
  objects
})

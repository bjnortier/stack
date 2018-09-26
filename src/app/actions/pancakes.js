import { readAllIfNeeded, rereadAll, readOneIfNeeded, rereadOne, create, patch, del } from './crud'

export const readPancakesIfNeeded = () => readAllIfNeeded('pancake')
export const rereadPancakes = () => rereadAll('pancake')
export const readPancakeIfNeeded = (id) => readOneIfNeeded('pancake', id)
export const rereadPancake = (id) => rereadOne('pancake', id)
export const createPancake = (object) => create('pancake', object)
export const patchPancake = (id, params) => patch('pancake', id, params)
export const deletePancake = (id, params) => del('pancake', id)

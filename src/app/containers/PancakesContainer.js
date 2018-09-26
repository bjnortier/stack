import { connect } from 'react-redux'

import Pancakes from '../components/Pancakes'
import { readPancakesIfNeeded, rereadPancakes, createPancake, deletePancake, patchPancake } from '../actions/pancakes'

const mapStateToProps = (state) => {
  const { pancakes } = state
  return {
    readingAll: pancakes.readingAll,
    creating: pancakes.creating,
    patching: pancakes.patching,
    deleting: pancakes.deleting,
    pancakes: pancakes.objects
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReadPancakesIfNeeded: () => dispatch(readPancakesIfNeeded()),
    onRereadPancakes: () => dispatch(rereadPancakes()),
    onCreate: () => dispatch(createPancake()),
    onDelete: (id) => dispatch(deletePancake(id)),
    onPatch: (id, params) => dispatch(patchPancake(id, params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pancakes)

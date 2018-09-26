import { connect } from 'react-redux'

import Pancakes from '../components/Pancakes'

const mapStateToProps = (state) => {
  const { pancakes } = state
  return {
    pancakes: pancakes.objects
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreate: () => console.log('create!')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pancakes)

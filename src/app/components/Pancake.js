import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { IconButton, Checkbox } from 'minimui'

class Pancake extends Component {
  render () {
    const { pancake, onDelete, deleting, onPatch, patching } = this.props
    return <tr>
      <td>{pancake.name}</td>
      <td><Checkbox
        value={pancake.ready}
        onChange={(event, value) => onPatch({ ready: value })}
        error={patching === 'error'}
        inProgress={patching === 'in-progress'}
        label='Ready'
      /></td>
      <td><IconButton
        icon={faTrashAlt}
        onClick={() => onDelete()}
        error={deleting === 'error'}
        inProgress={deleting === 'in-progress'}
      /></td>
    </tr>
  }
}

Pancake.propTypes = {
  pancake: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleting: PropTypes.string.isRequired,
  onPatch: PropTypes.func.isRequired,
  patching: PropTypes.string.isRequired
}

export default Pancake

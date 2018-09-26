import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { IconButton, TextButton, Dialog, Header, Footer, HSpace } from 'minimui'

import Pancake from './Pancake'

const Center = styled.div`
  margin: 20px auto;
  text-align: center;
  > div {
    text-align: left;
  }
`

class Pancakes extends Component {
  componentDidMount () {
    this.props.onReadPancakesIfNeeded()
  }

  render () {
    const { pancakes, onCreate, creating, onRereadPancakes, readingAll } = this.props
    const { onDelete, deleting, onPatch, patching } = this.props
    const sorted = Object.keys(pancakes).map(key => pancakes[key])
    let table
    if (sorted.length) {
      table = <table><tbody>{sorted.map(p => <Pancake
        key={p.id}
        pancake={p}
        deleting={deleting[p.id] || 'initial'}
        onDelete={() => onDelete(p.id)}
        patching={patching[p.id] || 'initial'}
        onPatch={(params) => onPatch(p.id, params)}
      />)}</tbody></table>
    } else {
      table = 'None'
    }
    return <Center><Dialog>
      <Header>
        <span>Pancakes<HSpace /></span>
        <IconButton
          borderColor='transparent'
          backgroundColor='transparent'
          icon={faSyncAlt}
          inProgress={readingAll === 'in-progress'}
          error={readingAll === 'error'}
          onClick={onRereadPancakes}
        />
      </Header>
      {table}
      <Footer>
        <TextButton
          label='Create'
          onClick={onCreate}
          inProgress={creating === 'in-progress'}
          error={creating === 'error'}
        />
      </Footer>
    </Dialog></Center>
  }
}

Pancakes.propTypes = {
  pancakes: PropTypes.object.isRequired,
  readingAll: PropTypes.string.isRequired,
  onReadPancakesIfNeeded: PropTypes.func.isRequired,
  onRereadPancakes: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  creating: PropTypes.string.isRequired,
  onPatch: PropTypes.func.isRequired,
  patching: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  deleting: PropTypes.object.isRequired
}

export default Pancakes

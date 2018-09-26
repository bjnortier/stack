import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TextButton, Dialog, Header, Footer } from 'minimui'

const Center = styled.div`
  margin: 20px auto;
  text-align: center;
  > div {
    text-align: left;
  }
`

class Pancakes extends Component {
  componentDidMount () {
  }

  render () {
    const { pancakes, onCreate } = this.props
    const sorted = Object.keys(pancakes).map(key => pancakes[key])
    let table
    if (sorted.length) {
      table = <div>{sorted.map((p, i) => <div key={i}>{p.name}</div>)}</div>
    } else {
      table = 'None'
    }
    return <Center><Dialog>
      <Header>
        <span>Pancakes</span>
      </Header>
      {table}
      <Footer>
        <TextButton
          label='Create'
          onClick={onCreate}
        />
      </Footer>
    </Dialog></Center>
  }
}

Pancakes.propTypes = {
  pancakes: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default Pancakes

import React from 'react'
import { Route, HashRouter, Switch, Link } from 'react-router-dom'
import { render } from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { Reset } from 'minimui'

import Pancake from './pancake.test'

const StyledNav = styled.div`
  padding: 8px;
`

const White = createGlobalStyle`
  body {
    background-color: white;
  }
`

const Nav = () => <StyledNav>
  <Link to={'/pancake'}>Pancake</Link>
</StyledNav>

render(<HashRouter>
  <div>
    <Reset />
    <White />
    <Nav />
    <Switch>
      <Route exact path='/pancake' component={Pancake} />
    </Switch>
  </div>
</HashRouter>, document.getElementById('contents'))

import React from 'react'

import Pancake from '../../src/app/components/Pancake'

export default () => <table><tbody>
  <Pancake
    pancake={{ name: 'belgian', ready: false }}
    onDelete={() => console.log('delete')}
    deleting='initial'
    onPatch={(params) => console.log('onPatch:', params)}
    patching='initial'
  />
</tbody></table>

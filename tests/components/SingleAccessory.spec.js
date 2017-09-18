import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
chai.use(require('sinon-chai'))
import SingleAccessory from '../../client/components/SingleAccessory'

describe('<SingleAccessory />', () => {
  let selectedAccessory = {
      category: "toys",
      created_at: "2017-09-17T22:48:06.786Z",
      description: "Small mouse",
      id: 3,
      imageUrl: "https://i.pinimg.com/736x/c0/ed/53/c0ed532905a1c9e4f3b39269c2967d80--photo-editor-online-disney-mickey.jpg",
      name: "Minnie"
    }

  let root
  let wrapperComponent;

  beforeEach('render the root', () => {
    root = shallow(<SingleAccessory accessory={selectedAccessory} />)
    
  })
  it('renders the accessory name', () => {
    expect(root.findWhere(n => n.text() == 'Minnie'))
  })
  it('shows an accessory info', () => {
    expect(root.findWhere(n => n.className === "list-group-item min-content accessory-item"))
  })
  it('wrapper component shows a div', () => {
    expect(root.findWhere(n => n.className === "div"))
  })

})

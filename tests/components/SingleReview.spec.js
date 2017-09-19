import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
chai.use(require('sinon-chai'))
import SingleReview from '../../client/components/SingleReview'

describe('<SingleReview />', () => {
  let selectedReview = {
    content: 'a purrfect spot to curl up next to',
    star: 4,
    accessoryId: 28,
    userId: 3
  }

  let root
  let wrapperComponent;

  beforeEach('render the root', () => {
    root = shallow(<SingleReview review={selectedReview} />)

  })
  it('renders the content', () => {
    expect(root.findWhere(n => n.text() == 'a purrfect spot to curl up next to'))
  })
  it('renders the reviewer\'s name', () => {
    expect(root.findWhere(n => n.text() === "Raz"))
  })
  it('wrapper component shows a div', () => {
    expect(root.findWhere(n => n.className === "div"))
  })

})

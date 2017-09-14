import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {UserProfile} from '../../client/components/UserProfile'

describe('UserProfile', () => {
  let userProfile

  beforeEach(() => {
    userProfile = shallow(<UserProfile user={name:'Bob', email:'bob@bob.com', shipping_address:'5 Hanover'} />)
  })

  it('renders the greeting in an h1', () => {
    expect(userHome.find('h1').text()).to.be.equal('Hello, Bob')
  })
})

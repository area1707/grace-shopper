import {expect} from 'chai';
import cartReducer,{receiveLineItem} from '../../client/reducers/cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const mockAxios = new MockAdapter(axios)
const middlewares = [thunkMiddleware]
const mockStore = configureStore(middlewares)

describe('thunk creators', () => {
  let store

  const initialState = {
    lineItems: []
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    store.clearActions()
  })

  it('has expected initial state', () => {
    expect(store.getState()).to.be.deep.equal({lineItems: []})
  });

  describe('add items to cart', () => {
    it('addToCart: eventually dispatches the RECEIVE_LINE_ITEM action', () => {
      const fakeItem = {
        category: "toys",
        created_at: "2017-09-17T22:48:06.786Z",
        description: "Small mouse",
        id: 3,
        imageUrl: "https://i.pinimg.com/736x/c0/ed/53/c0ed532905a1c9e4f3b39269c2967d80--photo-editor-online-disney-mickey.jpg",
        name: "Minnie"
      }
      mockAxios.onPost('/api/cart').replyOnce(201, fakeItem)
      return store.dispatch(receiveLineItem(fakeItem))
        .then(() => {
          const actions = store.getActions()
          console.log('actions inside test', actions)
          expect(actions[0].type).to.be.equal('RECEIVE_LINE_ITEM')
          expect(actions[0].lineItem).to.be.deep.equal(fakeItem)
        })
    })
  })
})

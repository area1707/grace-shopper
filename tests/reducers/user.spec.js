import {expect} from 'chai';
import userReducer,{addUser} from '../../client/reducers/users';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const mockAxios = new MockAdapter(axios)
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store

  const initialState = []

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    store.clearActions()
  })

  it('has expected initial state', () => {
    expect(store.getState()).to.be.deep.equal([]);
  });

  describe('add new user', () => {
    it('addUser: eventually dispatches the CREATE action', () => {
      const fakeUser = {
          name: 'Bob',
          email: 'bob@bob.com',
          shipping_address: '5 Hanover'
      }
      mockAxios.onPost('/api/users').replyOnce(200, fakeUser)
      return store.dispatch(addUser())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE')
          expect(actions[0].user).to.be.deep.equal(fakeUser)
        })
    })
  })
})

import {expect} from 'chai';
import loginReducer,{createNewUser} from '../../client/reducers/login';
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

  describe('add new user after sign up', () => {
    it('createNewUser: eventually dispatches the CREATE_USER action', () => {
      const fakeUser = {
          name: 'Bob',
          email: 'bob@bob.com',
          password: 'passaword'
      }
      const fakeUser1 = {
        name: 'Sob',
        email: 'sob@bob.com',
        password: 'passaword'
      }
      mockAxios.onPost('/signup').replyOnce(201, fakeUser)
      return store.dispatch(createNewUser(fakeUser))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE_USER')
          expect(actions[0].user).to.be.deep.equal(fakeUser)
        })
    })
  })
})

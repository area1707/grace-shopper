import {expect} from 'chai';

import {createStore} from 'redux';
import userReducer from '../../client/reducers/users';

describe('User reducer', () => {

    let testStore, fakeUser;
    beforeEach('Create testing store and fake user', () => {
        testStore = createStore(userReducer);
        fakeUser = {
            name: 'Bob',
            email: 'bob@bob.com',
            shipping_address: '5 Hanover'
          }
    });

    it('has expected initial state', () => {
        expect(testStore.getState()).to.be.deep.equal([]);
    });

    describe('CREATE', () => {

        it('creates new user and adds to users array', () => {
            testStore.dispatch({ type: 'CREATE', user: fakeUser });
            const newState = testStore.getState();
            expect(newState.users).to.be.deep.equal([fakeUser]);
        });

    });

});
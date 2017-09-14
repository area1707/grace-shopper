import {expect} from 'chai';

import {createStore} from 'redux';
import userReducer from '../../client/reducers/users';

describe('User reducer', () => {

    let testStore;
    beforeEach('Create testing store', () => {
        testStore = createStore(userReducer);
    });

    it('has expected initial state', () => {
        expect(testStore.getState()).to.be.deep.equal({
            users: []
        });
    });

    describe('CREATE', () => {

        it('creates new user and adds to users array', () => {
            testStore.dispatch({ type: 'CREATE', user: {userObj} });
            const newState = testStore.getState();
            expect(newState.users).to.be.deep.equal([{userObj}]);
        });

    });

});
import React from 'react';
import { connect } from 'react-redux';
import {verifyUser} from '../reducers/login';
import store from '../store';
import {withRouter} from 'react-router';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
                <label>password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  required
                />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();
    const { message, currentUser } = this.props;
    const email = event.target.email.value
    const password = event.target.password.value
    store.dispatch(verifyUser({email, password}))
    this.props.history.push('/')
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({
  message: 'Log in',
  currentUser: state.currentUser
});
const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(Login))

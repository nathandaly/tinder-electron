// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { Message, Grid, Image } from 'semantic-ui-react';
import FacebookAuthButton from '../components/FacebookLoginButton';
import tinderAuthAction from '../actions/TinderAuthentication';

class SingleSignOn extends Component {
  constructor(props) {
    super(props);

    ipcRenderer.on('facebook-auth-is-success', (event, data) => {
      this.generateTinderAuthenticationTokn(data);
    });
  }

  componentDidMount = () => {
    ipcRenderer.send('auth-component-did-mount');
  };

  loginWithFacebook = () => {
    ipcRenderer.send('fb-authenticate');
  };

  generateTinderAuthenticationTokn = tokenData => {
    this.props.tinderAuthAction(tokenData, hasError => {
      if (!hasError) {
        this.props.history.push('/home');
      }
    });
  };

  render() {
    let errMessage = null;
    const authenticationObject = this.props.authentication;

    if (authenticationObject.error) {
      errMessage = (
        <Message color="red">{authenticationObject.payload}</Message>
      );
    }

    return (
      <div>
        {errMessage}
        <Grid centered padded>
          <Grid.Row padded="vertically" />
          <Grid.Row padded="vertically" />
          <Grid.Row padded="vertically" />
          <Grid.Row centered>
            <Image src="../resources/images/logo-zoomed.png" />
          </Grid.Row>
          <Grid.Row padded="vertically" />
          <Grid.Row padded="vertically" />
          <Grid.Row padded="vertically" />
          <Grid.Row centered>
            <FacebookAuthButton signInAction={() => this.loginWithFacebook()} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

SingleSignOn.defaultProps = {
  tinderAuthAction: {},
  authentication: {},
  history: {}
};

SingleSignOn.propTypes = {
  tinderAuthAction: PropTypes.func,
  authentication: PropTypes.shape({}),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

/**
 * @param state
 * @returns {{}}
 */
const mapStateToProps = ({ authentication }) => authentication;

/**
 * @param dispatch
 * @return {{signUpAction: *}|B|N}
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      tinderAuthAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleSignOn);

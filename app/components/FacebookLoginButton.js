// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

export const FacebookLoginButton = ({ signInAction }) => (
  <div>
    <Button onClick={signInAction} color="facebook" size="big">
      <Icon name="facebook" /> LOGIN WITH FACEBOOK
    </Button>
  </div>
);

FacebookLoginButton.defaultProps = {
  signInAction: {}
};

FacebookLoginButton.propTypes = {
  signInAction: PropTypes.func
};

export default FacebookLoginButton;

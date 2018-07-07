// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import Navigation from '../components/Navigation';

type Props = {
  children: React.NodeProps
};

class App extends React.Component<Props> {
  render() {
    const { authentication } = this.props;
    let loader = null;
    let navigation = null;

    console.log(authentication);

    if (authentication.loading) {
      loader = (
        <Dimmer active>
          <Loader active inline="centered" />
        </Dimmer>
      );
    }

    if (authentication.payload !== null) {
      navigation = <Navigation />;
    }

    return (
      <Container textAlign="center" fluid>
        {loader}
        <div>{this.props.children}</div>
        {navigation}
      </Container>
    );
  }
}

App.defaultProps = {
  authentication: {}
};

App.propTypes = {
  authentication: PropTypes.shape({
    payload: PropTypes.shape({
      token: PropTypes.string
    })
  })
};

/**
 * @param state
 * @returns {{}}
 */
const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps, {})(App);

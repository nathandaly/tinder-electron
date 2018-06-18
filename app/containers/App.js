// @flow
import * as React from 'react';
import Navigation from '../components/Navigation';
import { Container } from 'semantic-ui-react'

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <Container textAlign='center' fluid>
        <div>{this.props.children}</div>
        <Navigation />
      </Container>
    );
  }
}

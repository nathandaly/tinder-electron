// @flow
import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';

type Props = {};

export default class Matches extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <List celled>
          <List.Item>
            <Image avatar src="/images/avatar/small/helen.jpg" />
            <List.Content>
              <List.Header>Snickerdoodle</List.Header>
              An excellent companion
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
}

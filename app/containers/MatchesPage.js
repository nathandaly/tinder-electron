// @flow
import React, { Component } from 'react';
import { Comment, Header } from 'semantic-ui-react';
import MatchListItem from '../components/MatchListItem';

type Props = {};

export default class MatchesPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <Comment.Group>
        <Header as="h2">Comments</Header>
        <MatchListItem />
      </Comment.Group>
    );
  }
}

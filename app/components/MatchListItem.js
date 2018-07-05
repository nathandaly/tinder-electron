// @flow
import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';

type Props = {};

export default class MatchListItem extends Component<Props> {
  props: Props;

  render() {
    return (
      <Comment>
        <Comment.Avatar src="../resources/images/daniel.jpg" />
        <Comment.Content>
          <Comment.Author as="a">Matt</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

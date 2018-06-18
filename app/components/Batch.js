// @flow
import React, { Component } from 'react';
import { Grid, Card } from 'semantic-ui-react';

type Props = {};
const src =
  'https://react.semantic-ui.com/assets/images/avatar/large/daniel.jpg';

export default class Batch extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Grid centered padded>
          <Grid.Row columns={1}>
            <Card.Group itemsPerRow={3}>
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
              <Card raised image={src} />
            </Card.Group>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

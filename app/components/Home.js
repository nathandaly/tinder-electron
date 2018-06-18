// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Icon, Image, Menu, Button } from 'semantic-ui-react'
import styles from './Home.css';
import UserCard from "./UserCard";

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Grid centered padded>
          <Grid.Row textAlign='left' columns={1}>
            <UserCard
              name='Hannah'
              age='30'
              about='Likes sex with Amir.'
              distance={31}
              mutualFriends={2}
            />
          </Grid.Row>

          <Grid.Row columns={1}>
            <Button.Group size='huge' fluid>
              <Button negative icon><Icon name='close' /></Button>
              <Button.Or />
              <Button positive icon><Icon name='like' /></Button>
            </Button.Group>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

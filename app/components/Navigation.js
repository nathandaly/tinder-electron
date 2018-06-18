// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react'

type Props = {};

class Navigation extends Component<Props> {
  state = { activeItem: 'users' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const menuItems = {
      users: {
        icon: 'fire',
        color: 'red',
        link: '/'
      },
      bulk: {
        icon: 'users',
        color: 'orange',
        link: '/'
      },
      messages: {
        icon: 'chat',
        color: 'pink',
        link: '/'
      },
      settings: {
        icon: 'setting',
        color: 'green',
        link: '/'
      }
    }

    return (
      <Menu fixed='bottom' icon='labeled' widths={4}>
        {Object.keys(menuItems).map(item => (
          <Menu.Item
            name={item}
            active={activeItem === item}
            onClick={this.handleItemClick}
            color={menuItems[item].color}
            as={Link}
            to={menuItems[item].link}
          >
            <Icon name={menuItems[item].icon} />
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

export default Navigation
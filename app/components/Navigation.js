// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

type Props = {};

class Navigation extends Component<Props> {
  state = { activeItem: 'users' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const menuItems = {
      users: {
        id: 'home',
        icon: 'fire',
        color: 'red',
        link: '/home'
      },
      bulk: {
        id: 'batch',
        icon: 'users',
        color: 'orange',
        link: '/batch'
      },
      messages: {
        id: 'matches',
        icon: 'chat',
        color: 'blue',
        link: '/matches'
      },
      settings: {
        id: 'setting',
        icon: 'setting',
        color: 'grey',
        link: '/setting'
      }
    };

    return (
      <Menu fixed="bottom" icon="labeled" widths={4}>
        {Object.keys(menuItems).map(item => (
          <Menu.Item
            key={item.id}
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
    );
  }
}

export default Navigation;

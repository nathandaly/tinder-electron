import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';

const UserCard = ({ name, age, about, distance, mutualFriends, image }) => (
  <Card fluid raised>
    <Image src={image} />
    <Card.Content>
      <Card.Header>
        {name}, {age}
      </Card.Header>
      <Card.Meta>
        <span className="">
          <Icon name="map marker" />
          {distance} kilometers away
        </span>
      </Card.Meta>
      <Card.Description>{about}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="user" />
        {mutualFriends} Mutial friends
      </a>
    </Card.Content>
  </Card>
);

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  mutualFriends: PropTypes.number.isRequired,
  image: PropTypes.string
};

UserCard.defaultProps = {
  image: 'https://semantic-ui.com/images/avatar2/large/rachel.png'
};

export default UserCard;

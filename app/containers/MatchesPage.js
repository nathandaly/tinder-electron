// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, message, Avatar, Spin } from 'antd';
import {
  WindowScroller,
  AutoSizer,
  VList,
  InfiniteLoader
} from 'react-virtualized';
import fetchUserMatches from '../actions/UserMatches';
import baseRequest from '../utils/RequestInstance';

class MatchesPage extends Component {
  state = {
    data: [],
    loading: false
  };

  componentDidMount() {
    console.log('COMPONENT MOUNTED');
    console.log(this.props);

    this.props.fetchUserMatches(null, hasError => {
      if (!hasError) {
        this.setState({
          data: this.props.matches
        });
      }
    });
  }

  loadedRowsMap = {};

  getData = callback => {
    console.log('token', this.props.authentication.payload.token);
    baseRequest.get(
      {
        url: '/user/matches',
        headers: {
          'X-Auth-Token': this.props.authentication.payload.token
        }
      },
      (error, httpResponse, body) => {
        console.log([error, httpResponse, body]);
        if (!error && httpResponse.statusCode === 200) {
          callback(body);
        }
      }
    );
  };

  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    let { data } = this.state;

    this.setState({
      loading: true
    });

    for (let i = startIndex; i <= stopIndex; i += 1) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }

    if (data.length > 19) {
      message.warning('Virtualized List loaded all');
      this.setState({
        loading: false
      });
      return;
    }

    this.getData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];

    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a href="https://ant.design">{item.name.last}</a>}
          description={item.email}
        />
        <div>Content</div>
      </List.Item>
    );
  };

  render() {
    const { data } = this.state;
    const vlist = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
      width
    }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered
    }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width
          })
        }
      </AutoSizer>
    );
    const infiniteLoader = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop
    }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered
          })
        }
      </InfiniteLoader>
    );
    return (
      <List>
        {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
        {this.state.loading && <Spin className="demo-loading" />}
      </List>
    );
  }
}

MatchesPage.defaultProps = {
  authentication: {},
  fetchUserMatches: {},
  matches: {}
};

MatchesPage.propTypes = {
  authentication: PropTypes.shape({
    payload: PropTypes.shape({
      token: PropTypes.string
    })
  }),
  fetchUserMatches: PropTypes.func,
  matches: PropTypes.shape({
    payload: PropTypes.shape({
      token: PropTypes.string
    })
  })
};

/**
 * @param state
 * @returns {{}}
 */
const mapStateToProps = ({ authentication, matches }) => ({
  authentication,
  matches
});

/**
 * @param dispatch
 * @return {{signUpAction: *}|B|N}
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserMatches
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MatchesPage);

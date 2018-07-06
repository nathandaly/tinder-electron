// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, message, Avatar, Spin } from 'antd';
import {
  WindowScroller,
  AutoSizer,
  VList,
  InfiniteLoader
} from 'react-virtualized';
import baseRequest from '../utils/RequestInstance';

class MatchesPage extends Component {
  state = {
    data: [],
    loading: false
  };

  componentDidMount() {
    console.log('COMPONENT MOUNTED');
    this.getData(res => {
      this.setState({
        data: res.results
      });
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
  authentication: {}
};

MatchesPage.propTypes = {
  authentication: PropTypes.shape({
    payload: PropTypes.shape({
      token: PropTypes.string
    })
  })
};

/**
 * @param state
 * @returns {{}}
 */
const mapStateToProps = ({ authentication }) => authentication;

export default connect(mapStateToProps, {})(MatchesPage);

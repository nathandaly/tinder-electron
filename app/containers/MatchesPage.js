// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Avatar, Spin } from 'antd';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

import fetchUserMatches from '../actions/UserMatches';

class MatchesPage extends Component {
  state = {
    data: [],
    loading: false
  };

  componentDidMount() {
    this.getData(response => {
      console.log('matches', response.matches);
      const matches = response.matches.slice().reverse();
      this.setState({
        data: matches
      });
    });
  }

  loadedRowsMap = {};

  getData = callback => {
    this.props.fetchUserMatches(null, hasError => {
      if (!hasError) {
        console.log(this.props.matches.payload.matches[0]);
        callback(this.props.matches.payload);
      }
    });
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

    if (data.length > 100) {
      this.setState({
        loading: false
      });
      return;
    }

    this.getData(res => {
      const matches = res.data.matches.slice().reverse();
      this.setState({
        data: matches
      });
    });

    this.getData(response => {
      data = data.concat(response.data.matches);
      const matches = data.slice().reverse();
      this.setState({
        data: matches,
        loading: false
      });
    });
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];

    let messageString = '';

    if (item.messages.length > 0) {
      messageString = item.messages[item.messages.length - 1].message;
    }

    const avatar = item.person.photos;

    return (
      <a href="https://ant.design">
        <List.Item key={key} style={style} as="link">
          <List.Item.Meta
            avatar={
              <Avatar
                shape="circle"
                size="large"
                src={
                  avatar[avatar.length - 1].processedFiles[
                    avatar[avatar.length - 1].processedFiles.length - 1
                  ].url
                }
              />
            }
            title={item.person.name}
            description={messageString}
          />
        </List.Item>
      </a>
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
  fetchUserMatches: {},
  matches: {}
};

MatchesPage.propTypes = {
  fetchUserMatches: PropTypes.func,
  matches: PropTypes.shape({
    payload: PropTypes.shape({
      matches: PropTypes.array
    })
  })
};

/**
 * @param state
 * @returns {{}}
 */
const mapStateToProps = ({ matches }) => ({ matches });

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

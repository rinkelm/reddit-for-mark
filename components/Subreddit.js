import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions/subreddit'
// import Picker from '../components/Picker'
import Posts from './Posts'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    return (
      <View>
        {/* <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        /> */}
        <View>
          {/* {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )} */}
        </View>
        {isFetching && posts.length === 0 && <Text>Loading...</Text>}
        {!isFetching && posts.length === 0 && <Text>Empty.</Text>}
        {posts.length > 0 && (
          <View style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </View>
        )}
      </View>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
      isFetching: true,
      items: []
    }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
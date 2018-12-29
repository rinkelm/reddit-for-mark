import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

// TODO: move to util file
const win = Dimensions.get('window');

export default class Posts extends Component {
  state = {
    showImage: true,
  }

  showImage() {

  }

  render() {
    return (
      <View>
        {this.props.posts.map((post, i) => {
          console.log('post', post);
          const image = post.thumbnail || "";
          //const image = ((((post || {}).preview || {}).images || [{}])[0].source || {}).url;
          return (
            <View key={i}>
              <View style={styles.post}>
                <Image style={{ width: 50, height: 50 }} source={{ uri: image }}></Image>
                <View style={styles.postText}>
                  <View style={styles.preTitle}>
                    <Text style={styles.subreddit}>{post.subreddit_name_prefixed}</Text>
                    <Text style={styles.timestamp}>{` - 8h`}</Text>
                  </View>
                  <Text style={styles.postTitle}>{post.title}</Text>
                </View>
              </View>
              <View style={styles.post}>
                {this.state.showImage && <Image resizeMode={'contain'} style={{ flex: 1, width: win.width, height: win.height }} source={{ uri: post.url }}></Image>}
              </View>
            </View>
          )
        })
        }
      </View>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  post: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    maxWidth: '100%',
  },
  preTitle: {
    display: 'flex',
    flexDirection: 'row',
  },
  subreddit: {
    color: '#0099ff',
  },
  postText: {
    flex: 1,
    paddingLeft: 10,
  },
  postTitle: {
    fontSize: 16,
  },
  timestamp: {
    color: '#a5a4b8',
  }
});
import React from 'react';
import axiosInstance from './service';

export default function withHNState(Component) {
  return class HNState extends React.Component {

    state = {
      storiesIds: [],
      stories: []
    }

    getStoriesIds = (cb) => {
      axiosInstance.get('/topstories.json')
        .then(({ data }) => {
            this.setState({ storiesIds: data }, cb);
        });
    };

    getStories = (storiesIds) => {
      const storiesPromise = storiesIds.map(
        (storieId) => {
          return axiosInstance.get(`/item/${storieId}.json`)
          .then(({ data }) => data)
          .catch((request) => request);
        }
      );

      Promise.all(storiesPromise)
      .then(stories => {
          this.setState({
              stories
          });
      });
    }

    render() {
      return <Component 
        {...this.props}
        {...this.state}
        getStoriesIds={this.getStoriesIds}
        getStories={this.getStories}
      />
    }
  }
}

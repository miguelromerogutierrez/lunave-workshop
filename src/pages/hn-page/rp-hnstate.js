import React from 'react';
import axios from 'axios';
import shallowequal from 'shallowequal';

let axiosInstance = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  params: {
    print: 'pretty'
  }
});

export default class HNState extends React.Component {

  state = {
    pending: false,
    stories: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (!shallowequal(prevProps.storiesIds, this.props.storiesIds)) {
      this.getStories();
    }
  }


  getStories = () => {
    this.setState({ pending: true })
    const storiesPromise = this.props.storiesIds.map(
      (storieId) => {
        return axiosInstance.get(`/item/${storieId}.json`)
          .then(({ data }) => data)
          .catch((request) => request);
      }
    );

    Promise.all(storiesPromise)
      .then(stories => {
        this.setState({
          pending: false,
          stories
        });
      });
  }

  render() {
    return this.props.children({
      stories: this.state.stories,
      pending: this.state.pending
    });
  }
}
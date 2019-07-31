import React from 'react';
import { connect } from 'react-redux';
import shallowequal from 'shallowequal';

import axiosInstance from '../service';

class HNPage extends React.Component {

  state = {
    stories: [],
  }

  componentDidMount() {
    this.props.getStoriesIds();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!shallowequal(prevProps.storiesIds, this.props.storiesIds)) {
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
              stories
          });
      });
    }
  }
  
  render() {
    if (this.props.pending || this.props.storiesIds.length === 0) {
      return <p>Cargando Stories Ids...</p>
    }
    return <div>
      <div>
        <button onClick={this.props.nextIds}>Siguiente</button>
      </div>
      {
        this.state.stories.map(story => (
          <p>{story.title}</p>
        ))
      }
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    storiesIds: state.storiesIds.elementsToDisplay,
    pending: state.storiesIds.pending
  };
};

const mapDispatchersToProps = (dispatch) => {
  return {
    setPendingStoriesIds: () => {
      dispatch({
        type: 'PENDING_RETRIEVE_STORIES_IDS'
      });
    },
    getStoriesIds: () => {
      axiosInstance.get('/topstories.json')
      .then((request) => {
        dispatch({
          type: 'SAVE_RETRIEVE_STORIES_IDS',
          payload: request.data
        });
      })
    },
    nextIds: () => {
      dispatch({
        type: 'NEXT_ELEMENTS'
      });
    }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchersToProps);

export default withConnect(HNPage);

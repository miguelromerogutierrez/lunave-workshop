import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import shallowequal from 'shallowequal';

import Pagination from './render-prop-pagination';
// import withHOCPagination from './hoc-pagination';

let storiesRef = [];
class HNPage extends React.Component {

  state = {
    stories: [],
    storiesIds: []
  };

  componentDidMount() {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then((request) => {
        this.setState({
          storiesIds: request.data
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!shallowequal(prevProps.itemsPage, this.props.itemsPage)) {
      const storiesPromise = this.props.itemsPage.map(
        (storieId) => {
          return axios.get(`https://hacker-news.firebaseio.com/v0/item/${storieId}.json?print=pretty`)
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

  retrieveStories = (items) => {
    debugger;
    if (!shallowequal(items, storiesRef)) {
      storiesRef = items;
      const storiesPromise = items.map(
        (storieId) => {
          return axios.get(`https://hacker-news.firebaseio.com/v0/item/${storieId}.json?print=pretty`)
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
    return (
      <div>
        <Pagination data={this.state.storiesIds} itemsPerPage={15} >
          {
            (
              {
                nextPage,
                prevPage,
                itemsPage
              }
            ) => {
              this.retrieveStories(itemsPage);
              if (this.state.stories.length === 0)
                return <p>Cargando historias...</p>
              return (
                <div>
                  <div>
                    <button onClick={prevPage}>Anterior</button>
                    <button onClick={nextPage}>Siguiente</button>
                  </div>
                  {
                    this.state.stories.map((story) => (
                      <div key={story.id}>
                        {story.title}
                      </div>
                    ))
                  }
                </div>
              );
            }
          }
        </Pagination>
      </div>
    );
  }
}

HNPage.propTypes = {

}

// export default withHOCPagination(HNPage);
export default HNPage;

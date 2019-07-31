import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import shallowequal from 'shallowequal';

import withHOCPagination from './hoc-pagination';
import withHOCHNState from './hoc-hnstate';

class HNPage extends React.Component {
  componentDidMount() {
    this.props.getStoriesIds()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!shallowequal(this.props.storiesIds, prevProps.storiesIds)) {
      this.props.setData(this.props.storiesIds, 15);
    }

    if (!shallowequal(prevProps.itemsPage, this.props.itemsPage)) {
      this.props.getStories(this.props.itemsPage);
    }
  }

  render() {
    if (this.props.stories.length === 0)
      return <p>Cargando historias...</p>
    return (
      <div>
        <div>
          <button onClick={this.props.prevPage}>Anterior</button>
          <button onClick={this.props.nextPage}>Siguiente</button>
        </div>
        {
          this.props.stories.map((story) => (
            <div key={story.id}>
              {story.title}
            </div>
          ))
        }
      </div>
    );
  }
}

HNPage.propTypes = {

}

export default withHOCPagination(withHOCHNState(HNPage));
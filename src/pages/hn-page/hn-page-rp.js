import React from 'react'
import axiosInstance from './service';

import Pagination from './render-prop-pagination';
import HNState from './rp-hnstate';
// import withHOCPagination from './hoc-pagination';

class HNPage extends React.Component {

  state = {
    storiesIds: []
  };

  componentDidMount() {
    axiosInstance.get('/topstories.json')
      .then((request) => {
        this.setState({
          storiesIds: request.data
        })
      })
  }

  render() {
    return (
      <Pagination data={this.state.storiesIds} itemsPerPage={15} >
        {
          (
            {
              nextPage,
              prevPage,
              itemsPage
            }
          ) => {
            return (
              <HNState storiesIds={itemsPage}>
                {
                  ({ stories, pending }) => {
                    if (stories.length === 0 || pending)
                      return <p>Cargando historias...</p>
                    return (
                      <div>
                        <div>
                          <button onClick={prevPage}>Anterior</button>
                          <button onClick={nextPage}>Siguiente</button>
                        </div>
                        {
                          stories.map((story) => (
                            <div key={story.id}>
                              {story.title}
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                }
              </HNState>
            );
          }
        }
      </Pagination>
    );
  }
}

HNPage.propTypes = {

}

// export default withHOCPagination(HNPage);
export default HNPage;

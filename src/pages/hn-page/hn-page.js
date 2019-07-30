import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import shallowequal from 'shallowequal';

import withHOCPagination from './hoc-pagination';

class HNPage extends React.Component {

    state = {
        stories: []
    };

    componentDidMount() {
        axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then((request) => {
            this.props.setData && this.props.setData(request.data, 15);
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
    
    
    render() {
        if (this.state.stories.length === 0)
            return <p>Cargando historias...</p>
        return (
            <div>
                <div>
                    <button onClick={this.props.prevPage}>Anterior</button>
                    <button onClick={this.props.nextPage}>Siguiente</button>
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

HNPage.propTypes = {

}

export default withHOCPagination(HNPage);


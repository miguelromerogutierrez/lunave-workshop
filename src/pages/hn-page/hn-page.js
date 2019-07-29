import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

class HNPage extends React.Component {

    state = {
        stories: []
    };

    componentDidMount() {
        axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then((request) => {
            const storiesIds15 = request.data.slice(0, 15);
            console.log('STORIES IDS', storiesIds15);
            const storiesPromise = storiesIds15.map(
                (storieId) => {
                return axios.get(`https://hacker-news.firebaseio.com/v0/item/${storieId}.json?print=pretty`)
                .then(({ data }) => data);
            }
            );
            console.log('STORIES Promises', storiesPromise);
            Promise.all(storiesPromise)
            .then(stories => {
                this.setState({
                    stories
                });
            }).catch((error) => console.log(error));
        })
    }
    
    render() {
        if (this.state.stories.length === 0)
            return <p>Cargando historias...</p>
        return (
            <div>
                {
                    this.state.stories.map((story) => (
                        <div>
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

export default HNPage


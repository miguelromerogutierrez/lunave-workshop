import React from 'react';
import { getCardsData } from './services'

import './styles.scss';

class Page extends React.Component {

    state = {
        cards: [],
    };

    componentDidMount() {
        getCardsData()
            .then((cards) => {
                this.setState({ 
                    cards
                 });
            })
    }

    render() {
        if (this.state.cards.length === 0) {
            return <p>Esperando informacion...</p>
        }
        console.dir(this.state.cards);
        return this.state.cards.map(
            (card) => <SocialCard />
        );
    }
}

function SocialCard(props) {
    return (
        <div className="social-card">
            <div className="social-card--header">
                <span className="social-card--header__username">
                    Mike Romero
                </span>
                <span className="social-card--header__userlink">
                    @Mikeromero
                </span>
                <span className="social-card--header__date">
                    15 Sept
                </span>
            </div>
            <div className="social-card--content">
                Un tuit
            </div>
            <div className="external-source">
                <img src="https://picsum.photos/id/883/400/200" />
                <span className="external-source__content">
                    Cursos de React... Gratis!!
                </span>
            </div>
            <div className="social-card--actions">
                <i class="far fa-comment"></i> 7
                <i class="fas fa-retweet"></i> 10
                <i class="fas fa-heart"></i> 134
            </div>
        </div>
    )
}

export default Page


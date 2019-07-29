import React from 'react';

import SocialCard from './social-card-component/social-card';
import { getSocialCardProps } from './social-card-component/prop-getters'
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

    handleClickSendComment = (comment, id) => {
        {
            const cards = this.state.cards.map((card) => {
                if(card.id === id) {
                    card.post.comments.count += 1;
                }
                return card;
            });
            this.setState({
                cards,
            });
        }
    }

    handleSocialCardActions = (type, id) => {
        const { cards: __cards } = this.state;
        switch(type) {
            case 'comment': 
            case 'like':
                {
                    const cards = __cards.map((card) => {
                        if(card.id === id) {
                            if (card.post.userInSession.hasLiked) {
                                card.post.likes.count -= 1;
                            } else {
                                card.post.likes.count += 1;
                            }
                            card.post.userInSession.hasLiked = !card.post.userInSession.hasLiked;
                        }
                        return card;
                    });
                    this.setState({
                        cards,
                    });
                }
                break;
            case 'retweet':
                {
                    const cards = __cards.map((card) => {
                        if(card.id === id) {
                            if (card.post.userInSession.hasRetweeted) {
                                card.post.retweet.count -= 1;
                            } else {
                                card.post.retweet.count += 1;
                            }
                            card.post.userInSession.hasRetweeted = !card.post.userInSession.hasRetweeted;
                        }
                        return card;
                    });
                    this.setState({
                        cards,
                    });
                }
                break;
            default:
        }
    }

    render() {
        if (this.state.cards.length === 0) {
            return <p>Esperando informacion...</p>
        }
        const socialCardsElements = this.state.cards.map(
            (card, index) => {
                return (
                    <SocialCard 
                        {...getSocialCardProps(card)}
                        onSocialCardActions={this.handleSocialCardActions}
                        onSendComment={this.handleClickSendComment}
                    />
                );
            }
        );
        return (
            <div className="social-cards-page">
                {socialCardsElements}
            </div>
        )
    }
}



export default Page


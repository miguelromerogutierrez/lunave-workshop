import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class SocialCard extends React.Component {

    state = {
        comment: '',
        show: false
    }

    handleClickComment = () => {
        this.setState(oldState => ({show: !oldState.show}))
    };
    handleClickLike = () => {
        this.props.onSocialCardActions('like', this.props.id)
    };
    handleClickRetweet = () => {
        this.props.onSocialCardActions('retweet', this.props.id)
    }

    handleChangeTextArea = (e) => {
        this.setState({comment: e.target.value})
        console.log(e.target.value)
    }
    handleClickSendComment = (e) => {
        this.props.onSendComment(this.state.comment, this.props.id)
        this.setState({show: false})
    }

    render(){
        return (
            <div className="social-card">
                <div className="social-card--header">
                    <span className="social-card--header__nickname">
                        {this.props.nickname}
                    </span>
                    <span className="social-card--header__username">
                        {this.props.username}
                    </span>
                    <span className="social-card--header__date">
                        {this.props.postDate}
                    </span>
                </div>
                <div className="social-card--content">
                    {this.props.content}
                </div>
                {
                    this.props.hasExternalSource
                    ? <div className="external-source">
                        <img src={this.props.externalSource.image} alt="una imagen" />
                        <h1 className="external-source__content">{this.props.externalSource.title}</h1>
                        <div className="external-source__content">
                            {this.props.externalSource.content}
                        </div>
                        <div className="external-source__footer">{this.props.externalSource.link}</div>
                    </div>
                    : null
                }
                <div className="social-card--actions">
                    <span className="social-card__action comment" onClick={this.handleClickComment}>
                        <i className="far fa-comment"></i> {this.props.commentsCount}
                    </span>
                    <span className={ classnames('social-card__action', 'retweet', { active: this.props.hasRetweeted }) } onClick={this.handleClickRetweet}>
                        <i className="fas fa-retweet"></i> {this.props.retweetsCount}
                    </span>
                    <span className={ classnames('social-card__action', 'like', { active: this.props.hasLiked }) } onClick={this.handleClickLike}>
                        <i className="fas fa-heart"></i> {this.props.likesCount}
                    </span>
                </div>
                { this.state.show ? 
                    <div className="social-card--comment">
                    <textarea value={this.state.comment} onChange={this.handleChangeTextArea}>
                        
                    </textarea>
                    <button onClick={this.handleClickSendComment}>Enviar</button>
                </div> :
                null
                }
                
            </div>
        )
    }
    
}

SocialCard.propTypes = {
    nickname: PropTypes.string,
    username: PropTypes.string,
    postDate: PropTypes.string,
    commentsCount: PropTypes.number,
    retweetsCount: PropTypes.number,
    likesCount: PropTypes.number,
    hasExternalSource: PropTypes.bool,
    externalSource: PropTypes.shape({
        content: PropTypes.string,
        image: PropTypes.string,
        link: PropTypes.string,
        title: PropTypes.string,
    }),
    hasLiked: PropTypes.bool,
    hasRetweeted: PropTypes.bool,
    onSocialCardActions: PropTypes.func,
    onSendComment: PropTypes.func.isRequired
};

export function getSocialCardProps(card) {
    let commentsCount = 0;
    if (card.post.comments && card.post.comments.length) {
        commentsCount = card.post.comments.length;
    }
    return {
        id: card.id,
        nickname: card.user.nickName,
        username: card.user.userName,
        postDate: card.post.date,
        content: card.post.content,
        commentsCount,
        retweetsCount: card.post.retweet.count,
        likesCount: card.post.likes.count,
        hasExternalSource: card.post.hasExternalSource,
        externalSource: card.post.externalSource,
        hasLiked: card.post.userInSession.hasLiked,
        hasRetweeted: card.post.userInSession.hasRetweeted
    };
}

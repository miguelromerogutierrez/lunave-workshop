const cardsData = [
    {
      id:1,
      user: {
        nickName: 'The Practical Dev',
        userName: '@ThePracticalDev',
      },
      post: {
        date: 'Sep 10',
        content: `Learning React? Start small. { author: @dcddia }`,
        hasExternalSource: true,
        externalSource: {
          image: 'https://picsum.photos/id/248/400/200',
          title: 'Learning React? Start Small.',
          content: `Can't pry yourself away from the tutorials? The cure is to make tiny little experiment apps.`,
          link: 'dev.to'
        },
        comments: {
          count: 47,
        },
        likes: {
          count: 2,
        },
        retweet: {
          count: 190,
        },
        userInSession: {
          hasRetweeted: true,
          hasLiked: false,
        }
      }
    },
    {
      id:2,
      user: {
        nickName: 'Mike Romero',
        userName: '@MikeRomero',
      },
      post: {
        date: 'Sep 9',
        content: `Learn javascript: ES6 features`,
        hasExternalSource: true,
        externalSource: {
          image: 'https://picsum.photos/id/883/400/200',
          title: 'Learn javascript: ES6 features',
          content: 'Are you confused with ES6 new features?, i explain you everything',
          link: 'mikedev.to'
        },
        comments: {
          count: 3,
        },
        likes: {
          count: 100,
        },
        retweet: {
          count: 230,
        },
        userInSession: {
          hasRetweeted: true,
          hasLiked: true,
        }
      }
    },
    {
      id:3,
      user: {
        nickName: 'Jhon Doe',
        userName: '@JDoe',
      },
      post: {
        date: 'Sep 8',
        content: `Today i will start learning ReactJS, do you guys have some useful resources to start?`,
        hasExternalSource: false,
        comments: {
          count: 190,
        },
        likes: {
          count: 80,
        },
        retweet: {
          count: 30,
        },
        userInSession: {
          hasRetweeted: false,
          hasLiked: true,
        }
      }
    }
  ];
  
export const getCardsData = (ms) => 
new Promise((resolve) => setTimeout(() => resolve(cardsData), ms || 1000));
  
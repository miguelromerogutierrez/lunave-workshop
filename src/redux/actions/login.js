const login = (user) => {
  console.log(user);
  return { type: 'LOGIN_USER', user }
};

export default login;

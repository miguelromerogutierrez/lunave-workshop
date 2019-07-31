const initialState = {
  pending: false,
  success: false,
  error: false,
  payload: [],
  
}

const hnStoriesIds = (state = initialState, action) => {
  switch(action.type) {
    case 'PENDING_RETRIEVE_STORIES':
      return { ...state, pending: true };
    case 'SAVE_RETRIEVE_STORIES':
      return { ...state, pending: false, success: true, payload: action.payload };
    default:
      return state;
  }
}

export default hnStoriesIds;

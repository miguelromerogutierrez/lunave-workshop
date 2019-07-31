const initialState = {
  pending: false,
  success: false,
  error: false,
  payload: [],
  elementsToDisplay: [],
  currentPage: 0
}

const hnStoriesIds = (state = initialState, action) => {
  switch (action.type) {
    case 'PENDING_RETRIEVE_STORIES_IDS':
      return { ...state, pending: true };
    case 'SAVE_RETRIEVE_STORIES_IDS':
      const elementsToDisplay = action.payload.slice(0, 15);
      return { ...state, pending: false, success: true, payload: action.payload, elementsToDisplay, currentPage: 0 };
    case 'NEXT_ELEMENTS':
      {
        const initPos = (state.currentPage + 1) * 15;
        const endPos = initPos + 15;
        const elementsToDisplay = state.payload.slice(initPos, endPos);
        return {
          ...state,
          elementsToDisplay,
          currentPage: state.currentPage + 1
        }
      }
    default:
      return state;
  }
}

export default hnStoriesIds;

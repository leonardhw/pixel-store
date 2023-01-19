const initialState = {
  images: [],
};

function imageReducer(state = initialState, action) {
  switch (action.type) {
    case "images/fetchImage":
      return {
        ...state,
        images: action.payload,
      };

    default:
      return state;
  }
}

export default imageReducer;

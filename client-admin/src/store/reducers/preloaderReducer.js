const initialState = {
  isLoading: true,
};

function preloaderReducer(state = initialState, action) {
  switch (action.type) {
    case "isLoading/displayPreloader":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

export default preloaderReducer;

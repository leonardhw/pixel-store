const initialState = {
  categories: [],
  categoryDetail: {},
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case "categories/fetchCategory":
      return {
        ...state,
        categories: action.payload,
      };
    case "categories/fetchCategoryDetail":
      return {
        ...state,
        categoryDetail: action.payload,
      };

    default:
      return state;
  }
}

export default categoryReducer;

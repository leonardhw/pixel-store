const initialState = {
  products: [],
  productDetail: {},
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case "products/fetchProduct":
      return {
        ...state,
        products: action.payload,
      };
    case "products/fetchProductDetail":
      return {
        ...state,
        productDetail: action.payload,
      };

    default:
      return state;
  }
}

export default productReducer;

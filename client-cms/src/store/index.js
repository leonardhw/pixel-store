import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import productReducer from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";
import imageReducer from "./reducers/imageReducer";
import preloaderReducer from "./reducers/preloaderReducer";

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  image: imageReducer,
  preloader: preloaderReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

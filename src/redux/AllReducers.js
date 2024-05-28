import { combineReducers } from "redux";
import {
  sidebarReducer,
  categoryReducer,
  cartReducer,
  itemsTotalValueReducer,
  selectedBookReducer,
  wishlistReducer,
  wishlistItemsTotalValueReducer,
  authenticationReducer,
  savePaymentResposeReducer,
} from "./Reducers";

const allReducers = combineReducers({
  sidebar: sidebarReducer,
  category: categoryReducer,
  cartItems: cartReducer,
  totalItemsAmount: itemsTotalValueReducer,
  selectedBook: selectedBookReducer,
  wishlist: wishlistReducer,
  wishlistTotal: wishlistItemsTotalValueReducer,
  authentication: authenticationReducer,
  savedPaymentResponse: savePaymentResposeReducer,
});

export default allReducers;

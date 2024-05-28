export const sidebarReducer = (state = false, action) => {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return true;
    case "CLOSE_SIDEBAR":
      return false;
    default:
      return state;
  }
};

export const categoryReducer = (state = "Now Trending", action) => {
  switch (action.type) {
    case "CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

export const cartReducer = (state = { items: [] }, action) => {
  // dont write anything uncommon here because this place is used by every reducer
  // as for every action all the reducers are executed and which to run is descided by action TYP
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex(
        (item) => item.book.title === action.payload.book.title
      )
      if (existingItemIndex === -1) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      } else {
        state.items[existingItemIndex].count += action.payload.count;
        return {
          ...state,
          items: [...state.items],
        };
      }
    case "REMOVE_ITEM_FROM_CART":
      const existingItemIndexx = state.items.findIndex(
        (item) => item.book.title === action.payload.book.title
      )
      if (existingItemIndexx === -1) {
        return state;
      } else {
        if (state.items[existingItemIndexx].count === 0) {
          return state;
        } else {
          state.items[existingItemIndexx].count -= 1;
          return {
            ...state,
            items: [...state.items],
          };
        }
      }

    case "DELETE_ITEM_FROM_CART":
      const existingItemIndexToDelete = state.items.findIndex(
        (item) => item.book.title === action.payload.book.title
      )
      if(existingItemIndexToDelete == -1){
        return state;
      }else{
        state.items.splice(existingItemIndexToDelete, 1);
        return {
          ...state,
            items: [...state.items],
        }
      }

    default:
      return state;
  }
};

export const itemsTotalValueReducer = (state = 0, action) => {
  switch (action.type) {
    case "CART_TOTAL_VALUE":
      return action.payload;
    default:
      return state;
  }
};


export const selectedBookReducer = (state="", action) => {
  switch(action.type){
    case "SELECTED_BOOK":
      return action.payload;
    default:
      return state;
  }
}


export const wishlistReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      const existingItemIndex = state.items.findIndex(
        (item) => item.book.title === action.payload.book.title
      )
      if (existingItemIndex === -1) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      } else {
        state.items[existingItemIndex].count += action.payload.count;
        return {
          ...state,
          items: [...state.items],
        };
      }
    case "REMOVE_ITEM_FROM_WISHLIST":
      const existingItemIndexx = state.items.findIndex(
        (item) => item.book.title === action.payload.book.title
      )
      if (existingItemIndexx === -1) {
        return state;
      } else {
        if (state.items[existingItemIndexx].count === 0) {
          return state;
        } else {
          state.items[existingItemIndexx].count -= 1;
          return {
            ...state,
            items: [...state.items],
          };
        }
      }
    
      case "DELETE_ITEM_FROM_WISHLIST":
        const existingItemIndexToDelete = state.items.findIndex(
          (item) => item.book.title === action.payload.book.title
        )
        if(existingItemIndexToDelete == -1){
          return state;
        }else{
          state.items.splice(existingItemIndexToDelete, 1);
          return {
            ...state,
              items: [...state.items],
          }
        }

    default:
      return state;
  }
}


export const wishlistItemsTotalValueReducer = (state = 0, action) => {
  switch (action.type) {
    case "WISHLIST_TOTAL_VALUE":
      return action.payload;
    default:
      return state;
  }
};


export const authenticationReducer = (state = {acessToken : "", isLoggedIn : false}, action) => {
  switch(action.type){
    case "LOGIN": 
      return action.payload;
    case "LOGOUT": 
      return state;
    default:
      return state;
  }
}


export const savePaymentResposeReducer = (state = {}, action) => {
  switch(action.type){
    case "SAVE_PAYMENT_RESPONSE": 
      return action.payload;
    default:
      return state;
  }
}
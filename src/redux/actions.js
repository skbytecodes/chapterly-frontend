export const openSideBar = () => {
    return {
        type : 'OPEN_SIDEBAR'
    }
}

export const closeSideBar = () => {
    return {
        type : 'CLOSE_SIDEBAR'
    }
}

export const selectedCategory = (category) => {
    return {
        type : "CATEGORY",
        payload : category
    }
}

export const addItem = (payload) => {
    return {
      type : "ADD_TO_CART",
      payload
    }
  }
  
  
  export const removeItem = (payload) => {
    return {
      type : "REMOVE_ITEM_FROM_CART",
      payload
    }
  }
  
  export const cartTotalValue = (payload) => {
    return {
      type : "CART_TOTAL_VALUE",
      payload
    }
  }
  

  export const selectedBook = (book) => {
    return {
        type : "SELECTED_BOOK",
        payload : book
    }
}


  export const addToWishlist = (payload) => {
    return {
      type : "ADD_TO_WISHLIST",
      payload : payload
    }
  }

  export const removeFromWishlist = (payload) => {
    return {
      type : "REMOVE_ITEM_FROM_WISHLIST",
      payload : payload
    }
  }

  export const wishlistTotalValue = (payload) => {
    return {
      type : "WISHLIST_TOTAL_VALUE",
      payload
    }
  }

  export const deleteBookFromCart = (payload) => {
    return {
      type : "DELETE_ITEM_FROM_CART",
      payload
    }
  }

  export const deleteBookFromWishlist = (payload) => {
    return {
      type : "DELETE_ITEM_FROM_WISHLIST",
      payload
    }
  }


  export const login = (payload) => {
    return {
      type : "LOGIN",
      payload
    }
  }

  export const logout = () => {
    return {
      type : "LOGOUT"
    }
  }

  export const savePaymentRespose = (payload) => {
    return {
      type : "SAVE_PAYMENT_RESPONSE",
      payload
    }
  }
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {

    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity+=newItem.quantity;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          totalPrice: newItem.unitPrice,
          unitPrice: newItem.unitPrice,
          quantity: newItem.quantity,
          name: newItem.name,
          description:newItem.description,
          imageUrl:newItem.imageUrl,
        });
      
      } else {
        const totalPrice=(existingItem.quantity+newItem.quantity)*existingItem.unitPrice;
        existingItem.quantity+=newItem.quantity;
        existingItem.totalPrice = totalPrice;
      }
    },
    removeItemFromCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== existingItem.id);
      } else {
        existingItem.totalPrice-=existingItem.totalPrice/existingItem.quantity;
        existingItem.quantity--;
        
      }
    },
    removeAll(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity-=existingItem.quantity;
      state.items = state.items.filter(item => item.id !== existingItem.id);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
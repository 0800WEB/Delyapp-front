import { createReducer } from '@reduxjs/toolkit';
import { openDrawer, closeDrawer } from './drawerActions';

interface DrawerState {
  isOpen: boolean;
}

const initialState: DrawerState = {
  isOpen: false,
};

const drawerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openDrawer, (state) => {
      state.isOpen = true;
    })
    .addCase(closeDrawer, (state) => {
      state.isOpen = false;
    });
});

export default drawerReducer;
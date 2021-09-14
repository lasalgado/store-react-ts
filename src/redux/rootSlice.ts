import { createSlice } from '@reduxjs/toolkit';
import { Color } from '@material-ui/lab/Alert';

export type DisplayModal = {
    state: boolean,
    text: string,
    type: Color,
    autoHideDuration: number
};

const displayModal: DisplayModal = {
    state: false,
    text: '',
    type: 'error',
    autoHideDuration : 600,
};

const initialState = {
    displayModal
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
      setDisplayModal: (state, action) => {
          state.displayModal.state = action.payload.state
          state.displayModal.text = action.payload.text
          state.displayModal.type = action.payload.type
          state.displayModal.autoHideDuration = action.payload.autoHideDuration ? action.payload.autoHideDuration : 600
      }
  },
});

export const { setDisplayModal } = rootSlice.actions;
export default rootSlice.reducer;
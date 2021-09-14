import type { RootState } from '../store';

export const getModal = (state: RootState) => state.storeRoot.displayModal;

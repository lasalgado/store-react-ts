import type { RootState } from '../store';

export const getAuthData = (state: RootState) => state.storeAuth.auth;

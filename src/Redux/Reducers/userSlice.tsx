// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | null;
  name: string;
  email: string;
  phone: string;
  user_type: string;
  company_id: number | null;
  company_username: string;
  usertoken: string;
}

const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  phone: '',
  user_type: '',
  company_id: null,
  company_username: '',
  usertoken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    clearUserDetails(state) {
      return initialState;
    }
  }
});

// Export the actions
export const { setUserDetails, clearUserDetails } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import patientReducer from '../reducers/patientSlice';

export default configureStore({
  reducer: {
    users: userReducer,
    patients: patientReducer
  }
});

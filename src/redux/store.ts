import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './reducer/projects.slice';
import aboutReducer from './reducer/about.slice';
import serviceReducer from './reducer/service.slice';
import recruitReducer from './reducer/recruit.slice';
import contactReducer from './reducer/contact.slice';
import partnerReducer from './reducer/partner.slice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    about: aboutReducer,
    service: serviceReducer,
    recruit: recruitReducer,
    contact: contactReducer,
    partner: partnerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import tasksListReducer from "../features/tasksList/tasksListSlice";
// import taskReducer from "../features/task/taskSlice";

const store = configureStore({
  reducer: {
    tasksList: tasksListReducer,
    // task: taskReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

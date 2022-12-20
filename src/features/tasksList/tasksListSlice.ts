import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../task/model";

interface InitialState {
  tasks: Task[];
  completedTasks: Task[];
}

const initialState: InitialState = {
  tasks: [],
  completedTasks: [],
};

const tasksListSlice = createSlice({
  name: "tasksList",
  initialState,
  reducers: {
    createTask: (state, actions) => {
      state.tasks.push(actions.payload);
    },
    deleteTask: (state, actions) => {
      state.tasks = state.tasks.filter((task) => task.id !== actions.payload);
    },
    deleteTaskFromCompleted: (state, actions) => {
      state.completedTasks = state.completedTasks.filter(
        (task) => task.id !== actions.payload
      );
    },
    editTask: (state, actions) => {
      state.tasks = state.tasks.map((task) =>
        task.id === actions.payload.id
          ? { ...task, text: actions.payload.text }
          : task
      );
    },
    doneTask: (state, actions) => {
      state.tasks = state.tasks.map((task) =>
        task.id === actions.payload ? { ...task, isDone: !task.isDone } : task
      );
    },
    completeTask: (state, actions) => {
      state.completedTasks.push(actions.payload);
      state.tasks = state.tasks.filter(
        (task) => task.id !== actions.payload.id
      );
      state.completedTasks = state.completedTasks.map((task) =>
        task.id === actions.payload.id
          ? { ...task, isDone: !task.isDone }
          : task
      );
    },
    activateTask: (state, actions) => {
      state.tasks.push(actions.payload);
      state.completedTasks = state.completedTasks.filter(
        (task) => task.id !== actions.payload.id
      );
      state.tasks = state.tasks.map((task) =>
        task.id === actions.payload.id
          ? { ...task, isDone: !task.isDone }
          : task
      );
    },
  },
});

export default tasksListSlice.reducer;
export const {
  createTask,
  deleteTask,
  editTask,
  doneTask,
  completeTask,
  activateTask,
  deleteTaskFromCompleted,
} = tasksListSlice.actions;

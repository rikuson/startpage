import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Rest } from '../../lib/TodoistApi';
import config from '../../config.json';

export const readTasks = createAsyncThunk('todoist/readTasks', async (_, thunk) => {
  const state = thunk.getState();
  const api = new Rest(state.todoist.token);
  return await api.readTasks();
});

export const completeTask = createAsyncThunk('todoist/completeTask', async (id, thunk) => {
  const state = thunk.getState();
  const api = new Rest(state.todoist.token);
  await api.completeTask(id);
  return state.todoist.tasks.filter(task => task.id !== Number(id));
});

export const readProjects = createAsyncThunk('todoist/readProjects', async (_, thunk) => {
  const state = thunk.getState();
  const api = new Rest(state.todoist.token);
  return await api.readProjects();
});

const todoistSlice = createSlice({
  name: 'todoist',
  initialState: {
    token: config.todoist.apiToken,
    projects: [],
    tasks: [],
    activeProject: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = '';
    },
    openProject: (state, action) => {
      state.activeProject = action.payload;
    },
  },
  extraReducers: {
    [readTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload;
    },
    [readTasks.rejected]: (state, action) => {
      state.token = '';
    },
    [completeTask.fulfilled]: (state, action) => {
      state.tasks = action.payload;
    },
    [completeTask.rejected]: (state, action) => {
      state.token = '';
    },
    [readProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;
      if (!state.projects.some(project => project.id === state.activeProject)) {
        state.activeProject = state.projects[0].id;
      }
    },
    [readProjects.rejected]: (state, action) => {
      state.token = '';
    },
  }
});

export const {
  setToken,
  removeToken,
  openProject,
} = todoistSlice.actions;

export default todoistSlice.reducer;

import { TaskApiData } from "@/Data/Application/Task";
import { TaskSliceType } from "@/Type/Application/Tasks/TaskType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TaskSliceType = {
  allTask: TaskApiData,
  taskFilter: false,
  validation: false,
  myTask: [],
  addModal: false,
  activeTab: "1",
};

const TaskSlice = createSlice({
  name: "TaskSlice",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setTaskFilter: (state) => {
      state.taskFilter = !state.taskFilter;
    },
    setValidation: (state, action) => {
      state.validation = action.payload;
    },
    setAddModal: (state) => {
      state.addModal = !state.addModal;
    },
    addNewTask: (state, action) => {
      const taskTemp = {
        id: state.allTask.length + 1,
        title: action.payload.title,
        collection: action.payload.collection,
        description: action.payload.description,
      };
      state.allTask = [...state.allTask, taskTemp];
    },
    setMyTask: (state, action) => {
      state.myTask = [...state.myTask, action.payload];
    },
    removeTask: (state, action) => {
      state.allTask = state.allTask.filter((data) => data.id !== action.payload);
    },
    removeAssignTask: (state, action) => {
      state.myTask = state.myTask.filter((data) => data.id !== action.payload);
    },    
  },
});

export const { setActiveTab, setAddModal, setValidation, setMyTask, setTaskFilter, addNewTask, removeTask, removeAssignTask } = TaskSlice.actions;

export default TaskSlice.reducer;

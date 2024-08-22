import { createSlice } from "@reduxjs/toolkit";
import { ToDoSliceProp } from "@/Type/Application/Todo/Todo";
import { todoListData } from "@/Data/Application/Todo/Todo";
import { toast } from "react-toastify";

const initialState: ToDoSliceProp = {
  showSideBar: false,
  todoList: [...todoListData],
  task: "",
  visible:false,
  allTaskCompleted : false
};

const ToDoSlice = createSlice({
  name: "ToDoSlice",
  initialState,
  reducers: {
    setVisible:(state,action) => {
      state.visible = action.payload
    },
    setShowSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setAllTaskCompleted : (state, action) => {
      state.allTaskCompleted = action.payload
      if(state.allTaskCompleted){
        const temp = state.todoList.map((data) => 
        (data.status === "pending") ? {...data, status: "completed", badge: 'Done' } : data )
        state.todoList = temp
        toast.success("All tasks marked as complete.")
      }else{
        const temp =state.todoList?.map((data) => 
        (data.status === "completed") ? { ...data, status: "pending", badge: 'Pending' } :  data )
        state.todoList = temp
        toast.error("All tasks marked as In-complete.")
      }
    },
    addNewTodo: (state, action) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentDate = new Date();
      const temp = {
        id: state.todoList.length + 1,
        title: action.payload,
        status: "pending",
        badge: "Pending",
        badgeClass: "light-danger",
        timeLimit: currentDate.getDate() + " " + months[currentDate.getMonth()],
      };
      state.todoList = [temp,...state.todoList];
    },
    removeItems: (state, action) => {
      state.todoList = state.todoList?.filter((data) => data.id !== action.payload.id);
      toast.success(" '" + action.payload.title + "' " + "has been deleted")
    },
    updateTodo: (state, action) => {
      const {id,status,badgeClass}=action.payload
      const temp = state.todoList.map(item => {
        if (item.id === id) {
          if (status === 'pending') {
            return { ...item, status, badgeClass: badgeClass, badge: 'Pending' };
          } else if (status === 'completed') {
            return { ...item, status, badgeClass: badgeClass, badge: 'Done' };
          }
        }
        return item;
      });
      state.todoList = temp
    },
  },
});

export const { setShowSideBar, setTodoList, setTask, addNewTodo, removeItems ,updateTodo,setVisible,setAllTaskCompleted} = ToDoSlice.actions;

export default ToDoSlice.reducer;
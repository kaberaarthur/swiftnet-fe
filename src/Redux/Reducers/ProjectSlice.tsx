import { projectData } from "@/Data/Application/ProjectList/ProjectList";
import { ProjectType } from "@/Type/Application/ProjectList/ProjectList";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProjectType = {
  activeTab: "1",
  createdFormData: projectData,
};

const ProjectSlice = createSlice({
  name: "SideBarSlice",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setCreatedData: (state, action) => {
      state.createdFormData = action.payload;
    },
  },
});
export const { setActiveTab, setCreatedData } = ProjectSlice.actions;

export default ProjectSlice.reducer;

import { bookMarkData } from "@/Data/Layout/HeaderData";
import { BookmarkSliceType, BookmarkedDataType } from "@/Type/Layout/Header";
import { createSlice } from "@reduxjs/toolkit";

const initialState:BookmarkSliceType = {
    bookmarkedData: [...bookMarkData],
    linkItemsArray:[],
};

const HeaderBookMarkSlice = createSlice({
  name: "HeaderBookMarkSlice",
  initialState,
  reducers: {
    getLinkItemsArray: (state, action) => {
      state.linkItemsArray = action.payload;
    },
    handleBookmarkChange: (state, action) => {
        if (!action.payload.bookmarked) {
          state.bookmarkedData.push({ ...action.payload, bookmarked: !action.payload.bookmarked });
        } else {
          const tempt :BookmarkedDataType[] = [];
          state.bookmarkedData.forEach((ele) => {
            if (ele.id !== action.payload.id) {
              tempt.push(ele);
            }
          });
          state.bookmarkedData = tempt;
        }
        const temp = [...state.linkItemsArray];
        temp.splice(action.payload.id - 1, 1, { ...action.payload, bookmarked: !action.payload.bookmarked });
        state.linkItemsArray = temp;
      },
  },
});

export const { getLinkItemsArray, handleBookmarkChange } = HeaderBookMarkSlice.actions;

export default HeaderBookMarkSlice.reducer;

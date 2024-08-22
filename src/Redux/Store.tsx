import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import NumberingWizardSlice from "./Reducers/NumberingWizardSlice";
import StudentWizardSlice from "./Reducers/StudentWizardSlice";
import VerticalWizardSlice from "./Reducers/VerticalWizardSlice";
import LetterBoxSlice from "./Reducers/LetterBoxSlice";
import ProjectSlice from "./Reducers/ProjectSlice";
import FormWizardTwoSlice from "./Reducers/FormWizardTwoSlice";
import TwoFactorSlice from "./Reducers/TwoFactorSlice";
import ProductSlice from "./Reducers/ProductSlice";
import FilterSlice from "./Reducers/FilterSlice";
import CartSlice from "./Reducers/CartSlice";
import BookmarkTabSlice from "./Reducers/BookmarkTabSlice";
import ChatSlice from "./Reducers/ChatSlice";
import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import ToDoSlice from "./Reducers/ToDoSlice";
import ContactSlice from "./Reducers/ContactSlice";
import TaskSlice from "./Reducers/TaskSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    numberingWizard: NumberingWizardSlice,
    studentWizard: StudentWizardSlice,
    verticalWizard: VerticalWizardSlice,
    formWizardTwo:FormWizardTwoSlice,
    twoFactor: TwoFactorSlice,
    themeCustomizer: ThemeCustomizerSlice,
    letterBox:LetterBoxSlice,
    project:ProjectSlice,
    product:ProductSlice,
    filterData: FilterSlice,
    cartData: CartSlice,
    bookmarkTab:BookmarkTabSlice,
    chat:ChatSlice,
    headerBookMark:HeaderBookmarkSlice,
    todo:ToDoSlice,
    contact:ContactSlice, 
    task: TaskSlice,

  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

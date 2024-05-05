import Categoty from "../Page/CategoryPage/Category";
import ChapterPage from "../Page/ChapterPage/ChapterPage";
import HomePage from "../Page/HomePage/HomePage";
import SubPage from "../Page/SubPage/SubPage";

export const defaultRouter = [
  { Patch: "/", Element: HomePage },
  { Patch: "/book/:sub", Element: SubPage },
  { Patch: "/book/:sub/:chapter", Element: ChapterPage },
  { Patch: "/:category/:sub", Element: Categoty },
];

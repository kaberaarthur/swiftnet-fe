import SVG from "@/CommonComponent/SVG";
import { Back, Href } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { handleBookmarkChange } from "@/Redux/Reducers/HeaderBookmarkSlice";
import { setFlip } from "@/Redux/Reducers/LayoutSlice";
import { BookmarkedDataType } from "@/Type/Layout/Header";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Input } from "reactstrap";

export const BookmarkBack = () => {
  const dispatch = useAppDispatch();
  const { linkItemsArray } = useAppSelector((store) => store.headerBookMark);
  const [searchedItems, setSearchedItems] = useState<BookmarkedDataType[]>([]);
  const [searchWord, setSearchWord] = useState("");

  const searchItems = (e: string) => {
    let copyArray = [...linkItemsArray];
    let result = copyArray.filter((item, i) => item.title?.toLowerCase().includes(e.toLowerCase()));
    setSearchedItems(result);
  };
  const handleBackButton = () => {
    dispatch(setFlip());
    setSearchWord("");
  };
  const bookMarkInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    searchItems(e.target.value);
  };

  return (
    <div className="back">
      <ul>
        <li>
          <div className="flip-back-content">
            <Input type="text" placeholder="search..." onChange={(e) => bookMarkInputChange(e)} value={searchWord} />
          </div>
          <div className={`filled-bookmark Typeahead-menu ${searchWord ? "is-open" : ""} custom-scrollbar`}>
            {searchedItems?.map((item: any, index: number) => {
              return (
                <div key={index} className="ProfileCard u-cf">
                  <div className="ProfileCard-avatar">
                    <SVG className="svg-color stroke-primary" iconId={`${item.icon}`} />
                  </div>
                  <div className="ProfileCard-details">
                    <div className="ProfileCard-realName">
                      <Link className="realname" href={Href}>
                        {item.title}
                      </Link>
                      <span className="pull-right">
                        <Link href={Href}>
                          <i onClick={() => dispatch(handleBookmarkChange(linkItemsArray[item.id - 1]))} className={`fa fa-star-o mt-1 icon-star ${linkItemsArray[item.id - 1].bookmarked ? "starred" : ""}`}></i>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {!searchedItems.length && <p>Opps!! There are no result found.</p>}
          </div>
        </li>
        <li onClick={handleBackButton}>
          <a className="f-w-700 d-block flip-back btn btn-secondary" id="flip-back" href={Href}>
            {Back}
          </a>
        </li>
      </ul>
    </div>
  );
};

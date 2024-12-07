import SVG from "@/CommonComponent/SVG";
import { AddNewBookmark, Bookmark, Href } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFlip } from "@/Redux/Reducers/LayoutSlice";
import { useRouter } from "next/navigation";
import { Col, Row } from "reactstrap";

export const BookmarkListData = () => {
  const { bookmarkedData } = useAppSelector((state) => state.headerBookMark);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="front">
      <h5 className="title bg-primary-light">{Bookmark}</h5>
      <ul className="bookmark-dropdown">
        <li className="custom-scrollbar">
          <Row>
            {bookmarkedData.map((item, index) => (
              <Col xs="4" className="text-center mb-2" key={index}>
                <div className="bookmark-content" onClick={() => router.push(`${item.path}`)}>
                  <div className={`bookmark-icon bg-light-primary`}>
                    <SVG className={`svg-color stroke-primary`} iconId={item.icon} />
                  </div>
                  <span className={`font-primary`}>{item.title}</span>
                </div>
              </Col>
            ))}
          </Row>
        </li>
        <li className="text-center m-0" onClick={() => dispatch(setFlip())}>
          <a className="flip-btn f-w-700" id="flip-btn" href={Href}>
            {AddNewBookmark}
          </a>
        </li>
      </ul>
    </div>
  );
};

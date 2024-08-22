import { Button, Card, CardBody, Col } from "reactstrap";
import { BookmarkFilter, Href, ImagePath } from "@/Constant";
import NavTab from "./NavTab";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setBookmarkFilter } from "@/Redux/Reducers/BookmarkTabSlice";
import Image from "next/image";

const SideBar = () => {
  const {bookmarkFilter} = useAppSelector((state)=>state.bookmarkTab)
  const dispatch = useAppDispatch()

  return (
    <Col xl="3" className="box-col-4e">
      <div className="md-sidebar">
        <Button tag="a" color="primary" className="md-sidebar-toggle" href={Href} onClick={()=>dispatch(setBookmarkFilter())}>{BookmarkFilter}</Button>
        <div className={`md-sidebar-aside custom-scrollbar ${bookmarkFilter ? "open" : ""}`}>
          <div className="email-left-aside">
            <Card>
              <CardBody className="custom-scrollbar">
                <div className="email-app-sidebar left-bookmark">
                  <div className="d-flex align-items-center">
                    <div className="media-size-email">
                      <Image width={38} height={38} className="me-3 rounded-circle" src={`${ImagePath}/user/4.jpg`} alt="user" />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="f-w-600">Mark Jecno</h6>
                      <p>Markjecno@gmail.com</p>
                    </div>
                  </div>
                  <NavTab />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SideBar;

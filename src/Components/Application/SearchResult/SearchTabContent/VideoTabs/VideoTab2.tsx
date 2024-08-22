import { Col } from "reactstrap";
import { searchTabsData } from "@/Data/Application/SearchResult/SearchResult";
import { Href } from "@/Constant";
import Link from "next/link";

const VideoTab2 = () => {
  return (
    <Col xxl="6">
      <h6 className="mb-2">{"About 6,000 results (0.60 seconds)"}</h6>
      {searchTabsData.slice(0, 3).map((item) => (
        <div className="info-block d-flex" key={item.id}>
          <iframe className="me-3" width="200" height="100" src={item.videoLink}></iframe>
          <div className="flex-grow-1">
            <Link href={Href}>{item.url}</Link>
            <h6>{item.title}</h6>
            <div className="star-ratings">
              <ul className="search-info">
                <li>{item.star}</li>
                <li>{item.vote}</li>
                <li>{item.news}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </Col>
  )
}

export default VideoTab2
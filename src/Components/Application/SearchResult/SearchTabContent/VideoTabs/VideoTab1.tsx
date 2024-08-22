import { Col, Media } from "reactstrap";
import { searchTabsData } from "@/Data/Application/SearchResult/SearchResult";
import { Href } from "@/Constant";
import Link from "next/link";

const VideoTab1 = () => {
  return (
    <Col xxl="6">
      <h6 className="mb-2">{"About 6,000 results (0.60 seconds)"}</h6>
      {searchTabsData.slice(0, 3).map((item) => (
        <Media className="info-block d-flex" key={item.id}>
          <iframe className="me-3" width="200" height="100" src={item.videoLink}></iframe>
          <Media body>
            <Link href={Href}>{item.url}</Link>
            <h6>{item.title}</h6>
            <div className="star-ratings">
              <ul className="search-info">
                <li>{item.star}</li>
                <li>{item.vote}</li>
                <li>{item.news}</li>
              </ul>
            </div>
          </Media>
        </Media>
      ))}
    </Col>
  );
};

export default VideoTab1;

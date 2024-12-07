import { Card, Col, Row } from "reactstrap";
import { mainLearningCardData } from "@/Data/Miscellaneous/Learning/Learning";
import Image from "next/image";
import { ImagePath } from "@/Constant";

const MainLearningCards = () => {
  const LearningCardsDetails = "Java is an object-oriented programming language. Sun Microsystems first released Java in the year 1995. It is popularly used for developing Java applications in data centers, laptops, cell phones, game consoles, and scientific supercomputers. There are multiple websites and applications which will not work if Java is not installed.";
  return (
    <>
      {mainLearningCardData.map((data, index) => (
        <Col xl="12" key={index}>
          <Card>
            <Row className="blog-box blog-list">
              <Col sm="5">
                <Image width={445} height={334} className="img-fluid sm-100-w" src={`${ImagePath}/faq/${index + 1}.jpg`} alt="blog-image" />
              </Col>
              <Col sm="7">
                <div className="blog-details">
                  <div className="blog-date">
                    <span>{data.dateSpan}</span> {data.date}
                  </div>
                  <h6>{data.language}</h6>
                  <div className="blog-bottom-content">
                    <ul className="blog-social">
                      <li>by: {data.learningCardBy}</li>
                      <li>{data.hits} Hits</li>
                    </ul>
                    <hr />
                    <p className="mt-0">{LearningCardsDetails}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default MainLearningCards;

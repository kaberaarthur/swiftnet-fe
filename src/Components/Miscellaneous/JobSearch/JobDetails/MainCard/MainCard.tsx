import { Rating } from "react-simple-star-rating";
import { Button, Card, CardBody, Row } from 'reactstrap'
import { ApplyForThisJob, EndLessDesigner, Href, ImagePath, ProductDesignerMainCard, SimilarJobs } from '@/Constant'
import JobDescription from "./JobDescription";
import SimilarJobsCards from "./SimilarJobsCards";
import Image from "next/image";
import Link from "next/link";

const MainCard = () => {
  return (
    <>
      <Card>
        <div className="job-search">
          <CardBody>
            <div className="d-flex align-items-center">
              <Image width={40} height={42} className="img-40 img-fluid m-r-20" src={`${ImagePath}/job-search/1.jpg`} alt="job-search"/>
              <div className="flex-grow-1">
                <h6 className="f-w-600">
                  <Link href={Href} className="font-primary">{ProductDesignerMainCard}</Link>
                  <span className="pull-right">
                    <Button color="primary">{ApplyForThisJob}</Button>
                  </span>
                </h6>
                <p>{EndLessDesigner}
                  <Rating className="ms-1" fillColor={"#F0AD4E"} initialValue={Math.random() * 5} size={15}/>
                </p>
              </div>
            </div>
            <JobDescription />
          </CardBody>
        </div>
      </Card>
      <div className="header-faq">
        <h4 className="mb-0 f-w-600">{SimilarJobs}</h4>
      </div>
      <Row>
        <SimilarJobsCards limit={5} jobClass={'col-xl-6 xl-100 box-col-12'} ribbon={false} colClass={true}/> 
      </Row>
    </>
  )
}

export default MainCard
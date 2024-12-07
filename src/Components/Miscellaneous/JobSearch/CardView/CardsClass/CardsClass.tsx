import { Fragment } from 'react'
import { Badge, Card, CardBody, Col } from 'reactstrap'
import { Href, ImagePath } from '@/Constant'
import { Rating } from "react-simple-star-rating";
import { jobData } from '@/Data/Miscellaneous/JobSearch/JobSearch'
import Image from 'next/image';
import Link from 'next/link';

const CardsClass = () => {
  return (
    <Fragment>
      {jobData &&
        jobData.map((item) => (
          <Col xl="6" className="xl-100" key={item.id}>
            <div className="job-search">
              <Card className={`${item.ribbon ? "ribbon-vertical-left-wrapper" : ""}`}>
                {item.ribbon ? (
                  <div className={`ribbon ribbon-bookmark ribbon-vertical-left ribbon-secondary ${!item.ribbon && "d-none"}`}>
                    <i className="icofont icofont-love"></i>
                  </div>
                ) : ("  ")}
                <div className="job-search">
                  <CardBody>
                    <div className="d-flex">
                      <Image width={40} height={42} className="img-40 b-r-0 img-fluid m-r-20" src={`${ImagePath}/${item.logo}`} alt="job"/>
                      <div className="flex-grow-1">
                        <h6 className="f-w-600">
                          <Link href={Href} className='font-primary'>{item.job_name}</Link>
                          {item.type === "new" ? (<Badge color="primary" className="pull-right">{item.badgeValue}</Badge>) : (<span className="pull-right">{item.type}</span>)}
                        </h6>
                        <p>
                          {item.job_area}, {item.job_city}
                          <span><Rating className="ms-1" fillColor={"#F0AD4E"} initialValue={Math.random() * 5} size={20}/></span>
                        </p>
                      </div>
                    </div>
                    <p>{item.Job_description}</p>
                  </CardBody>
                </div>
              </Card>
            </div>
          </Col>
        ))}
    </Fragment>
  )
}

export default CardsClass
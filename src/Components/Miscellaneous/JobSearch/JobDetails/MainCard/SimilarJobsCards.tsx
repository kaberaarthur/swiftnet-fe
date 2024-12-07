import React from 'react'
import { Rating } from "react-simple-star-rating";
import { Badge, Card, CardBody, Col, Row } from 'reactstrap';
import { Href, ImagePath } from '@/Constant';
import { jobData } from '@/Data/Miscellaneous/JobSearch/JobSearch';
import { SimilarJobsCardsType } from '@/Type/Miscellaneous/JobSearch/JobSearch';
import Image from 'next/image';
import Link from 'next/link';

const SimilarJobsCards:React.FC<SimilarJobsCardsType> = ({limit,jobClass,ribbon,colClass}) => {
    return (
      <Row>
        {jobData.slice(0, 5).map((item) => (
          <Col
            className={`col-auto ${limit === item.id && colClass ? "col-xl-12 xl-100": jobClass}`} key={item.id}>
            <Card className={`${item.ribbon && ribbon ? "ribbon-vertical-left-wrapper" : ""}`}>
              {item.ribbon ? (
                <div className={`ribbon ribbon-bookmark ribbon-vertical-left ribbon-secondary ${!ribbon && "d-none"}`}>
                  <i className="icofont icofont-love"></i>
                </div>
              ) : (" ")}
              <div className="job-search">
                <CardBody>
                  <div className="d-flex">
                    <Image width={40} height={42} className="img-40 b-r-0 img-fluid m-r-20" src={`${ImagePath}/${item.logo}`} alt="logo"/>
                    <div className="flex-grow-1">
                      <h6>
                        <Link href={Href}>{item.job_name}</Link>
                        {item.type === "new" ? (<Badge color='primary' className="pull-right">{item.badgeValue}</Badge>) : 
                        (<span className="pull-right">{item.type}</span>)}
                      </h6>
                      <p>
                        {item.job_area}, {item.job_city}
                        <Rating className="ms-1" fillColor={"#F0AD4E"} initialValue={Math.random() * 5} size={20}/>
                      </p>
                    </div>
                  </div>
                  <p>{item.Job_description}</p>
                </CardBody>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
  

export default SimilarJobsCards
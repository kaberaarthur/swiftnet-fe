import { Badge, Card, CardBody } from 'reactstrap'
import { Href, ImagePath } from '@/Constant'
import { Rating } from "react-simple-star-rating";
import { jobData } from '@/Data/Miscellaneous/JobSearch/JobSearch'
import Image from 'next/image';
import Link from 'next/link';

const ListViewCard = () => {
  return (
    <>
      {jobData.slice(0, 8).map((item) => (
        <Card key={item.id} className={`${item.ribbon ? "ribbon-vertical-left-wrapper" : "pb-3"}`}>
          {item.ribbon ? (
            <div className={`ribbon ribbon-bookmark ribbon-vertical-left ribbon-secondary ${!item.ribbon && "d-none"}`}>
              <i className="icofont icofont-love"></i>
            </div>
          ) : ("")}
          <div className="job-search">
            <CardBody>
              <div className="d-flex">
                <Image width={40} height={42} className="img-40 img-fluid m-r-20" src={`${ImagePath}/${item.logo}`} alt="job logo"/>
                <div className="flex-grow-1">
                  <h6 className="f-w-600">
                    <Link href={Href}>{item.job_name}</Link>
                    {item.type === "new" ? (<Badge color="primary" className="pull-right">{item.badgeValue}</Badge>) : (<span className="pull-right">{item.type}</span>)}
                  </h6>
                  <p>
                    {item.job_area}, {item.job_city}
                    <Rating className="ms-1"  fillColor={"#F0AD4E"} initialValue={Math.random()*5} size={20} />
                  </p>
                </div>
              </div>
              <p>{item.Job_description}</p>
            </CardBody>
          </div>
        </Card>
      ))}
    </>
  )
}

export default ListViewCard
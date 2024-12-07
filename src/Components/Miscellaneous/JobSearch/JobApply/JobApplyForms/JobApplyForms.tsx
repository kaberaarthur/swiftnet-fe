import { Button, Card, CardBody, CardFooter } from 'reactstrap'
import { Rating } from "react-simple-star-rating";
import { Href, ImagePath, JobCancelButton, JobPersonalDetails, JobSubmitButton, JobUIDesigner, JobUploadYourFiles, JobYourEducation, JobYourExperience, SaveThisJob } from '@/Constant'
import PersonalDetail from './PersonalDetail';
import EducationClass from './EducationClass';
import ExperienceClass from './ExperienceClass';
import UploadFileClass from './UploadFileClass';
import Image from 'next/image';
import Link from 'next/link';

const JobApplyForms = () => {
  return (
    <Card>
      <div className="job-search">
        <CardBody className="pb-0">
          <div className="d-flex">
            <Image width={40} height={42} className="img-40 img-fluid  m-r-20" src={`${ImagePath}/job-search/1.jpg`} alt="job-search"/>
            <div className="flex-grow-1">
              <h6 className="f-w-600">
                <Link href={Href}>{JobUIDesigner}</Link>
                <span className="pull-right">
                  <Button color="primary">
                    <span><i className="fa fa-check text-white" /></span> {SaveThisJob}
                  </Button>
                </span>
              </h6>
              <p>Save this job <Rating className="ms-1" fillColor={"#F0AD4E"} initialValue={Math.random()*5} size={20} /></p>
            </div>
          </div>
          <div className="job-description">
            <h6 className="mb-0">{JobPersonalDetails}</h6>
            <PersonalDetail />
            <h6 className='mb-0'>{JobYourEducation}</h6>
            <EducationClass />
            <h6  className= 'mb-0' >{JobYourExperience}</h6>
            <ExperienceClass />
            <h6 className='mb-0'>{JobUploadYourFiles}</h6>
            <UploadFileClass />
          </div>
        </CardBody>
        <CardFooter>
          <Button color="primary mx-1">{JobSubmitButton}</Button>
          <Button className="bg-light" color=''>{JobCancelButton}</Button>
        </CardFooter>
      </div>
    </Card>
  )
}

export default JobApplyForms
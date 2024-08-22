import { AgencyExperience, JobDescriptionHeading, Perks, Qualifications, SaveThisJob, Share } from '@/Constant';
import { agencyExpData, perksData, qualificationData } from '@/Data/Miscellaneous/JobSearch/JobSearch';
import { Button } from 'reactstrap';

const JobDescription = () => {
    const JobDetail = "edmin is looking for a UI/UX Designer to join our team. The world is seeing an explosion in the amount and variety of location-baWe are looking for a versatile UX/UI Designer to join our growing design team. Our designers contribute to clients’ projects at all stages of development. We might start from scratch, conducting user and stakeholder interviews, making personas and journey maps, and continue on to iterating on designs and prototypes through delivering final assets for launch. We might come into the middle of an in-flight program-size project and conduct analysis and usability correction or feature enhancement. We might provide research and vision for handoff to an internal development team.";

    return (
      <>
        <div className="job-description">
          <h6>{JobDescriptionHeading}</h6>
          <p>{JobDetail}</p>
        </div>
        <div className="job-description">
          <h6>{Qualifications}</h6>
          <ul >
            {qualificationData.map((data, index) => (<li key={index}>{data}</li>))}
          </ul>
        </div>
        <div className="job-description">
          <h6>{AgencyExperience}</h6>
          <ul >
            {agencyExpData.map((data, index) => (<li key={index}>{data}</li>))}
          </ul>
        </div>
        <div className="job-description">
          <h6>{Perks}</h6>
          <ul >
            {perksData.map((data, index) => (<li key={index}>{data}</li>))}
          </ul>
        </div>
        <div className="job-description">
          <Button color="primary" className="mx-1">
            <span><i className="fa fa-check"></i></span>{SaveThisJob}
          </Button>
          <Button color="primary">
            <span><i className="fa fa-share-alt"></i></span> {Share}
          </Button>
        </div>
      </>
    );
}

export default JobDescription
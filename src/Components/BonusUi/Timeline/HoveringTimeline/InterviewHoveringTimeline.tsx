import { Label, ListGroup, ListGroupItem } from 'reactstrap'
import { Href, ImagePath } from '@/Constant'
import Image from 'next/image'

const InterviewHoveringTimeline = () => {
  return (
    <li className="timeline-event">
      <Label className="timeline-event-icon" />
      <div className="timeline-event-wrapper">
        <p className="timeline-thumbnail">March 2022 - Fresher Interview</p>
        <h5 className="f-w-600">{"Offeror Company"}</h5>
        <div className="text-muted">
          A fresher's interview is to be conducted
          <ListGroup className="main-lists-content">
            <ListGroupItem href={Href} className="list-group-item-action border-0 p-0 mb-3">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="list-wrapper">
                  <Image width={55} height={55} className="list-img" src={`${ImagePath}/avatar/3.jpg`} alt="profile" />
                  <div className="list-content">
                    <h6>{"Molly Boake"}</h6>
                    <p>MollyBoake@rhyta.com</p>
                  </div>
                </div>
                <div className="timeline-icon">
                  <i className="icon-facebook font-primary" />
                  <i className="icon-google font-primary"> </i>
                  <i className="icon-twitter-alt font-primary" />
                </div>
              </div>
              <p className="mb-1">Next step is to choose a tone of voice for your content type.</p>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </li>
  )
}

export default InterviewHoveringTimeline
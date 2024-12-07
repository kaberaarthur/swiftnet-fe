import { Label } from 'reactstrap'
import { meetupHoveringList } from '@/Data/BonusUi/Timeline/Timeline'
import { ImagePath, USMeeting } from '@/Constant'
import Image from 'next/image'

const MeetupHoveringTimeline = () => {
  return (
    <li className="timeline-event">
      <Label className="timeline-event-icon" />
      <div className="timeline-event-wrapper">
        <p className="timeline-thumbnail">July 2022 - Meetup</p>
        <h5 className="f-w-600">{USMeeting}</h5>
        <div className="text-muted">
          2209 Leverton Cove RoadSpringfield, MA 01109
          <div className="designer-details">
            {meetupHoveringList.map(({ image, name, number }, index) => (
              <div className="designer-profile" key={index}>
                <div className="designer-wrap">
                  <Image width={50} height={50} className="designer-img" src={`${ImagePath}/${image}`} alt="profile" />
                  <div className="designer-content">
                    <h6>{name}</h6>
                    <p>{number}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}

export default MeetupHoveringTimeline
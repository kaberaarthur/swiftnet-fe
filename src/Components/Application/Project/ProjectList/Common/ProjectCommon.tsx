import { Badge, Col, Progress } from 'reactstrap'
import { Done, ImagePath } from '@/Constant'
import ProjectDetails from './ProjectDetails'
import ProjectCustomers from './ProjectCustomers'
import Image from 'next/image'
import { CommonProjectInterFace } from '@/Type/Application/ProjectList/ProjectList'

const ProjectCommon:React.FC<CommonProjectInterFace> = ({ item }) => {
  return (
    <Col xxl="4" md="6" >
      <div className={`project-box font-dark bg-light-${item.badge === 'Done' ? 'success' : 'danger'}`}>
        <Badge color={`${item.badge === 'Done' ? 'success' : 'danger'}`}>{item.badge}</Badge>
        <h5 className='f-w-500 mb-2'>{item.title}</h5>
        <div className='d-flex mb-2'>
          <Image width={20} height={20} className='img-20 me-1 rounded-circle' src={`${ImagePath}/user/${item.image}`} alt='images' />
          <p className="font-light">{item.sites}</p>
        </div>
        <p>{item.description}</p>
        <ProjectDetails item={item}/>
        <ProjectCustomers item={item}/>
        <div className='project-status align-items-center gap-1 mt-4'>
          <div className='d-flex mb-2 gap-1'>
            <p className="mb-0">{item.progress}% </p>
            <span>{Done}</span>
          </div>
          <Progress animated color={item.progress === 100 ? 'success' : 'danger'} value={item.progress} style={{ height: '5px' }} />
        </div>
      </div>
    </Col>
  )
}

export default ProjectCommon
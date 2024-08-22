import { Row } from 'reactstrap'
import PagesSort from '../AllTabs/PagesSort'
import GalleryImageDescription from './GalleryImageDescription'

const PhotosTab = () => {
  return (
    <>
      <div>
        <h6 className="mb-2">{'About 12,120 results (0.50 seconds)'}</h6>
        <Row className="my-gallery gallery-with-description gap-0">
          <GalleryImageDescription />
        </Row>
      </div>
      <PagesSort />
    </>
  )
}

export default PhotosTab
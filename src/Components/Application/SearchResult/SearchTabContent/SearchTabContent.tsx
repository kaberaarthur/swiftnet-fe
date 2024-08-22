import { TabContent, TabPane } from 'reactstrap'
import { PropsType } from '@/Type/Application/SearchResult/SearchResult'
import AllTabs from './AllTabs/AllTabs'
import PhotosTab from './PhotosTab/PhotosTab'
import VideoTabs from './VideoTabs/VideoTabs'

const SearchTabContent:React.FC<PropsType> = ({ activeTab }) => {
  return (
    <TabContent activeTab={activeTab}>
      <TabPane tabId={1} className="search-links">
        <AllTabs />
      </TabPane>
      <TabPane tabId={2}>
        <PhotosTab />
      </TabPane>
      <TabPane tabId={3}>
        <VideoTabs />
      </TabPane>
    </TabContent>
  )
}

export default SearchTabContent
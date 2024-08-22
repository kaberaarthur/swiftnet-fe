import { Card, Col } from 'reactstrap'
import InformationCommon from './InformationCommon'
import { searchInformation } from '@/Data/Application/SearchResult/SearchResult'
import Image from 'next/image'
import { ImagePath } from '@/Constant'

const SearchBanner = () => {
  return (
    <Col xxl="4" xl="6" className="box-col-12 mt-4">
      <Card className="o-hidden">
        <div className="blog-box blog-shadow">
          <Image width={497} height={311} className="img-fluid w-100" src={`${ImagePath}/blog/blog.jpg`} alt="blog"/>
          <div className="blog-details">
            <p>{'25 July 2024'}</p>
            <h4>{'Accusamus et iusto odio dignissimos ducimus qui blanditiis.'}</h4>
            <ul className="blog-social ">
              <li><i className="icofont icofont-user"></i>{'Mark Jecno'}</li>
              <li><i className="icofont icofont-thumbs-up"></i>{'02 Hits'}</li>
            </ul>
          </div>
        </div>
      </Card>
      {searchInformation.map((data,i)=>(
        <InformationCommon item={data} key={i} />
      ))}
    </Col>
  )
}

export default SearchBanner
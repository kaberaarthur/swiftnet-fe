import { useAppSelector } from '@/Redux/Hooks';
import { Card, CardBody, Col, Row } from 'reactstrap';
import FilterHeader from './FilterHeader';
import Category from './Category';
import PriceRange from './PriceRange';
import SearchBox from './SearchBox';
import Image from 'next/image';
import { ImagePath } from '@/Constant';

const ProductSidebar = () => {
  const { sideBarOn } = useAppSelector((state) => state.filterData);
  return (
    <Row>
      <Col sm="3">
        <div className={`product-sidebar ${sideBarOn ? "open" : ""}`}>
          <div className="filter-section">
            <Card>
              <FilterHeader />
              <div className="left-filter theme-scrollbar">
                <CardBody className="filter-cards-view animate-chk">
                  <Category />
                  <PriceRange />
                  <div className="product-filter text-center">
                    <Image width={329} height={497} className="img-fluid banner-product w-100" src={`${ImagePath}/ecommerce/banner.jpg`} alt="product"/>
                  </div>
                </CardBody>
              </div>
            </Card>
          </div>
        </div>
      </Col>
      <SearchBox />
    </Row>
  );
}

export default ProductSidebar
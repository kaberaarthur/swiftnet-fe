import { Col, Row } from 'reactstrap'
import { ShareIt } from '@/Constant'
import { productSocial } from '@/Data/Application/Ecommerce/ProductPage'
import Link from 'next/link'

const ProductShare = () => {
  return (
    <Row>
      <Col md="4">
        <h6 className="product-title">{ShareIt}</h6>
      </Col>
      <Col md="8">
        <div className="product-icon">
          <ul className="product-social">
            {productSocial.map((data,index) => (
              <li className="d-inline-block p-0" key={index}>
                <Link href={data.link} target="_blank">
                  <i className={`fa fa-${data.iconName}`} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>
  )
}

export default ProductShare
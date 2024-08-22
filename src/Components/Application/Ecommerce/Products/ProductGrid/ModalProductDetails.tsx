import { useAppSelector } from '@/Redux/Hooks'
import { ProductDetails } from '@/Constant'
import { ModalProductDetailsProp } from '@/Type/Application/Ecommerce/Product'
import { productSizeArray } from '@/Data/Application/Ecommerce/Product'
import { Button } from 'reactstrap'

const ModalProductDetails:React.FC<ModalProductDetailsProp> = ({ singleProduct }) => {
  const {symbol} = useAppSelector((state)=>state.product)
  return (
    <>
      <h4>{singleProduct.category}</h4>
      <div className="product-price">
        <span>{symbol}{singleProduct.price}</span>
        <del>{symbol}{singleProduct.discountPrice}</del>
      </div>
      <div className="product-view">
        <h6 className="f-w-600">{ProductDetails}</h6>
        <p className="mb-0">{singleProduct.description}</p>
      </div>
      <div className="product-size">
        <ul>
          {productSizeArray.map((items, i) => (
            <li key={i} className='p-0'>
              <Button color=''>
                {items}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ModalProductDetails
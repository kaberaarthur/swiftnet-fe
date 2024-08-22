import { useAppSelector } from '@/Redux/Hooks'
import { ProductDetailsProp } from '@/Type/Application/Ecommerce/Product'
import { starData } from '@/Data/Application/Ecommerce/Product'
import Link from 'next/link'

const ProductDetails:React.FC<ProductDetailsProp> = ({ item }) => {
  const {symbol}=useAppSelector((state)=>state.product)
  return (
    <div className="product-details">
      {starData}
      <Link href={`/ecommerce/productpage`}>
        <h4>{item.name}</h4>
      </Link>
      <p>{item.note}</p>
      <div className="product-price">
        <span>{symbol}{item.price}</span> <del>{symbol}{item.discountPrice}</del>
      </div>
    </div>
  )
}

export default ProductDetails
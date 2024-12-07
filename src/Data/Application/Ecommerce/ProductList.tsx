import { TableColumn } from "react-data-table-component";
import { ProductListTableDataColumnType, ProductListTableProduct } from "@/Type/Application/Ecommerce/Ecommerce";
import { Button } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import { ImagePath } from "@/Constant";

export const productListData = [
  {
    text: "The searching functionality provided by DataTables is useful for quickly search through the information in the table - however the search is global, and you may wish to present controls that search on specific columns.",
  },
];

export const productListTableData = [
  {
    image: "ecommerce/product-table-1.png",
    name: "Black Shirt",
    detail: "Vida Loca - Gray Checks Fit Men's Casual Shirt.",
    price: "$12",
    status: "Sold Out",
    date: "2022/05/21",
  },
  {
    image: "ecommerce/product-table-2.png",
    name: "Yellow T-shirt",
    detail: "Wild West - Yellow Cotton Blend Regular Fit Men's Formal T-Shirt",
    price: "$15",
    status: "Low Stock",
    date: "2022/08/15",
  },
  {
    image: "ecommerce/product-table-3.png",
    name: "Blackish Top",
    detail: "aask - Black Polyester Blend Women's Fit & Flare T-shirt.",
    price: "$20",
    status: "In Stock",
    date: "2022/05/12",
  },
  {
    image: "ecommerce/product-table-4.png",
    name: "Brown Casual Shirt",
    detail: "R L F - Brown Cotton Blend Men's A-Line Shirt",
    price: "$14",
    status: "Low Stock",
    date: "2022/12/16",
  },
  {
    image: "ecommerce/product-table-5.png",
    name: "Black & white Dress",
    detail: "Women's Black & White Collection Dress.",
    price: "$25",
    status: "Sold Out",
    date: "2022/01/15",
  },
  {
    image: "ecommerce/product-table-6.png",
    name: "Red Blazer For Winter",
    detail: "Womens's Red Winter Season Collection Blazer.",
    price: "$10",
    status: "Sold Out",
    date: "2022/08/10",
  },
  {
    image: "ecommerce/product-table-1.png",
    name: "Yellow Plain T-shirt",
    detail: "Wild West - Yellow Cotton Blend Regular Fit Men's Formal T-Shirt.",
    price: "$12",
    status: "Low Stock",
    date: "2022/05/21",
  },
  {
    image: "ecommerce/product-table-2.png",
    name: "Blackish Top",
    detail: "aask - Black Polyester Blend Women's Fit & Flare T-shirt.",
    price: "$15",
    status: "Sold Out",
    date: "2022/08/15",
  },
  {
    image: "ecommerce/product-table-3.png",
    name: "Women's T-shirt",
    detail: "Women's Black T-shirt",
    price: "$20",
    status: "In Stock",
    date: "2022/05/12",
  },
  {
    image: "ecommerce/product-table-4.png",
    name: "Brown Shirt",
    detail: "Men's Brown Shirt",
    price: "$14",
    status: "Low Stock",
    date: "2022/12/16",
  },
  {
    image: "ecommerce/product-table-5.png",
    name: "Brown Casual Shirt",
    detail: "R L F - Brown Cotton Blend Men's A-Line Shirt",
    price: "$14",
    status: "In Stock",
    date: "2022/12/16",
  },
  {
    image: "ecommerce/product-table-1.png",
    name: "Black Shirt",
    detail: "Vida Loca - Gray Checks Fit Men's Casual Shirt.",
    price: "$25",
    status: "Low Stock",
    date: "2022/05/21",
  },
  {
    image: "ecommerce/product-table-6.png",
    name: "Red Blazer For Winter",
    detail: "Womens's Red Winter Season Collection Blazer.",
    price: "$10",
    status: "In Stock",
    date: "2022/01/15",
  },
  {
    image: "ecommerce/product-table-2.png",
    name: "Yellow T-shirt",
    detail: "Wild West - Yellow Cotton Blend Regular Fit Men's Formal T-Shirt",
    price: "$12",
    status: "In Stock",
    date: "2022/05/21",
  },
  {
    image: "ecommerce/product-table-4.png",
    name: "Brown Shirt",
    detail: "Men's Brown Shirt",
    price: "$14",
    status: "Low Stock",
    date: "2022/12/16",
  },
];

const ProductListTableAction = () => {
  return (
    <>
      <Button color="danger" size="xs">
        Delete
      </Button>
      <Button color="primary" size="xs">
        Edit
      </Button>
    </>
  );
};

const ProductListTableProductName: React.FC<ProductListTableProduct> = ({ images }) => {
  return (
    <>
      <Link href={`/ecommerce/productpage`}>
        <Image width={64} height={64} className="img-fluid" src={`${ImagePath}/${images}`} alt="shirt" />
      </Link>
    </>
  );
};

const ProductListTableProductNameDetail: React.FC<ProductListTableProduct> = ({ productName, productDetail }) => {
  return (
    <div className="d-block">
      <Link href={`/ecommerce/productpage`}>
        <h6>{productName}</h6>
      </Link>
      <span>{productDetail}</span>
    </div>
  );
};

const ProductListTableStatus: React.FC<ProductListTableProduct> = ({ status }) => {
  return <span className={`font-${status === "Sold Out" ? "danger" : `${status === "Low Stock" ? "primary" : "success"}`}`}>{status}</span>;
};

export const productListTableDataColumn: TableColumn<ProductListTableDataColumnType>[] = [
  {
    name: "Product Name",
    cell: (row) => <ProductListTableProductName images={row.image} />,
    sortable: true,
  },
  {
    name: "Details",
    cell: (row) => <ProductListTableProductNameDetail productName={row.name} productDetail={row.detail} />,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => `${row.price}`,
    sortable: true,
  },
  {
    name: "Stock",
    cell: (row) => <ProductListTableStatus status={row.status} />,
    sortable: true,
  },
  {
    name: "Start date",
    selector: (row) => `${row.date}`,
    sortable: true,
  },
  {
    name: "Action",
    cell: () => <ProductListTableAction />,
  },
];

export const filtersData = [
  {
    name: "Choose Product",
    options: ["Apple iphone 13 Pro", "Wood Chair", "M185 Compact Wireless Mouse"],
  },
  {
    name: "Choose Category",
    options: ["Furniture", "Smart Gadgets", "Electrics"],
  },
  {
    name: "Choose Sub Category",
    options: ["Smart Phones", "Smart Watches", "Wireless headphone"],
  },
  {
    name: "Status",
    options: ["Sold Out", "In Stock", "Pre Order", "Limited Stock"],
  },
  {
    name: "Price",
    options: ["56000.00", "19000.00", "10000.00", "15000.00", "99000.00"],
  },
];

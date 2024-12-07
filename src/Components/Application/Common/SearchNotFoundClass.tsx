import { Col } from "reactstrap";
import { ImagePath } from "@/Constant";
import Image from "next/image";

interface SearchNotFoundClassType {
  word: string;
}

const SearchNotFoundClass: React.FC<SearchNotFoundClassType> = ({ word }) => {
  return (
    <Col sm="12">
      <div>
        <div className="search-not-found text-center p-5">
          <p>{`Sorry, Not Found Any ${word}`}</p>
        </div>
      </div>
    </Col>
  );
};

export default SearchNotFoundClass;

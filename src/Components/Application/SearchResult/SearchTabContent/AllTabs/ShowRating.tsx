import { ShowRatingProps } from "@/Type/Application/SearchResult/SearchResult";

const ShowRating: React.FC<ShowRatingProps> = ({ item }) => {
  return <li>{item.map((data, index) => (data === true ? <i className="icofont icofont-ui-rating" key={index} /> : <i className="icofont icofont-ui-rate-blank" key={index} />))}</li>;
};

export default ShowRating;

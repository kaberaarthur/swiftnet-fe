import { CardType } from "@/Type/Application/Users/UsersProfile";
import { Followers, Following, Posts } from "@/Constant";

const UserCardsFooter: React.FC<CardType> = ({ item }) => {
  return (
    <ul className="social-follow">
      <li>
        <h5 className="mb-0">{item.totalPost}</h5>
        <span className="font-light">{Posts}</span>
      </li>
      <li>
        <h5 className="mb-0">{item.follower}</h5>
        <span className="font-light">{Followers}</span>
      </li>
      <li>
        <h5 className="mb-0">{item.following}</h5>
        <span className="font-light">{Following}</span>
      </li>
    </ul>
  );
};

export default UserCardsFooter;

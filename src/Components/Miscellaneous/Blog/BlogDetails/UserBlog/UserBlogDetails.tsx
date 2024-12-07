import { Comments, Hits } from '@/Constant';

const UserBlogDetails = () => {
  return (
    <div className="blog-details">
      <p>25 July 2024</p>
      <h4>Experience lightning-fast load times and keep your visitors engaged.</h4>
      <ul className="blog-social">
        <li><i className="icofont icofont-user" />William G. Savard</li>
        <li><i className="icofont icofont-thumbs-up" />02 {Hits}</li>
        <li><i className="icofont icofont-ui-chat" />598 {Comments}</li>
      </ul>
    </div>
  )
}

export default UserBlogDetails
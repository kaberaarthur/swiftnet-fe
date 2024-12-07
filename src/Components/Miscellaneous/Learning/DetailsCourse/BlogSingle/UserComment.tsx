import { blogSingleData } from "@/Data/Miscellaneous/Learning/Learning";
import BlogComment from "./BlogComment";

const UserComment = () => {
  return (
    <>
      {blogSingleData.map((data, i) => (
        <li key={i}>
          {data.id !== 2 ? (
            <BlogComment data={data} />
          ) : (
            <ul>
              <li>
                <BlogComment data={data} />
              </li>
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default UserComment;

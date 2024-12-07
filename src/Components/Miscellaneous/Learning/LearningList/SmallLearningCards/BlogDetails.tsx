import React from "react";
import { BlogDetailsProp } from "@/Type/Miscellaneous/Learning/Learning";

const BlogDetails: React.FC<BlogDetailsProp> = ({ text }) => {
  return (
    <div className="blog-details-main ">
      <ul className="blog-social ">
        <li>9 April 2024</li>
        <li>by: Admin</li>
        <li>0 Hits</li>
      </ul>
      <hr />
      <p className="blog-bottom-details">{text}</p>
    </div>
  );
};

export default BlogDetails;

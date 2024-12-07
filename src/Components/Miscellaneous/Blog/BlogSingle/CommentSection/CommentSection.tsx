import { blogSingleData } from '@/Data/Miscellaneous/Blog/BlogDetails'
import { Comments } from '@/Constant'
import BlogComment from './BlogComment'

const CommentSection = () => {
  return (
    <section className="comment-box">
      <h4>{Comments}</h4>
      <hr />
      <ul >
        {blogSingleData.map((data,i)=>(
          <li key={i}>
            {data.id !== 2 ?
              <BlogComment data={data} /> : 
              <ul>
                <li>
                  <BlogComment data={data} />
                </li>
              </ul>
            }
          </li>
        ))}
    </ul>
    </section>
  )
}

export default CommentSection
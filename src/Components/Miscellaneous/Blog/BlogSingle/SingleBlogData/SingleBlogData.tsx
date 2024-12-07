import { ImagePath, SingleBlogHeading } from '@/Constant'
import Image from 'next/image';

const SingleBlogData = () => {
  const SingleBlogParagraph1 = `From the east coast to the west, each river has its own beauty and character. Each river has its own story. Take a look at some America’s best rivers and some of the rivers we’re working to protect. And learn some facts about your favorite rivers. The Harpeth River and its tributaries are home to rich freshwater biodiversity, including more than 50 species of fish and 30 species of mussels`;
  const SingleBlogParagraph2 = `The Harpeth River flows through the heart of downtown Franklin, the 14th fastest growing city in the United States, and traverses Williamson County, one of the fastest growing counties in Tennessee. This rapid development has already caused harm to the river from adding treated sewage, increasing stormwater runoff, and withdrawing water.The river’s impairment is caused by dangerously low levels of dissolved oxygen driven by high concentrations of nutrients – particularly phosphorus – that fuel oxygen-hungry algal blooms that can lead to toxic conditions.`;
  return (
    <div className="blog-box blog-details">
      <Image width={1552} height={291} className="img-fluid w-100" src={`${ImagePath}/blog/blog-single.jpg`} alt="blog-main" />
      <div className="blog-details">
        <ul className="blog-social">
          <li>25 July 2024</li>
          <li><i className="icofont icofont-user" />Mark Jecno</li>
          <li><i className="icofont icofont-thumbs-up" /> 02<span>Hits</span></li>
          <li><i className="icofont icofont-ui-chat" /> Comments</li>
        </ul>
        <h4>{SingleBlogHeading}</h4>
        <div className="single-blog-content-top">
          <p>{SingleBlogParagraph1}</p>
          <p>{SingleBlogParagraph2}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleBlogData
import { ImagePath } from "@/Constant";
import { TabContentProp } from "@/Type/UiKits/UiKitsType";
import Image from "next/image";
import { TabContent, TabPane } from "reactstrap";

const PillsTabContent: React.FC<TabContentProp> = ({ basicTab }) => {
  return (
    <TabContent activeTab={basicTab}>
      <TabPane tabId="1">
        <p className="pt-3">The ultimate goal of every web design is to create a site that will reach its audience and be useful to them. In order to achieve that, it is necessary to befriend Google's mechanisms and algorithms. There is no use of a pretty website, if it's displayed on a 10th page of search results, because this way no one will ever find it. That brings us to the topic of Google's Website Ranking.Generally speaking, it's a list of pages and their keywords, sorted in the order of search results. The higher your place in the ranking is, the more people are likely to see your page.</p>
      </TabPane>
      <TabPane tabId="2">
        <ul className="d-flex flex-column gap-1 pt-3 ">
          <li> Create professional web page design. Responsive, fully customizable with easy Drag-n-Drop Nicepage editor. Adjust colors, fonts, header and footer, layout and other design elements, as well as content and images.</li>
          <li><strong>Visit Us: </strong> 4 Marigold Close, Glenmore Park, New South Wales, 2745 Australia- 2745</li>
          <li><strong>Mail Us:</strong> SamuelMario@armyspy.com</li>
          <li><strong>Contact Number: </strong> (02) 4733 6337</li>
        </ul>
      </TabPane>
      <TabPane tabId="3">
        <div className="pt-3 d-flex align-items-center gap-3 pills-blogger">
          <div className="blog-wrapper d-flex bg-light-primary">
            <div className="flex-shrink-0 border-primary"><Image width={22} height={22} className="blog-img" src={`${ImagePath}/dashboard2/product/1.png`} alt="head-phone" /></div>
          </div>
          <div className="blog-content">
            <p><em className="font-primary fw-bold">Macbook</em> &mdash; iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has been the primary part of Apple's consumer desktop offerings since its debut in August 1998, and has evolved through seven distinct forms.</p>
          </div>
        </div>
        <div className="pt-3 d-flex align-items-center gap-3 pills-blogger">
          <div className="blog-wrapper d-flex bg-light-secondary">
            <div className="flex-shrink-0 border-secondary"><Image width={22} height={22} src={`${ImagePath}/dashboard2/product/2.png`} alt="product" /></div>
          </div>
          <div className="blog-content">
            <p><em className="font-secondary fw-bold">Microwave</em> — Microwave is a form of electromagnetic radiation with wavelengths ranging from about one meter to one millimeter corresponding to frequencies between 300 MHz and 300 GHz respectively. Different sources define different frequency ranges as microwaves.</p>
          </div>
        </div>
      </TabPane>
    </TabContent>
  );
};

export default PillsTabContent;

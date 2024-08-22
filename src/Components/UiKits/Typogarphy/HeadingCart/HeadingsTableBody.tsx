import { Heading } from "@/Constant";

const HeadingsTableBody = () => {
  return (
    <tbody>
      <tr>
        <td><code>&lt;h1&gt;&lt;/h1&gt;</code></td>
        <td><p className="mb-0 display-h1">1.875rem</p></td>
        <td><p className="mb-0 display-h1">30px</p></td>
        <td><p className="mb-0 display-h1">500</p></td>
        <td><p className="display-h1"><span> {Heading} 1 (MEGA)</span></p></td>
      </tr>
      <tr>
        <td><code>&lt;h2&gt;&lt;/h2&gt;</code></td>
        <td><h2 className="mb-0">1.625rem</h2></td>
        <td><h2 className="mb-0">26px</h2></td>
        <td><h2 className="mb-0">500</h2></td>
        <td><h2><span> {Heading} 2 (XL)</span></h2></td>
      </tr>
      <tr>
        <td><code>&lt;h3&gt;&lt;/h3&gt;</code></td>
        <td><h3 className="mb-0">1.375rem</h3></td>
        <td> <h3 className="mb-0">22px</h3></td>
        <td><h3 className="mb-0">400</h3></td>
        <td><h3><span> {Heading} 3 (LARGE)</span></h3></td>
      </tr>
      <tr>
        <td><code>&lt;h4&gt;&lt;/h4&gt;</code></td>
        <td><h4 className="mb-0">1.25rem</h4></td>
        <td><h4 className="mb-0">20px</h4></td>
        <td><h4 className="mb-0">600</h4></td>
        <td><h4><span> {Heading} 4 (MEDIUM)</span></h4></td>
      </tr>
      <tr>
        <td><code>&lt;h5&gt;&lt;/h5&gt;</code></td>
        <td><h5 className="mb-0">1rem</h5></td>
        <td><h5 className="mb-0">16px</h5></td>
        <td><h5 className="mb-0">400</h5></td>
        <td><h5><span> {Heading} 5 (SMALL)</span></h5></td>
      </tr>
      <tr>
        <td className="pb-0"><code>&lt;h6&gt;&lt;/h6&gt;</code></td>
        <td className="pb-0"><h6 className="mb-0">0.875rem</h6></td>
        <td className="pb-0"><h6 className="mb-0">14px</h6></td>
        <td className="pb-0"><h6 className="mb-0">400</h6></td>
        <td className="pb-0"><h5><span> {Heading} 6 </span></h5></td>
      </tr>
    </tbody>
  );
};

export default HeadingsTableBody;

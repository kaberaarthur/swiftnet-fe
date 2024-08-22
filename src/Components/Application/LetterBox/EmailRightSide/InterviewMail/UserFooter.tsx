import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { ImagePath } from "@/Constant";
import Image from "next/image";
import DownloadLink from "react-download-link";
import SimpleMdeReact from "react-simplemde-editor";

const UserFooter = () => {
  const mdeEditorText = `Enter text in the area on the left. For more info, click the ? (help) icon in the menu.`;
  return (
    <div className="user-footer">
      <div>
        <SvgIcon iconId="paperclip" className="feather" />
        <span className="f-light">{"Attachments"}</span>
      </div>
      <div className="d-inline-block">
        <div className="attchment-file common-flex">
          <div className="common-flex align-items-center">
            <Image width={30} height={36} src={`${ImagePath}/email-template/pdfs.png`} alt="pdf" />
            <div className="d-block">
              <p>Offer_Letter.pdf</p>
              <p>200KB</p>
            </div>
          </div>
          <DownloadLink filename="myfile.txt" label={<i className="fa fa-download font-light"></i>} />
        </div>
      </div>
      <div className="toolbar-box">
        <SimpleMdeReact id="editor_container" value={mdeEditorText} options={{ autofocus: true, spellChecker: false }} />
      </div>
    </div>
  );
};

export default UserFooter;

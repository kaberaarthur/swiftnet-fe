import { Col, Input } from "reactstrap";
import { UpgradeSpanText, UpgradeTitle } from "@/Constant";
import { upgradeVariationData } from "@/Data/Forms/FormsControl/MegaOption/MegaOption";

const VariationCheckboxUpgrade = () => {
  const upgradeParagraph = "Select the theme that best suits your requirements, and you're ready to go!";
  return (
    <Col xl="8" md="7">
      <div className="card-wrapper default-border rounded-3 h-100 checkbox-checked">
        <section className="main-upgrade">
          <div>
            <i className="fa fa-rocket"></i>
            <h5 className="mb-2">
              {UpgradeTitle} <span className="font-primary">{UpgradeSpanText}</span>
            </h5>
            <p className="text-muted mb-2">{upgradeParagraph}</p>
          </div>
          <div className="variation-box">
            {upgradeVariationData.map(({ id, check, text, sales }, index) => (
              <div className="selection-box" key={index}>
                <Input id={`feature${id}`} type="checkbox" defaultChecked={check} />
                <div className="custom--mega-checkbox bg-light-primary">
                  <ul>
                    <li>{text}</li>
                    <li className="font-primary">{sales}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Col>
  );
};

export default VariationCheckboxUpgrade;

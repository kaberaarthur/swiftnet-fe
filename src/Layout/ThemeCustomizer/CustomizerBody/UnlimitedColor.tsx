import { UnlimitedColorHeading } from "@/Constant";
import { lightColorData } from "@/Data/Layout/ThemeCustomizerData";
import { PropsLightColor } from "@/Type/Layout/Sidebar";

const UnlimitedColor = () => {
  const handleColor = (data: PropsLightColor) => {
    document.documentElement.style.setProperty("--theme-default", data.primary);
    document.documentElement.style.setProperty("--theme-secondary", data.secondary);
  };
  return (
    <div className="customizer-color mb-3 p-2 rounded-3 default-border b-t-primary">
      <div className="color-picker mb-2">
        <h4>{UnlimitedColorHeading}</h4>
      </div>
      <ul className="layout-grid flex-row">
        {lightColorData.map((data, i) => (
          <li className="color-layout" data-primary={data.primary} data-secondary={data.secondary} key={i} data-attr={`color-${i + 1}`} onClick={() => handleColor(data)}>
            <div />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnlimitedColor;

import { Href, ImagePath, ThemeColorMode } from "@/Constant";
import { mixLayoutData } from "@/Data/Layout/ThemeCustomizerData";
import { useAppDispatch } from "@/Redux/Hooks";
import { setMixLayoutType } from "@/Redux/Reducers/ThemeCustomizerSlice";
import Image from "next/image";

const MixLayout = () => {
  const dispatch = useAppDispatch();
  const handleDarkLayout = (item: string) => {
    dispatch(setMixLayoutType(item));
  };
  return (
    <div className="mb-3 p-2 rounded-3 default-border b-t-primary">
      <div className="color-header mb-2">
        <h4>{ThemeColorMode}:</h4>
        <p className="font-light">Choose between 3 different mix layout.</p>
      </div>
      <div className="color-body d-flex align-items-center justify-space-between">
        {mixLayoutData.map((data, i) => (
          <div className={`color-img ${data.class}`} key={i}>
            <Image width={86} height={65} className="img-fluid" src={`${ImagePath}/customizer/${data.image}`} alt="customizer" />
            <div className="customizer-overlay" />
            <div className={`button color-btn ${data.color}-setting`}>
              <a href={Href} onClick={() => handleDarkLayout(data.layout)}>
                {data.title}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MixLayout;

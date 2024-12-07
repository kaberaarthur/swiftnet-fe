import { languageData } from "@/Data/Layout/LanguageData";
import { LanguageDataType } from "@/Type/Layout/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/Redux/Hooks";
import { setLayoutType } from "@/Redux/Reducers/ThemeCustomizerSlice";

const Language = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;
  const [selectedLang, setSelectedLang] = useState<any>({});
  const Language = Cookies.get("i18next");
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [flag, setFlag] = useState("us");
  const dispatch = useAppDispatch();

  const changeLanguage = (lng: LanguageDataType) => {
    setLang(lng.languageParameter);
    setFlag(lng.languageIconClassName);
    i18n.changeLanguage(lng.languageParameter);
    setOpen(false);
  };
  const LanguageSelection = (open: boolean) => {
    if (open) {
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };
  useEffect(() => {
    const defaultLanguage = languageData.find((data) => data.languageParameter == currentLanguage);
    setSelectedLang(defaultLanguage);
    router.refresh();
  }, []);
  useEffect(() => {
    if (Language === "ae") dispatch(setLayoutType("rtl"));
    else dispatch(setLayoutType("ltr"));
  }, [Language]);

  return (
    <li className="language-nav">
      <div className={`translate_wrapper ${open ? "active" : ""}`}>
        <div className="current_lang">
          <div className="lang" onClick={() => LanguageSelection(open)}>
            <span className="lang-txt">{Language}</span>
          </div>
        </div>
        <div className={`more_lang ${open ? "active" : ""}`}>
          {languageData.map((data, index) => (
            <div className="lang selected" key={index} onClick={() => changeLanguage(data)}>
              <i className={`flag-icon fi flag-icon-${data.languageIconClassName}`}></i>
              <span className="lang-txt ms-1">
                {data.languageName}
                {data.subTitle && <span> ({data.subTitle})</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default Language;

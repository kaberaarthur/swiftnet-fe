import { blockquote } from "@/Data/UiKits/Typogarphy/Typogarphy";

const DynamicBlockquotes = () => {
  return (
    <>
      {blockquote.map(({ text, name, className, color }, index) => (
        <div className={`figure text-${className} d-block dark-blockquote`} key={index}>
          <blockquote className={`blockquote mb-2 bg-light-${color} ${index === 1 ? "b-r-tertiary" : ""}`}>
            <p className={`mb-0 f-16`}>{text}</p>
            <span className="blockquote-footer">{name}</span>
          </blockquote>
        </div>
      ))}
    </>
  );
};

export default DynamicBlockquotes;

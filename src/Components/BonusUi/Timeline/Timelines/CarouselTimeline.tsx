import { useState } from "react";
import { Badge, Carousel, CarouselControl, CarouselIndicators, CarouselItem } from "reactstrap";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { CarouselText, DesignerTitle, ImagePath } from "@/Constant";
import { carouselDataList } from "@/Data/BonusUi/Timeline/Timeline";

const CarouselTimeline = () => {
  const CarouselSpanText = "Spend some time looking up current design trend.";
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === carouselDataList.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? carouselDataList.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = carouselDataList.map((item, index) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={index}><img src={`${ImagePath}/${item.image}`} alt="office-work" className="d-block w-100" /></CarouselItem>
    );
  });
  return (
    <VerticalTimelineElement className="cd-timeline-block" date="April 23 2022" icon={<i className="icon-image"></i>} iconClassName="cd-timeline-img cd-picture bg-success">
      <div className="cd-timeline-content">
        <div className="timeline-wrapper"><Badge color="info">{DesignerTitle}</Badge></div>
        <h5 className="f-w-500 m-0">{CarouselText}</h5>
        <p className="mb-0">{CarouselSpanText}</p>
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators items={carouselDataList} activeIndex={activeIndex} onClickHandler={goToIndex} />{slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      </div>
    </VerticalTimelineElement>
  );
};

export default CarouselTimeline;

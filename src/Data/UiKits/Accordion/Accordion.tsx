import { CheckSquare, MessageCircle } from "react-feather";

export const accordionData = [
  {
    text: "Use ",
    code: ".accordion, accordion-light-*",
  },
  {
    text: "click accordion below to expand/collapse accordion content, you can use different color. "
  },
];

export const simpleAccordion2 = (
  <p>
    <strong> Search engine optimization: </strong> Search engine optimization
    (SEO) is a method for improving the chances for a website to be found by
    search engines. Web design codes information in a way that search engines
    can read it. It can boost business because the site shows up on the top
    search result pages, helping people to find it. <br /> <br />
    <strong> Mobile responsiveness:</strong> Mobile responsiveness is the
    feature of a website that allows it to display on a mobile device and adapt
    its layout and proportions to be legible. Web design ensures sites are easy
    to view and navigate from mobile devices. When a website is well-designed
    and mobile-responsive, customers can reach the business with ease. <br />
    <br /> <strong> Improved sales:</strong>Increasing the number of items sold
    or acquiring more active customers are objectives of a compelling website.
    As web design reaches targeted customers and search engines, it helps the
    business make conversions on their site and improve its sales.
  </p>
);


export const accordionList3 =[
  <>
    <p>
      The web design process allows designers to adjust to any preferences and
      provide effective solutions. There are many standard components of every
      web design, including:
    </p>
    <ul className="d-flex flex-column gap-2 accordions-content ">
      <li>1. Layout</li>
      <li>2. Images</li>
      <li>3. Visual hierarchy</li>
      <li>4. Color scheme</li>
      <li>5. Typography</li>
      <li>6. Navigation</li>
      <li>7. ReadabiLIty</li>
      <li>8. Content</li>
    </ul>
  </>
]

export const accordionList = [
  {
    id: "2",
    icon: true,
    accordionHeaderClass: "accordion-light-primary",
    accordionHeading: "What is the use of web design?",
    spanClass: "font-primary",
    bodyText: simpleAccordion2,
  },
  {
    id: "3",
    icon: true,
    accordionHeaderClass: "accordion-light-primary",
    accordionHeading: "What are the elements of web design?",
    spanClass: "font-primary",
    bodyText: accordionList3,
  },
];

export const flushData = [
  {
    text: "Add ",
    code: ".accordion-flush",
  },
  {
    text: " to remove the default",
    code: " background-color",
  },
  {
    text: " , some borders, and some rounded corners to render accordions edge-to-edge with their parent container.",
  },
];

export const flushAccordion2 = 
  `Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item&apos;s accordion body. Let&apos;s imagine this being filled with some actual content.`

export const flushAccordion3 = (
  `Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item&apos;s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.`
);

export const flushList = [
  {
    id: "2",
    accordionHeading: "Flush accordion Item #2",
    bodyText: flushAccordion2,
  },
  {
    id: "3",
    accordionHeading: "Flush accordion Item #3",
    bodyText: flushAccordion3,
  },
];

export const multipleData = [
  {
    text: " A   ",
    code: "<button>",
  },
  {
    text: " or",
    code: "<a>",
  },
  {
    text: " can show and hide multiple elements by referencing them with a selector in its href or data-bs-target attribute.",
  },
];

export const accordionIconData = [
  {
    text: "Use the ",
    code: ".accordion ",
  },
  {
    text: "& ",
    code: "feather icons",
  },
  {
    text: " through change look icons accordion.",
  },
];

export const iconAccordion2 = (
  <ul className="d-flex flex-column gap-2 accordions-content ">
    <li>
      You get the same features in Chat and Chat in Gmail, but the integrated
      Gmail experience provides a central location to communicate with friends,
      family, or coworkers between emails.
    </li>
    <li>
      <strong>Chat:</strong> Use when you prefer a dedicated chat experience and
      don't mind switching between different apps.
    </li>
  </ul>
);
export const iconAccordion3 = (
  <ul className="d-flex flex-column gap-2 accordions-content ">
    <li>1 Decide on the indentation and keep it that way.</li>
    <li>2 Make comments.</li>
    <li>3 Consistent name scheme.</li>
    <li>4 Don't repeat code.</li>
    <li>5 Avoid writing long code LInes.</li>
    <li>6 Break down a big task into smaller chunks.</li>
    <li>7 Organize your program into smaller files.</li>
    <li>8 Write clever code that is also readable.</li>
  </ul>
);

export const accordionIconList = [
  {
    id: "2",
    iconWithTitle: "Message",
    svgClass:"svg-color stroke-secondary me-2",
    icon: true,
    accordionHeaderClass: "gap-2 accordion-light-secondary",
    accordionHeading: " Chats with others",
    spanClass:"font-secondary",
    bodyText: iconAccordion2,
  },
  {
    id: "3",
    iconWithTitle: "Tick-square",
    svgClass:"svg-color stroke-secondary me-2",
    icon: true,
    accordionHeaderClass: "gap-2 accordion-light-secondary",
    accordionHeading: " Right way to code",
    spanClass:"font-secondary",
    bodyText: iconAccordion3,
  },
];

export const outlineData = [
  {
    text: "You can give ",
    code: ".accordion,.nestings",
  },
  {
    text: " inside the parent Accordion content property by using id #nestedaccordion of nested element.",
  },
];

export const simpleAccordion3 = (
  <>
  <p>
    The web design process allows designers to adjust to any preferences and
    provide effective solutions. There are many standard components of every
    web design, including:
  </p>
</>
);

export const outlineList = [
  {
    id: "2",
    icon: true,
    accordionItemClass: "accordion-wrapper",
    accordionHeaderClass: "bg-light-info",
    accordionHeading: "What is the use of web design?",
    spanClass: "font-info",
  },
];
export const outlineList1 = [
  {
    id: "3",
    icon: true,
    accordionItemClass: "accordion-wrapper",
    accordionHeaderClass: "bg-light-info",
    accordionHeading: "What are the elements of web design?",
    spanClass: "font-info",
    bodyText: simpleAccordion3,
  },
];

export const accordionHorizontal = [
  {
    text: "Add ",
    code: ".collapse-horizontal ",
  },
  {
    text: " modifier class to transition width, set a width on the next child element.",
  },
];

//Collapse Accordions
export const accordionCollapse = [
  {
    text: "you can also use a link with the href attribute",
    code: "(role='button' & ), data-bs-toggle='collapse'",
  },
  {
    text: "is required."
  }
];

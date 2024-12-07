import { gridOptionHeader } from "@/Data/UiKits/Grid/GridData";

const GridOptionTableHead = () => {
  return (
    <thead>
      <tr>
        <th></th>
        <th className="text-center">
          <p>Extra small</p>
          <small>&lt;576px</small>
        </th>
        {gridOptionHeader.map(({ title, small, className }, index) => (
          <th className="text-center" key={index}>
            <p>{title}</p>
            <small className={className ? className : ""}>{small}</small>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default GridOptionTableHead;

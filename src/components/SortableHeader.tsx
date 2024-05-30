import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface SortableHeaderProps {
  field: string;
  label: string;
  sortBy: string | null;
  sortOrder: "asc" | "desc";
  onClick: (field: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  field,
  label,
  sortBy,
  sortOrder,
  onClick,
}) => {
  const isSorted = sortBy === field;

  return (
    <th onClick={() => onClick(field)}>
      {label}{" "}
      {isSorted && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
    </th>
  );
};

export default SortableHeader;

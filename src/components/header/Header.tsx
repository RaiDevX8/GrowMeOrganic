import React from "react";
import { Checkbox } from "antd";
import { Artwork } from "../../types/ArtworkTypes";

interface TableHeaderProps {
  artworks: Artwork[];
  selectedRows: Set<string>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<string>>>;
  onRowCountSubmit: () => void;
  onSelectAll: (selected: boolean) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  artworks,
  selectedRows,
  onSelectAll,
}) => {
  const isAllSelected = artworks.every((artwork) =>
    selectedRows.has(artwork.id)
  );

  const isSomeSelected = artworks.some((artwork) =>
    selectedRows.has(artwork.id)
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        indeterminate={isSomeSelected && !isAllSelected}
        checked={isAllSelected}
        onChange={(e) => onSelectAll(e.target.checked)}
      />
      <span>Select All</span>
    </div>
  );
};

export default TableHeader;

import React from "react";
import { Pagination } from "antd";

interface PaginationControlsProps {
  currentPage: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  total,
  pageSize,
  onChange,
}) => (
  <Pagination
    current={currentPage}
    total={total}
    pageSize={pageSize}
    onChange={onChange}
    showSizeChanger={false}
    style={{
      marginTop: "20px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
);

export default PaginationControls;

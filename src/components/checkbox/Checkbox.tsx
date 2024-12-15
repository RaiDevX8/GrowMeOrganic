import React from "react";
import { Checkbox } from "antd";

interface RowCheckboxProps {
  id: string;
  selected: boolean;
  onChange: (id: string, selected: boolean) => void;
}

const RowCheckbox: React.FC<RowCheckboxProps> = ({ id, selected, onChange }) => (
  <Checkbox checked={selected} onChange={(e) => onChange(id, e.target.checked)} />
);

export default RowCheckbox;

import React, { useEffect, useState } from "react";
import { fetchArtworks } from "../api/artworkApi";
import { Artwork } from "../types/ArtworkTypes";
import { Table, Checkbox, Pagination, Dropdown, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";

const PAGE_SIZE = 12;

const TableComponent: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const [selectedRows, setSelectedRows] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem("selectedRows") || "[]"))
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rowCount, setRowCount] = useState<number | undefined>();

  const fetchData = async (page: number) => {
    const response = await fetchArtworks(page, PAGE_SIZE);
    setArtworks(response.artworks);
    setPagination(response.pagination);
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  useEffect(() => {
    localStorage.setItem("selectedRows", JSON.stringify([...selectedRows]));
  }, [selectedRows]);

  const handleRowSelection = (id: string, selected: boolean) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      selected ? newSet.add(id) : newSet.delete(id);
      return newSet;
    });
  };

  const handleRowCountSubmit = async () => {
    if (rowCount && rowCount > 0) {
      const totalRowsToSelect = rowCount;

      let rowsToSelect: string[] = [];
      let page = 1;

      while (rowsToSelect.length < totalRowsToSelect) {
        const response = await fetchArtworks(page, PAGE_SIZE);
        const artworksOnPage = response.artworks;

        const remainingRows = totalRowsToSelect - rowsToSelect.length;
        rowsToSelect = rowsToSelect.concat(
          artworksOnPage.slice(0, remainingRows).map((artwork) => artwork.id)
        );

        if (artworksOnPage.length < PAGE_SIZE) {
          break;
        }
        page++;
      }

      setSelectedRows((prev) => {
        const newSet = new Set(prev);
        rowsToSelect.forEach((id) => newSet.add(id));
        return newSet;
      });

      setDropdownOpen(false); 
      setRowCount(undefined); 
    }
  };

  const columns: ColumnsType<Artwork> = [
    {
      title: (
        <div style={{ display: "flex", alignItems: "center" ,gap:'10px'}}>
          <Checkbox
            indeterminate={
              selectedRows.size > 0 && selectedRows.size < artworks.length
            }
            checked={artworks.every((artwork) => selectedRows.has(artwork.id))}
            onChange={(e) => {
              const allIds = artworks.map((artwork) => artwork.id);
              if (e.target.checked) {
                setSelectedRows((prev) => {
                  const newSet = new Set(prev);
                  allIds.forEach((id) => newSet.add(id));
                  return newSet;
                });
              } else {
                setSelectedRows((prev) => {
                  const newSet = new Set(prev);
                  allIds.forEach((id) => newSet.delete(id));
                  return newSet;
                });
              }
            }}
          />
          <Dropdown
            open={dropdownOpen} 
            onOpenChange={setDropdownOpen} 
            dropdownRender={() => (
              <div style={{ padding: "10px", background: "#fff", border: "1px solid #ddd" }}>
                <Input
                  type="number"
                  placeholder="Select rows..."
                  value={rowCount}
                  onChange={(e) => setRowCount(Number(e.target.value))}
                  style={{ marginBottom: "10px" }}
                />
                <Button onClick={handleRowCountSubmit}>
                  Submit
                </Button>
              </div>
            )}
            trigger={["click"]}
            
            
          >
            <Button icon={<span>▼</span>} />
          </Dropdown>
        </div>
      ),
      dataIndex: "id",
      key: "select",
      render: (id: string) => (
        <Checkbox
          checked={selectedRows.has(id)}
          onChange={(e) => handleRowSelection(id, e.target.checked)}
        />
      ),
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Artist", dataIndex: "artist_display", key: "artist" },
    { title: "Place of Origin", dataIndex: "place_of_origin", key: "origin" },
    { title: "Start Year", dataIndex: "date_start", key: "startYear" },
    { title: "End Year", dataIndex: "date_end", key: "endYear" },
  ];

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div style={{ margin: "50px" }}>
      <Table
        rowKey="id"
        dataSource={artworks}
        columns={columns}
        pagination={false}
      />
      <Pagination
        current={pagination.currentPage}
        total={pagination.total}
        pageSize={PAGE_SIZE}
        onChange={onPageChange}
        showSizeChanger={false}
        style={{ marginTop: "20px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}
      />
    </div>
  );
};

export default TableComponent;

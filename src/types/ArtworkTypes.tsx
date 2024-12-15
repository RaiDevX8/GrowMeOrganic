export interface Artwork {
    id: string;
    title: string;
    artist_display: string;
    place_of_origin: string;
    date_start: number;
    date_end: number;
  }
  
  export interface PaginationData {
    total: number;
    totalPages: number;
    currentPage: number;
  }
  export interface ArtworkTableProps {
    artworks: Artwork[];
    selectedRows: Set<string>;
    setSelectedRows: (selected: Set<string>) => void;
    dropdownVisible: boolean;
    setDropdownVisible: (visible: boolean) => void;
    handleRowCountSubmit: () => void;
    rowCount: number | undefined;
    setRowCount: (value: number | undefined) => void;
  }
  
  export interface PaginationComponentProps {
    currentPage: number;
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  }
  
  export interface PaginationComponentProps {
    currentPage: number;
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  }
  export interface ApiResponse {
    data: Artwork[]; 
    pagination: ApiPagination; 
  }
  export interface ApiPagination {
    total: number;
    total_pages: number;
    current_page: number;
  }
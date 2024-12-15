import axios from "axios";
import { ApiResponse, Artwork, PaginationData } from "../types/ArtworkTypes";

export const fetchArtworks = async (
  currentPage: number,
  itemsPerPage: number = 12
): Promise<{ artworks: Artwork[]; pagination: PaginationData }> => {
  const apiUrl = `https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${itemsPerPage}`;

  try {
    const apiResponse = await axios.get<ApiResponse>(apiUrl);
    
    if (!apiResponse.data || !apiResponse.data.data || !apiResponse.data.pagination) {
      throw new Error('Invalid response structure');
    }

    const { data: artworks, pagination: paginationInfo } = apiResponse.data;

    return {
      artworks,
      pagination: {
        total: paginationInfo.total,
        totalPages: paginationInfo.total_pages,
        currentPage: paginationInfo.current_page,
      },
    };
  } catch (error: any) {
    console.error("Error fetching artworks:", error.message || error);
    return { artworks: [], pagination: { total: 0, totalPages: 0, currentPage: 1 } };
  }
};

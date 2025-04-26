import { FilterDto } from "../dto/filter.dto";
import { PaginationDto } from "../dto/pagination.dto";

export const paginationAndFilter = (query: any) => {
  const pagination = new PaginationDto();
  const filter = new FilterDto();

  // Giải quyết pagination từ query string
  pagination.page = Number(query.page || 1);
  pagination.perPage = Number(query.perPage || 10);
  if (query.filters) {
    try {
      filter.filters = JSON.parse(query.filters); // Giải mã JSON mảng filters từ query string

      filter.filters = filter.filters.map((item) => {
        if (item.field === 'id') {
          item.value = Number(item.value);
        }

        return item;
      });
    } catch (e) {
      console.error('Error parsing filters:', e);
    }
  }

  // Giải quyết filter từ query string
  filter.sortBy = query.sortBy || 'createdAt'; // Mặc định sắp xếp theo `createdAt`
  filter.order = query.order || 'desc'; // Mặc định sắp xếp giảm dần
  return {
    pagination,
    filter,
    searchOne: query.searchOne,
    keyword: query?.keyword,
    language: query?.language
  };
};

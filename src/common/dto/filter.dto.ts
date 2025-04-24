export class FilterDto {
    filters: Array<{
      field: string; // Tên trường cần lọc (ví dụ: "title", "status")
      value: string | number; // Giá trị của trường cần lọc
      operator?: string; // Tùy chọn: ví dụ "contains", "equals"
    }> = [];
    sortBy?: string; // Trường để sắp xếp (ví dụ: "createdAt")
    order?: 'asc' | 'desc'; // Thứ tự sắp xếp: 'asc' hoặc 'desc'
    searchOne?: string;
  }
  
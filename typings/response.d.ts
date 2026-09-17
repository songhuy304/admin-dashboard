interface IApiBaseResponse {
  success: boolean;
  message: string;
}

interface IPaginationMetadata {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface IResponse<T> extends IApiBaseResponse {
  data: T;
}

interface IPaginatedResponse<T> extends IApiBaseResponse {
  data: T[];
  meta: IPaginationMetadata;
}

interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

interface IPagination {
  page: number;
  limit: number;
}

interface User {
  id: number;
  email: string;
  fullName: string;
  avatar: string;
  role: string;
  isVerified: boolean;
}

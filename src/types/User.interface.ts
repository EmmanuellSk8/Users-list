export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    handleUserClick: () => void;
}

export type ApiResponse = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
}

export type TypePagination = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading?: boolean;
}

export type UserDetailModal = {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}
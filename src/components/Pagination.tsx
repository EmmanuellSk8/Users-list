import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TypePagination } from "../types/User.interface";

const Pagination = ({ currentPage, onPageChange, totalPages, loading }: TypePagination) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex justify-center items-center gap-4 my-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 rounded-md bg-white border-1 border-gray-300 flex items-center gap-2 hover:bg-white/70 cursor-pointer"
            >
                <ChevronLeft /> Anterior
            </button>
           
            <div className="flex gap-2">

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-md font-semibold ${currentPage === page ? 'bg-black text-white' : 'bg-white border-1 border-gray-300 hover:bg-gray-100'}`}
                    >
                        {page}
                    </button>
                ))}
                
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className="px-4 py-2 rounded-md bg-white border-1 border-gray-300 flex items-center gap-2 hover:bg-white/70 cursor-pointer"
            >
                Siguiente <ChevronRight />
            </button>
        </div>
    );
}

export default Pagination;
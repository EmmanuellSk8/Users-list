import { Users } from "lucide-react"
import useUsersApi from "./api/Users";
import type { User } from "./types/User.interface";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import UserDetailsModal from "./components/UserDetailsModal";
import Pagination from "./components/Pagination";

function App() {

  const { users, loading, error, pagination, fetchUsers, fetchUserDetail } = useUsersApi();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers(pagination.currentPage);
  }, [pagination.currentPage, fetchUsers]);

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  const handleUserClick = async (user: User) => {
    const userDetail = await fetchUserDetail(user.id);
    if (!userDetail) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Algo falló...</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => fetchUsers(pagination.currentPage)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Inténtalo de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="flex justify-center h-screen bg-gray-100">
        <div className="w-[1600px] border-1 border-gray-300 rounded-lg bg-white shadow-lg h-fit mt-20">
          <div className="my-16 w-full flex flex-col gap-2 items-center">
            <div className="flex items-center gap-2">
              <Users className="text-blue-600" size={28} />
              <h2 className="text-3xl font-bold">Listado de usuarios</h2>
            </div>
            <p className="text-gray-600">
              Página {pagination.currentPage} de {pagination.totalPages} -
              Total: {pagination.total} usuarios
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Cargando usuarios...</span>
            </div>
          )}

          {!loading && users.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {users.map(user => (
                <Card
                  key={user.id}
                  avatar={user.avatar}
                  first_name={user.first_name}
                  last_name={user.first_name}
                  email={user.email}
                  id={user.id}
                  handleUserClick={() => handleUserClick(user)}
                />
              ))}
            </div>
          )}

          {!loading && users.length === 0 && !error && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No se encontraron usuarios
              </h3>
              <p className="text-gray-500">
                Intenta recargar la página o verifica tu conexión.
              </p>
            </div>
          )}
          {selectedUser && (
            <UserDetailsModal
              user={selectedUser}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          )}
          {!loading && users.length > 0 && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />
          )}
        </div>
      </section>
    </>
  )
}

export default App

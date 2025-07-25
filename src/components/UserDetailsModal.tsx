import { Hash, Mail, User2, X } from "lucide-react";
import type { UserDetailModal } from "../types/User.interface";

const UserDetailsModal = ({isOpen, onClose, user}: UserDetailModal) => {
      if (!isOpen || !user) return null;

    return (
        <section className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center">
            <div className="flex flex-col gap-4 bg-white items-center rounded-lg relative w-fit p-10">
              <button onClick={onClose} >
                <X className="absolute top-4 right-4 cursor-pointer" />
              </button>
                <h1 className="text-3xl font-bold text-nowrap text-center">Detalles del usuario</h1>
                <img src={user.avatar} alt={user.first_name + " " + user.last_name} className="size-24 rounded-full object-contain aspect-square my-6" />
               
                <div className="w-96 flex flex-col gap-6">

                    <div className="flex bg-gray-100  items-center gap-3 py-1 px-2 rounded-lg w-full">
                        <User2 className="size-6 text-gray-500" />
                        <div className="flex flex-col">
                            <p className="text-gray-500">Nombre completo</p>
                            <p className="font-semibold">{user.first_name + " " + user.last_name}</p>
                        </div>
                    </div>
                    <div className="flex bg-gray-100 w-full items-center gap-3 py-1 px-2 rounded-lg">
                        <Mail className="size-6 text-gray-500" />
                        <div className="flex flex-col">
                            <p className="text-gray-500">Email</p>
                            <p className="font-semibold">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex bg-gray-100 w-full items-center gap-3 py-1 px-2 rounded-lg">
                        <Hash className="size-6 text-gray-500" />
                        <div className="flex flex-col">
                            <p className="text-gray-500">ID</p>
                            <p className="font-semibold">{user.id}</p>
                        </div>
                    </div>

                    <button 
                    onClick={onClose}
                    className="bg-black py-1 text-center w-full text-white rounded-md cursor-pointer ease-in-out hover:scale-105 duration-300">Cerrar</button>
                </div>
            </div>
        </section>
    )
}

export default UserDetailsModal;
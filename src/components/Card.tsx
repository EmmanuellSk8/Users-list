import type { User } from "../types/User.interface";

const Card = ({id, first_name, last_name, email, avatar, handleUserClick}: User) => {
    return (       
            <div
            onClick={handleUserClick}
            className="border-1 border-gray-200 flex gap-6 px-6 py-4 items-center rounded-lg bg-white hover:shadow-xl hover:scale-105 ease-in-out duration-300 cursor-pointer max-[400px]:px-2 max-[400px]:gap-4">
                <img src={avatar} alt={first_name + last_name} className="size-20 rounded-full max-[400px]:size-14" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold">{first_name + last_name}</h2>
                    <p>{email}</p>
                    <p className="text-gray-500">ID: {id}</p>
                </div>
            </div>
    )
}

export default Card;
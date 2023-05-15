/* eslint-disable @next/next/no-img-element */
import { useUser } from "@clerk/nextjs";


const UserWizard = () => {
    const { user } = useUser();

    if (!user) return null;

    return (
        <>
            <img
                className="h-10 w-10 rounded-full"
                src={user.profileImageUrl}
                alt={user.username ?? ""}
            />
            <input type="text" placeholder="Type some emojies" className="bg-transparent border-slate-400 border-2 p-2 w-[60%] outline-none" />
        </  >
    )
}

export default UserWizard;
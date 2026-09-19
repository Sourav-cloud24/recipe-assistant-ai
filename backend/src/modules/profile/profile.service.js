import { getUserProfile } from "./profile.repository.js"


export const getProfiles = async(user_id) => {
    const user = await getUserProfile(user_id)

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}
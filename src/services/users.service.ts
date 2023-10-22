import { NotFoundError, t } from "elysia";
import { usersData } from "../data/users";

export async function getUsers() {
    try {
        return usersData;
    } catch (error) {
        console.error("Error getting users:", error);
    }
}

export async function getUser(userId: number) {
    try {
        const user = usersData.find((item) => item.id === userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    } catch (error) {
        console.error("Error finding user:", error);
    }
}

import { Elysia } from "elysia";
import { getUser, getUsers } from "../services/users.service";

const usersRoute = new Elysia({ prefix: "/users" })
    .get("/", () => getUsers())
    .get("/:userId", ({ params: { userId } }) => getUser(Number(userId)));

export { usersRoute };

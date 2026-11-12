import express, { Request, Response } from "express";
import { db } from "./prisma/db";

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send({
        message: "Server is running"
    });
});


//create
app.post("/create", async (_req: Request, res: Response) => {
    const user = await db.orm.public.User.create({
        name: "Abir",
        email: "abirm3188@gmail.com",
        password: "bouldout"
    });
    res.send({ data: user });
});

//read
app.get("/get", async (_req: Request, res: Response) => {
    const users = await db.orm.public.User.all();
    res.send({ data: users });
})

// Update
app.patch("/update", async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const hardcodedId = "550e8400-e29b-41d4-a716-446655440000"; // Replace with an actual id from your database

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const user = await db.orm.public.User
            .where({ id: hardcodedId })
            .update({ name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

// Delete
app.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        const _id = "550e8400-e29b-41d4-a716-446655440000"; // Replace with an actual id from your database

        if (!_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const deletedUser = await db.orm.public.User
            .where({ id: _id })
            .delete();

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});



app.listen(5000, () => {
    console.log("Server running on port 5000");
});

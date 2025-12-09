import jwt from "jsonwebtoken";

export const generateToken = (userId: string, name: string) => {
    const payload = { id: userId, name };

    const secret = process.env.JWT_SECRET as string; // <-- FIXED

    const a = jwt.sign(payload, secret as string, { expiresIn: "1d" });
    return a;
};

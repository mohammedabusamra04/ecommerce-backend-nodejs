import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 10;


export async function hashValue(value: string) {
    return bcrypt.hash(value, SALT_ROUNDS);
}

export async function compareValue(
    value: string,
    hash: string
) {
    return bcrypt.compare(value, hash);
}

export function hashToken(token: string) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}
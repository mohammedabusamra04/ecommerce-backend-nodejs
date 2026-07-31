import { RefreshToken } from "./refresh-token.model.js";

export class AuthRepository {

    constructor(private refreshTokenModel: typeof RefreshToken) {}

    async create(data: {
        userId: string;
        tokenHash: string;
        expiresAt: Date;
    }) {
        return this.refreshTokenModel.create(data);
    }

    async findByTokenHash(tokenHash: string) {
        return this.refreshTokenModel.findOne({
            tokenHash,
            revokedAt: null
        });
    }

    async revokeToken(tokenHash: string) {
        return this.refreshTokenModel.findOneAndUpdate(
            { tokenHash },
            {
                revokedAt: new Date()
            },
            {
                new: true
            }
        );
    }

    async deleteToken(tokenHash: string) {
        return this.refreshTokenModel.findOneAndDelete({
            tokenHash
        });
    }

    async deleteAllUserTokens(userId: string) {
        return this.refreshTokenModel.deleteMany({
            userId
        });
    }
}
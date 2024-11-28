import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { responseMessage } from "src/utils/response-message";

type jwtPayload = {
    sub: string;
    email: string;
    role: string;
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
    }

    validate(payload: jwtPayload) {
        const { sub, email } = payload;

        if (!sub || !email ) {
            return responseMessage(false, 'Invalid or missing access token');
        }

        return payload;
    }
}

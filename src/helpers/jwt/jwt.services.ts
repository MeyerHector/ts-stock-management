import jwt, { JwtPayload } from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../../config/conf";
class jwtServices {
  constructor() {}

  createJWT(payload: object): string {
    return jwt.sign(payload, TOKEN_SECRET_KEY || "jkasjdkasjgkj3213ñ");
  }

  verifyJWT(token: string): JwtPayload | null {
    try {
      return jwt.verify(
        token,
        TOKEN_SECRET_KEY || "jkasjdkasjgkj3213ñ"
      ) as JwtPayload;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
}
export default new jwtServices();

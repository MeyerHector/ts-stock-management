import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../config/conf";
class jwtServices {
  constructor() {}

  createJWT(id: string): String {
    return jwt.sign(id, TOKEN_SECRET_KEY || "jkasjdkasjgkj3213ñ");
  }

  verifyJWT(token: string): Object {
    return jwt.verify(token, TOKEN_SECRET_KEY || "jkasjdkasjgkj3213ñ");
  }
}
export default new jwtServices();

import { hash, compare } from "bcryptjs";
class HashServices {
  constructor() {}

  async comparePass(pass: string, hashPass: string): Promise<Boolean> {
    return await compare(pass, hashPass);
  }

  async hashPass(pass: string): Promise<String> {
    return await hash(pass, 10);
  }
}
export default new HashServices();

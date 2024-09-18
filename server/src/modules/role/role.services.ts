import Role from "./role.model";

class RoleServices {
  constructor() {}
  async getRole(name: string): Promise<string | null> {
    try {
      const role = await Role.findOne({ where: { name } });
      if (!role) return null;
      return role.id;
    } catch (error) {
      return null;
    }
  }
}

export default new RoleServices();

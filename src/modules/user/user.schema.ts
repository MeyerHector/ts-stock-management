import { body } from "express-validator";

export const schema = [
  body("username")
    .exists()
    .withMessage("El nombre de usuario es requerido")
    .isLength({ min: 4, max: 12 })
    .withMessage("El nombre de usuario debe tener entre 4 y 12 carácteres"),
  body("password")
    .exists()
    .withMessage("La contraseña es requerida")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("La contraseña no cumple con los requisitos de seguridad"),
];

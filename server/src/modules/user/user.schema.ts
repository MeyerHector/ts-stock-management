import { body } from "express-validator";

export const schema = [
  body("user.name")
    .exists()
    .withMessage("El nombre es requerido")
    .isAlpha()
    .withMessage("El nombre solo debe contener letras")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres"),
  body("user.surname")
    .exists()
    .withMessage("El apellido es requerido")
    .isAlpha()
    .withMessage("El apellido solo debe contener letras")
    .isLength({ min: 2, max: 30 })
    .withMessage("El apellido debe tener entre 2 y 30 caracteres"),
  body("user.username")
    .exists()
    .withMessage("El nombre de usuario es requerido")
    .isLength({ min: 4, max: 12 })
    .withMessage("El nombre de usuario debe tener entre 4 y 12 carácteres"),
  body("user.password")
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

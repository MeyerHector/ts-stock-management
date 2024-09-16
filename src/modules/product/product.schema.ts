import { body } from "express-validator";

export const schema = [
  body("productData.name")
    .exists()
    .withMessage("El nombre del producto es requerido")
    .isString()
    .withMessage("El nombre del producto debe ser texto")
    .isLength({ min: 4, max: 50 })
    .withMessage("El nombre del producto debe tener entre 4 y 15 caracteres"),

  body("productData.description")
    .exists()
    .withMessage("La descripción del producto es requerida")
    .isString()
    .withMessage("La descripción del producto debe ser texto")
    .isLength({ min: 4, max: 255 })
    .withMessage(
      "La descripción del producto debe tener entre 4 y 255 caracteres"
    ),

  body("productData.category_id")
    .exists()
    .withMessage("La categoría es requerida")
    .isString()
    .withMessage("La categoría es inválida, contacte con el soporte")
    .isLength({ min: 36, max: 36 })
    .withMessage("La categoría es inválida, contacte con el soporte"),

  body("stock")
    .exists()
    .withMessage("El stock es requerido")
    .isNumeric()
    .withMessage("El stock debe ser un número"),
];

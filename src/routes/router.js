import { Router } from "express";

import { UserController } from "../controllers/user.controller.js";
import { PostController } from "../controllers/post.controller.js";
import { CarroController } from "../controllers/carro.controller.js";
import { UnhaController } from "../controllers/unha.controller.js";
import { MarcaController } from "../controllers/marca.controller.js";

const router = Router();

/* USERS */
router.get("/users", UserController.listar);
router.get("/users/:id", UserController.buscar);
router.post("/users", UserController.criar);
router.put("/users/:id", UserController.atualizar);
router.delete("/users/:id", UserController.excluir);

/* POSTS */
router.get("/posts", PostController.listar);
router.get("/posts/:id", PostController.buscar);
router.post("/posts", PostController.criar);
router.put("/posts/:id", PostController.atualizar);
router.delete("/posts/:id", PostController.excluir);

/* CARROS */
router.get("/carros", CarroController.listar);
router.get("/carros/:id", CarroController.buscar);
router.post("/carros", CarroController.criar);
router.put("/carros/:id", CarroController.atualizar);
router.delete("/carros/:id", CarroController.excluir);

/* UNHAS */
router.get("/unhas", UnhaController.listar);
router.get("/unhas/:id", UnhaController.buscar);
router.post("/unhas", UnhaController.criar);
router.put("/unhas/:id", UnhaController.atualizar);
router.delete("/unhas/:id", UnhaController.excluir);

/* MARCAS */
router.get("/marcas", MarcaController.listar);
router.get("/marcas/:id", MarcaController.buscar);
router.post("/marcas", MarcaController.novaMarca);
router.put("/marcas/:id", MarcaController.atualizarMarca);
router.delete("/marcas/:id", MarcaController.excluirMarca);

export default router;
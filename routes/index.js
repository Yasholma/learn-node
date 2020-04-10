import express from "express";
import todoController from "./../controllers/todos";
import xmlparser from "express-xml-bodyparser";

const router = express.Router();

// Get All Todos
router.get("/api/v1/todos", todoController.getAllTodos);

// Get All Todos as xml
router.get(
  "/api/v1/todos/xml",
  xmlparser({ trim: false, explicitArray: false }),
  todoController.getAllTodosAsXml
);

// Create A Todo
router.post("/api/v1/todos", todoController.addTodo);

// Get Single Todo
router.get("/api/v1/todos/:id", todoController.getTodo);

// Delete Todo
router.delete("/api/v1/todos/:id", todoController.deleteTodo);

// Update Todo
router.put("/api/v1/todos/:id", todoController.updateTodo);

export default router;

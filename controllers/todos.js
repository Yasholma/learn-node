import db from "../db/db";
var xml2js = require("xml2js");
import data from "./../db/data";
import covid19ImpactEstimator from "../functions/estimator";

var builder = new xml2js.Builder({
  xmldec: { standalone: null, version: "1.0", encoding: "UTF-8" },
});

class TodoController {
  getAllTodos(req, res) {
    res.status(200).send({
      success: "true",
      message: "todos retrieved successfully.",
      todos: db,
    });
  }

  getAllTodosAsXml(req, res) {
    const dataXml = covid19ImpactEstimator(data);
    res.contentType("application/xml");
    res.status(200).send(builder.buildObject(dataXml));
  }

  getTodo(req, res) {
    const id = +req.params.id;

    db.map((todo) => {
      if (todo.id === id) {
        return res.status(200).send({
          success: "true",
          message: "Todo retrieved successfully",
          todo,
        });
      }
    });

    return res.status(404).send({
      success: "false",
      message: "Todo does not exist",
    });
  }

  addTodo(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: "false",
        message: "Title is required",
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: "false",
        message: "Description is required",
      });
    }

    const todo = {
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description,
    };

    db.push(todo);
    return res.status(201).send({
      success: "true",
      message: "Todo added successfully.",
      todo,
    });
  }

  updateTodo(req, res) {
    const id = +req.params.id;
    let todoFound;
    let todoIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        todoIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: "false",
        message: "Todo not found",
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        success: "false",
        message: "Title is required",
      });
    }

    if (!req.body.description) {
      return res.status(400).send({
        success: "false",
        message: "Description is required",
      });
    }

    const updateTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description,
    };

    db.splice(todoIndex, 1, updateTodo);

    return res.status(201).send({
      success: "true",
      message: "Todo updated successfully.",
    });
  }

  deleteTodo(req, res) {
    const id = +req.params.id;
    db.map((todo, index) => {
      if (todo.id === id) {
        db.splice(index, 1);
        return res.status(200).send({
          success: "true",
          message: "Todo deleted successfully",
        });
      }
    });
    return res.status(404).send({
      success: "false",
      message: "Todo not found",
    });
  }
}

const todoController = new TodoController();
export default todoController;

package com.example.todo_management.service;

import com.example.todo_management.dto.TodoDto;

import java.util.List;

public interface TodoService {
    TodoDto addTodo(TodoDto todoDto);
    TodoDto getTodo(Long id);
    List<TodoDto> getAllTodos();
    void deleteTodo(Long id);
    TodoDto updateTodo(Long id, TodoDto todoDto);
    TodoDto completeTodo(Long id);
    TodoDto incompleteTodo(Long id);
}

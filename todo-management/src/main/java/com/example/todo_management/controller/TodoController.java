package com.example.todo_management.controller;

import com.example.todo_management.dto.TodoDto;
import com.example.todo_management.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class TodoController {
    private final TodoService todoService;

    //Build Add todo REST API
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto) {
        TodoDto savedTodo = todoService.addTodo(todoDto);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    //Build Get todo by Id
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable Long id) {
        return new ResponseEntity<>(todoService.getTodo(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        List<TodoDto> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok("Todo with id "+id+" deleted");

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}") //put is used to update the whole object
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, @RequestBody TodoDto todoDto) {
        TodoDto updatedTodo = todoService.updateTodo(id, todoDto);
        return ResponseEntity.ok(updatedTodo);
    }

    //Build complete todo REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/complete") //patch is used to update the object partially
    public ResponseEntity<TodoDto> completeTodo(@PathVariable Long id) {
        TodoDto completedTodo = todoService.completeTodo(id);
        return ResponseEntity.ok(completedTodo);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/incomplete") //patch is used to update the object partially
    public ResponseEntity<TodoDto> incompleteTodo(@PathVariable Long id) {
        TodoDto incompletedTodo = todoService.incompleteTodo(id);
        return ResponseEntity.ok(incompletedTodo);
    }



}

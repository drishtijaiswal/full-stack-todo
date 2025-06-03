package com.example.todo_management.service.impl;

import com.example.todo_management.dto.TodoDto;
import com.example.todo_management.entity.Todo;
import com.example.todo_management.exception.ResourceNotFoundException;
import com.example.todo_management.repository.TodoRepository;
import com.example.todo_management.service.TodoService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private ModelMapper modelMapper;
    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo = modelMapper.map(todoDto,Todo.class);
        Todo savedTodo = todoRepository.save(todo);
        TodoDto savedTodoDto = modelMapper.map(savedTodo,TodoDto.class);
        return savedTodoDto;
    }

    public TodoDto getTodo(@PathVariable Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ToDo Not Found with id: " + id));
        return modelMapper.map(todo,TodoDto.class);
    }

    @Override
    public List<TodoDto> getAllTodos() {
        List<Todo> todos = todoRepository.findAll();
        return todos.stream().map((todo) -> modelMapper.map(todo,TodoDto.class)).collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(Long id, TodoDto todoDto) {
        Todo todo = todoRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("ToDo Not Found with id: " + id));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());
        Todo updatedTodo = todoRepository.save(todo);
        return modelMapper.map(updatedTodo,TodoDto.class);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Todo Not Found with id: " + id));
        todo.setCompleted(true);
        Todo completedTodo= todoRepository.save(todo);
        return modelMapper.map(completedTodo,TodoDto.class);
    }

    @Override
    public TodoDto incompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Todo Not Found with id: " + id));
        todo.setCompleted(false);
        Todo incompleteTodo= todoRepository.save(todo);
        return modelMapper.map(incompleteTodo,TodoDto.class);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Todo Not Found with id: " + id));
        todoRepository.deleteById(id);
    }

}

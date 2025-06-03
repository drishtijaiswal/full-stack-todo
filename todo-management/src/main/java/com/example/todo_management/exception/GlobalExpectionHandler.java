package com.example.todo_management.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExpectionHandler {

    @ExceptionHandler(TodoAPIException.class)
    public ResponseEntity<ErrorDetails> handleTodoAPIExcpetion(TodoAPIException todoAPIException, WebRequest webRequest) {

        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                todoAPIException.getMessage(),
                webRequest.getDescription(false)
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
}

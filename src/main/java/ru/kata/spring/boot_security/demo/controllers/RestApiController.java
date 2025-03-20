package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.util.UserError;
import ru.kata.spring.boot_security.demo.util.UserNotCreatedException;
import ru.kata.spring.boot_security.demo.util.UserNotFoundException;
import ru.kata.spring.boot_security.demo.util.UserNotUpdateException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class RestApiController {
    private final UserService userService;

    @Autowired
    public RestApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public List<User> getAll() {
        return userService.allUsers();
    }

    @GetMapping("/user/{id}")
    public User getOneUser(@PathVariable("id") long id) {
        return userService.findById(id);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            StringBuilder errorString = new StringBuilder();

            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError er : errors) {
                errorString.append(er.getField()).append(" - ").append(er.getDefaultMessage()).append(";");
            }
            throw new UserNotUpdateException(errorString.toString());
        }
        userService.edit(user, user.getId());
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @PostMapping("/admin")
    public ResponseEntity<HttpStatus> saveUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            StringBuilder errorString = new StringBuilder();

            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError er : errors) {
                errorString.append(er.getField()).append(" - ").append(er.getDefaultMessage()).append(";");
            }
            throw new UserNotCreatedException(errorString.toString());
        }
        userService.add(user);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable("id") long id) {
        userService.delete(id);
    }

    @ExceptionHandler
    private ResponseEntity<UserError> handlerException(UserNotFoundException e) {
        UserError response = new UserError("User with this id was not found!");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<UserError> handlerException(UserNotCreatedException e) {
        UserError response = new UserError(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<UserError> handlerException(UserNotUpdateException e) {
        UserError response = new UserError(e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}

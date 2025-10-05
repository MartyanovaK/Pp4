//package ru.kata.spring.boot_security.demo.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RestController;
//import ru.kata.spring.boot_security.demo.models.User;
//import ru.kata.spring.boot_security.demo.services.UserService;
//
//@RestController("/api/users/user")
//public class RestApiUserController {
//    private final UserService userService;
//
//    @Autowired
//    public RestApiUserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("/{id}")
//    public User getOneUser(@PathVariable("id") long id) {
//        return userService.findById(id);
//    }
//}

package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService  {
    List<User> allUsers();
    void add(User user);
    void delete (Long id);
    void edit(User user, Long id);

    User findById(long id);

    User findByUserName(String userName);




}

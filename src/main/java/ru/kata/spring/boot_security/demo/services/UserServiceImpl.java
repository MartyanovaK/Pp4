package ru.kata.spring.boot_security.demo.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repository.UserDao;
import ru.kata.spring.boot_security.demo.util.UserNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService{
    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public List<User> allUsers() {
        return userDao.allUsers();
    }


    @Override
    public User findById(long id) {
        Optional<User> findOne = userDao.findById(id);
        return findOne.orElseThrow(UserNotFoundException::new);
    }
    @Transactional
    @Override
    public void add(User user) {
        userDao.save(user);
    }


    @Override
    @Transactional
    public void delete(Long id) {
        userDao.deleteById(id);

    }


    @Override
    @Transactional
    public void edit(User userE, Long id) {
        userE.setId(id);
        userDao.save(userE);
    }




    @Override
    public User findByUserName(String email) {
        return userDao.findByEmail(email);
    }

    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


}

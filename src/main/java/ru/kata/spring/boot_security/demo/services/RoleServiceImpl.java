package ru.kata.spring.boot_security.demo.services;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {


    private final RoleRepository roleDao;

    public RoleServiceImpl(RoleRepository roleDao) {
        this.roleDao = roleDao;
    }


    @Override
    public List<Role> findAll() {
        return roleDao.findAll();
    }


}

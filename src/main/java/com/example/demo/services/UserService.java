package com.example.demo.services;

import com.example.demo.dao.UserDao;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public List<User> findAll () {
        return (List<User>) userDao.findAll();
    }

    public String create (User user) throws Exception {
        if (userDao.existsByUsername(user.getUsername())) {
            throw new Exception("El nombre de usuario ya está en uso.");
        }
        if (userDao.existsByEmail(user.getEmail())) {
            throw new Exception("El email ya está en uso.");
        }

        User finalUser = new User(user.getUsername(), user.getEmail(), user.getPassword(), user.getBirthDate());
        userDao.save(finalUser);
        return "Usuario creado con éxito!";
    }

    public User findById (Long id){
        return userDao.findById(id).orElseThrow();
    }
}

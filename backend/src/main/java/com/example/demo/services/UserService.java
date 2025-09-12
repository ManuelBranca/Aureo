package com.example.demo.services;

import com.example.demo.dao.UserDao;
import com.example.demo.enums.Messages;
import com.example.demo.enums.RoleId;
import com.example.demo.models.Status;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> findAll () {
        return (List<User>) userDao.findAll();
    }

    public User findById (Long id){
        return userDao.findById(id).orElseThrow();
    }

    public Status create (User user) {
        if (userDao.existsByEmail(user.getEmail())) {
            return new Status(false, Messages.EMAIL_IN_USE.getTexto(), 400);
        }
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        User finalUser = new User(user.getUsername(), user.getEmail(), encodedPassword, user.getBirthDate());
        finalUser.setActive(true);
        finalUser.setRoleId(roleService.findById((long) RoleId.USER.ordinal() + 1));
        userDao.save(finalUser);
        return new Status(true, Messages.USER_CREATED.getTexto(), 201);
    }

    public Status delete (Long id) {
        User userToDelete = findById(id);
        if (userToDelete == null) {
            return new Status(false, Messages.USER_NOT_FOUND.getTexto(), 500);
        }
        if (!userToDelete.getActive()) {
            return new Status(false, Messages.USER_ALREADY_INACTIVE.getTexto(), 500);
        }
        userToDelete.setActive(false);
        userDao.save(userToDelete);

        return new Status(true, Messages.USER_DELETED.getTexto(), 200);
    }

    public Status update (User user, Long id) {
        User userToUpdate = findById(id);
        if (userToUpdate == null) {
            return new Status(false, Messages.USER_NOT_FOUND.getTexto(), 404);
        }

        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(user.getPassword());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setBirthDate(user.getBirthDate());

        userDao.save(userToUpdate);

        return new Status(true, Messages.USER_UPDATED.getTexto(), 200);
    }
}

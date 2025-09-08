package com.example.demo.services;

import com.example.demo.dao.UserDao;
import com.example.demo.enums.RoleId;
import com.example.demo.models.Status;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleService roleService;

    public List<User> findAll () {
        return (List<User>) userDao.findAll();
    }

    public User findById (Long id){
        return userDao.findById(id).orElseThrow();
    }

    public String create (User user) throws Exception {
        if (userDao.existsByEmail(user.getEmail())) {
            throw new Exception("El email ya está en uso.");
        }

        User finalUser = new User(user.getUsername(), user.getEmail(), user.getPassword(), user.getBirthDate());
        finalUser.setActive(true);
        finalUser.setRoleId(roleService.findById((long) RoleId.USER.ordinal() + 1));
        userDao.save(finalUser);
        return "Usuario creado con éxito!";
    }

    public Status delete (Long id) {
        User userToDelete = findById(id);
        if (userToDelete == null) {
            return new Status(false, "El usuario no existe.", 500);
        }
        if (!userToDelete.getActive()) {
            return new Status(false, "El usuario ya está inactivo.", 500);
        }
        userToDelete.setActive(false);
        userDao.save(userToDelete);

        return new Status(true, "Usuario borrado con éxito.", 200);
    }

    public String update (User user, Long id) throws Exception {
        User userToUpdate = findById(id);
        if (userToUpdate == null) {
            throw new Exception("El usuario no existe.");
        }

        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(user.getPassword());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setBirthDate(user.getBirthDate());

        userDao.save(userToUpdate);

        return "Usuario modificado con éxito.";
    }
}

package com.example.demo.services;

import com.example.demo.dao.RoleDao;
import com.example.demo.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleDao roleDao;

    public Role findById(Long id) {
        return roleDao.findById(id).orElseThrow();
    }
}

package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GoalDto;
import com.example.demo.services.GoalService;

@RestController
@RequestMapping("/goal")
public class GoalController {
    @Autowired
    private GoalService goalService;

    @PostMapping("/create")
    public ResponseEntity<String> createController (@RequestBody GoalDto goal) {
        try {
            return new ResponseEntity<>(goalService.create(goal), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

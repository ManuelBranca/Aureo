package com.example.demo.controllers;

import com.example.demo.models.Status;
import com.example.demo.models.Goal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GoalDto;
import com.example.demo.services.GoalService;

import java.util.List;

@RestController
@RequestMapping("/goal")
public class GoalController {
    @Autowired
    private GoalService goalService;

    @PostMapping("/create")
    public ResponseEntity<Status> createController (@RequestBody GoalDto goal) {
        try {
            Status status = goalService.create(goal);
            return new ResponseEntity<>(status, HttpStatus.valueOf(status.getCodeNumber()));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findByUser")
    public ResponseEntity<List<Goal>> findByUserController(@RequestParam Long id) {
        try {
            return new ResponseEntity<>(goalService.findGoalsByUser(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

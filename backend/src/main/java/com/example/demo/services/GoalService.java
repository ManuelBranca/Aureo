package com.example.demo.services;

import java.util.List;

import com.example.demo.enums.Messages;
import com.example.demo.models.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.GoalDao;
import com.example.demo.dto.GoalDto;
import com.example.demo.models.Goal;
import com.example.demo.models.User;

@Service
public class GoalService {
    @Autowired
    private GoalDao goalDao;
    @Autowired
    private UserService userService;

    public List<Goal> findGoalsByUser(Long id) {
        return (List<Goal>) goalDao.findGoalsByUser(id);
    }

    public Status create(GoalDto goal) {
        // if(goalDao.findGoalByName(goal.getName()))
        User searchedUser = userService.findById(goal.getUserId());
        
        if(searchedUser == null){
            return new Status(false, Messages.USER_NOT_FOUND.getTexto(), 404);
        }

        Goal finalGoal = 
        new Goal(
            goal.getName(),
            goal.getTargetAmount(),
            0.0,
            0.0,
            searchedUser
        );

        goalDao.save(finalGoal);
        return new Status(true, Messages.GOAL_CREATED.getTexto(), 201);
    }
}
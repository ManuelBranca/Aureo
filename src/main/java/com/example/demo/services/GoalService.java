package com.example.demo.services;

import java.util.List;

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

    public String create(GoalDto goal) throws Exception {
        // if(goalDao.findGoalByName(goal.getName()))
        User searchedUser = userService.findById(goal.getUserId());
        
        if(searchedUser == null){
            throw new Exception("El usuario no existe");
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
        return "Meta creada con éxito!";

}

}

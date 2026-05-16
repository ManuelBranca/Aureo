package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Goal;

@Repository
public interface GoalDao extends CrudRepository<Goal,Long>{

    @Query("SELECT g FROM Goal g WHERE g.userId.userId = :id")
    List<Goal> findGoalsByUser (@Param("id") Long id);

    @Query("SELECT COUNT(g) > 0 FROM Goal g WHERE g.name = :name")
    boolean findGoalByName (@Param("name") String name);
} 

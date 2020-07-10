/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.management.repository;

import com.example.management.entity.LevelEntity;
import com.example.management.entity.SubjectEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author USER
 */
public interface LevelRepository extends CrudRepository<LevelEntity, Integer> {
    
    public List<LevelEntity> findAllActive(boolean isActive);
}

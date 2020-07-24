package com.example.management.service;

import com.example.management.entity.LevelEntity;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Nguyen Hung Hau
 */
@Service
public interface LevelService {
    
    public List<LevelEntity> findAllActive(); 
}

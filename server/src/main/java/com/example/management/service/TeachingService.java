package com.example.management.service;

import com.example.management.entity.TeachingClassEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
@Service
public interface TeachingService {
    
    public TeachingClassEntity addClass(TeachingClassEntity entity);
    
    public TeachingClassEntity updateClass(TeachingClassEntity entity);
    
    public boolean deleteClass(int id);
}

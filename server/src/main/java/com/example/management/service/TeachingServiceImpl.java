package com.example.management.service;

import com.example.management.entity.TeachingClassEntity;
import com.example.management.repository.TeachingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
@Service
public class TeachingServiceImpl implements TeachingService{
    
    @Autowired
    private TeachingRepository teachingRepository;
    
    @Override
    public TeachingClassEntity addClass(TeachingClassEntity entity) {
        return teachingRepository.save(entity);
    }
}

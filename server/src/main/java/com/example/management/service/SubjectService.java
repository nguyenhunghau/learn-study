package com.example.management.service;

import com.example.management.entity.SubjectEntity;
import java.util.List;

/**
 *
 * @author Nguyen Hung Hau
 */
public interface SubjectService {
    
    public List<SubjectEntity> findAllActive();
    
}

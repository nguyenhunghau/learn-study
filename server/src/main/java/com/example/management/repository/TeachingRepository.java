package com.example.management.repository;

import com.example.management.entity.TeachingClassEntity;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author USER
 */

public interface TeachingRepository extends CrudRepository<TeachingClassEntity, Integer> {
    
}

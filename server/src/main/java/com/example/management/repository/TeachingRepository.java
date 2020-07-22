package com.example.management.repository;

import com.example.management.entity.TeachingClassEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author USER
 */

public interface TeachingRepository extends CrudRepository<TeachingClassEntity, Integer> {
    
    public List<TeachingClassEntity> findByAccountId(int accountId);
}

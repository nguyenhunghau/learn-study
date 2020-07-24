package com.example.management.repository;

import com.example.management.entity.LevelEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Nguyen Hung Hau
 */
public interface LevelRepository extends CrudRepository<LevelEntity, Integer> {
    
    public List<LevelEntity> findAllActive(boolean isActive);
}

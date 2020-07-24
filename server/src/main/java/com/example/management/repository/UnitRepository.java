package com.example.management.repository;

import com.example.management.entity.UnitEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Nguyen Hung Hau
 */
public interface UnitRepository extends CrudRepository<UnitEntity, Integer>{

    public List<UnitEntity> findAllActive(boolean b);
    
}

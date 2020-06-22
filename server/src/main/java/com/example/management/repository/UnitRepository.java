package com.example.management.repository;

import com.example.management.entity.SubjectEntity;
import com.example.management.entity.UnitEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Admin
 */
public interface UnitRepository extends CrudRepository<UnitEntity, Integer>{

    public List<SubjectEntity> findAllActive(boolean b);
    
}

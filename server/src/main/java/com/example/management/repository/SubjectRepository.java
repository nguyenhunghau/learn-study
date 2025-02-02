package com.example.management.repository;

import com.example.management.entity.SubjectEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Nguyen Hung Hau
 */
public interface SubjectRepository extends CrudRepository<SubjectEntity, Integer>{

    public List<SubjectEntity> findAllActive(boolean bs);
    
}

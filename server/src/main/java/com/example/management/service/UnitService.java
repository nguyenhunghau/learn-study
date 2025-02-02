package com.example.management.service;

import com.example.management.entity.UnitEntity;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Nguyen Hung Hau
 */
@Service
public interface UnitService {
    
    public List<UnitEntity> findAllActive();
}

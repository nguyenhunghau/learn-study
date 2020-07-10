package com.example.management.service;

import com.example.management.entity.UnitEntity;
import com.example.management.repository.UnitRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnitServiceImpl implements UnitService{

    @Autowired
    private UnitRepository unitRepository;
    
    @Override
    public List<UnitEntity> findAllActive() {
        return unitRepository.findAllActive(true);
    }
    
}

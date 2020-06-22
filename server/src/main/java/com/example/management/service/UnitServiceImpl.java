package com.example.management.service;

import com.example.management.entity.SubjectEntity;
import com.example.management.repository.UnitRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnitServiceImpl implements UnitService{

    @Autowired
    private UnitRepository unitRepository;
    
    @Override
    public List<SubjectEntity> findAllActive() {
        return unitRepository.findAllActive(true);
    }
    
}

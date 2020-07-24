package com.example.management.service;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.entity.SubjectEntity;
import com.example.management.repository.SubjectRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//</editor-fold>

/**
 *
 * @author Admin
 */
@Service
public class SubjectServiceImpl implements SubjectService{
    
    @Autowired
    private SubjectRepository subjectRepository;

    @Override
    public List<SubjectEntity> findAllActive() {
        return subjectRepository.findAllActive(true);
    }
    
}

package com.example.management.service;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.entity.LevelEntity;
import com.example.management.repository.LevelRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 */
@Service
public class LevelServiceImpl implements LevelService{

    @Autowired
    private LevelRepository levelRepository;
    
    @Override
    public List<LevelEntity> findAllActive() {
        return levelRepository.findAllActive(true);
    }
    
}

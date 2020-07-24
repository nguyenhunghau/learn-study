package com.example.management.service;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.dto.TeachingSearchDTO;
import com.example.management.entity.TeachingClassEntity;
import com.example.management.service.TeachingServiceImpl.TeachingClassResult;
import java.util.List;
import org.springframework.stereotype.Service;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 */
@Service
public interface TeachingService {

    public List<TeachingClassEntity> getAll(TeachingSearchDTO teachingSearchDTO);

    public List<TeachingClassResult> getByAccount(String accountCode);

    public TeachingClassEntity getByCode(String code, String token);

    public TeachingClassEntity addClass(TeachingClassEntity entity);

    public TeachingClassEntity updateClass(TeachingClassEntity entity);

    public boolean deleteClass(int id);
}

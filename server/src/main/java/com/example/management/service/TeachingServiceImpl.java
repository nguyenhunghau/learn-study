package com.example.management.service;

import com.example.management.entity.TeachingClassEntity;
import com.example.management.repository.TeachingRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
@Service
public class TeachingServiceImpl implements TeachingService {

    @Autowired
    private TeachingRepository teachingRepository;

    @Override
    public TeachingClassEntity addClass(TeachingClassEntity entity) {
        return teachingRepository.save(entity);
    }

    @Override
    public TeachingClassEntity updateClass(TeachingClassEntity entity) {
        Optional<TeachingClassEntity> existed = teachingRepository.findById(entity.getId());
        if (existed.isPresent()) {
            existed.get().merge(entity);
            return teachingRepository.save(existed.get());
        }
        return null;
    }

    @Override
    public boolean deleteClass(int classId) {
        teachingRepository.deleteById(classId);
        return true;
    }
}

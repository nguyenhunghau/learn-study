package com.example.management.service;

import com.example.management.dto.TeachingSearchDTO;
import com.example.management.entity.TeachingClassEntity;
import com.example.management.repository.AccountRepository;
import com.example.management.repository.TeachingRepository;
import java.util.Arrays;
import java.util.List;
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
    
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public TeachingClassEntity addClass(TeachingClassEntity entity) {
//        if(entity.getAccountEntity())
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

    @Override
    public List<TeachingClassEntity> getAll(TeachingSearchDTO teachingSearchDTO) {
        List<TeachingClassEntity> list = (List<TeachingClassEntity>) teachingRepository.findAll();
        list.stream().filter(item -> {
            //We need checkabout keyword, subject, level, addressId, fromdate and todate
            return item.getTitle().contains(teachingSearchDTO.getKeyword())
                    && validList(item.getSubjectIds(), teachingSearchDTO.getSubjectIds())
                    && validList(item.getLevel(), teachingSearchDTO.getLevelIds());
        });
        list.forEach(item -> {
            
        });
        return list;
    }
    
    private boolean validList(String allValue, String checkValue) {
        if(checkValue == null || checkValue.isEmpty()) {
            return true;
        }
        List<String> allList = Arrays.asList(allValue.split(","));
        List<String> checkList = Arrays.asList(checkValue.split(","));
        return allList.stream().filter(item -> checkList.contains(item)).count() > 0;
    }
}

package com.example.management.service;

import com.example.management.dto.TeachingSearchDTO;
import com.example.management.entity.TeachingClassEntity;
import com.example.management.repository.AccountRepository;
import com.example.management.repository.TeachingRepository;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
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
        if(entity.getAccountEntity() != null) {
            entity.setAccountEntity(accountRepository.findByCode(entity.getAccountEntity().getCode()));
        }
        entity.setCreated(new Date());
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
        if(teachingSearchDTO == null || teachingSearchDTO.getKeyword() == null) {
            return list;
        }
        return list.stream().filter(item -> {
            //We need checkabout keyword, subject, level, addressId, fromdate and todate
            return filterKeyword(item, teachingSearchDTO.getKeyword())
                    && (teachingSearchDTO.getAddressId() == null || Objects.equals(teachingSearchDTO.getAddressId(), item.getAddressId()))
                    && validList(teachingSearchDTO.getSubjectIds(), item.getSubjectEntity().getId().toString())
                    && validList(teachingSearchDTO.getLevelIds(), item.getLevelIds())
                    && filterDate(teachingSearchDTO.getDateFrom(), teachingSearchDTO.getDateTo(), item.getDateStart());
        }).collect(Collectors.toList());
//        list.forEach(item -> {
//            
//        });
//        return list;
    }
    
    private boolean validList(String allValue, String checkValue) {
        if(allValue == null || allValue.isEmpty()) {
            return true;
        }
        List<String> allList = Arrays.asList(allValue.split(","));
        List<String> checkList = Arrays.asList(checkValue.split(","));
        return allList.stream().filter(item -> checkList.contains(item)).count() > 0;
    }
    
    private boolean filterKeyword(TeachingClassEntity entity, String keyword) {
        if(StringUtils.isNotBlank(keyword)) {
            return true;
        }
        return entity.getTitle().contains(keyword) || entity.getDescription().contains(keyword) 
                || entity.getSubjectEntity().getName().contains(keyword) 
                || entity.getTimetable().contains(keyword);
    }
    
    private boolean filterDate(Date fromDate, Date toDate, Date classDate) {
        if(fromDate == null && toDate == null) {
            return true;
        }
        return (fromDate == null || classDate.compareTo(fromDate) >= 0) && (toDate == null || classDate.compareTo(toDate) <= 0);
    }
}

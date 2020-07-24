package com.example.management.service;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.dto.TeachingSearchDTO;
import com.example.management.entity.AccountEntity;
import com.example.management.entity.LevelEntity;
import com.example.management.entity.SubjectEntity;
import com.example.management.entity.TeachingClassEntity;
import com.example.management.exception.NotFoundException;
import com.example.management.repository.AccountRepository;
import com.example.management.repository.LevelRepository;
import com.example.management.repository.SubjectRepository;
import com.example.management.repository.TeachingRepository;
import com.example.management.security.JwtTokenUtil;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 */
@Service
public class TeachingServiceImpl implements TeachingService {

    @Autowired
    private TeachingRepository teachingRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public TeachingClassEntity addClass(TeachingClassEntity entity) {
        if (entity.getAccountEntity() != null) {
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
        if (teachingSearchDTO == null || teachingSearchDTO.getKeyword() == null) {
            return pageniationList(list, teachingSearchDTO);
        }
        List<TeachingClassEntity> resultList = list.stream().filter(item -> {
            //We need checkabout keyword, subject, level, addressId, fromdate and todate
            return filterKeyword(item, teachingSearchDTO.getKeyword())
                    && (teachingSearchDTO.getAddressId() == null || Objects.equals(teachingSearchDTO.getAddressId(), item.getAddressId()))
                    && validList(teachingSearchDTO.getSubjectIds(), item.getSubjectEntity().getId().toString())
                    && validList(teachingSearchDTO.getLevelIds(), item.getLevelIds())
                    && filterDate(teachingSearchDTO.getDateFrom(), teachingSearchDTO.getDateTo(), item.getDateStart());
        }).collect(Collectors.toList());
        return pageniationList(resultList, teachingSearchDTO);
    }

    private List<TeachingClassEntity> pageniationList(List<TeachingClassEntity> resultList, TeachingSearchDTO teachingSearchDTO) {
        if (resultList.size() < teachingSearchDTO.getNumItem()) {
            return resultList;
        }
        int indexFrom = teachingSearchDTO.getPageIndex() * teachingSearchDTO.getNumItem();
        int indexTo = indexFrom + teachingSearchDTO.getNumItem();
        return resultList.subList(indexFrom, indexTo < resultList.size() ? indexTo : resultList.size());
    }

    private boolean validList(String allValue, String checkValue) {
        if (allValue == null || allValue.isEmpty()) {
            return true;
        }
        List<String> allList = Arrays.asList(allValue.split(","));
        List<String> checkList = Arrays.asList(checkValue.split(","));
        return allList.stream().filter(item -> checkList.contains(item)).count() > 0;
    }

    private boolean filterKeyword(TeachingClassEntity entity, String keyword) {
        if (StringUtils.isNotBlank(keyword)) {
            return true;
        }
        return entity.getTitle().contains(keyword) || entity.getDescription().contains(keyword)
                || entity.getSubjectEntity().getName().contains(keyword)
                || entity.getTimetable().contains(keyword);
    }

    private boolean filterDate(Date fromDate, Date toDate, Date classDate) {
        if (fromDate == null && toDate == null) {
            return true;
        }
        return (fromDate == null || classDate.compareTo(fromDate) >= 0) && (toDate == null || classDate.compareTo(toDate) <= 0);
    }

    @Override
    public List<TeachingClassResult> getByAccount(String accountCode) {
        List<TeachingClassResult> resultList = new ArrayList<>();
        AccountEntity account = accountRepository.findByCode(accountCode);
        if (account == null) {
            throw new IllegalArgumentException("Account code not valid");
        }
        List<TeachingClassEntity> list = (List<TeachingClassEntity>) teachingRepository.findByAccountId(account.getId());
        List<SubjectEntity> subjectList = subjectRepository.findAllActive(true);
        List<LevelEntity> levelList = levelRepository.findAllActive(true);
        list.forEach(item -> {
            String subjectName = subjectList.stream().filter(subject -> Objects.equals(subject.getId(), item.getSubjectEntity().getId()))
                    .findFirst().orElse(new SubjectEntity()).getName();
            List<String> levelIdList = Arrays.asList(item.getLevelIds().split(","));
            String levelName = levelList.stream()
                    .filter(level -> levelIdList.contains(level.getId().toString()))
                    .map(level -> level.getName())
                    .collect(Collectors.joining(","));
            resultList.add(new TeachingClassResult(item, subjectName, levelName));
        });
        return resultList;
    }

    @Override
    public TeachingClassEntity getByCode(String code, String token) throws NotFoundException {
        String username = jwtTokenUtil.getUsernameFromToken(token);
        String idClass = code.substring(code.lastIndexOf("-") + 1);
        Optional<TeachingClassEntity> teaching = teachingRepository.findById(Integer.parseInt(idClass));
        if (!teaching.isPresent() || !teaching.get().getAccountEntity().getUsername().equals(username)) {
            throw new NotFoundException("Not found class");
        }
        return teaching.get();
    }

    //<editor-fold defaultstate="collapsed" desc="CUSTOM RESULT CLASS">
    public class TeachingClassResult {
        private final TeachingClassEntity teaching;
        private final String subjectName;
        private final String levelName;

        public TeachingClassResult(TeachingClassEntity teaching, String subjectName, String levelName) {
            this.teaching = teaching;
            this.subjectName = subjectName;
            this.levelName = levelName;
        }
    }
    //</editor-fold>
}

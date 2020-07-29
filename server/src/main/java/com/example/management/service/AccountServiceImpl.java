package com.example.management.service;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.component.GeneratedIDUtils;
import com.example.management.component.UploadFile;
import com.example.management.dto.AccountDTO;
import com.example.management.dto.UserDTO;
import com.example.management.entity.AccountEntity;
import com.example.management.repository.AccountRepository;
import com.example.management.security.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 */
@Service
@Slf4j
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private GeneratedIDUtils generatedIDUtils;

    @Override
    public AccountEntity login(String accessToken, String refreshToken) {
//        Boolean accessTokenValid = jwtTokenUtil.validateToken(accessToken);
//        Boolean refreshTokenValid = jwtTokenUtil.validateToken(refreshToken);
//        HttpHeaders responseHeaders = new HttpHeaders();
//        Token newAccessToken;
//        Token newRefreshToken;

        return accountRepository.findByUsernameAndPass(accessToken, refreshToken);
    }

    @Override
    public AccountEntity register(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }

    public AccountEntity update(AccountEntity accountEntity) {
        Optional<AccountEntity> accountExisted = accountRepository.findByUsername(accountEntity.getUsername(), true);
        if (!accountExisted.isPresent()) {
            return null;
        }
        accountExisted.get().merge(accountEntity);
        return accountRepository.save(accountExisted.get());
    }

    @Override
    public Boolean changePassword(String username, String oldPassword, String newPassord) {
        Optional<AccountEntity> accountExisted = accountRepository.findByUsername(username, true);
        if (!accountExisted.isPresent()) {
            return false;
        }
        AccountEntity entity = accountExisted.get();
        if (!entity.getPassword().equals(oldPassword)) {
            return false;
        }
        entity.setPassword(newPassord);
        accountRepository.save(entity);
        return true;
    }

    @Override
    public Optional<AccountEntity> findByUsername(String username) {
        return accountRepository.findByUsername(username, true);
    }

    @Override
    public AccountDTO getProfile(String code, String token) {
        ModelMapper modelMapper = new ModelMapper();
        AccountEntity entity = accountRepository.findByCode(code);
        AccountDTO accountDTO = modelMapper.map(entity, AccountDTO.class);
        if (token == null) {
            entity.setUsername(null);
            return accountDTO;
        }
        try {
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if (username.equals(entity.getUsername())) {
                return accountDTO;
            }
        } catch (IllegalArgumentException e) {
            log.error("Unable to get JWT Token with accountCode " + code, e);
        } catch (ExpiredJwtException e) {
            log.error("JWT Token has expired " + code, e);
        }
        accountDTO.setUsername(null);
        return accountDTO;
    }

    @Override
    public AccountEntity update(AccountDTO accountDTO, MultipartFile photo, MultipartFile certificate) {
        ModelMapper modelMapper = new ModelMapper();
        AccountEntity accountEntity = modelMapper.map(accountDTO, AccountEntity.class);
        try {
            if (photo != null) {
                UploadFile.uploadImage(accountEntity.getCode() + "/avatar", photo);
                accountEntity.setPhoto(accountEntity.getCode() + "/avatar/" + photo.getOriginalFilename());
            }

            if (certificate != null) {
                UploadFile.uploadImage(accountEntity.getCode() + "/certificate", certificate);
                accountEntity.setCertificate(accountEntity.getCode() + "/certificate/" + certificate.getOriginalFilename());
            }
        } catch (IOException | IllegalStateException ex) {
            log.error("Error update Account " + accountDTO.getCode(), ex);
        }
        return update(accountEntity);
    }

    @Override
    public boolean changePassword(UserDTO userDTO, String token) {
        String username = jwtTokenUtil.getUsernameFromToken(token);
        AccountEntity account = accountRepository.findByUsername(username, true).get();
        if (account != null && bcryptEncoder.matches(userDTO.getPassword(), account.getPassword())) {
            account.setPassword(bcryptEncoder.encode(userDTO.getPasswordConfirm()));
            account.setUpdated(new Date());
            accountRepository.save(account);
            return true;
        }
        return false;
    }

    @Override
    public boolean activeAccount(String code) {
        AccountEntity account = accountRepository.findByCode(code);
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, -15);
        if (account.getCreated().compareTo(cal.getTime()) < 0) {
            return false;
        }
        String newCode = generatedIDUtils.gemeratedID();
        account.setCode(newCode);
        account.setActive(true);
        account.setUpdated(new Date());
        accountRepository.save(account);
        return true;
    }

    @Override
    public List<AccountDTO> findAllAccount() {
         ModelMapper modelMapper = new ModelMapper();
         List<AccountEntity> accountList = accountRepository.findAll();
         return modelMapper.map(accountList, new TypeToken<List<AccountDTO>>(){}.getType());
    }

    @Override
    public AccountDTO findById(int id) {
         ModelMapper modelMapper = new ModelMapper();
         return modelMapper.map(accountRepository.findById(id).get(), AccountDTO.class);
    }

    @Override
    public void update(AccountDTO accountDTO) {
         ModelMapper modelMapper = new ModelMapper();
        accountRepository.save(modelMapper.map(accountDTO, AccountEntity.class));
    }
}

package com.example.management.service;

import com.example.management.component.UploadFile;
import com.example.management.dto.UserDTO;
import com.example.management.entity.AccountEntity;
import com.example.management.repository.AccountRepository;
import com.example.management.security.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Admin
 */
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public AccountEntity login(String username, String password) {
        return accountRepository.findByUsernameAndPass(username, password);
    }

    @Override
    public AccountEntity register(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }

    public AccountEntity update(AccountEntity accountEntity) {
        Optional<AccountEntity> existed = accountRepository.findByUsername(accountEntity.getUsername());
        if (existed.isPresent()) {
            existed.get().merge(accountEntity);
            return accountRepository.save(existed.get());
        }
        return null;
    }

    @Override
    public Boolean changePassword(String username, String oldPassword, String newPassord) {
        Optional<AccountEntity> existed = accountRepository.findByUsername(username);
        if (!existed.isPresent()) {
            return false;
        }
        AccountEntity entity = existed.get();
        if (entity.getPassword().equals(oldPassword)) {
            entity.setPassword(newPassord);
            accountRepository.save(entity);
        }
        return false;
    }

    @Override
    public Optional<AccountEntity> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public AccountEntity getProfile(String code, String token) {
        AccountEntity entity = accountRepository.findByCode(code);
        entity.setPassword(null);
        if(token == null) {
            entity.setUsername(null);
            return entity;
        }
        try {
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if(username.equals(entity.getUsername())) {
                return entity;
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Unable to get JWT Token");
        } catch (ExpiredJwtException e) {
            System.out.println("JWT Token has expired");
        }
        entity.setUsername(null);
        return entity;
    }

    @Override
    public AccountEntity update(AccountEntity accountEntity, MultipartFile photo, MultipartFile certificate) {
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
            Logger.getLogger(AccountServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return update(accountEntity);
    }

    @Override
    public boolean changePassword(UserDTO userDTO, String token) {
         String username = jwtTokenUtil.getUsernameFromToken(token);
         System.out.println(username + "\n" + bcryptEncoder.encode(userDTO.getPassword()));
         AccountEntity account = accountRepository.findByUsername(username).get();
         if(account != null && bcryptEncoder.matches(userDTO.getPassword(), account.getPassword())) {
             account.setPassword(bcryptEncoder.encode(userDTO.getPasswordConfirm()));
             account.setUpdated(new Date());
             accountRepository.save(account);
             return true;
         }
         return false;
    }
}

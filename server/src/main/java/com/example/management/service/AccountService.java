package com.example.management.service;

import com.example.management.entity.AccountEntity;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public interface AccountService {
    
    public AccountEntity login(String username, String password);
    
    public AccountEntity register(AccountEntity accountEntity);
    
    public AccountEntity update(AccountEntity accountEntity);
    
    public Boolean changePassword(String username, String oldPassword, String newPassord);

    public Optional<AccountEntity> findByUsername(String username);
    
    public AccountEntity getProfile(String code);
}

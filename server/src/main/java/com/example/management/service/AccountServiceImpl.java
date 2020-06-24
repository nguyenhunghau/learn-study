package com.example.management.service;

import com.example.management.entity.AccountEntity;
import com.example.management.repository.AccountRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Admin
 */
@Service
public class AccountServiceImpl implements AccountService{
    
    @Autowired
    private AccountRepository accountRepository;
    
    @Override
    public AccountEntity login(String username, String password) {
        return accountRepository.findByUsernameAndPass(username, password);
    }

    @Override
    public AccountEntity register(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }

    @Override
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
        if(!existed.isPresent()) {
            return false;
        }
        AccountEntity entity = existed.get();
        if(entity.getPassword().equals(oldPassword)) {
            entity.setPassword(newPassord);
            accountRepository.save(entity);
        }
        return false;
    }

    @Override
    public Optional<AccountEntity> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }
}
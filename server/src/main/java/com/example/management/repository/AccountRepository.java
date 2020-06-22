/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.management.repository;

import com.example.management.entity.AccountEntity;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Admin
 */
public interface AccountRepository extends CrudRepository<AccountEntity, Integer>{

    public AccountEntity findByUsernameAndPass(String username, String password);

    public Optional<AccountEntity> findByUsername(String username);
    
}

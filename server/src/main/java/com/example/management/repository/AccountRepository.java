package com.example.management.repository;

import com.example.management.entity.AccountEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Nguyen Hung Hau
 */
public interface AccountRepository extends JpaRepository<AccountEntity, Integer>{

    public AccountEntity findByUsernameAndPass(String username, String password);

    public Optional<AccountEntity> findByUsername(String username, boolean isActive);

    public AccountEntity findByCode(@Param("code") String code);

    public Optional<AccountEntity> findByEmail(String email);
    
}

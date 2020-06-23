package com.example.management.security;

import com.example.management.entity.AccountEntity;
import com.example.management.repository.AccountRepository;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 *
 * @author USER
 */
@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AccountEntity> entity = this.accountRepository.findByUsername(username);
        if (!entity.isPresent()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(entity.get().getUsername(), entity.get().getPassword(),
                new ArrayList<>());
    }

    public AccountEntity save(String username, String password) {
        AccountEntity entity = new AccountEntity();
        entity.setUsername(username);
        entity.setPassword(bcryptEncoder.encode(password));
        return accountRepository.save(entity);
    }
}

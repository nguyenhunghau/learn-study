package com.example.management.security;

import com.example.management.dto.UserDTO;
import com.example.management.dto.UserLoginDTO;
import com.example.management.entity.AccountEntity;
import com.example.management.repository.AccountRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
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
    public UserLoginDTO loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AccountEntity> entity = this.accountRepository.findByUsername(username);
        if (!entity.isPresent()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new UserLoginDTO(entity.get().getUsername(), entity.get().getCode(), entity.get().getPassword());
    }

    public AccountEntity save(UserDTO user) {
        if(!user.getPassword().equals(user.getPasswordConfirm())) {
            return null;
        }
        AccountEntity entity = new AccountEntity();
        entity.setUsername(user.getUsername());
        entity.setPassword(bcryptEncoder.encode(user.getPassword()));
        entity.setName(user.getName());
        entity.setEmail(user.getEmail());
        return accountRepository.save(entity);
    }
}

package com.example.management.dto;

import com.example.management.entity.AccountEntity;
import java.util.ArrayList;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 *
 * @author Nguyen Hung Hau
 */
public class UserLoginDTO implements UserDetails{
    
    private String username;
    private String code;
    private String password;

    public UserLoginDTO(String username, String code, String password) {
        this.username = username;
        this.code = code;
        this.password = password;
    }
    
    public UserLoginDTO (AccountEntity account) {
        this(account.getUsername(), account.getCode(), account.getPassword());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getCode() {
        return code;
    }
}

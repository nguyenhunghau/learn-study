package com.example.management.service;

import com.example.management.dto.AccountDTO;
import com.example.management.dto.UserDTO;
import com.example.management.entity.AccountEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Nguyen Hung Hau
 */
@Service
public interface AccountService {
    
    public AccountEntity login(String accessToken, String refreshToken);
    
    public AccountEntity register(AccountEntity accountEntity);
    
    public boolean activeAccount(String code);
    
    public AccountEntity update(AccountDTO accountEntity, MultipartFile photo, MultipartFile certificate);
    
    public Boolean changePassword(String username, String oldPassword, String newPassord);

    public Optional<AccountEntity> findByUsername(String username);
    
    public AccountDTO getProfile(String code, String token);
    
    public boolean changePassword(UserDTO userDTO, String token);

    public List<AccountDTO> findAllAccount();

    public AccountDTO findById(int id);

    public void update(AccountDTO accountDTO);

    public void delete(int accountId);
}

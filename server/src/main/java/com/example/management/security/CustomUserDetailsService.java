package com.example.management.security;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.component.EmailUtils;
import com.example.management.component.GeneratedIDUtils;
import com.example.management.dto.UserDTO;
import com.example.management.dto.UserLoginDTO;
import com.example.management.entity.AccountEntity;
import com.example.management.exception.EmailException;
import com.example.management.repository.AccountRepository;
import com.google.gson.JsonObject;
import java.util.Date;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 */
@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;
    
    @Autowired
    private EmailUtils emailUtils;
    
    @Autowired
    private GeneratedIDUtils generatedIDUtils;

    @Override
    public UserLoginDTO loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AccountEntity> optional = this.accountRepository.findByUsername(username, true);
        if (!optional.isPresent()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        AccountEntity account = optional.get();
        return new UserLoginDTO(account);
    }

    @Transactional(rollbackFor = EmailException.class)
    public JsonObject save(UserDTO user) throws EmailException {
        JsonObject result = new JsonObject();
        JsonObject message = new JsonObject();
        if(!user.getPassword().equals(user.getPasswordConfirm())) {
            message.addProperty("passwordConfirm", "Mật khẩu xác nhận không khớp");
            result.add("error", message);
            return message;
        }
        if(accountRepository.findByEmail(user.getEmail()).isPresent()) {
            message.addProperty("email", "Email đã tồn tại");
            result.add("error", message);
            return result;
        }
        if(accountRepository.findByUsername(user.getUsername(), true).isPresent()) {
            message.addProperty("username", "Tên đăng nhập đã tồn tại");
            result.add("error", message);
            return result;
        }
        AccountEntity entity = new AccountEntity();
        entity.setUsername(user.getUsername());
        entity.setPassword(bcryptEncoder.encode(user.getPassword()));
        entity.setName(user.getName());
        entity.setEmail(user.getEmail());
        String code = generatedIDUtils.gemeratedID();
        entity.setCode(code);
        entity.setCreated(new Date());
        entity = accountRepository.save(entity);
        if(emailUtils.sendMailRegister(entity)) {
            result.addProperty("success", "success");
            return result;
        }
        throw new EmailException("Error when send mail confirm email");
    }
}

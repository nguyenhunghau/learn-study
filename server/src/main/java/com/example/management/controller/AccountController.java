package com.example.management.controller;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.constant.MyConstant;
import com.example.management.dto.AccountDTO;
import com.example.management.dto.JwtResponseDTO;
import com.example.management.dto.UserDTO;
import com.example.management.dto.UserLoginDTO;
import com.example.management.entity.AccountEntity;
import com.example.management.security.CustomUserDetailsService;
import com.example.management.security.JwtTokenUtil;
import com.example.management.service.AccountService;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
//</editor-fold>


/**
 *
 * @author Nguyen Hung Hau
 */
@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    private static final Logger LOGGER = LoggerFactory.getLogger(AccountController.class);

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
        return ResponseEntity.ok(userDetailsService.save(user).toString());
    }
    
    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public ResponseEntity<?> activeAccount(@RequestParam("code") String code) throws Exception {
        return ResponseEntity.ok(accountService.activeAccount(code));
    }

    @RequestMapping(value = "/getAccount", method = RequestMethod.GET)
    public ResponseEntity<?> getAccount(HttpServletRequest request, @RequestParam("code") String accountCode) throws Exception {
        return ResponseEntity.ok(accountService.getProfile(accountCode, jwtTokenUtil.getTokenRequest(request)));
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@Valid @RequestBody UserDTO user, 
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Username or password empty");
        }
        try {
            authenticate(user.getUsername(), user.getPassword());
            final UserLoginDTO userLoginDTO = userDetailsService.loadUserByUsername(user.getUsername());
            HttpHeaders responseHeaders = new HttpHeaders();
            final String token = jwtTokenUtil.generateToken(userLoginDTO);
            responseHeaders.add(HttpHeaders.SET_COOKIE, ResponseCookie.from(MyConstant.ACCESS_TOKEN, token)
                .maxAge(3000)
                .httpOnly(true)
                .path("/")
                .build().toString());
            
            return ResponseEntity.ok().headers(responseHeaders)
                    .body(new JwtResponseDTO(token, userLoginDTO.getCode()));
        } catch (Exception ex) {
            LOGGER.error("Error when authenticate account", ex);
            return ResponseEntity.badRequest().body(ex);
        }
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @RequestMapping(value = "/updateProfile", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProfile(@RequestPart("account") AccountDTO account, 
            @RequestPart(value = "photo", required = false) MultipartFile photo,
            @RequestPart(value = "certificate", required = false) MultipartFile certificate) {
        try {
            return ResponseEntity.ok(accountService.update(account, photo, certificate));
        } catch (Exception ex) {
            LOGGER.error("Error when upload profile", ex);
            return ResponseEntity.badRequest().body(ex);
        }
    }
    
    @RequestMapping(value = "/change-password", method = RequestMethod.POST)
    public ResponseEntity<?> changePassword(HttpServletRequest request, @RequestBody UserDTO userDTO) {
        try {
            String token = jwtTokenUtil.getTokenRequest(request);
            return ResponseEntity.ok(accountService.changePassword(userDTO, token));
        } catch (Exception ex) {
            LOGGER.error("Error when chaging password", ex);
            return ResponseEntity.badRequest().body(ex);
        }
    }
}

package com.example.management.controller;

import com.example.management.entity.AccountEntity;
import com.example.management.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
public class AccountController {
    
    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<AccountEntity> login(@RequestParam("username") String username, @RequestParam("password") String password) {
        return new ResponseEntity<>(accountService.login(username, password), HttpStatus.OK);
    }
}

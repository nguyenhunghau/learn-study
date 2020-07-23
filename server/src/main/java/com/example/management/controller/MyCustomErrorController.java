package com.example.management.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author USER
 */
@Controller
public class MyCustomErrorController  implements ErrorController {

    private static final String PATH = "/error";
    
    @GetMapping(value=PATH)
    public ResponseEntity error() {
        return ResponseEntity.ok("{\"error\": \"Error haven\"}");
    }
    
    @Override
    public String getErrorPath() {
        return PATH;
    }
    
}

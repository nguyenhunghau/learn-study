package com.example.management.controller;

import com.example.management.entity.TeachingClassEntity;
import com.example.management.service.TeachingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author USER
 */
@RestController
public class TeachingController {
    
    @Autowired
    private TeachingService teachingService;

    @RequestMapping(value = "/addClass", method = RequestMethod.POST)
    public ResponseEntity<TeachingClassEntity> addClass(@RequestBody TeachingClassEntity entity) {
        return new ResponseEntity<>(teachingService.addClass(entity), HttpStatus.OK);
    }
}

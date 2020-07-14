package com.example.management.controller;

import com.example.management.dto.TeachingSearchDTO;
import com.example.management.entity.TeachingClassEntity;
import com.example.management.service.TeachingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import static org.springframework.http.ResponseEntity.ok;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author USER
 */
@RestController
@RequestMapping("/teaching")
public class TeachingController {
    
    @Autowired
    private TeachingService teachingService;

    @RequestMapping(value = "/addClass", method = RequestMethod.POST)
    public ResponseEntity<TeachingClassEntity> addClass(@RequestBody TeachingClassEntity entity) {
        return ok(teachingService.addClass(entity));
    }
    
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity getAll(TeachingSearchDTO teachingSearchDTO) {
        return ok(teachingService.getAll(teachingSearchDTO));
    }
}

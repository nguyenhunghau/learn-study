package com.example.management.controller;

import com.example.management.service.LevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import static org.springframework.http.ResponseEntity.ok;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author USER
 */
@RestController
@RequestMapping("/level")
public class LevelController {
    @Autowired
    private LevelService levelService;

    @RequestMapping(value = "/getList", method = RequestMethod.GET)
    public ResponseEntity getList() {
        return ok(levelService.findAllActive());
    }
}

package com.example.management.controller;

import com.example.management.dto.TeachingSearchDTO;
import com.example.management.entity.TeachingClassEntity;
import com.example.management.service.TeachingService;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import static org.springframework.http.ResponseEntity.ok;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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

    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public ResponseEntity getAll(@RequestBody TeachingSearchDTO teachingSearchDTO) {
        return ok(teachingService.getAll(teachingSearchDTO));
    }

    @RequestMapping(value = "/getByAccount", method = RequestMethod.GET)
    public ResponseEntity getByAccount(@RequestParam("accountCode") String accountCode) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        try {
            return ok(objectMapper.writeValueAsString(teachingService.getByAccount(accountCode)));
        } catch (JsonProcessingException ex) {
            return ResponseEntity.badRequest().body(ex);
        }
    }
}

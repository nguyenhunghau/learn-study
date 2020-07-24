package com.example.management.controller;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.dto.TeachingSearchDTO;
import com.example.management.entity.TeachingClassEntity;
import com.example.management.exception.NotFoundException;
import com.example.management.security.JwtTokenUtil;
import com.example.management.service.TeachingService;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import static org.springframework.http.ResponseEntity.ok;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 */
@RestController
@RequestMapping("/teaching")
public class TeachingController {

    @Autowired
    private TeachingService teachingService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

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
    
    @RequestMapping(value = "/getByCode", method = RequestMethod.GET)
    public ResponseEntity getByCode(HttpServletRequest request, @RequestParam("code") String code) {
        try {
            return ok(teachingService.getByCode(code, jwtTokenUtil.getTokenRequest(request)));
        } catch (NotFoundException ex) {
            return ResponseEntity.badRequest().body(ex);
        }
    }
}

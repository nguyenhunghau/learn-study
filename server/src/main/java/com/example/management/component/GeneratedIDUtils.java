package com.example.management.component;

import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 *
 * @author LeDinhTuan
 */
@Component
public class GeneratedIDUtils {

    private static final Logger logger = LoggerFactory.getLogger(GeneratedIDUtils.class);
    
    //<editor-fold defaultstate="collapsed" desc="GENERATE ID">
    public String gemeratedID() {
        try {
            UUID uuid = UUID.randomUUID();
            return uuid.toString();
        } catch (Exception e) {
            logger.error("Error when create code", e);
            return "";
        }
    }
    //</editor-fold>
}

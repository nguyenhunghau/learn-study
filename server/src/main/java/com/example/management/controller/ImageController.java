package com.example.management.controller;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.service.ImageService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 */
@RestController
@RequestMapping("/image")
public class ImageController {
    @Autowired
    private ImageService imageService;
    
    @ResponseBody
    @RequestMapping(value = "/data", method = RequestMethod.GET)
    public byte[] showImage(@RequestParam String link) throws IOException {
        return imageService.getImage(link);
    }
    
    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public ResponseEntity<?> download(@RequestParam String link) throws IOException {
        return imageService.download(link);
    }
}

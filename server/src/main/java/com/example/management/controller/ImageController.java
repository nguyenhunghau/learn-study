package com.example.management.controller;

import com.example.management.service.ImageService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
}

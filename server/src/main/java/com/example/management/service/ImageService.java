package com.example.management.service;

import com.example.management.constant.MyConstant;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import javax.servlet.ServletContext;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */
@Service
public class ImageService {

    @Autowired
    private ServletContext servletContext;

    public byte[] getImage(String link) throws UnsupportedEncodingException, IOException {
        link = URLDecoder.decode(link, "UTF-8");
        try {
            final InputStream in = new FileInputStream(new File(MyConstant.IMAGE_FOLDER + link));
            return IOUtils.toByteArray(in);
        } catch (Exception ex) {
            return new byte[0];
        }
    }

    public ResponseEntity<?> download(String link) throws FileNotFoundException {
        File file = new File(MyConstant.IMAGE_FOLDER + link);
        MediaType mediaType = getMediaTypeForFileName(this.servletContext, link);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
         return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength(file.length()) //
                .body(resource);
    }
    
    public MediaType getMediaTypeForFileName(ServletContext servletContext, String fileName) {
        // application/pdf
        // application/xml
        // image/gif, ...
        String mineType = servletContext.getMimeType(fileName);
        try {
            MediaType mediaType = MediaType.parseMediaType(mineType);
            return mediaType;
        } catch (Exception e) {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
}

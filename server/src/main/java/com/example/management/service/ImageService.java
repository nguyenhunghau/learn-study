package com.example.management.service;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 */
@Service
public class ImageService {

    @Autowired
    private ServletContext servletContext;

    private static final Logger LOGGER = LoggerFactory.getLogger(AccountServiceImpl.class);

    public byte[] getImage(String link) throws UnsupportedEncodingException, IOException {
        link = URLDecoder.decode(link, "UTF-8");
        try {
            final InputStream in = new FileInputStream(new File(MyConstant.IMAGE_FOLDER + link));
            return IOUtils.toByteArray(in);
        } catch (IOException ex) {
            LOGGER.error("Not found link " + link, ex);
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
        MediaType mediaType = MediaType.parseMediaType(mineType);
        return mediaType;
    }
}

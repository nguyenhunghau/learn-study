package com.example.management.service;

import com.example.management.constant.MyConstant;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import javax.servlet.ServletContext;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
        final InputStream in = new FileInputStream(new File(MyConstant.IMAGE_FOLDER + link));
        return IOUtils.toByteArray(in);
    }
}

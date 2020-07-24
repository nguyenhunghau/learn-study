package com.example.management.component;

import com.example.management.constant.MyConstant;
import java.io.File;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Nguyen Hung Hau
 */
public class UploadFile {
    
    public static boolean uploadImage(String folder, MultipartFile part) throws IOException {
        File file = new File(MyConstant.IMAGE_FOLDER + folder, part.getOriginalFilename());
        file.getParentFile().mkdirs();
        part.transferTo(file);
        return true;
    }
}

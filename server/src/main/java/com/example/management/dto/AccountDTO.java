package com.example.management.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author Nguyen Hung Hau
 */
@Getter @Setter
public class AccountDTO {
    
    private String username;
    private String name;
    private Date birthday;
    private String email;
    private String code;
    private String phone;
    private String photo;
    private Integer addressId;
    private String description;
    private String school;
    private Integer roleId;
    private String gender;
    private String certificate;
    private String personalId;
    private String major;
}

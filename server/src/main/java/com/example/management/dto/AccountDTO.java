package com.example.management.dto;

import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author Nguyen Hung Hau
 */
@Getter @Setter
public class AccountDTO {
    private int id;
    private String username;
    @NotBlank
    private String name;
    private Date birthday;
    private String email;
    private String code;
    
    @NotNull
    @NotBlank(message = "Can not let it empty")
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

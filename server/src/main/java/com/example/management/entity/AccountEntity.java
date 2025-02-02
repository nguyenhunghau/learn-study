package com.example.management.entity;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
 */
@Entity
@Table(name = "account")
@NamedQueries({
    @NamedQuery(name = "AccountEntity.findAll", query = "SELECT a FROM AccountEntity a")
    , @NamedQuery(name = "AccountEntity.findById", query = "SELECT a FROM AccountEntity a WHERE a.id = :id and a.isActive = true")
    , @NamedQuery(name = "AccountEntity.findByUsername", query = "SELECT a FROM AccountEntity a WHERE a.username = :username and a.isActive = :isActive")
    , @NamedQuery(name = "AccountEntity.findByUsernameAndPass", query = "SELECT a FROM AccountEntity a WHERE a.username = :username and a.password = :password and a.isActive = true")
    , @NamedQuery(name = "AccountEntity.findByCode", query = "SELECT a FROM AccountEntity a WHERE a.code = :code")
    , @NamedQuery(name = "AccountEntity.findByEmail", query = "SELECT a FROM AccountEntity a WHERE a.email = :email")})
@NamedNativeQueries({
    @NamedNativeQuery(name = "AccountEntity.getProfile", query = "SELECT ID,NAME,EMAIL,PHONE,BIRTHDAY,PHOTO,ADDRESS_ID,DESCRIPTION,SCHOOL,ROLE_ID,GENDER,CERTIFICATE,PERSONAL_ID,MAJOR,CREATED,UPDATED,CODE FROM account where CODE=:code")
})
@Getter @Setter @NoArgsConstructor
public class AccountEntity implements Serializable {

    @NotBlank
    @NotNull
    @Size(max = 250)
    @Column(name = "USERNAME")
    private String username;
    @Size(max = 50)
    @Column(name = "CODE")
    private String code;
    @Size(max = 250)
    @Column(name = "PASSWORD")
    private String password;
    @Size(max = 250)
    @Column(name = "NAME")
    private String name;
    @Email
    @Size(max = 250)
    @Column(name = "EMAIL")
    private String email;
    @Size(max = 20)
    @Column(name = "PHONE")
    private String phone;
    @Size(max = 100)
    @Column(name = "PHOTO")
    private String photo;
    @Column(name = "ADDRESS_ID")
    private Integer addressId;
    @Lob
    @Size(max = 65535)
    @Column(name = "DESCRIPTION")
    private String description;
    @Size(max = 250)
    @Column(name = "SCHOOL")
    private String school;
    @Column(name = "ROLE_ID")
    private Integer roleId;
    @Size(max = 4)
    @Column(name = "GENDER")
    private String gender;
    @Size(max = 100)
    @Column(name = "CERTIFICATE")
    private String certificate;
    @Size(max = 45)
    @Column(name = "PERSONAL_ID")
    private String personalId;
    @Size(max = 250)
    @Column(name = "MAJOR")
    private String major;
    @Column(name = "IS_ACTIVE")
    private boolean isActive;
    @Column(name = "CREATED")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;
    @Column(name = "UPDATED")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "BIRTHDAY")
    @Temporal(TemporalType.DATE)
    private Date birthday;

    public void merge(AccountEntity accountEntity) {
        this.addressId = accountEntity.getAddressId();
        this.birthday = accountEntity.getBirthday();
        this.description = accountEntity.getDescription();
        this.email = accountEntity.getEmail();
        this.name = accountEntity.getName();
        this.phone = accountEntity.getPhone();
        this.photo = accountEntity.getPhoto();
        this.certificate = accountEntity.getCertificate();
        this.school = accountEntity.getSchool();
        this.major = accountEntity.getMajor();
        this.gender = accountEntity.getGender();
        this.personalId = accountEntity.getPersonalId();
    }

    public AccountEntity(Integer id) {
        this.id = id;
    }
}

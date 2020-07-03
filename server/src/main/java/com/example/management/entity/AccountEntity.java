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
import javax.validation.constraints.Size;
//</editor-fold>

/**
 *
 * @author USER
 */
@Entity
@Table(name = "account")
@NamedQueries({
    @NamedQuery(name = "AccountEntity.findAll", query = "SELECT a FROM AccountEntity a")
    , @NamedQuery(name = "AccountEntity.findById", query = "SELECT a FROM AccountEntity a WHERE a.id = :id")
    , @NamedQuery(name = "AccountEntity.findByUsername", query = "SELECT a FROM AccountEntity a WHERE a.username = :username")
    , @NamedQuery(name = "AccountEntity.findByUsernameAndPass", query = "SELECT a FROM AccountEntity a WHERE a.username = :username and a.password = :password")
    , @NamedQuery(name = "AccountEntity.findByCode", query = "SELECT a FROM AccountEntity a WHERE a.code = :code")
    , @NamedQuery(name = "AccountEntity.findByEmail", query = "SELECT a FROM AccountEntity a WHERE a.email = :email")})
@NamedNativeQueries({
    @NamedNativeQuery(name = "AccountEntity.getProfile", query = "SELECT ID,NAME,EMAIL,PHONE,BIRTHDAY,PHOTO,ADDRESS_ID,DESCRIPTION,SCHOOL,ROLE_ID,GENDER,CERTIFICATE,PERSONAL_ID,MAJOR,CREATED,UPDATED,CODE FROM account where CODE=:code")
})
public class AccountEntity  implements Serializable {
    
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
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 250)
    @Column(name = "EMAIL")
    private String email;
    // @Pattern(regexp="^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$", message="Invalid phone/fax format, should be as xxx-xxx-xxxx")//if the field contains phone or fax number consider using this annotation to enforce field validation
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
    
    public AccountEntity() {
    }

    public AccountEntity(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
    
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public String getPersonalId() {
        return personalId;
    }

    public void setPersonalId(String personalId) {
        this.personalId = personalId;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

}

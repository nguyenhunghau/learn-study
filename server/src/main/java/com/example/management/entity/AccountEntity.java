package com.example.management.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author USER
 */
@Entity
@Table(name = "account")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "AccountEntity.findAll", query = "SELECT a FROM AccountEntity a")
    , @NamedQuery(name = "AccountEntity.findById", query = "SELECT a FROM AccountEntity a WHERE a.id = :id")
    , @NamedQuery(name = "AccountEntity.findByUsername", query = "SELECT a FROM AccountEntity a WHERE a.username = :username")
    , @NamedQuery(name = "AccountEntity.findByUsernameAndPass", query = "SELECT a FROM AccountEntity a WHERE a.username = :username and a.password = :password")
    , @NamedQuery(name = "AccountEntity.findByName", query = "SELECT a FROM AccountEntity a WHERE a.name = :name")
    , @NamedQuery(name = "AccountEntity.findByEmail", query = "SELECT a FROM AccountEntity a WHERE a.email = :email")
    , @NamedQuery(name = "AccountEntity.findByPhone", query = "SELECT a FROM AccountEntity a WHERE a.phone = :phone")
    , @NamedQuery(name = "AccountEntity.findByBirthday", query = "SELECT a FROM AccountEntity a WHERE a.birthday = :birthday")
    , @NamedQuery(name = "AccountEntity.findByPhoto", query = "SELECT a FROM AccountEntity a WHERE a.photo = :photo")
    , @NamedQuery(name = "AccountEntity.findByAddress", query = "SELECT a FROM AccountEntity a WHERE a.address = :address")})
public class AccountEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Size(max = 250)
    @Column(name = "USERNAME")
    private String username;
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
    @Column(name = "BIRTHDAY")
    @Temporal(TemporalType.DATE)
    private Date birthday;
    @Size(max = 500)
    @Column(name = "PHOTO")
    private String photo;
    @Size(max = 500)
    @Column(name = "ADDRESS")
    private String address;
    @Lob
    @Size(max = 65535)
    @Column(name = "DESCRIPTION")
    private String description;

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

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void merge(AccountEntity accountEntity) {
        this.address = accountEntity.getAddress();
        this.birthday = accountEntity.getBirthday();
        this.description = accountEntity.getDescription();
        this.email = accountEntity.getEmail();
        this.name = accountEntity.getName();
        this.phone = accountEntity.getPhone();
        this.photo = accountEntity.getPhoto();
    }

}

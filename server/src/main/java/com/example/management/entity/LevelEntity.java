package com.example.management.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Nguyen Hung Hau
 */
@Entity
@Table(name = "level")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "LevelEntity.findAll", query = "SELECT l FROM LevelEntity l")
    , @NamedQuery(name = "LevelEntity.findById", query = "SELECT l FROM LevelEntity l WHERE l.id = :id")
    , @NamedQuery(name = "LevelEntity.findByName", query = "SELECT l FROM LevelEntity l WHERE l.name = :name")
    , @NamedQuery(name = "LevelEntity.findAllActive", query = "SELECT l FROM LevelEntity l WHERE l.isActive = :isActive")})
public class LevelEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Size(max = 250)
    @Column(name = "NAME")
    private String name;
    @Column(name = "IS_ACTIVE")
    private Boolean isActive;

    public LevelEntity() {
    }

    public LevelEntity(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
}

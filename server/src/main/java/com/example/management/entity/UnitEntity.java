/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
@Table(name = "unit")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "UnitEntity.findAll", query = "SELECT u FROM UnitEntity u")
    , @NamedQuery(name = "UnitEntity.findById", query = "SELECT u FROM UnitEntity u WHERE u.id = :id")
    , @NamedQuery(name = "UnitEntity.findByName", query = "SELECT u FROM UnitEntity u WHERE u.name = :name")
    , @NamedQuery(name = "UnitEntity.findAllActive", query = "SELECT u FROM UnitEntity u")})
public class UnitEntity implements Serializable {

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

    public UnitEntity() {
    }

    public UnitEntity(Integer id) {
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

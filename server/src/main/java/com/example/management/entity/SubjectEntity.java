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
 * @author USER
 */
@Entity
@Table(name = "subject")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SubjectEntity.findAll", query = "SELECT s FROM SubjectEntity s")
    , @NamedQuery(name = "SubjectEntity.findById", query = "SELECT s FROM SubjectEntity s WHERE s.id = :id")
    , @NamedQuery(name = "SubjectEntity.findByName", query = "SELECT s FROM SubjectEntity s WHERE s.name = :name")
    , @NamedQuery(name = "SubjectEntity.findByIsActive", query = "SELECT s FROM SubjectEntity s WHERE s.isActive = :isActive")})
public class SubjectEntity implements Serializable {

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

    public SubjectEntity() {
    }

    public SubjectEntity(Integer id) {
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SubjectEntity)) {
            return false;
        }
        SubjectEntity other = (SubjectEntity) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.management.entity.SubjectEntity[ id=" + id + " ]";
    }
    
}

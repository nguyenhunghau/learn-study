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
import javax.persistence.Lob;
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
@Table(name = "teaching_class")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TeachingClassEntity.findAll", query = "SELECT t FROM TeachingClassEntity t")
    , @NamedQuery(name = "TeachingClassEntity.findById", query = "SELECT t FROM TeachingClassEntity t WHERE t.id = :id")
    , @NamedQuery(name = "TeachingClassEntity.findBySubjectIds", query = "SELECT t FROM TeachingClassEntity t WHERE t.subjectIds = :subjectIds")
    , @NamedQuery(name = "TeachingClassEntity.findByLevel", query = "SELECT t FROM TeachingClassEntity t WHERE t.level = :level")
    , @NamedQuery(name = "TeachingClassEntity.findByCost", query = "SELECT t FROM TeachingClassEntity t WHERE t.cost = :cost")
    , @NamedQuery(name = "TeachingClassEntity.findByUnitId", query = "SELECT t FROM TeachingClassEntity t WHERE t.unitId = :unitId")
    , @NamedQuery(name = "TeachingClassEntity.findByTypeTeaching", query = "SELECT t FROM TeachingClassEntity t WHERE t.typeTeaching = :typeTeaching")
    , @NamedQuery(name = "TeachingClassEntity.findByAccountId", query = "SELECT t FROM TeachingClassEntity t WHERE t.accountId = :accountId")})
public class TeachingClassEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Size(max = 100)
    @Column(name = "SUBJECT_IDS")
    private String subjectIds;
    @Size(max = 100)
    @Column(name = "LEVEL")
    private String level;
    @Lob
    @Size(max = 65535)
    @Column(name = "TIMETABLE")
    private String timetable;
    @Column(name = "COST")
    private Integer cost;
    @Column(name = "UNIT_ID")
    private Integer unitId;
    @Size(max = 100)
    @Column(name = "TYPE_TEACHING")
    private String typeTeaching;
    @Lob
    @Size(max = 65535)
    @Column(name = "ADDRESS")
    private String address;
    @Column(name = "ACCOUNT_ID")
    private Integer accountId;

    public TeachingClassEntity() {
    }

    public TeachingClassEntity(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSubjectIds() {
        return subjectIds;
    }

    public void setSubjectIds(String subjectIds) {
        this.subjectIds = subjectIds;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getTimetable() {
        return timetable;
    }

    public void setTimetable(String timetable) {
        this.timetable = timetable;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Integer getUnitId() {
        return unitId;
    }

    public void setUnitId(Integer unitId) {
        this.unitId = unitId;
    }

    public String getTypeTeaching() {
        return typeTeaching;
    }

    public void setTypeTeaching(String typeTeaching) {
        this.typeTeaching = typeTeaching;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
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
        if (!(object instanceof TeachingClassEntity)) {
            return false;
        }
        TeachingClassEntity other = (TeachingClassEntity) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.management.entity.TeachingClassEntity[ id=" + id + " ]";
    }
    
}

package com.example.management.entity;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
//</editor-fold>

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
    , @NamedQuery(name = "TeachingClassEntity.findByUnitId", query = "SELECT t FROM TeachingClassEntity t WHERE t.unitEntity.id = :unitId")
    , @NamedQuery(name = "TeachingClassEntity.findByTypeTeaching", query = "SELECT t FROM TeachingClassEntity t WHERE t.typeTeaching.id = :typeTeaching")
    , @NamedQuery(name = "TeachingClassEntity.findByAccountId", query = "SELECT t FROM TeachingClassEntity t WHERE t.accountEntity.id = :accountId")})
public class TeachingClassEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Size(max = 60)
    @Column(name = "TITLE")
    private String title;
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
    
    @ManyToOne
    @JoinColumn(name = "UNIT_ID")
    private UnitEntity unitEntity;
    
    @Size(max = 100)
    @Column(name = "TYPE_TEACHING")
    private String typeTeaching;
    @Lob
    @Size(max = 65535)
    @Column(name = "ADDRESS")
    private String address;
    
    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private AccountEntity accountEntity;

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

    public UnitEntity getUnitEntity() {
        return unitEntity;
    }

    public void setUnitEntity(UnitEntity unitEntity) {
        this.unitEntity = unitEntity;
    }

    public AccountEntity getAccountEntity() {
        return accountEntity;
    }

    public void setAccountEntity(AccountEntity accountEntity) {
        this.accountEntity = accountEntity;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void merge(TeachingClassEntity entity) {
        this.address = entity.getAddress();
        this.cost = entity.getCost();
        this.level = entity.getLevel();
        this.subjectIds = entity.getSubjectIds();
        this.timetable = entity.getTimetable();
        this.typeTeaching = entity.getTypeTeaching();
        this.unitEntity = entity.getUnitEntity();
    }
}

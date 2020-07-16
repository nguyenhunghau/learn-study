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
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
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
//    , @NamedQuery(name = "TeachingClassEntity.findByLevelIds", query = "SELECT t FROM TeachingClassEntity t WHERE t.level = :level")
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
    
    @NotNull
    @Size(max = 60)
    @Column(name = "TITLE")
    private String title;
    @Size(max = 100)
    @NotNull
    @Column(name = "LEVEL_IDS")
    private String levelIds;
    @Lob
    @Size(max = 65535)
    @NotNull
    @Column(name = "TIMETABLE")
    private String timetable;
    @NotNull
    @Column(name = "COST")
    private Integer cost;
    @Column(name = "NUM_PERIOD")
    private Integer numPeriod;
    @Column(name = "DESCRIPTION")
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "SUBJECT_ID")
    private SubjectEntity subjectEntity;
    
    @ManyToOne
    @JoinColumn(name = "UNIT_ID")
    private UnitEntity unitEntity;
    
    @Size(max = 100)
    @Column(name = "TYPE_TEACHING")
    private String typeTeaching;
   
    @Column(name = "ADDRESS_ID")
    private Integer addressId;
    
    @Column(name = "DATE_START")
    @Temporal(TemporalType.DATE)
    private Date dateStart;
    @Column(name = "CREATED")
    @Temporal(TemporalType.DATE)
    private Date created;
    
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

    public String getLevelIds() {
        return levelIds;
    }

    public void setLevelIds(String level) {
        this.levelIds = level;
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

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
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

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Integer getNumPeriod() {
        return numPeriod;
    }

    public void setNumPeriod(Integer numPeriod) {
        this.numPeriod = numPeriod;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SubjectEntity getSubjectEntity() {
        return subjectEntity;
    }

    public void setSubjectEntity(SubjectEntity subjectEntity) {
        this.subjectEntity = subjectEntity;
    }

    public void merge(TeachingClassEntity entity) {
        this.addressId = entity.getAddressId();
        this.cost = entity.getCost();
        this.levelIds = entity.getLevelIds();
        this.subjectEntity = entity.getSubjectEntity();
        this.timetable = entity.getTimetable();
        this.typeTeaching = entity.getTypeTeaching();
        this.unitEntity = entity.getUnitEntity();
        this.numPeriod = entity.getNumPeriod();
        this.description = entity.getDescription();
    }
}

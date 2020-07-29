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
import lombok.Getter;
import lombok.Setter;
//</editor-fold>

/**
 *
 * @author Nguyen Hung Hau
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
@Getter @Setter
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

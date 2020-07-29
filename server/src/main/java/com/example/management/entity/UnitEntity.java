package com.example.management.entity;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
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
import lombok.Getter;
import lombok.Setter;
//</editor-fold>

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
@Getter @Setter
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
}

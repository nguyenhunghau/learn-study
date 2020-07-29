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
//</editor-fold>


/**
 *
 * @author Nguyen Hung Hau
 */
@Entity
@Table(name = "role")
//@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "RoleEntity.findAll", query = "SELECT r FROM RoleEntity r")
    , @NamedQuery(name = "RoleEntity.findById", query = "SELECT r FROM RoleEntity r WHERE r.id = :id")
    , @NamedQuery(name = "RoleEntity.findByName", query = "SELECT r FROM RoleEntity r WHERE r.name = :name")})


public class RoleEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Size(max = 50)
    @Column(name = "NAME")
    private String name;
}

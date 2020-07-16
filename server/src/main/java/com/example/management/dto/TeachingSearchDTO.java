package com.example.management.dto;

import java.util.Date;

/**
 *
 * @author Admin
 */
public class TeachingSearchDTO {
    
    private String keyword;
    private Integer addressId;
    private String subjectIds;
    private String levelIds;
    private Date dateFrom;
    private Date dateTo;

    public TeachingSearchDTO(String keyword, Integer addressId, String subjectIds, String levelIds, Date dateFrom, Date dateTo) {
        this.keyword = keyword;
        this.addressId = addressId;
        this.subjectIds = subjectIds;
        this.levelIds = levelIds;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    public String getKeyword() {
        return keyword;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public String getSubjectIds() {
        return subjectIds;
    }

    public String getLevelIds() {
        return levelIds;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }
}

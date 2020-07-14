package com.example.management.dto;

/**
 *
 * @author Admin
 */
public class TeachingSearchDTO {
    
    private String keyword;
    private Integer addressId;
    private String subjectIds;
    private String levelIds;
    private String dateFrom;
    private String dateTo;

    public TeachingSearchDTO(String keyword, Integer addressId, String subjectIds, String levelIds, String dateFrom, String dateTo) {
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

    public String getDateFrom() {
        return dateFrom;
    }

    public String getDateTo() {
        return dateTo;
    }
}

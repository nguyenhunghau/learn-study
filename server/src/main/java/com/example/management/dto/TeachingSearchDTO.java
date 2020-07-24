package com.example.management.dto;

import java.util.Date;

/**
 *
 * @author Nguyen Hung Hau
 */
public class TeachingSearchDTO {
    
    private String keyword;
    private Integer addressId;
    private String subjectIds;
    private String levelIds;
    private Date dateFrom;
    private Date dateTo;
    private int pageIndex;
    private int numItem;

    public TeachingSearchDTO(String keyword, Integer addressId, String subjectIds, String levelIds, Date dateFrom, Date dateTo, int pageIndex, int numItem) {
        this.keyword = keyword;
        this.addressId = addressId;
        this.subjectIds = subjectIds;
        this.levelIds = levelIds;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.pageIndex = pageIndex;
        this.numItem = numItem;
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

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public int getNumItem() {
        return numItem;
    }

    public void setNumItem(int numItem) {
        this.numItem = numItem;
    }
}

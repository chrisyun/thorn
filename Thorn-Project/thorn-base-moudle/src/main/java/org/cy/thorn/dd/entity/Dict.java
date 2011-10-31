package org.cy.thorn.dd.entity;

import java.math.BigDecimal;

public class Dict {
    private String dname;

    private String dvalue;

    private BigDecimal sort;

    private String typeid;

    public String getDname() {
        return dname;
    }

    public void setDname(String dname) {
        this.dname = dname == null ? null : dname.trim();
    }

    public String getDvalue() {
        return dvalue;
    }

    public void setDvalue(String dvalue) {
        this.dvalue = dvalue == null ? null : dvalue.trim();
    }

    public BigDecimal getSort() {
        return sort;
    }

    public void setSort(BigDecimal sort) {
        this.sort = sort;
    }

    public String getTypeid() {
        return typeid;
    }

    public void setTypeid(String typeid) {
        this.typeid = typeid == null ? null : typeid.trim();
    }
    
    public String toString() {
    	return String.format("Dict [dname=%s, dvalue=%s, typeid=%s, sort=%s]", 
    			dname, dvalue, typeid, sort);
    }
}
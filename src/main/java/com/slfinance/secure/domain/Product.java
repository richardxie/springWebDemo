/** 
 * @(#)Customer.java 1.0.0 2015年12月29日 下午4:39:07  
 *  
 * Copyright © 2015 善林金融.  All rights reserved.  
 */ 

/**   
* @title Customer.java 
* @package com.slfinance.secure.web 
* @description TODO(用一句话描述该文件做什么) 
* @author richard.xie  
* @date 2015年12月29日 下午4:39:07 
* @version V1.0   
*/
package com.slfinance.secure.domain;

import java.math.BigDecimal;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

/** 
 * @typeName Customer 
 * @description TODO(这里用一句话描述这个类的作用) 
 * @author richard.xie
 * @date 2015年12月29日 下午4:39:07 
 *  
 */
@SuppressWarnings("serial")
@Getter
@Setter
@Entity
public class Product extends AbstractEntity{
	
	public Product() {}
	/**
	 * @param string
	 * @param i
	 */
	public Product(String id, String string, int i, BigDecimal yrr) {
		this.id = id;
		productName = string;
		typeTerm = i;
		yearRate = yrr;
	}
	private String productCode;
	
	private String productType;
	@NotEmpty
	private String productName;
	
	private String productStatus;

	private Integer typeTerm;
	
	private Integer seatTerm;
	
	private BigDecimal investMinAmount;
	
	private BigDecimal investMaxAmount;
	
	private BigDecimal planTotalAmount;
	
	private String ensureMethod;
	
	private String investBearinteMethod;
	
	private String productDesc;
	
	private BigDecimal serviceChargeRate;
	
	private String enableStatus;
	
	@NotEmpty
	private BigDecimal yearRate;
	
	 @OneToOne(cascade=CascadeType.ALL)  
	 @JoinColumn(name="RRODUCT_DETAIL_ID")  
	private ProductDetail productDetail;
}

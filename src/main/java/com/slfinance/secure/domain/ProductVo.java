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

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Data;

/** 
 * @typeName Customer 
 * @description TODO(这里用一句话描述这个类的作用) 
 * @author richard.xie
 * @date 2015年12月29日 下午4:39:07 
 *  
 */
@SuppressWarnings("serial")
@Data
public class ProductVo implements Serializable{
	
	public ProductVo() {}
	
	public ProductVo(String id, String name, String desc, String status, int term, BigDecimal yrr) {
		this(id, name, desc, status, term, yrr, 0, BigDecimal.ZERO);
	}
	
	public ProductVo(String id, String name, String desc, String status, int term, BigDecimal yrr, int investPeople) {
		this(id, name, desc, status,term, yrr, investPeople, BigDecimal.ZERO);
	}
	
	public ProductVo(String id, String string, String desc, String status, int i, BigDecimal yrr, int investPeople, BigDecimal currUsableValue) {
		this.id = id;
		productName = string;
		productDesc = desc;
		enableStatus = status;
		typeTerm = i;
		yearRate = yrr;
		this.alreadyInvestPeople = investPeople;
		this.currUsableValue = currUsableValue;
	}
	
	private String id;

	private String productName;
	
	private String productStatus;
	
	private int typeTerm;
	
	private int seatTerm;
	
	private String productDesc;
	
	private String enableStatus;
	
	private BigDecimal yearRate;
	
	private int alreadyInvestPeople;
	
	private BigDecimal currUsableValue;
	
}

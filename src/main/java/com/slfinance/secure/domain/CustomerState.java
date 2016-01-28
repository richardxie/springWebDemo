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

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

/** 
 * @typeName Customer 
 * @description TODO(这里用一句话描述这个类的作用) 
 * @author richard.xie
 * @date 2015年12月29日 下午4:39:07 
 *  
 */
@Data
@Entity
public class CustomerState implements Serializable{
	
	public CustomerState() {}
	/**
	 * @param string
	 * @param i
	 */
	public CustomerState(int id, String string) {
		this.id = id;
		description = string;
	}
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
	private int id;
	
	@NotEmpty
	@Column(name="description", length = 64)
	private String description;
}

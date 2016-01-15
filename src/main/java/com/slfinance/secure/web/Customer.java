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
package com.slfinance.secure.web;

import java.io.Serializable;

import lombok.Data;

/** 
 * @typeName Customer 
 * @description TODO(这里用一句话描述这个类的作用) 
 * @author richard.xie
 * @date 2015年12月29日 下午4:39:07 
 *  
 */
@Data
public class Customer implements Serializable{
	
	public Customer() {}
	/**
	 * @param string
	 * @param i
	 */
	public Customer(String id, String string, int i) {
		this.id = id;
		name = string;
		age = i;
	}
	private static final long serialVersionUID = 1L;
	private String id;
	private String name;
	private int age;

}

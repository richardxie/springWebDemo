/** 
 * @(#)CustomerVo.java 1.0.0 2016年2月8日 下午9:44:56  
 *  
 * Copyright © 2016 善林金融.  All rights reserved.  
 */ 

/**   
* @title CustomerVo.java 
* @package com.slfinance.secure.domain 
* @description TODO(用一句话描述该文件做什么) 
* @author richard.xie  
* @date 2016年2月8日 下午9:44:56 
* @version V1.0   
*/
package com.slfinance.secure.domain;

import java.io.Serializable;

import lombok.Data;


/** 
 * @typeName CustomerVo 
 * @description TODO(这里用一句话描述这个类的作用) 
 * @author richard.xie
 * @date 2016年2月8日 下午9:44:56 
 *  
 */
@Data
public class CustomerVo implements Serializable{
	private static final long serialVersionUID = 1L;

	private String id;
	
	private String name;

    private String email;
	
	private int age;
	
	private String state;
	
	public CustomerVo() {}
	
	public CustomerVo(String id, String name, String email, int age, String state) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.age = age;
		this.state = state;
	}
}

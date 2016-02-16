package com.slfinance.secure.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

import lombok.Data;

import org.hibernate.annotations.GenericGenerator;


@SuppressWarnings("serial")
@MappedSuperclass
@Data
public abstract class AbstractEntity implements java.io.Serializable{

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(length = 50)
	protected String id;

	/** 创建时间 */
	@Temporal(TemporalType.TIMESTAMP)
	protected Date createDate=new Date();

	/** 创建人 */
	@Column(length = 150)
	protected String createUser;


	@Column(length = 150)
	protected String lastUpdateUser;

	/** 更新时间 */
	@Temporal(TemporalType.TIMESTAMP)
	protected Date lastUpdateDate = new Date();
	
	/** 版本 */
	@Version
	protected Integer version = 0;
	
	/** 备注 */
	@Column(length = 300)
	protected String memo;
}

package com.slfinance.secure.domain;
// default package

import java.math.BigDecimal;

import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * BaoTProductDetailInfo entity. @author MyEclipse Persistence Tools
 */
@SuppressWarnings("serial")
@Getter
@Setter
@Entity
public class ProductDetail  extends  AbstractEntity{

	@NotEmpty
	private Integer alreadyInvestPeople;
	private BigDecimal alreadyInvestAmount;
	private BigDecimal currUsableValue;
	private BigDecimal partakeOrganizs;
	private BigDecimal partakeCrerigs;
	private BigDecimal accumulativeLucre;

}
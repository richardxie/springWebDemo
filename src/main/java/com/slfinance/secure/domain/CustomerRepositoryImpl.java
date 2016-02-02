package com.slfinance.secure.domain;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;


public class CustomerRepositoryImpl implements CustomerRepositoryCust{

	@Autowired
	private JdbcTemplate jdbcTemplate;
	public List<Map<String, Object>> searchCust(String pattern){
		StringBuffer sql = new StringBuffer()
			.append("select c.id, c.name \"name\", c.email \"email\", c.age \"age\", s.description \"state\"  from customer c left join customer_state s where c.state = s.id and c.name like '%")
			.append(pattern)
			.append("%'");
		return jdbcTemplate.queryForList(sql.toString());
	 }
}
/*
 * Copyright 2012-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.slfinance.secure.web;

import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;
import com.slfinance.secure.domain.Customer;
import com.slfinance.secure.domain.CustomerRepository;

/**
 * 用户控制器
 * 
 * @author kongxiong
 *
 */
@Controller
@Slf4j
public class CustController {
	private final CustomerRepository customerRepository;
	
	@Autowired
	public CustController(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
	
	@RequestMapping(value = "/cust", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Customer> get() {
		return customerRepository.findAll();
	}
	
	@RequestMapping(value = "/cust/search", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Customer> searchByName(@RequestBody Map<String, String> search) {
		String searchAction = search.get("action");
		if("namesearch".equals(searchAction))
			return customerRepository.findTop10ByNameLike(search.get("search"));
		return Lists.newArrayList();
	}
	
	@RequestMapping(value = "/cust/searchCust", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Map<String, Object>> search(@RequestBody Map<String, String> search) {
		String searchAction = search.get("action");
		if("namesearch".equals(searchAction))
			return customerRepository.searchCust(search.get("search"));
		return Lists.newArrayList();
	}
	
	@RequestMapping(value = "/cust/{id}", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Customer getOne(@PathVariable("id") String id) {
		return customerRepository.findOne(id);
	}

	@RequestMapping(value = "/cust/{id}", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Customer getOne(@PathVariable("id") String id, @RequestBody Customer c) {
		return customerRepository.save(c);
	}

	@RequestMapping(value = "/cust/isExist", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Boolean checkExist(@RequestParam("type") String type, @RequestParam("value") String value) {
		if(type.equalsIgnoreCase("username"))
			return customerRepository.findByName(value) != null;
		else if(type.equalsIgnoreCase("email")) {
			return customerRepository.findByEmail(value) != null;
		}
		else 
			throw new IllegalArgumentException("无效的验证类型。");
	}
	
	@RequestMapping(value = "/cust", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Customer postOne(@RequestBody Customer c) {
		log.debug(c.toString());
		return customerRepository.save(c);
	}
}

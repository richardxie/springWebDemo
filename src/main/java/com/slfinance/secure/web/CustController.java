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

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;

/**
 * 用户控制器
 * 
 * @author kongxiong
 *
 */
@Controller
public class CustController {
	@RequestMapping(value = "/cust", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Customer> get() {
		List<Customer> c = Lists.newArrayList();
		c.add(new Customer("1", "richard", 28));
		c.add(new Customer("2", "emma", 18));
		c.add(new Customer("3", "alex", 18));
		c.add(new Customer("4", "jill", 38));
		return c;
	}
	
	@RequestMapping(value = "/cust/{id}", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Customer getOne(@PathVariable("id") String id) {
		return new Customer("1", "richard", 28);
	}
	
	@RequestMapping(value = "/cust", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Customer postOne(@RequestBody Map<String, Object> body) {
		System.out.println(body);
		return new Customer("1", "richard", 28);
	}
}

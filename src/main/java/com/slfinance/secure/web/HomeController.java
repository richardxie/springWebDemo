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

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import rx.Observable;

import com.slfinance.secure.domain.Customer;

/**
 * 善林宝首页控制器
 * 
 * @author kongxiong
 *
 */
@Controller
public class HomeController {

	@RequestMapping("/")
	public String home(Map<String, Object> model) {
		Observable.just("one object").map((s) -> { return s + " map";}).subscribe( (s) ->{
	       System.out.println("Hello " + s + "!");
	    });
		return "index";
	}

	@RequestMapping("/foo")
	public String foo() {
		List<Customer> c = Arrays.asList(new Customer("1", "Joe", 21), new Customer("2", "Jim", 22), new Customer("3", "John", 23));
		c.forEach((p) -> { System.out.println(p);} );
		List<String> l = c.stream().filter((p) ->{ return p.getAge() > 21;}).map(p->{ return p.getName();}).collect(Collectors.toList());
		System.out.println(l.size());
		throw new RuntimeException("Expected exception in controller");
	}

	@RequestMapping(value = "/postOne", method = RequestMethod.POST)
	@ResponseBody
	public Customer post(@RequestBody Map<String, Object> param) {
		return new Customer("1", "richard", 28);
	}

	@Secured("ROLE_ADMIN")
	@RequestMapping("/home")
	public String home(ModelMap model) {
		model.put("message", "Hello World");
		model.put("title", "Hello Home");
		model.put("date", new Date());
		return "home";
	}

	@Secured("ROLE_ADMIN")
	@RequestMapping("/angular")
	public String angular(ModelMap model) {
		model.put("message", "Hello World");
		model.put("title", "Hello Home");
		model.put("date", new Date());
		return "angular/app";
	}
}

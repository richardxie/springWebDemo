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

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.slfinance.secure.domain.ProductRepository;

/**
 * 用户控制器
 * 
 * @author kongxiong
 *
 */
@Controller
public class ThymeleafController {
	private final ProductRepository productRepository;
	
	@Autowired
	public ThymeleafController(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	@RequestMapping("/thymeleaf")
	public String thymeleaf(ModelMap model) {
		model.put("message", "Hello World");
		model.put("title", "Hello Home");
		model.put("date", new Date());
		model.put("balance", new BigDecimal(1.2111111));
		model.put("prods", productRepository.findAll());
		return "thymeleaf/home";
	}
}

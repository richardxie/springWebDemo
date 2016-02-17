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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.slfinance.secure.domain.Product;
import com.slfinance.secure.domain.ProductRepository;
import com.slfinance.secure.domain.ProductVo;

/**
 * 用户控制器
 * 
 * @author kongxiong
 *
 */
@Controller
@Slf4j
public class ProdController {
	private final ProductRepository productRepository;
	
	@Autowired
	public ProdController(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	@RequestMapping(value = "/prod", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public List<Product> get() {
		return productRepository.findAll();
	}
	
	@RequestMapping(value = "/prod/searchProdPagable", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Page<Product> searchPagable(@RequestBody Map<String, String> map) {
		PageRequest pageReq = new PageRequest(Integer.parseInt(map.get("page")), Integer.parseInt(map.get("size")));
		String term = map.get("search");
		if(StringUtils.isEmpty(term))
			return productRepository.findAll(pageReq);
		return 
			productRepository.findByProductNameLike("%"+term+"%", pageReq);
	}
	
	@RequestMapping(value = "/prod/searchProdPagable2", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Page<ProductVo> searchPagable2(@RequestBody Map<String, String> map) {
		PageRequest pageReq = new PageRequest(Integer.parseInt(map.get("page")), Integer.parseInt(map.get("size")));
		String term = map.get("search");
		return productRepository.findByProductNameLike2("%" + (StringUtils.isEmpty(term)?"":term) + "%", pageReq);
	}
	
	@RequestMapping(value = "/prod/{id}", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Product getOne(@PathVariable("id") String id) {
		return productRepository.findOne(id);
	}

	@RequestMapping(value = "/prod/{id}", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Product getOne(@PathVariable("id") String id, @RequestBody Product c) {
		return productRepository.save(c);
	}

	@RequestMapping(value = "/prod", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Product postOne(@RequestBody Product c) {
		log.debug(c.toString());
		return productRepository.save(c);
	}
}

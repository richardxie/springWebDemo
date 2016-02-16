package com.slfinance.secure.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String>{
	Page<Product> findByProductNameLike(String pattern, Pageable pageable);
}

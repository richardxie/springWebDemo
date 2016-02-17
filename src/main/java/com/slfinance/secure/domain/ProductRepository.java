package com.slfinance.secure.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, String>{
	Page<Product> findByProductNameLike(String pattern, Pageable pageable);
	
	@Query("select new com.slfinance.secure.domain.ProductVo(p.id, p.productName, p.productDesc, p.enableStatus, p.typeTerm, p.yearRate, p.productDetail.alreadyInvestPeople) from Product p where p.productName like ?1")
    Page<ProductVo> findByProductNameLike2(String pattern, Pageable pageable);
}

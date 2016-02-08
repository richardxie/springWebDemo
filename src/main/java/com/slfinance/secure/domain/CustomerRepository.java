package com.slfinance.secure.domain;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;

public interface CustomerRepository extends JpaRepository<Customer, String>, CustomerRepositoryCust{

    @Override
    @PostAuthorize("hasRole('ROLE_SUPERVISOR') or returnObject?.email == principal?.email")
    Customer findOne(@Param("id") String id);

    @Override
    @PreAuthorize("hasRole('ROLE_SUPERVISOR')")
    List<Customer> findAll();

    @Override
    @PreAuthorize("hasRole('ROLE_SUPERVISOR')")
    List<Customer> findAll(Sort sort);

    @Override
    @PreAuthorize("hasRole('ROLE_SUPERVISOR')")
    List<Customer> findAll(Iterable<String> ids);

    @Override
    @PreAuthorize("hasRole('ROLE_SUPERVISOR')")
    Page<Customer> findAll(Pageable pageable);

    /**
     * Not exported find all method to access all employees without the need for SUPERVISOR/ADMIN rights.
     *
     * Filters the admin out. Only used for the address book.
     */
    @RestResource(exported = false)
    @Query("select e from Customer e where e.email <> 'admin@techdev.de'")
    Page<Customer> findAllForAddressBook(Pageable pageable);

    @RestResource(exported = false)
    Customer findByEmail(@Param("email") String email);
    
    @RestResource(exported = false)
    Customer findByName(@Param("userName") String name);
    
    Page<Customer> findByNameLike(String pattern, Pageable pageable);
    
    List<Map<String, Object>> searchCust(String pattern);
}

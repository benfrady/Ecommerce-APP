package com.example.lightecomv1.Dao;

import com.example.lightecomv1.entities.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Products, Long> {
    @RestResource(path = "/selectedProducts")
    public List<Products> findBySelectedIsTrue();
    @RestResource(path = "/productsByKeyword")
    public List<Products> findByNameContains(@Param("mc") String mc);
    @RestResource(path = "/promoProducts")
    public List<Products> findByPromotionIsTrue();
    @RestResource(path = "/dispoProducts")
    public List<Products> findByAvailableIsTrue();
}

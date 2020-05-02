package com.example.lightecomv1.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
@Entity
@Data
@NoArgsConstructor
public class Category implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String photo;
    private String description;
    @OneToMany(mappedBy = "category")
    private Collection<Products> products;

    public Category(Long id , String name, String photo, String description, Collection<Products> products) {
        this.id = id;
        this.photo = photo;
        this.name = name;
        this.description = description;
        this.products = products;
    }
}

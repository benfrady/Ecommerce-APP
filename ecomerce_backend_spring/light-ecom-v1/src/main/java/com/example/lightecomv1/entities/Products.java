package com.example.lightecomv1.entities;

import com.example.lightecomv1.entities.Category;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Products implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private double currentPrice;
    private boolean promotion;
    private boolean selected;
    private boolean available;
    private String photoName;
    @ManyToOne
    private Category category;

    public void setName(String name) {
        this.name = name;
    }

    public void setCurrentPrice(int currentPrice) {
        this.currentPrice = currentPrice;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public void setPromotion(boolean promotion) {
        this.promotion = promotion;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setPhotoName(String photoName) {
        this.photoName = photoName;
    }

    public String getPhotoName() {
        return photoName;
    }
}

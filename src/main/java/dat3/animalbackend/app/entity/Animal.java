package dat3.animalbackend.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    double height;
    double weight;
    String country;
    String animalClass;
    String habitat;
    String diet;
    String behaviour;

    public Animal(int id, String name, double height, double weight, String country, String animalClass, String habitat, String diet, String behaviour) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.country = country;
        this.animalClass = animalClass;
        this.habitat = habitat;
        this.diet = diet;
        this.behaviour = behaviour;
    }

    public Animal(String name) {
        this.name=name;
    }
}

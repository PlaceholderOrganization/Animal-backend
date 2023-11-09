package dat3.animalbackend.app.repository;


import dat3.animalbackend.app.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer> {
    @Query("SELECT DISTINCT a.name FROM Animal a")
    List<String> getAllDistinctByName();
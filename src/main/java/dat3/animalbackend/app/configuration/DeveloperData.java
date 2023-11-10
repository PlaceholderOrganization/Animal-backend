package dat3.animalbackend.app.configuration;


import dat3.animalbackend.app.entity.Animal;
import dat3.animalbackend.app.repository.AnimalRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class DeveloperData implements ApplicationRunner {

    AnimalRepository animalRepository;

    public DeveloperData(AnimalRepository animalRepository) {
    this.animalRepository = animalRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<Animal> animals = new ArrayList<>();
        animals.add(new Animal("Delfin"));
        animals.add(new Animal("Næsehorn"));
        animals.add(new Animal("Løve"));
        animals.add(new Animal("Panda"));
        animals.add(new Animal("Kænguru"));
        animalRepository.saveAll(animals);

    }
}

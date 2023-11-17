package dat3.animalbackend.app.api;

import dat3.animalbackend.app.dto.ChatResponse;
import dat3.animalbackend.app.service.AnimalService;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/animal")
@CrossOrigin(origins = "*")
public class AnimalController {

    private AnimalService service;

    public AnimalController(AnimalService service) {
        this.service = service;
    }

    final static String SYSTEM_MESSAGE = "You are to provide 4 short fun facts about animals for kids.  Keep it short and fun" + "Please reply in danish";

    final static String COUNTRY_MESSAGE = "Please answer in danish with animals living in the country given from the user";

    final static String QUIZ_MESSAGE = "You are to provide a short and fun quiz for kids in danish about the following animals list of animals: ";

    @GetMapping
    public ChatResponse getAnswer(@RequestParam String answer) {
        return service.makeRequest(answer, SYSTEM_MESSAGE);
    }


     @GetMapping("/worldMap")
     public ChatResponse getAnimalFromWorldMap(@RequestParam String worldAnimals){
            return service.makeRequest(worldAnimals, COUNTRY_MESSAGE);
     }

    @GetMapping("/quiz")
    public ChatResponse getQuiz() {
        String animals = service.getAnimals();
        return service.makeRequest("quiz",QUIZ_MESSAGE+animals+" and always format your response into a json array like this: question: 'What is the capital of France?', answers: ['Paris', 'London', 'Berlin', 'Rome'], correct: 'Paris'. Limit your response to 2 questions");
    }
}
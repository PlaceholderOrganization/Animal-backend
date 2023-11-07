package dat3.animalbackend.app.api;


import dat3.animalbackend.app.dto.ChatResponse;
import dat3.animalbackend.app.service.AnimalService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AnimalController {

    private AnimalService service;

    public AnimalController(AnimalService service) {
        this.service = service;
    }

    final static String SYSTEM_MESSAGE = "Please answer with information on a animal given from the user";

    @GetMapping
    public ChatResponse getAnswer(@RequestParam String answer){
        return service.makeRequest(answer, SYSTEM_MESSAGE);
    }
}
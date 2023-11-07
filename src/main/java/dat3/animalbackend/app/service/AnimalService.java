package dat3.animalbackend.app.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import dat3.animalbackend.app.dto.AnimalRequest;
import dat3.animalbackend.app.dto.AnimalResponse;
import dat3.animalbackend.app.dto.ChatResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;

@Service
public class AnimalService {
    public static final Logger logger = LoggerFactory.getLogger(AnimalService.class);

    @Value("${API_KEY}")
    private String API_KEY;

    public final static String URL = "https://api.openai.com/v1/chat/completions";
    public final static String MODEL = "gpt-3.5-turbo";
    public final static double TEMPERATURE = 0.8;
    public final static int MAX_TOKEN = 300;
    public final static double FREQUENCY_PENALTY = 0.0;
    public final static double PRESENCE_PENALTY = 0.0;
    public final static double TOP_P = 1.0;

    private WebClient client;

    public AnimalService() {
        this.client = WebClient.create();
    }
    public AnimalService(WebClient client) {

        this.client = client;
    }

    public ChatResponse makeRequest(String userRequest, String systemReturnMessage){
        AnimalRequest request = new AnimalRequest();
        request.setModel(MODEL);
        request.setTemperature(TEMPERATURE);
        request.setMax_tokens(MAX_TOKEN);
        request.setTop_p(TOP_P);
        request.setFrequency_penalty(FREQUENCY_PENALTY);
        request.setPresence_penalty(PRESENCE_PENALTY);

        request.getMessages().add(new AnimalRequest.Message("system", systemReturnMessage));
        request.getMessages().add(new AnimalRequest.Message("user", userRequest));

        ObjectMapper mapper = new ObjectMapper();
        String json = "";
        String err = null;
        try {
            json = mapper.writeValueAsString(request);
            System.out.println(json);
            AnimalResponse response = client.post()
                    .uri(new URI(URL))
                    .header("Authorization", "Bearer " + API_KEY)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(json))
                    .retrieve()
                    .bodyToMono(AnimalResponse.class)
                    .block();
            String responseMessage = response.getChoices().get(0).getMessage().getContent();

//
            int tokensUsed = response.getUsage().getTotal_tokens();
            System.out.print("Tokens used: " + tokensUsed);
            System.out.print(". Cost ($0.0015 / 1K tokens) : $" + String.format("%6f",(tokensUsed * 0.0015 / 1000)));
            System.out.println(". For 1$, this is the amount of similar requests you can make: " + Math.round(1/(tokensUsed * 0.0015 / 1000)));

//            returnerer svaret på en brugers forspørgsel.
            return new ChatResponse(responseMessage);



//          fejlhåndtering:
        } catch (WebClientResponseException e) {
            //This is how you can get the status code and message reported back by the remote API
            logger.error("Error response status code: " + e.getRawStatusCode());
            logger.error("Error response body: " + e.getResponseBodyAsString());
            logger.error("WebClientResponseException", e);
            err = "Internal Server Error, due to a failed request to external service. You could try again" +
                    "( While you develop, make sure to consult the detailed error message on your backend)";
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, err);
        } catch (Exception e) {
            logger.error("Exception", e);
            err = "Internal Server Error - You could try again" +
                    "( While you develop, make sure to consult the detailed error message on your backend)";
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }

}

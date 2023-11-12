package dat3.animalbackend.app.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponse {

    private String member_name;
    private String member_password;
    private String message;


    public MemberResponse(Object o, String message) {
    }
}

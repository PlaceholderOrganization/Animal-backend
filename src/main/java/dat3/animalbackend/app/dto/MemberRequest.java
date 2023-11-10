package dat3.animalbackend.app.dto;

import dat3.animalbackend.app.entity.Member;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRequest {


    private String member_name;
    private String member_password;
    private String member_email;

    public Member toMember() {
        return Member.builder()
                .name(this.member_name)
                .password(this.member_password)
                .email(this.member_email)
                .build();
    }


}

package dat3.animalbackend.app.entity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="member")

public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private int member_Id;

    @Column(name = "member_name") // Specify the column name for name
    private String name;

    @Column(name = "member_password") // Specify the column name for name
    private String password;

    @Column(name = "member_email") // Specify the column name for email
    private String email;

}

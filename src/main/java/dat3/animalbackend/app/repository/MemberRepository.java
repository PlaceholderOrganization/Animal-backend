package dat3.animalbackend.app.repository;

import dat3.animalbackend.app.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByNameAndPassword(String memberName, String memberPassword);
}




















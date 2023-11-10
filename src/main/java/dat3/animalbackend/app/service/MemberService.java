package dat3.animalbackend.app.service;

import dat3.animalbackend.app.dto.MemberRequest;
import dat3.animalbackend.app.dto.MemberResponse;
import dat3.animalbackend.app.entity.Member;
import dat3.animalbackend.app.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;

@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    public Member addMember(MemberRequest memberRequest) {
        Member member = memberRequest.toMember();
        return memberRepository.save(member);
    }


    public MemberResponse loginMember(MemberRequest memberRequest) throws AuthenticationException {
        Member foundMember = memberRepository.findByNameAndPassword(
                memberRequest.getMember_name(),
                memberRequest.getMember_password()
        );

        if (foundMember != null) {
            MemberResponse response = new MemberResponse();
            response.setMember_name(foundMember.getName());
            // You may include other relevant information in the response
            response.setMessage("Login successful!");
            return response;
        }

        throw new AuthenticationException("Invalid credentials");
    }

}

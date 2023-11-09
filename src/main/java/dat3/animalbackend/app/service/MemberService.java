package dat3.animalbackend.app.service;

import dat3.animalbackend.app.dto.MemberRequest;
import dat3.animalbackend.app.entity.Member;
import dat3.animalbackend.app.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    public Member addMember(MemberRequest memberRequest) {
        Member member = memberRequest.toMember();
        return memberRepository.save(member);
    }



}

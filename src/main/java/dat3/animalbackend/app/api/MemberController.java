package dat3.animalbackend.app.api;


import dat3.animalbackend.app.dto.MemberRequest;
import dat3.animalbackend.app.entity.Member;
import dat3.animalbackend.app.service.MemberService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/members")

public class MemberController {
private final MemberService memberService;

public MemberController(MemberService memberService){
    this.memberService = memberService;
}

    @PostMapping("/register")
    public Member registerMember(@RequestBody MemberRequest memberRequest){
        Member member = memberService.addMember(memberRequest);
        return member;
    }



}

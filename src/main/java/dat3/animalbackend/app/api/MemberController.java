package dat3.animalbackend.app.api;


import dat3.animalbackend.app.dto.MemberRequest;
import dat3.animalbackend.app.dto.MemberResponse;
import dat3.animalbackend.app.entity.Member;
import dat3.animalbackend.app.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@CrossOrigin
@RestController
@RequestMapping("/api/members")

public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/register")
    public Member registerMember(@RequestBody MemberRequest memberRequest) {
        Member member = memberService.addMember(memberRequest);
        return member;
    }

    @PostMapping("/login")
    public ResponseEntity<MemberResponse> loginMember(@RequestBody MemberRequest memberRequest) {
        try {
            MemberResponse response = memberService.loginMember(memberRequest);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (AuthenticationException e) {
            // Handle the authentication exception and return an error response
            MemberResponse errorResponse = new MemberResponse(null, e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }










}
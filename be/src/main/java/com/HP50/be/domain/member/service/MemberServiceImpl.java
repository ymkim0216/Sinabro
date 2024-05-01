package com.HP50.be.domain.member.service;

import com.HP50.be.domain.member.dto.SearchMemberResponseDto;
import com.HP50.be.domain.member.dto.SearchMemberSimpleInfoDto;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberCustomRepository memberCustomRepository;
    @Override
    public SearchMemberResponseDto searchMember(String keyword, int page) {
        //pageable 객체 생성
        PageRequest pageRequest = PageRequest.of(page, 20);
        Slice<Member> members = memberCustomRepository.searchMember(keyword, pageRequest);
        List<SearchMemberSimpleInfoDto> result = members.stream()
                .map(member -> new SearchMemberSimpleInfoDto(
                        member.getMemberId(),
                        member.getMemberName(),
                        member.getMemberImg()
                ))
                .toList();
        Boolean hasNext = members.hasNext();
        Integer number = members.getNumber();
        return SearchMemberResponseDto.builder()
                .searchList(result)
                .hasNext(hasNext)
                .page(number)
                .build();
    }
}
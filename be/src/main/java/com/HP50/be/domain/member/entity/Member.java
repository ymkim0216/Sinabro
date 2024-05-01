package com.HP50.be.domain.member.entity;


import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member extends BaseTimeEntity {
    @Id
    private Integer memberId;

    @Column(nullable = false)
    private String memberName;

    @Column(nullable = false)
    private String memberEmail;

    @Column(nullable = false)
    private String memberGit;

    @Column
    private String memberImg;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
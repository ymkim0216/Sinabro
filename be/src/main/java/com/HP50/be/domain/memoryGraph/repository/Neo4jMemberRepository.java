package com.HP50.be.domain.memoryGraph.repository;

import com.HP50.be.domain.memoryGraph.entity.Neo4jMember;
import org.springframework.data.neo4j.repository.ReactiveNeo4jRepository;

public interface Neo4jMemberRepository extends ReactiveNeo4jRepository<Neo4jMember, String> {

}
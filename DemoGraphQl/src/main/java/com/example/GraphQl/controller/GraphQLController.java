package com.example.GraphQl.controller;

import com.example.GraphQl.model.GraphQlRequestBody;

import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.Map;

@RestController
public class GraphQLController {
    @Autowired
    private GraphQL graphql;

    @PostMapping(value="graphql", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Map<String,Object>> execute(@RequestBody GraphQlRequestBody body) {
        Map<String, Object> variables = body.getVariables();
        if (variables == null) {
            variables = Collections.emptyMap();
        }
        return Mono.fromCompletionStage(graphql.executeAsync(ExecutionInput.newExecutionInput().query(body.getQuery())
                        .operationName(body.getOperationname()).variables(variables).build()))
                .map(ExecutionResult::toSpecification);
    }
}

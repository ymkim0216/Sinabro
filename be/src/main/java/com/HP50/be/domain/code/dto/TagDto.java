package com.HP50.be.domain.code.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Setter;

@Data
@Builder
public class TagDto {
    @Schema(example = "React")
    private String subCategoryName;
}

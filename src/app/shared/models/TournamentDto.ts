/**
 * WuzlHub API
 * A simple api
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export class TournamentDto {
    id?: number;

    tournament?: models.Tournament;

    matchesInTournament?: Array<models.MatchDto> = [];

}

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

export class Match {
    id?: number;

    tournamentId?: number;

    team1Id?: number;

    team2Id?: number;

    startDateTime?: Date;

    hasEnded?: boolean;

    goalsTeam1?: number;

    goalsTeam2?: number;

}

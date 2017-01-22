import { Router } from '@angular/router';
import { FormArray } from '@angular/forms/src/model';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Player, Tournament, PlayerDto, TournamentDto } from '../shared/models/models';
import { PlayerService } from '../shared/services/player.service';
import { NotificationsService } from 'angular2-notifications';
import { TournamentService } from '../shared/services/tournament.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.css']
})
export class TournamentFormComponent implements OnInit {

  form: FormGroup;

  private numberOfMatches : number = 0;
  private players : PlayerDto[] = [];
  private loaded : boolean = false;

  private selectedPlayers : boolean[] = [];

  private model : Tournament = new Tournament;

  constructor(private tournamentService : TournamentService,
              private playerService : PlayerService,
              private router : Router,
              private notificationService : NotificationsService,
              ) { }

  ngOnInit() {
    /*this.form = this.fb.group({
      name: [''],
      date: ['', Validators.required],
      countdown: [''],
      numberOfMatches: ['', Validators.required],
      selectedPlayers: this.fb.array([]) // push in players
    });*/

    // this.model.date = new Date();
    this.playerService.getAllPlayers()
      .subscribe(
        res => this.players = res,
        error => this.notificationService.error("Error", error),
        () => {
          this.players.forEach(p => {
            this.selectedPlayers[p.player.userName] = false;
          });

          this.loaded = true;
        }
      )
  }

  /*initPlayerGroup(playerName: string) {
    return this.fb.group({
      playerName:['']
    });
  }

  addPlayerToForm(player : Player) {
    const control = <FormArray>this.form.controls['selectedPlayers'];
    control.push(this.initPlayerGroup(player.userName));
  }*/
  createTournament(){
    //1. create tournament
    let tournament : TournamentDto;

    // get players
    let players : number[] = [];
    this.selectedPlayers.forEach((isSelected, id)=>{
      if(isSelected == true) {
        players.push(id);
      }
    });

    this.tournamentService.createTournament(this.model)
      .subscribe(
        res => {
          tournament = res;
          this.notificationService.success("Success", "Tournament created!");
        },
        error => this.notificationService.error("Error", error),
        () => {
          //2. add players to tournament
          this.tournamentService.addPlayers(tournament.id, players)
            .subscribe(
              res => this.notificationService.success("Success", "Players added to tournament!"),
              error => this.notificationService.error("Error", error),
              () => {
                //3. create matches in tournament
                this.tournamentService.createMatches(tournament.id, this.numberOfMatches)
                  .subscribe(
                    res => this.notificationService.success("Success", "Matches created in tournament!"),
                    error => this.notificationService.error("Error", error),
                    () => {
                      // done

                      this.router.navigate(['/tournaments']);
                    }
                  );
              }
          );
        }
    );
  }

}

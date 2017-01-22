import { ANY_STATE } from '@angular/compiler/src/private_import_core';
import { PlayerDto } from '../shared/models/models';
import { NotificationsService } from 'angular2-notifications';
import { PlayerService } from '../shared/services/player.service';
import { Component, OnInit } from '@angular/core';
import { CurrentStrength } from '../shared/models/CurrentStrength';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  private allHistories : Map<number, CurrentStrength[]> = new Map;
  private players : PlayerDto[] = [];
  private loaded : boolean = false;
  private privateHistory : CurrentStrength[] = [];
  options : Object;
  chart : any;

  constructor(private playerService : PlayerService, private notificationService : NotificationsService) {
    this.options = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart : {
        backgroundColor : '#000000',
        zoomType: 'x',
        pinchType: 'x'
      },
      title: {
        text: "Rank history",
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
        }
      },
      subtitle:{
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
        }
      },
      xAxis: {
        title:{
          text: 'Date',
          style: {
            color: '#A0A0A3'
          }
        },
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%e. %b, %Y'
        },
        gridLineColor: '#707073',
        labels: {
          style: {
              color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073'
      },
      yAxis: {
          gridLineColor: '#707073',
          labels: {
            style: {
                color: '#E0E0E3'
            }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
            text: "Strength",
            style: {
                color: '#A0A0A3'
            }
          }
      },
      tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
            color: '#F0F0F0'
          }
      },
      plotOptions: {
          series: {
            dataLabels: {
                color: '#B0B0B3'
            },
            marker: {
                lineColor: '#333'
            }
          },
          boxplot: {
            fillColor: '#505053'
          },
          candlestick: {
            lineColor: 'white'
          },
          errorbar: {
            color: 'white'
          }
      },
      legend: {
          itemStyle: {
            color: '#E0E0E3'
          },
          itemHoverStyle: {
            color: '#FFF'
          },
          itemHiddenStyle: {
            color: '#606063'
          }
      },
      series: []
    };
  }

  ngOnInit() {
    this.playerService.getAllPlayers()
      .subscribe(
        res => {
          this.players = res;
        },
        error => this.notificationService.error("Error", "Players cannot be fetched."),
        () => {
          this.players.forEach(p => {
            this.getHistoryOfPlayer(p);
          });
        }
      )
  }


  saveChart(chart) {
    this.chart = chart;
  }
  getHistoryOfPlayer(dto: PlayerDto) {
    this.playerService.getStrengthHistory(dto.id)
      .subscribe(
        res => {
          this.allHistories[dto.id] = res;
        },
        error => this.notificationService.error("Error", "Player has no history!"),
        () => {
          this.loaded = true;

          let data = [];

          this.allHistories[dto.id].forEach(cs =>{
            let date = new Date(cs.currentDateTime);
            let dataset  = [Date.UTC(date.getUTCFullYear(), 
                            date.getUTCMonth(), 
                            date.getUTCDate(), 
                            date.getUTCHours(), 
                            date.getUTCMinutes(), 
                            date.getUTCSeconds(), 
                            date.getUTCMilliseconds()), 
                            cs.strength];
            data.push(dataset);
          });

          this.chart.addSeries({
              name: dto.player.userName,
              data: data,
              allowPointSelect: true
          });
          
        }
      )
  }
}

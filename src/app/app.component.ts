import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pomodoro = {
    config: {
      timeIsSeconds: 25 * 60,
      shortBreakInSeconds: 5 * 60,
      longBreakInSeconds: 15 * 60,
      longBreakInterval: 4,
    },
    timeInSeconds: 25 * 60,
    isBreak: false,
    breakInterval: 1,
    started: false,
    running: false,
    label: '',
  }

  timerInterval: any;

  public OnStart(): void {
    this.preparePomodoro()
    this.startTimer()
  }

  public OnContinue(): void {
    this.startTimer()
  }

  public OnStop(): void {
    clearInterval(this.timerInterval)
    this.pomodoro.running = false
  }

  OnNext(): void {
    this.pomodoro.isBreak = !this.pomodoro.isBreak
    this.preparePomodoro()
  }

  private startTimer(): void {
    clearInterval(this.timerInterval)
    this.pomodoro.running = true
    this.pomodoro.started = true
    this.timerInterval = setInterval(() => {
      this.pomodoro.timeInSeconds--

      if (this.pomodoro.timeInSeconds <= 0) {
        this.pomodoro.isBreak = !this.pomodoro.isBreak
      }
    }, 1000);
  }

  public preparePomodoro(): void {
    if (this.pomodoro.isBreak) {
      if (this.pomodoro.breakInterval <= this.pomodoro.config.longBreakInterval) {
        this.pomodoro.label = 'Short Break #' + this.pomodoro.breakInterval
        this.pomodoro.timeInSeconds = this.pomodoro.config.shortBreakInSeconds
        this.pomodoro.breakInterval++
      } else {
        this.pomodoro.label = 'Long Break'
        this.pomodoro.timeInSeconds = this.pomodoro.config.longBreakInSeconds
        this.pomodoro.breakInterval = 1
      }
    } else {
      this.pomodoro.label = 'Pomodoro'
      this.pomodoro.timeInSeconds = this.pomodoro.config.timeIsSeconds
    }
  }

}

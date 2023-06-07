import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return 'Server started!';
  }

  @Get('dates/:date')
  getArrayOfDates(@Param('date') date:string): Date[] {
    const today = new Date(date)
     const year = today.getFullYear()
        const month = today.getMonth()
        const countDays = 34 - new Date(year, month, 33).getDate()
        let datesList = []
        for (let i = 2; i <= countDays; i++) {
          datesList.push(new Date(year, month, i)) 
        }
        return datesList
  }

  @Get('weekdates')
  getCurrentWeekDates(): Date[] {
    const today = new Date()
    const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1)
    const dates = []

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday)
        date.setDate(monday.getDate() + i)
        dates.push(new Date(date))
    }

    return dates
} 

}

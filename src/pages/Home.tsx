import React from "react"
import "react-dropdown/style.css"
import "react-notifications-component/dist/theme.css"
import { useDispatch, useSelector } from "react-redux"
import '../../node_modules/react-vis/dist/style.css'
import * as Chart from 'react-vis'

import { ContentWrapper, Button } from "../components/styledcomponents"
import { getPrevRecordsDaySelector, getRecordsDaySelector, getRecordsSelector } from "shared/selectors/selectors"
import { getPrevRecords, getRecords } from "shared/actions/api.actions"


type Records = Record<number, Array<Record<number, number>>>

export default function Home() {
  const dispatch = useDispatch()

  const [selectedDay, setSelectedDay] = React.useState<number>(new Date().getDay())

  const startDate:number = 1635931800601
  const endDate:number = 21635943200822

  const now = new Date()

  const todayMidnight = new Date().setHours(0,0,0)
  
  const changeDay = (date: Date, days: number) => {
    date.setDate(date.getDate()+days)
    date.setHours(0,0,0)
  }

  const nextWeek = new Date()
  changeDay(nextWeek, 7)

  const prevWeek = new Date()
  changeDay(prevWeek, -7)

  const numWeekDay = now.getDay()

  const weekDays = [
    {value: 0, label: "Sunntig"},
    {value: 1, label: "Mäntig"},
    {value: 2, label: "Zistig"},
    {value: 3, label: "Mittwuch"},
    {value: 4, label: "Dunstig"},
    {value: 5, label: "Fritig"},
    {value: 6, label: "Samstig"},
  ]



  const records = useSelector(getRecordsDaySelector)
  const prevRecords = useSelector(getPrevRecordsDaySelector)


  React.useEffect(() => {
    dispatch(getRecords.call({query: {startDate: Number(todayMidnight), endDate: Number(now)}}))
    dispatch(getPrevRecords.call({query: {startDate: Number(prevWeek), endDate: Number(todayMidnight)}}))
  }, [])



  if (records === undefined) {
    return <div>
      Loading
    </div>
  }

  // const totalData = 
  const dayData = records[selectedDay]
  const prevDayData = prevRecords[selectedDay]


  console.log(dayData)
  console.log(prevDayData)



  return <div style = {{padding: 80, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    {console.log(records)}
    {console.log(prevRecords)}
    <div style = {{display: 'flex'}}>
      {weekDays.map(day => selectedDay === day.value ? (<Button onClick =  {() => setSelectedDay(day.value)} style = {{margin: 16, backgroundColor: 'white'}}>{day.label} </Button>) : (<Button onClick =  {() => setSelectedDay(day.value)} style = {{margin: 16}}>{day.label} </Button>)
      )}
    </div>
    <Chart.XYPlot height={300} width={1200} style = {{display: 'flex', margin: 48}}>
      <Chart.VerticalGridLines />
      <Chart.HorizontalGridLines />
      <Chart.XAxis style={{fontSize: 24}} tickFormat={(v) => `${new Date(v).getHours()}`} />
      <Chart.YAxis style={{fontSize: 24}}/>
      <Chart.VerticalBarSeries barWidth={0.5} data={dayData.recs.map(d => ({x: d.timestamp, y: d.count}))} xType={'time-utc'}/>
      <Chart.VerticalBarSeries barWidth={0.4} data={prevDayData.recs.map(d => ({x: d.timestamp, y: d.count}))} xType={'time-utc'}/>
    </Chart.XYPlot>
  </div>
}

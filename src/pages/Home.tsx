import React from "react"
import "react-dropdown/style.css"
import "react-notifications-component/dist/theme.css"
import { useDispatch, useSelector } from "react-redux"
import '../../node_modules/react-vis/dist/style.css'
import * as Chart from 'react-vis'

import { ContentWrapper } from "../components/styledcomponents"
import { getRecordsSelector } from "shared/selectors/selectors"
import { getPrevRecords, getRecords } from "shared/actions/api.actions"
import { createGlobalStyle } from "styled-components"

export default function Home() {
  const dispatch = useDispatch()

  const startDate:number = 1635931800601
  const endDate:number = 21635943200822

  const now = new Date()

  const today = new Date().setHours(0,0,0)
  
  const changeDay = (date: Date, days: number) => {
    date.setDate(date.getDate()+days)
    date.setHours(0,0,0)
  }

  const nextWeek = new Date()
  changeDay(nextWeek, 7)

  const prevWeek = new Date()
  changeDay(prevWeek, -7)


  const records = useSelector(getRecordsSelector)

  let cleanRecords:Array<{x:number, y:number}> = []

  React.useEffect(() => {
    dispatch(getRecords.call({query: {startDate: Number(today), endDate: Number(nextWeek)}}))
    dispatch(getPrevRecords.call({query: {startDate: Number(prevWeek), endDate: Number(today)}}))
  }, [])

  const prepData = () => {
    if (records !== undefined) {
      cleanRecords = records.map(
        record => {
          const date = new Date(record.timestamp)
          return { x: record.timestamp, y: record.count}
        }
      )
    }
  }

  prepData()

  if (records === undefined) {
    return <div>
      Loading
    </div>
  }
  return <div style = {{padding: 80}}>
    <Chart.XYPlot height={300} width={600}>
      <Chart.VerticalGridLines />
      <Chart.HorizontalGridLines />
      <Chart.XAxis style={{fontSize: 24}} tickFormat={(v) => `${new Date(v).getHours()}`} />
      <Chart.YAxis style={{fontSize: 24}}/>
      <Chart.VerticalBarSeries barWidth={0.5} data={cleanRecords} xType={'time-utc'}/>
    </Chart.XYPlot>
  </div>
}

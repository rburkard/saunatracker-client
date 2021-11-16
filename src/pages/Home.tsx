import React from 'react'
import 'react-dropdown/style.css'
import 'react-notifications-component/dist/theme.css'
import { useDispatch, useSelector } from 'react-redux'
import '../../node_modules/react-vis/dist/style.css'
import * as Chart from 'react-vis'
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  subMinutes,
} from 'date-fns'

import {
  BlobCircle,
  Button,
  ButtonWrapper,
  ChartWrapper,
  HomeWrapper,
  Stats,
  StatsEntry,
  WrapperDynamic,
} from '../components/styledcomponents'
import { getDataSelector } from 'shared/selectors/selectors'
import { getRecords } from 'shared/actions/api.actions'
import { useIsMobile } from 'components/Scaffold'
import useWindowDimensions from 'components/responsive'

export default function Home() {
  const dispatch = useDispatch()
  const isMobile = useIsMobile()

  const { width, height } = useWindowDimensions()

  const weekDays = [
    { value: 0, label: 'Sunntig' },
    { value: 1, label: 'Mäntig' },
    { value: 2, label: 'Zistig' },
    { value: 3, label: 'Mittwuch' },
    { value: 4, label: 'Dunstig' },
    { value: 5, label: 'Fritig' },
    { value: 6, label: 'Samstig' },
  ]

  const sortedWeekDays = weekDays
    .slice(new Date().getDay())
    .concat(weekDays.slice(0, new Date().getDay()))

  const weekDaysMobile = [
    { value: 0, label: 'So' },
    { value: 1, label: 'Mo' },
    { value: 2, label: 'Di' },
    { value: 3, label: 'Mi' },
    { value: 4, label: 'Do' },
    { value: 5, label: 'Fr' },
    { value: 6, label: 'Sa' },
  ]

  const sortedWeekDaysMobile = weekDaysMobile
    .slice(new Date().getDay())
    .concat(weekDaysMobile.slice(0, new Date().getDay()))

  // Define states and redux
  const [selectedDay, setSelectedDay] = React.useState<number>(
    new Date().getDay(),
  )
  const [currentWaterTemperature, setCurrentWaterTemperature] =
    React.useState<number>()

  const allData = useSelector(getDataSelector)

  const now = new Date().getTime()

  React.useEffect(() => {
    dispatch(
      getRecords.call({
        query: { startDate: now - 1000 * 60 * 60 * 24 * 7, endDate: now },
      }),
    )
  }, [])

  const fetchWeather = async () => {
    try {
      const date = format(subMinutes(new Date(), 50), 'yyyy-MM-dd')
      const x = await fetch(
        `https://tecdottir.herokuapp.com/measurements/tiefenbrunnen?startDate=${date}&endDate=${date}`,
        {
          method: 'GET',
        },
      )
      const json = await x.json()

      const searchStr = new Date().toISOString().slice(0, 15)

      const currentTime = json.result.find((obj: any) =>
        obj.timestamp.startsWith(searchStr),
      )

      const waterTemperature: number =
        currentTime.values.water_temperature.value

      setCurrentWaterTemperature(waterTemperature)
    } catch (error) {
      console.log(error)
    }
  }

  fetchWeather()

  const todaysData = allData[selectedDay]

  // console.log(todaysData)
  const arraySpots = allData[selectedDay].recs
  const objectSpots = arraySpots[arraySpots.length - 1]
  console.log('allData, ', allData)
  console.log('objectSpots, ', objectSpots)

  const timestampToMinute = (timestamp: number) =>
    new Date(timestamp).getHours() * 3600 +
    new Date(timestamp).getMinutes() * 60

  const formatSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    return `${hours} Uhr`
  }

  if (allData === undefined || objectSpots === undefined) {
    return <div>Loading</div>
  }

  return isMobile ? (
    <HomeWrapper>
      <Stats>
        <StatsEntry>
          <h2>Temperatur Zürisee</h2>
          {currentWaterTemperature === undefined ? (
            <h2 style={{ opacity: 0.4 }}>...</h2>
          ) : (
            <h2>{currentWaterTemperature}</h2>
          )}
        </StatsEntry>
        <StatsEntry>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2>Freii Plätz</h2>
            <BlobCircle />
          </div>
          {new Date().getHours() < 10 ? (
            <h2 style={{ opacity: 0.4 }}>Öffned am 10ni</h2>
          ) : (
            <h2>{objectSpots.count}</h2>
          )}
        </StatsEntry>
      </Stats>
      <WrapperDynamic>
        <ButtonWrapper>
          {sortedWeekDaysMobile.map((day) =>
            selectedDay === day.value ? (
              <Button
                onClick={() => setSelectedDay(day.value)}
                style={{ backgroundColor: 'white' }}
              >
                {day.label} <BlobCircle />
              </Button>
            ) : (
              <Button onClick={() => setSelectedDay(day.value)}>
                {day.label}{' '}
              </Button>
            ),
          )}
        </ButtonWrapper>
        <ChartWrapper style={{ width: width - 30 }}>
          <Chart.XYPlot height={300} width={600} style={{ display: 'flex' }}>
            <Chart.VerticalGridLines />
            <Chart.HorizontalGridLines />
            <Chart.XAxis
              tickTotal={13}
              style={{ fontSize: 18 }}
              tickFormat={(v) => formatSeconds(v)}
            />
            <Chart.YAxis style={{ fontSize: 18 }} />
            <Chart.VerticalBarSeries
              colorType="literal"
              barWidth={0.4}
              data={todaysData.recs.map((d) => ({
                x: timestampToMinute(d.timestamp),
                y: d.count,
                color:
                  new Date().getDay() === selectedDay &&
                  timestampToMinute(d.timestamp) <
                    timestampToMinute(new Date().getTime())
                    ? 'darkblue'
                    : 'lightblue',
              }))}
              xType={'time-utc'}
            />
          </Chart.XYPlot>
        </ChartWrapper>
      </WrapperDynamic>
    </HomeWrapper>
  ) : (
    <HomeWrapper>
      <Stats>
        <StatsEntry>
          <h2>Temperatur Zürisee</h2>
          {currentWaterTemperature === undefined ? (
            <h2 style={{ opacity: 0.4 }}>...</h2>
          ) : (
            <h2>{currentWaterTemperature}</h2>
          )}
        </StatsEntry>
        <StatsEntry>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2>Freii Plätz</h2>
            <BlobCircle />
          </div>
          {new Date().getHours() < 10 ? (
            <h2 style={{ opacity: 0.4 }}>Öffned am 10ni</h2>
          ) : (
            <h2>{objectSpots.count}</h2>
          )}
        </StatsEntry>
      </Stats>
      <WrapperDynamic>
        <ButtonWrapper>
          {sortedWeekDays.map((day) => {
            if (
              selectedDay === day.value &&
              selectedDay === new Date().getDay()
            ) {
              return (
                <Button
                  onClick={() => setSelectedDay(day.value)}
                  style={{ backgroundColor: 'white' }}
                >
                  {day.label}
                  <BlobCircle />
                </Button>
              )
            } else if (selectedDay === day.value) {
              return (
                <Button
                  onClick={() => setSelectedDay(day.value)}
                  style={{ backgroundColor: 'white' }}
                >
                  {day.label}
                </Button>
              )
            } else {
              return (
                <Button onClick={() => setSelectedDay(day.value)}>
                  {day.label}
                </Button>
              )
            }
          })}
        </ButtonWrapper>
        <Chart.XYPlot height={500} width={1200} style={{ display: 'flex' }}>
          <Chart.VerticalGridLines />
          <Chart.HorizontalGridLines />
          <Chart.XAxis
            tickTotal={13}
            style={{ fontSize: 20 }}
            tickFormat={(v) => formatSeconds(v)}
          />
          <Chart.YAxis style={{ fontSize: 20 }} />
          <Chart.VerticalBarSeries
            colorType="literal"
            barWidth={0.4}
            data={todaysData.recs.map((d) => ({
              x: timestampToMinute(d.timestamp),
              y: d.count,
              color:
                new Date().getDay() === selectedDay &&
                timestampToMinute(d.timestamp) <
                  timestampToMinute(new Date().getTime())
                  ? 'darkblue'
                  : 'lightblue',
            }))}
            xType={'time-utc'}
          />
        </Chart.XYPlot>
      </WrapperDynamic>
    </HomeWrapper>
  )
}

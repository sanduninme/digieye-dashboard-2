import React, { useState, useEffect } from 'react'
import { format as dateFormat } from 'date-fns'
import { func, number, object, string } from 'prop-types'

function Clock(props) {
  const { format = 'h:mm:ss a, MMMM do yyyy', interval = 1000, className, style } = props
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
    }, interval)

    return () => clearInterval(tick)
  }, [])

  return (
    <span className={className} style={style}>
      {dateFormat(currentTime, format)}
    </span>
  )
}

Clock.propTypes = {
  className: string,
  format: string,
  filter: func,
  style: object,
  interval: number,
}

export default Clock

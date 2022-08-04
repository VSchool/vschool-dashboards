import React from 'react'

export default function SetTimeFrame(props) {
  return (
    <div className="flex">
        <button className="text-blue-600 p-4" onClick={() => props.setTimeFrame('all')}>All</button>
        <button className="text-blue-600 p-4" onClick={() => props.setTimeFrame('week')}>Week</button>
        <button className="text-blue-600 p-4" onClick={() => props.setTimeFrame(1)}>1 Month</button>
        <button className="text-blue-600 p-4" onClick={() => props.setTimeFrame(3)}>3 Month</button>
        <button className="text-blue-600 p-4" onClick={() => props.setTimeFrame(6)}>6 Month</button>
        <button className="text-blue-600 p-4" onClick={() => props.setTimeFrame(12)}>Year</button>
    </div>
  )
}

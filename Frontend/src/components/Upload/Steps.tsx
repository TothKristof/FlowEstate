import React from 'react'
import type { Step } from '../../utils/types/Step'

interface StepsProps{
    steps: Step[],
    actualStep: number
}

function Steps({steps, actualStep}: StepsProps) {
  return (
    <ul className="steps mx-auto steps-vertical md:steps-horizontal">
    {steps.map((s, index) => (
      <li
        key={index}
        className={`step ${actualStep > index ? "step-success" : ""}`}
      >
        {s.label}
      </li>
    ))}
  </ul>
  )
}

export default Steps
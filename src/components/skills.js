import { ResponsiveBar } from "@nivo/bar"
import React, { useState, useEffect } from "react"

const Skills = () => {
  let [skills, setSkills] = useState([])
  let [height, setHeight] = useState({})

  useEffect(() => {
    const loadSkills = async () => {
      let results = await fetch("http://localhost:5050/skills")
        .then((resp) => resp.json())
        .then((data) => data.reverse())
      setSkills(results)
      console.log(results)
      setHeight({ height: results.length * 20 })
    }

    loadSkills()
  }, [])

  return (
    <div style={height}>
      <ResponsiveBar
        data={skills}
        keys={["count"]}
        indexBy="skill"
        colorBy="indexValue"
        margin={{ top: 50, right: 130, bottom: 50, left: 250 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        layout={"horizontal"}
        animate={true}
      />
    </div>
  )
}

export default Skills

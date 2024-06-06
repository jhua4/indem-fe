import { ResponsiveBar } from "@nivo/bar";
import React, { useState, useEffect } from "react";

const Skills = () => {
  //   let data = [];
  //   fetch("http://localhost:5050/skills").then((response) => {
  //     data = response;
  //     console.log(response);
  //   });

  let [skills, setSkills] = useState([]);
  let [height, setHeight] = useState({});

  useEffect(() => {
    const loadSkills = async () => {
      let results = await fetch("http://localhost:5050/skills")
        .then((resp) => resp.json())
        .then((data) => data.reverse());
      setSkills(results);
      console.log(results);
      setHeight({ height: results.length * 20 });
    };

    loadSkills();
  }, []);
  //   const data = [
  //     {
  //       country: "AD",
  //       burger: 108,
  //       //   burgerColor: "hsl(311, 70%, 50%)",
  //     },
  //     {
  //       country: "AE",
  //       burger: 118,
  //       //   burgerColor: "hsl(175, 70%, 50%)",
  //     },
  //     {
  //       country: "AF",
  //       burger: 101,
  //       //   burgerColor: "hsl(133, 70%, 50%)",
  //     },
  //     {
  //       country: "AG",
  //       burger: 171,
  //       //   burgerColor: "hsl(34, 70%, 50%)",
  //     },
  //     {
  //       country: "AI",
  //       burger: 53,
  //       //   burgerColor: "hsl(5, 70%, 50%)",
  //     },
  //     {
  //       country: "AL",
  //       burger: 187,
  //       //   burgerColor: "hsl(35, 70%, 50%)",
  //     },
  //     {
  //       country: "AM",
  //       burger: 44,
  //       //   burgerColor: "hsl(225, 70%, 50%)",
  //     },
  //   ];

  return (
    <div style={height}>
      <ResponsiveBar
        data={skills}
        keys={["count"]}
        indexBy="skill"
        colorBy="indexValue"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        // fill={[
        //   {
        //     match: {
        //       id: "fries",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "sandwich",
        //     },
        //     id: "lines",
        //   },
        // ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          //   legend: "count",
          //   legendPosition: "middle",
          //   legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          //   legend: "skill",
          //   legendPosition: "middle",
          //   legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        layout={"horizontal"}
        // legends={[
        //   {
        //     dataFrom: "keys",
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: "left-to-right",
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
        animate={true}
        // motionStiffness={90}
        // motionDamping={15}
        motionConfig={{ mass: 1, tension: 15 }}
      />
    </div>
  );
};

export default Skills;

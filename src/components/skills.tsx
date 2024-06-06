import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [height, setHeight] = useState({});

  useEffect(() => {
    const loadSkills = async () => {
      const results = await fetch("http://localhost:5050/skills")
        .then((resp) => resp.json())
        .then((data) => data.reverse());
      setSkills(results);
      console.log(results);
      setHeight({ height: results.length * 20 });
    };

    loadSkills();
  }, []);

  const theme = {
    text: {
      fontSize: 11,
      fill: "#e0d8d7",
      outlineWidth: 0,
      outlineColor: "transparent",
    },
  };

  return (
    <div style={height}>
      <ResponsiveBar
        theme={theme}
        data={skills}
        keys={["count"]}
        indexBy="skill"
        colorBy="indexValue"
        margin={{ top: 50, right: 130, bottom: 50, left: 250 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "pastel1" }}
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
        labelTextColor={{ from: "color", modifiers: [["darker", 10]] }}
        layout={"horizontal"}
        animate={true}
      />
    </div>
  );
}

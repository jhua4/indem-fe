import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const loadSkills = async () => {
      await fetch(
        "https://raw.githubusercontent.com/jhua4/indem-crawlers/main/linkedin.py"
      )
        .then((response) => response.text())
        .then((data) => {
          const code = document.getElementById("code");
          if (code) code.textContent = data;
        });
    };

    loadSkills();
  }, []);

  return (
    <div className="flex flex-col">
      <Label className="self-start text-lg py-2"># how it works</Label>
      <p>
        This is a web scraper that queries LinkedIn job postings and parses the
        skills listed by the poster. The counts of these skills are shown on the{" "}
        <b>skills</b> tab. The source code for the crawler is shown below.
        <br />
        Note that this is just a side project, currently I'm only running this
        crawler on my local machine as it requires LinkedIn premium. Past
        crawler run details are shown in the <b>crawler history</b> tab.
      </p>
      {/* <Label className="self-start text-lg pt-12"># todo</Label>
      <ul>
        <li>[x] Add charts for salary data</li>
      </ul> */}
      <Label className="self-start text-lg pt-12"># crawler source code</Label>
      <a
        href="https://github.com/jhua4/indem-crawlers/blob/main/linkedin.py"
        target="_blank"
        className="self-start px-0 pb-4 underline"
      >
        [link] https://github.com/jhua4/indem-crawlers/blob/main/linkedin.py
      </a>
      <pre id="code" className="text-xs p-8 mb-8 bg-black rounded-lg"></pre>
    </div>
  );
}

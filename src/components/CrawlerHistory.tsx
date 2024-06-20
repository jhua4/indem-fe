import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface CrawlerHistoryItem {
  title: string;
  jobs_inserted: number;
  skills_crawled: number;
  job_start_time: string;
  job_end_time: string;
}

export default function CrawlerHistory() {
  const [history, setHistory] = useState<CrawlerHistoryItem[]>([]);
  const columnHeaders = [
    "job title",
    "jobs inserted",
    "skills crawled",
    "start time",
    "end time",
  ];

  useEffect(() => {
    const loadCrawlerHistory = async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/crawler`)
        .then((resp) => resp.json())
        .then((data) => {
          setHistory(data);
        });
    };

    loadCrawlerHistory();
  }, []);

  return (
    <div className="flex flex-col max-w-5xl">
      <p className="mb-16">
        Here are details of past runs of the web scraper. For more info, see the{" "}
        <b>about</b> tab.
      </p>
      <div className="grid grid-cols-5 grid-gap-4">
        {columnHeaders.map((header, id) => (
          <Label key={id} className="text-md">
            {header}
          </Label>
        ))}
      </div>
      {history.map((item, id) => (
        <div key={id} className="grid grid-cols-5 grid-gap-8 text-sm">
          <div>{item.title}</div>
          <div>{item.jobs_inserted}</div>
          <div>{item.skills_crawled}</div>
          <div>{item.job_start_time}</div>
          <div>{item.job_end_time}</div>
        </div>
      ))}
    </div>
  );
}

import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { useDebounce } from "../util/useDebounce";

const LoadingSpinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default function Skills() {
  const PAGE_SIZE = 25;
  const BAR_HEIGHT = 20;
  const GRAPH_PADDING = 25;
  const [skills, setSkills] = useState([]);
  const [height, setHeight] = useState("0px");
  const [pages, setPages] = useState([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(2);

  const OPTIONS: Option[] = [
    { label: "frontend engineer", value: "frontend engineer" },
    { label: "backend engineer", value: "backend engineer" },
    { label: "full stack engineer", value: "full stack engineer" },
    { label: "machine learning engineer", value: "machine learning engineer" },
  ];
  const [titles, setTitles] = useState(OPTIONS);

  const loadSkills = useDebounce(async () => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/skills?titles=${getTitlesFromOptions().join("&")}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setMaxPage(Math.ceil(data.length / PAGE_SIZE));
        showPage(1);
        setSkills(data);
      });
  });

  useEffect(() => {
    if (titles.length > 0) loadSkills();
  });

  const theme = {
    text: {
      fontSize: 11,
      fill: "#e0d8d7",
    },
  };

  const showPage = (page: number) => {
    setCurrentPage(page);

    if (page < 3) {
      setPages([1, 2, 3]);
    } else if (page < maxPage - 1) {
      setPages([page - 1, page, page + 1]);
    } else {
      setPages([maxPage - 2, maxPage - 1, maxPage]);
    }

    if (page < maxPage) {
      setHeight(`${PAGE_SIZE * BAR_HEIGHT + GRAPH_PADDING}px`);
    } else {
      setHeight(
        `${
          (skills.length - (maxPage - 1) * PAGE_SIZE) * BAR_HEIGHT +
          GRAPH_PADDING
        }px`
      );
    }
  };

  const getTitlesFromOptions = () => {
    return titles.map((o) => o.value);
  };

  return (
    <div className="flex flex-col items-center">
      <Pagination
        aria-disabled={skills.length === 0}
        tabIndex={skills.length === 0 ? -1 : undefined}
        className={
          skills.length === 0 ? "pointer-events-none opacity-50" : undefined
        }
      >
        <PaginationContent>
          {currentPage > 2 ? (
            <>
              <PaginationItem key={1}>
                <PaginationLink href="#" onClick={() => showPage(1)}>
                  {1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          ) : null}

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => showPage(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < maxPage - 1 ? (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem key={maxPage}>
                <PaginationLink href="#" onClick={() => showPage(maxPage)}>
                  {maxPage}
                </PaginationLink>
              </PaginationItem>
            </>
          ) : null}
        </PaginationContent>
      </Pagination>
      <Label className="mt-2">
        showing {(currentPage - 1) * PAGE_SIZE + 1} -{" "}
        {currentPage === maxPage ? skills.length : currentPage * PAGE_SIZE} of{" "}
        {skills.length}
      </Label>
      <Label className="m-4">
        shown below are the counts of skills listed in LinkedIn job postings
      </Label>
      <div className="w-80">
        <MultipleSelector
          defaultOptions={OPTIONS}
          options={OPTIONS}
          value={titles}
          placeholder="select job title(s)"
          emptyIndicator={
            <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
          hidePlaceholderWhenSelected={true}
          onChange={(options: Option[]) => setTitles(options)}
        />
      </div>
      {skills.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div style={{ height, width: "100%" }}>
          <ResponsiveBar
            theme={theme}
            data={skills
              .slice(
                currentPage * PAGE_SIZE - PAGE_SIZE,
                currentPage * PAGE_SIZE
              )
              .reverse()}
            keys={["count"]}
            indexBy="skill"
            colorBy="indexValue"
            margin={{
              top: 15,
              right: 10,
              bottom: 10,
              left: window.screen.width < 500 ? 150 : 200,
            }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "pastel1" }}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: window.screen.width < 500 ? -30 : 0,
            }}
            axisBottom={null}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 10]] }}
            layout={"horizontal"}
            animate={true}
            isInteractive={false}
          />
        </div>
      )}
    </div>
  );
}

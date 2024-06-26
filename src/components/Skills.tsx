import { Label } from "@/components/ui/label";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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

const titleOptions = [
  {
    value: "frontend engineer",
    label: "frontend engineer",
  },
  {
    value: "backend engineer",
    label: "backend engineer",
  },
  {
    value: "full stack engineer",
    label: "full stack engineer",
  },
  {
    value: "machine learning engineer",
    label: "machine learning engineer",
  },
];

export default function Skills() {
  const PAGE_SIZE = 25;
  const BAR_HEIGHT = 20;
  const GRAPH_PADDING = 25;
  const [skills, setSkills] = useState([]);
  const [height, setHeight] = useState("0px");
  const [pages, setPages] = useState([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(2);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSkills = useDebounce(async () => {
    setLoading(true);
    await fetch(`${import.meta.env.VITE_API_URL}/skills?title=${title}`)
      .then((resp) => resp.json())
      .then((data) => {
        setMaxPage(Math.ceil(data.length / PAGE_SIZE));
        showPage(1);
        setLoading(false);
        setSkills(data);
      });
  });

  useEffect(() => {
    if (title) loadSkills();
  }, [title]);

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
      <div className="mb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[250px] justify-between"
            >
              {title
                ? titleOptions.find(
                    (titleOption) => titleOption.value === title
                  )?.label
                : "Select job title..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search job titles..." />
              <CommandList>
                <CommandEmpty>No job title found.</CommandEmpty>
                <CommandGroup>
                  {titleOptions.map((titleOption) => (
                    <CommandItem
                      key={titleOption.value}
                      value={titleOption.value}
                      onSelect={(currentValue) => {
                        setTitle(currentValue === title ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          title === titleOption.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {titleOption.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {loading ? (
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

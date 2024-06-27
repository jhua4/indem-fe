import { useEffect, useState } from "react";
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
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/util/useDebounce";
import { Label } from "./ui/label";

interface SkillSalariesResponse {
  minSalary: number;
  maxSalary: number;
  averageSalary: number;
  medianSalary: number;
  numJobs: number;
}

export default function Salary() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillOptions, setSkillOptions] = useState<string[]>([]);
  const [skill, setSkill] = useState("");
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<SkillSalariesResponse | undefined>(
    undefined
  );
  const [salaryDataPercentage, setSalaryDataPercentage] = useState("...");
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const getSalaryDataPercentage = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/db-salaries-percentage`)
      .then((resp) => resp.json())
      .then((data) => {
        setSalaryDataPercentage(parseFloat(data.percentage).toFixed(2) + "%");
      });
  };

  useEffect(() => {
    getSalaryDataPercentage();
  }, []);

  const searchSkills = useDebounce(async () => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/skill-options?search=${encodeURIComponent(search)}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setSkillOptions(data);
        setLoading(false);
      });
  }, 250);

  const onSearchChange = (search: string) => {
    setSkillOptions([]);
    setSearch(search);
    setLoading(true);
  };

  const getSkillSalaries = useDebounce(async (skill) => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/skill-salaries?skill=${encodeURIComponent(skill)}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setSkill(skill);
        setJobs(data);
      });
  }, 250);

  const onSelectSkill = (skill: string) => {
    getSkillSalaries(skill);
  };

  useEffect(() => {
    if (search) searchSkills();
  }, [search]);

  return (
    <div className="flex flex-col items-center">
      <Label className="mb-2">
        view salary data for jobs requiring a skill
      </Label>
      <Label className="mb-4">
        please note that currently only {salaryDataPercentage} of parsed job
        postings have salary data
      </Label>
      <Label className="mb-2">
        all values, including the range, are calculated using the midpoint of
        the salary range listed in the job posting
      </Label>
      <Label className="mb-4">
        example: $100K - $200K will be calculated as $150K
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between"
          >
            Select skill...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput
              onValueChange={(e: string) => onSearchChange(e)}
              placeholder="Search skills..."
            />
            <CommandList>
              {loading ? <></> : <CommandEmpty>No skill found.</CommandEmpty>}
              {search ? (
                <CommandGroup>
                  {skillOptions.map((skillOption) => (
                    <CommandItem
                      key={skillOption}
                      value={skillOption}
                      onSelect={(currentValue) => {
                        onSelectSkill(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          skill === skillOption ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {skillOption}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <></>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {jobs ? (
        <div className="mt-12">
          <Label className="text-2xl font-bold block">{skill}</Label>
          <div className="grid grid-cols-2">
            <div>
              <Label className="block mt-4">Job(s)</Label>
              <Label className="text-xl font-bold block">
                {jobs.numJobs || 0}
              </Label>
            </div>
            <div>
              <Label className="block mt-4">Average Salary</Label>
              <Label className="text-xl font-bold block">
                {formatter.format(jobs.averageSalary)}
              </Label>
            </div>
            <div>
              <Label className="block mt-4">Median Salary</Label>
              <Label className="text-xl font-bold block">
                {formatter.format(jobs.medianSalary)}
              </Label>
            </div>
            <div>
              <Label className="block mt-4">Salary Range</Label>
              <Label className="text-xl font-bold block">
                {formatter.format(jobs.minSalary)} -{" "}
                {formatter.format(jobs.maxSalary)}
              </Label>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

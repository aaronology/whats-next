"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

import Link from "@/node_modules/next/link";
import Todo from "@/components/interfaces/Todo";
import { getRelativeTimeString } from "./getRelativeTimeString";
import { useRouter } from "@/node_modules/next/navigation";
import CardButtons from "./CardButtons";

const CardList = (props: { cardItmArr: Todo[] }) => {
  let { cardItmArr } = props;
  const router = useRouter();
  // For combobox:
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // setItmArray(
  cardItmArr.sort((a, b) => {
    if (value == "priority") {
      if (a.priority == "high") return -1;
      else if (a.priority == "medium" && b.priority != "high") return -1;
      else return 1;
    } else if (value == "due") return a.due > b.due ? 1 : -1;
    else return a.created > b.created ? -1 : 1;
  });
  // );

  const sortingOptions = [
    {
      value: "priority",
      label: "Priority",
    },
    {
      value: "due",
      label: "Due Date",
    },
    {
      value: "last-edit",
      label: "Last Edited",
    },
  ];
  return (
    <div>
      {/* Sort by combobox / selector */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? sortingOptions.find((option) => option.value === value)?.label
              : "Sort by"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup>
              {sortingOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-3 gap-8 my-8">
        {cardItmArr.map((cardItm: Todo) => (
          // Card has the class group to make group-hover possible
          <Card
            key={cardItm.id}
            className="relative flex flex-col group cursor-pointer"
            onClick={() => {
              router.push(`/view/${cardItm.id}`);
            }}
          >
            <CardHeader>
              <CardTitle>{cardItm.title}</CardTitle>
              <CardDescription>
                Due {getRelativeTimeString(cardItm.due)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {`${cardItm.description.slice(0, 100)}${
                  cardItm.description.length > 100 ? "..." : ""
                }`}
              </p>
            </CardContent>
            <CardFooter className="">
              <p className="absolute bottom-0 pb-2 text-muted-foreground">
                Last Edit: {getRelativeTimeString(cardItm.created)}
              </p>
              <Badge
                className={`absolute bottom-0 right-0 rounded-none rounded-tl-lg rounded-br-lg ${
                  cardItm.priority == "low"
                    ? "bg-lime-400"
                    : cardItm.priority == "medium"
                    ? "bg-amber-400"
                    : "bg-orange-400"
                }`}
              >
                {cardItm.priority} priority
              </Badge>
            </CardFooter>
            <CardButtons cardItm={cardItm} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;

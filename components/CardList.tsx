"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenSquare } from "lucide-react";
import { Archive } from "lucide-react";
import { Trash } from "lucide-react";

import Link from "@/node_modules/next/link";
import { Todo } from "@/components/interfaces/Todo";
import { getRelativeTimeString } from "./getRelativeTimeString";
import { Button } from "./ui/button";
import { useRouter } from "@/node_modules/next/navigation";
import { Todo } from "@/components/interfaces/Todo";

const edit = (id: string) => {
  console.log("Editing ", id);
};
const remove = (id: string) => {
  console.log("Removing card itm", id);
  return fetch("http://127.0.0.1:8090/api/collections/todos/records/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const archive = (cardItm: Todo) => {
  console.log("Archiving ", cardItm.id);
  cardItm.archived = true;
  fetch("http://127.0.0.1:8090/api/collections/todos/records/" + cardItm.id, {
    method: "UPDATE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cardItm),
  });
};

const CardList = (props) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-3 gap-8 ">
      {props.cardItmArr?.map((cardItm: Todo) => (
        // Card has the class group to make group-hover possible
        <Card key={cardItm.id} className="relative flex flex-col group">
          <CardHeader>
            <CardTitle>{cardItm.title}</CardTitle>
            <CardDescription>
              {getRelativeTimeString(cardItm.due)}
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
          <div className="icons-container flex gap-2 absolute top-0 right-0 p-4 invisible group-hover:visible">
            <div
              onClick={() => {
                edit(cardItm.id);
              }}
            >
              <PenSquare
                size={22}
                strokeWidth={2}
                color="white"
                className="cursor-pointer"
              />
            </div>
            <div
              onClick={() => {
                archive(cardItm);
              }}
            >
              <Archive
                size={22}
                strokeWidth={2}
                color="white"
                className="cursor-pointer"
              />
            </div>
            <button
              onClick={async () => {
                await remove(cardItm.id);
              }}
            >
              <Trash
                size={22}
                strokeWidth={2}
                color="white"
                className="cursor-pointer"
              />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardList;

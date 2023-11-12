"use client";

import { PenSquare } from "lucide-react";
import { Archive } from "lucide-react";
import { ArchiveRestore } from "lucide-react";
import { Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useRouter } from "@/node_modules/next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Todo from "@/components/interfaces/Todo";

const remove = (id: string) => {
  return fetch(
    "https://whatsnext.pockethost.io/api/collections/todos/records/" + id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
const archive = async (cardItm: Todo) => {
  console.log("Archiving ", cardItm.id);
  // Deleting the entry
  await fetch(
    "https://whatsnext.pockethost.io/api/collections/todos/records/" +
      cardItm.id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Posting the updated entry
  // If it's not archived (visible in home page), archive it
  // If it's archived (visible in archived page), unarchive it
  cardItm.archived = !cardItm.archived;
  return fetch(
    "https://whatsnext.pockethost.io/api/collections/todos/records/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardItm),
    }
  );
};

const CardButtons = (props: { cardItm: Todo }) => {
  const { cardItm } = props;
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="icons-container flex gap-2 absolute top-0 right-0 p-4 invisible group-hover:visible">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/edit/${cardItm.id}`);
              }}
            >
              <PenSquare
                size={22}
                strokeWidth={2}
                color="white"
                className="cursor-pointer"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={async (e) => {
                e.stopPropagation();
                await archive(cardItm);

                toast({
                  title: `${
                    cardItm.archived ? "Item Archived" : "Item Restored"
                  }`,
                  // description: "Friday, February 10, 2023 at 5:57 PM",
                });
                router.refresh();
              }}
            >
              {cardItm.archived ? (
                <ArchiveRestore
                  size={22}
                  strokeWidth={2}
                  color="white"
                  className="cursor-pointer"
                />
              ) : (
                <Archive
                  size={22}
                  strokeWidth={2}
                  color="white"
                  className="cursor-pointer"
                />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {cardItm.archived ? "Restore" : "Archive"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={async (e) => {
                e.stopPropagation();
                await remove(cardItm.id);
                toast({
                  title: "Item Deleted",
                  // description: "Friday, February 10, 2023 at 5:57 PM",
                });
                router.refresh();
              }}
            >
              <Trash
                size={22}
                strokeWidth={2}
                color="white"
                className="cursor-pointer"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CardButtons;

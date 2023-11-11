import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "@/node_modules/next/link";
import { Todo } from "@/components/interfaces/Todo";

const CardList = (props) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {props.cardItmArr?.map((cardItm: Todo) => (
        <Card key={cardItm.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{cardItm.title}</CardTitle>
            <CardDescription>{cardItm.due}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {`${cardItm.description.slice(0, 100)}${
                cardItm.description.length > 100 ? "..." : ""
              }`}
            </p>
          </CardContent>
          <CardFooter>
            <p>
              {cardItm.priority} - {cardItm.archived && 1}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardList;

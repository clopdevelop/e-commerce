import { Skeleton } from "@/components/shadcn/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { HeartIcon } from "lucide-react";
import AddCartButton from "../cart/AddCartButton";

export function ProductSkeletonCard() {
  return (
    <Card className="relative border rounded-lg p-4 min-w-full overflow-hidden hover:shadow-xl duration-300 ease-in-out">
      <CardHeader className="min-h-[160px]">
        <div className="flex justify-between">
          <div>
            <CardTitle className="h-15 leading-relaxed line-clamp-2 text-balance py-3">
              <Skeleton className="h-15 w-48 py-3" />
            </CardTitle>
            <CardDescription className="h-8 text-lg">
              <Skeleton className="h-8 w-32" />
            </CardDescription>
          </div>
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="min-h-[305px] flex flex-col py-2 gap-6 items-center">
        <Skeleton className="w-[250px] h-[170px]" />
        <div className="flex gap-2 justify-center">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-20 h-8" />
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-0 w-full flex justify-between items-center">
        <Skeleton className="w-16 h-6" />
          <Skeleton className="w-20 h-10 mr-5" />
      </CardFooter>
    </Card>
  );
}

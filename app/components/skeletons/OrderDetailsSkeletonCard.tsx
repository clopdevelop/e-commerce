import { Skeleton } from '../shadcn';
import Link from "next/link";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/shadcn/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/shadcn/table";
import { Separator } from "@/components/shadcn/separator";
import { JSX, SVGProps } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Button } from "../shadcn";

export function OrderDetailsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle><Skeleton className="h-4 w-1/4" /></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] hidden md:table-cell">
                  <Skeleton className="h-16 w-16" />
                </TableHead>
                <TableHead className="max-w-[150px]">
                  <Skeleton className="h-4 w-3/4" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-1/4" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-1/4" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-1/4" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-16 w-16" />
                </TableCell>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-16 w-16" />
                </TableCell>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

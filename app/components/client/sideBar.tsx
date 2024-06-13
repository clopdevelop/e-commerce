"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/shadcn/pagination";
import { Progress } from "@/components/shadcn/progress";
import { Separator } from "@/components/shadcn/separator";
import { Badge } from "@/components/shadcn/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  Heart,
  Users2,
  ThumbsUp,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();
  return (
    <aside className=" left-0 z-10 w-24 flex-col bg-background my-5 md:my-0">
      {pathname !== "/dashboard" && (
        <>
          <nav className="flex flex-col items-center gap-5 px-2 sm:py-5">
            <TooltipProvider delayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard"
                    className={`group rounded-full bg-primary flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors md:h-9 md:w-9 
                        ${
                          pathname == "/dashboard"
                            ? "hover:font-bold text-white"
                            : "!bg-transparent hover:text-foreground"
                        }
                          `}
                  >
                    <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Principal</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Principal</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/fav"
                    className={`group rounded-full bg-primary flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors md:h-9 md:w-9 
                       text-black
                       ${
                         pathname.startsWith("/dashboard/fav")
                           ? "hover:font-bold text-white"
                           : "!bg-transparent hover:text-foreground"
                       }`}
                  >
                    <Heart className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Lista de deseos</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Lista de deseos</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/orders"
                    className={`group rounded-full bg-primary flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors
                   md:h-9 md:w-9 
                      text-black
                        ${
                          pathname.startsWith("/dashboard/orders")
                            ? "text-white hover:font-bold"
                            : "!bg-transparent hover:text-foreground"
                        }`}
                  >
                    <Package className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Pedidos</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Pedidos</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          <nav className="flex justify-center items-center px-2 sm:py-5 my-10">
            <TooltipProvider delayDuration={400}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/profile"
                    className={`group rounded-full bg-primary flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors  md:h-9 md:w-9 
                        ${
                          pathname.startsWith("/dashboard/profile")
                            ? "text-white !hover:font-bold  "
                            : "!bg-transparent hover:text-foreground"
                        }`}
                  >
                    <Settings className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Configuración</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Configuración</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </>
      )}
    </aside>
  );
}

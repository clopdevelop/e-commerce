"use client";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { useState } from "react";
import { ListFilter } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface Props {
  table: any;
}

export function FilterUserOrderType({ table }:Props) {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const handleFilterChange = (filterType: string) => {
    setSelectedFilter(filterType);
    // Aquí podrías llamar a alguna función para aplicar el filtro a tu tabla
    table.getColumn("type")?.setFilterValue(filterType);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-sm">
          <ListFilter className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={selectedFilter} onValueChange={handleFilterChange}>
          <DropdownMenuRadioItem value="BUY">Compra</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Devolución">Devolución</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Subscripción">Subscripción</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FilterUserOrderStatus({ table }:Props) {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const handleFilterChange = (filterType: string) => {
    setSelectedFilter(filterType);
    // Aquí podrías llamar a alguna función para aplicar el filtro a tu tabla
    table.getColumn("type")?.setFilterValue(filterType);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-sm">
          <ListFilter className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={selectedFilter} onValueChange={handleFilterChange}>
          <DropdownMenuRadioItem value="Delivered">Entregado</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Returned">Devuelto</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="DeliveryPending">Pendiente de entrega</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ReturnPending">Pendiente de devolución</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// export function FilterUserOrderType({ table }: Props) {
//   const [showSaleBar, setShowSaleBar] = useState(false);
//   const [showReturnedBar, setShowReturnedBar] = useState(false);
//   const [showSubscriptionBar, setShowSubscriptionBar] = useState(false);

//   const handleFilterChange = (filterType: string, value: boolean) => {
//     if (filterType === 'BUY') {
//       setShowSaleBar(value);
//       // Aquí podrías llamar a alguna función para aplicar el filtro a tu tabla
//       table.getColumn("type")?.setFilterValue(value ? "BUY" : "");
//     } else if (filterType === 'Devolución') {
//       setShowReturnedBar(value);
//       // Aquí podrías llamar a alguna función para aplicar el filtro a tu tabla
//       table.getColumn("type")?.setFilterValue(value ? "Devolución" : "");
//     } else if (filterType === 'Subscripción') {
//       setShowSubscriptionBar(value);
//       // Aquí podrías llamar a alguna función para aplicar el filtro a tu tabla
//       table.getColumn("type")?.setFilterValue(value ? "Subscripción" : "");
//     }
//   };
  

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="sm" className="h-7 gap-1 text-sm">
//           <ListFilter className="h-3.5 w-3.5" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <div>
//           <DropdownMenuCheckboxItem
//             checked={showSaleBar}
//             onCheckedChange={(value) => handleFilterChange('BUY', value)}
//           >
//             BUY
//           </DropdownMenuCheckboxItem>
//           <DropdownMenuCheckboxItem
//             checked={showReturnedBar}
//             onCheckedChange={(value) => handleFilterChange('Devolución', value)}
//           >
//             Devolución
//           </DropdownMenuCheckboxItem>
//           <DropdownMenuCheckboxItem
//             checked={showSubscriptionBar}
//             onCheckedChange={(value) => handleFilterChange('Subscripción', value)}
//           >
//             Subscripción
//           </DropdownMenuCheckboxItem>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export function FilterUserOrderStatus() {
//   const [showDevotedBar, setShowDevotedBar] = useState<Checked>(true);
//   const [showReturnedBar, setShowReturnedBar] = useState<Checked>(true);
//   const [showPendingDeliveryBar, setPendingDeliveryBar] =
//     useState<Checked>(true);
//   const [showPendingReturnBar, setPendingReturnBar] = useState<Checked>(true);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="sm" className="h-7 gap-1 text-sm">
//           <ListFilter className="h-3.5 w-3.5" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuCheckboxItem
//           checked={showDevotedBar}
//           onCheckedChange={setShowDevotedBar}
//         >
//           Entregado
//         </DropdownMenuCheckboxItem>
//         <DropdownMenuCheckboxItem
//           checked={showReturnedBar}
//           onCheckedChange={setShowReturnedBar}
//         >
//           Devuelto
//         </DropdownMenuCheckboxItem>
//         <DropdownMenuCheckboxItem
//           checked={showPendingDeliveryBar}
//           onCheckedChange={setPendingDeliveryBar}
//         >
//           Pendiente de entrega
//         </DropdownMenuCheckboxItem>
//         <DropdownMenuCheckboxItem
//           checked={showPendingReturnBar}
//           onCheckedChange={setPendingReturnBar}
//         >
//           Pendiente de devolución
//         </DropdownMenuCheckboxItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/shadcn";
import { Label } from "@/components/shadcn";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/shadcn";
import { useState } from "react";

export default function ProductState( {onInputChange}: {onInputChange:any}) {
    const states = ["Disponible", "Agotado"];
  const [selectedStatus, setSelectedStatus] = useState("Disponible");

  const handleStatusChange = (value: any) => {
    setSelectedStatus(value);
    onInputChange(value);
  };

    return (
        <Card
        x-chunk="dashboard-07-chunk-3"
        className={
          selectedStatus === "Disponible"
            ? "bg-green-600"
            : "bg-red-600"
        }
      >
        <CardHeader>
          <CardTitle>Estado del Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label>Estado</Label>
              <Select
                value={selectedStatus || ""}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger
                  className="bg-card"
                  id="status"
                  aria-label="Selecciona el estado"
                >
                  <SelectValue placeholder="Selecciona el estado">
                    {selectedStatus || "Selecciona el estado"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
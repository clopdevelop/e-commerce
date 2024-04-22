'use client'
import { Apple, ChevronLeft, ChevronRight, Copy, CreditCard, EuroIcon, Link, MoreVertical, Truck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Pagination, PaginationContent, PaginationItem, Separator, Input, Select, Label, SelectContent, SelectItem, SelectTrigger, SelectValue, FormControl, FormDescription, FormField, FormItem, FormLabel, Form, RadioGroup, RadioGroupItem } from '@/components/shadcn'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../shadcn/dropdown-menu';
import UserAddress from "@/components/client/AddressConfig";
import { Checkbox } from '@/components/shadcn/checkbox';
import { useForm } from 'react-hook-form';

export default function OrderForm() {
    const form = useForm();
    return (
        <Card className="overflow-hidden w-96">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Order Oe31b70H
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy Order ID</span>
                        </Button>
                    </CardTitle>
                    <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <Truck className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                            Track Order
                        </span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                                <MoreVertical className="h-3.5 w-3.5" />
                                <span className="sr-only">More</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Trash</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <Form {...form}>

                    <form >
                        <div className="grid gap-4 mb-5">
                            <div className="font-semibold">Información de Envío</div>
                            <Input placeholder="Calle" type="text" />
                            <div className="grid gap-4 md:grid-cols-4">
                                <Input placeholder="Número" type="number" />
                                <Input placeholder="Bloque" type="number" />
                                <Input placeholder="Escalera" type="number" />
                                <Input placeholder="Letra" type="text" />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Input placeholder="Provincia" type="text" />
                                <Input placeholder="Ciudad" type="text" />
                            </div>
                            <Input placeholder="Postal code" type="text" />
                        </div>

                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <><FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-5">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Guardar la información de envío
                                        </FormLabel>
                                    </div>
                                </FormItem>
                                </>
                            )} />
                        <div className="grid gap-3">
                            <Label htmlFor="shippingMethod">Método de Envío:</Label>
                            <Select name="shippingMethod">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Vacío" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Envío Estándar</SelectItem>
                                    <SelectItem value="dark">Envío Exprés</SelectItem>
                                    <SelectItem value="system">Otro Método</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator className="my-4" />
                        <div className="font-semibold mt-7 mb-5">Información de Facturación</div>
                        <div className="grid gap-4">
                            <Label htmlFor="invoicingMethod">Método de Pago:</Label>
                            <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4 my-2">
                                <div>
                                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                    <Label
                                        htmlFor="card"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <CreditCard className='mb-3'></CreditCard>
                                        Card
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem
                                        value="paypal"
                                        id="paypal"
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor="paypal"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <EuroIcon className="mb-3 h-6 w-6" />
                                        Paypal
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
                                    <Label
                                        htmlFor="apple"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <Apple className="mb-3 h-6 w-6" />
                                        Apple
                                    </Label>
                                </div>
                            </RadioGroup>
                            <Label htmlFor="cardHolderName">Nombre del Titular de la Tarjeta:</Label>
                            <Input type="text" id="cardHolderName" name="cardHolderName" placeholder="Ingrese el nombre del titular de la tarjeta" className="input" required />
                            <Label htmlFor="cardNumber">Número de Tarjeta:</Label>
                            <Input type="text" id="cardNumber" name="cardNumber" placeholder="Ingrese el número de la tarjeta" className="input" required min="16" max="16" />
                            <div className="grid grid-cols-3 gap-4 mt-2">
                                <Select>
                                    <SelectTrigger id="month">
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">January</SelectItem>
                                        <SelectItem value="2">February</SelectItem>
                                        <SelectItem value="3">March</SelectItem>
                                        <SelectItem value="4">April</SelectItem>
                                        <SelectItem value="5">May</SelectItem>
                                        <SelectItem value="6">June</SelectItem>
                                        <SelectItem value="7">July</SelectItem>
                                        <SelectItem value="8">August</SelectItem>
                                        <SelectItem value="9">September</SelectItem>
                                        <SelectItem value="10">October</SelectItem>
                                        <SelectItem value="11">November</SelectItem>
                                        <SelectItem value="12">December</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger id="year">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                                                {new Date().getFullYear() + i}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input id="cvc" placeholder="CVC" />
                            </div>
                            <FormField
                                control={form.control}
                                name="mobile"
                                render={({ field }) => (
                                    <><FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Guardar información de Facturación
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                    </>
                                )} />
                        </div>
                        <div className="flex justify-end mt-5">
                            <Button type="submit" size="sm">Siguiente</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                    1/2
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                        <PaginationItem>
                            <Button size="icon" variant="outline" className="h-6 w-6">
                                <ChevronLeft className="h-3.5 w-3.5" />
                                <span className="sr-only">Previous Order</span>
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button size="icon" variant="outline" className="h-6 w-6">
                                <ChevronRight className="h-3.5 w-3.5" />
                                <span className="sr-only">Next Order</span>
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </Card>
    )
}

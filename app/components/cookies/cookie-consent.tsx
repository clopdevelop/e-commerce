"use client"
// THANKS TO Rahul Rajput - r2hu1
import { CookieIcon } from "lucide-react";
import { Button } from "@/components/shadcn";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/shadcn";
import { DemoCookieSettings } from "./cookie-settings";


export default function CookieConsent({ demo = false, onAcceptCallback = () => { }, onDeclineCallback = () => { } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(false);

    const accept = () => {
        setIsOpen(false);
        document.cookie = "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        setTimeout(() => {
            setHide(true);
        }, 700);
        onAcceptCallback();
    };

    const decline = () => {
        setIsOpen(false);
        setTimeout(() => {
            setHide(true);
        }, 700);
        onDeclineCallback();
    };

    useEffect(() => {
        try {
            setIsOpen(true);
            if (document.cookie.includes("cookieConsent=true")) {
                if (!demo) {
                    setIsOpen(false);
                    setTimeout(() => {
                        setHide(true);
                    }, 700);
                }
            }
        }
        catch (e) {
            // console.log("Error: ", e);
        }
    }, [demo]);

    return (
        <div className={cn("fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md transition-transform duration-700", !isOpen ? "transition-[opacity,transform] translate-y-8 opacity-0" : "transition-[opacity,transform] translate-y-0 opacity-100", hide && "hidden")}>
            <div className="bg-secondary rounded-md m-2">
                <div className="grid gap-2">
                    <div className="border-b border-border h-14 flex items-center justify-between p-4">
                        <h1 className="text-lg font-medium">Usamos cookies</h1>
                        <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                    </div>
                    <div className="p-4">
                        <p className="text-sm font-normal">
                            Utilizamos cookies para garantizar que obtenga la mejor experiencia en nuestro sitio web. Para obtener más información sobre cómo utilizamos las cookies, consulte nuestra política de cookies.
                            <br />
                            <br />
                            <span className="text-xs">Al hacer clic en &quot;<span className="font-medium opacity-80">Aceptar</span>&quot;, acepta nuestro uso de cookies. Puedes pullsar en &quot;Configurar&quot; para personalizar las cookies.
                            </span>
                            <br />
                            <a href="#" className="text-xs underline">Leer más.</a>
                        </p>
                    </div>
                    <div className="flex gap-2 p-4 py-5 border-t border-border bg-background/20">
                        <Button onClick={accept} className="w-full">Aceptar</Button>
                        <Button onClick={decline} className="w-full" variant="secondary">Rechazar</Button>
                        <Dialog>
                            <DialogTrigger>
                                {/* todo Poner el boton da error */}
                                {/* <Button className="w-full" variant="secondary">Configurar</Button> */}
                                Config
                            </DialogTrigger>
                            <DialogContent>
                                {/* <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader> */}
                                <DemoCookieSettings></DemoCookieSettings>
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </div>
        </div>
    )
}
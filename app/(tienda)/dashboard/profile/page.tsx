import { auth } from "@/auth";
import { getUser } from "@/lib/data";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { DialogDemo } from "@/components/client/changePassDialog";
import UserAddressDialog from "@/components/client/UserAddressDialog";
import EmailConfig from "@/components/client/EmailConfig";


export default async function Home() {
  const authentication = await auth();
  const user = String(authentication?.user?.email);
  const completeUser = await getUser(user);
  

  return (
    <>
      {completeUser ? (
        <>
          <div className="grid gap-6">
            <EmailConfig></EmailConfig>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Contraseña</CardTitle>
              </CardHeader>
              <CardContent>
                <DialogDemo></DialogDemo>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Dirección de envío</CardTitle>
              </CardHeader>
              <CardContent>
                <UserAddressDialog></UserAddressDialog>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <>
          <h2>
            Para configurar tus datos debes accerlo en tu cuenta de Google
          </h2>
        </>
      )}
    </>
  );
}

import { auth, getUser } from "@/auth";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import UserAddressDialog from "@/components/client/UserAddressDialog";
import AddressConfig from "@/components/client/AddressConfig";

export default async function Home() {
  const authentication = await auth();
  const user = String(authentication?.user?.email);
  const completeUser = await getUser(user);

  return (
    <>
      {completeUser ? (
        <>
          <AddressConfig></AddressConfig>
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

'use client';
import Avvvatars from "avvvatars-react";

export default function AvatarUser({value}: {value:string}) {
  return (
    <Avvvatars 
          value={value}
          shadow
          size={50}
          borderColor="#000"
          style="shape"
                />
  );
}
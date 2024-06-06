'use client';

import Avvvatars from "avvvatars-react";

export default function AvatarNameUser({value}: {value: string}) {
    return (
    <Avvvatars 
    value={value}
    size={45}
    shadow
    borderColor="#000"
          />
  );
}
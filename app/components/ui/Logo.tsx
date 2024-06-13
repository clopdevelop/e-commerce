'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image'
export default function Logo() {
  const { theme } = useTheme();

  return (
    <nav>
      {theme === 'dark' ? (
        <Image src='/2.jpg' width={96} height={140} alt="logo modo Oscuro"></Image>
      ) : (
        <Image src='/3.jpg' width={96} height={150} alt="logo modo Claro"></Image>
      )}
    </nav>
  );
}
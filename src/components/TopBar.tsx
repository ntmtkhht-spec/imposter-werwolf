import type { ReactNode } from 'react';

type Props = {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
};

export default function TopBar({ title, left, right }: Props) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between px-4">
      <div className="flex min-w-[44px] items-center">{left}</div>
      {title ? <h1 className="truncate text-base font-bold">{title}</h1> : <span />}
      <div className="flex min-w-[44px] items-center justify-end">{right}</div>
    </header>
  );
}

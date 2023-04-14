import { ReactNode } from "react";

interface EmptyScreenProps {
  children: ReactNode;
}

export default function EmptyScreen({ children }: EmptyScreenProps) {
  return <div className="m-auto space-y-2 px-2 text-center">{children}</div>;
}

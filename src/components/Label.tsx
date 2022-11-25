interface LabelProps {
  children: string;
  htmlFor?: string;
}

export default function Label({ children, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm">
      {children}
    </label>
  );
}

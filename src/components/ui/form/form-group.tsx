interface FormGroupProps {
  children: React.ReactNode;
}

export default function FormGroup({ children }: FormGroupProps) {
  return <div className="flex flex-col gap-2 mb-4">{children}</div>;
}

import { Card } from "./Card";

interface ErrorCardProps {
  message?: string;
}

export function ErrorCard({ message = "Something went wrong. Please try again." }: ErrorCardProps) {
  return (
    <Card className="border-red-900/50">
      <p className="text-sm text-red-400">{message}</p>
    </Card>
  );
}

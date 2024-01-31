import { BarChart2, Camera, UserRound } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="text-primary bg-background p-4 text-center">
      <BarChart2 strokeWidth={3} size={24}/>
      <UserRound strokeWidth={3} size={24} />
      <Camera strokeWidth={3} size={24} />
      </footer>
    </>
  );
}

import { BarChart2, Camera, UserRound } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-background bg-background pt-4 pl-10 pr-10 fixed bottom-0 w-full">
      <ul className="list-none flex justify-around bg-primary p-4 rounded-tl-[50px] rounded-tr-[50px] bottom-0 mt-auto">
        <li>
          <BarChart2 strokeWidth={3} size={32} />
        </li>
        <li>
          <UserRound strokeWidth={3} size={32} />
        </li>
        <li>
          <Camera strokeWidth={3} size={32} />
        </li>
      </ul>
    </footer>
  );
}

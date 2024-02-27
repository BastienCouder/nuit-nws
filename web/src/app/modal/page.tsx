import Image from "next/image";
import Link from "next/link";

export default function ModalScreen() {
  return (
    <div className="flex flex-1 flex-col items-center pt-5 bg-background gap-8">
      <Image
        src="/images/logo-help.svg"
        alt="Aide"
        width={320}
        height={200}
        className="w-80"
      />
      <div className="text-xl font-firasansbold px-8 space-y-5">
        <p>1. Rencontrez des participants</p>
        <p>2. Scannez leur QR Code</p>
        <p>3. Discutez et trouvez jusqu’à 3 points communs</p>
        <p>4. Remportez le plus de points !</p>
      </div>
      <div className="text-3xl font-firasansbold  text-center space-y-2 mt-4">
        <p>Scannez</p>
        <p>Trouvez</p>
        <p>Gagnez !</p>
      </div>
      <div>
        <Link
          href="/"
          className="font-fugazone text-3xl text-center px-10 py-2.5 bg-secondary rounded-lg w-full overflow-hidden"
        >
          C&apos;est parti !
        </Link>
      </div>
    </div>
  );
}

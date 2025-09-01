// app/components/VinImage.tsx
import Image from "next/image";

export default function VinImage({ src, alt }: { src?: string | null; alt: string }) {
  const safe = src ?? "/placeholder-vin.jpg"; // mets un placeholder dans /public
  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={safe}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

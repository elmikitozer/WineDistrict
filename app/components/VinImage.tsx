// app/components/VinImage.tsx
import Image from 'next/image';

export default function VinImage({
  src,
  alt,
  vin,
}: {
  src?: string | null;
  alt: string;
  vin?: { nom: string; domaine: string; année: number; couleur: string };
}) {
  // Si un vin est fourni, générer un placeholder dynamique
  let imageSrc = src;

  if (!imageSrc && vin) {
    const params = new URLSearchParams({
      nom: vin.nom,
      domaine: vin.domaine,
      annee: String(vin.année),
      couleur: vin.couleur,
    });
    imageSrc = `/api/wine-placeholder?${params.toString()}`;
  }

  const safe = imageSrc ?? '/window.svg';

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
          unoptimized
        />
      </div>
    </div>
  );
}

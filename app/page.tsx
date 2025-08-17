// app/page.tsx

// // Minimalist elegant:
// export default function Home() {
//   return (
//     <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
//       <h1 className="text-4xl md:text-5xl font-bold text-rose-800 tracking-tight">
//         Wine District 🍷
//       </h1>
//       <p className="text-gray-700 text-lg max-w-xl mt-4">
//         Trouvez le bon vin et réservez chez un caviste près de chez vous.
//       </p>

//       <div className="mt-8 flex items-center gap-3">
//         <a href="/vins" className="btn bg-rose-600 text-white hover:bg-rose-700">
//           Parcourir les vins
//         </a>
//         <a href="/cavistes" className="btn">
//           Voir les cavistes
//         </a>
//       </div>
//     </main>
//   );
// }

// // Hero Animation:
// export default function Home() {
//   return (
//     <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
//       <h1 className="text-4xl md:text-6xl font-bold text-rose-800 tracking-tight animate-fadeUp">
//         Wine District 🍷
//       </h1>
//       <p className="text-gray-700 text-lg max-w-xl mt-4 animate-fadeUp" style={{ animationDelay: "120ms" }}>
//         Explorez, comparez, et réservez chez un caviste près de chez vous.
//       </p>

//       <div className="mt-8 flex items-center gap-3 animate-fadeUp" style={{ animationDelay: "240ms" }}>
//         <a href="/vins" className="btn bg-rose-600 text-white hover:bg-rose-700">
//           Découvrir les vins
//         </a>
//         <a href="/cavistes" className="btn">
//           Trouver un caviste
//         </a>
//       </div>
//     </main>
//   );
// }

// // Immersive w visuals:
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="relative min-h-[80vh] flex items-center">
//       {/* Image de fond */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/hero.webp"
//           alt="Cave a vin bg"
//           fill
//           priority
//           quality={100}
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-white/50 md:bg-white/40 backdrop-blur-[1px]" />
//       </div>

//       <div className="max-w-5xl mx-auto px-6 w-full">
//         <div className="bg-white/80 border border-gray-200 shadow-sm rounded-2xl p-8 md:p-10 max-w-2xl">
//           <h1 className="text-3xl md:text-5xl font-bold text-rose-800 tracking-tight">
//             Wine District 🍷
//           </h1>
//           <p className="text-gray-700 text-lg mt-4">
//             Le bon vin, au bon endroit. Réservez chez un caviste près de chez vous.
//           </p>

//           <div className="mt-8 flex items-center gap-3">
//             <a href="/vins" className="btn bg-rose-600 text-white hover:bg-rose-700">
//               Parcourir les vins
//             </a>
//             <a href="/cavistes" className="btn">
//               Voir les cavistes
//             </a>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// // Hero “Verre dépoli” + bandeau défilant

// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="relative min-h-[88vh] flex items-center">
//       {/* Fond image + voile */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/hero.webp"         // mets une image ≥ 1920px (idéalement .webp)
//           alt=""
//           fill
//           priority
//           quality={90}
//           className="object-cover"
//         />
//         {/* voile & pattern subtil */}
//         <div className="absolute inset-0 bg-white/45 md:bg-white/40 backdrop-blur-[2px]" />
//         <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(60%_60%_at_50%_0%,#fef2f2,transparent_60%)]" />
//       </div>

//       <div className="max-w-6xl mx-auto px-6 w-full">
//         {/* Carte verre dépoli */}
//         <section className="max-w-2xl bg-white/80 border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10 animate-fadeUp">
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-rose-800">
//             Wine District 🍷
//           </h1>
//           <p className="text-gray-700 text-lg mt-4">
//             Le bon vin, au bon moment. Réservez chez un caviste près de chez vous.
//           </p>

//           <div className="mt-8 flex items-center gap-3">
//             <Link href="/vins" className="btn bg-rose-600 text-white hover:bg-rose-700">
//               Parcourir les vins
//             </Link>
//             <Link href="/cavistes" className="btn">
//               Trouver un caviste
//             </Link>
//           </div>

//           {/* Stats mini (optionnelles) */}
//           <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
//             <span>• Recherche en temps réel</span>
//             <span>• Fiches détaillées</span>
//             <span>• Réservation en quelques clics</span>
//           </div>
//         </section>

//         {/* Marquee d’appellations */}
//         <div className="mt-12 overflow-hidden">
//           <div className="flex gap-8 whitespace-nowrap animate-marquee text-sm text-white-500">
//             <span>Chinon</span>
//             <span>•</span>
//             <span>Margaux</span>
//             <span>•</span>
//             <span>Chablis</span>
//             <span>•</span>
//             <span>Gigondas</span>
//             <span>•</span>
//             <span>Pommard</span>
//             <span>•</span>
//             <span>Saint-Émilion</span>
//             <span>•</span>
//             <span>Bandol</span>
//             <span>•</span>
//             <span>Hermitage</span>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

//Hero “Parallaxe douce” + bloc features
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      {/* Bande hero */}
      <section className="relative h-[68vh] md:h-[78vh] grid place-items-center overflow-hidden">
        {/* <div className="absolute inset-0 -z-10 will-change-transform">
          <Image
            src="/hero.webp"
            alt=""
            fill
            priority
            quality={90}
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1.5px]" />
        </div> */}

        <div className="max-w-4xl mx-auto px-6 text-center animate-fadeUp">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-rose-800">
            Wine District 🍷
          </h1>
          <p className="text-gray-900 text-lg md:text-xl mt-4">
            Explorez, comparez, et réservez chez un caviste près de chez vous.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/vins"
              className="btn bg-rose-600 text-white hover:bg-rose-700"
            >
              Découvrir les vins
            </Link>
            <Link href="/cavistes" className="btn">
              Voir les cavistes
            </Link>
          </div>
        </div>
      </section>

      {/* Features sobres
      <section className="max-w-6xl mx-auto px-6 py-14 grid gap-6 md:grid-cols-3">
        {[
          { title: "Recherche live", desc: "Trouvez rapidement ce que vous aimez." },
          { title: "Fiches claires", desc: "Infos essentielles, accessibles d’un coup d’œil." },
          { title: "Réservation simple", desc: "En quelques clics, c’est réservé." },
        ].map((f) => (
          <div key={f.title} className="border border-gray-200 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
            <p className="text-gray-600 mt-1">{f.desc}</p>
          </div>
        ))}
      </section> */}
      {/* Section Sélection
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Nos coups de cœur du moment
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-gray-200 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="aspect-[3/4] relative mb-4">
                <Image
                  src={`/vins/${i}.png`} // à remplacer par tes images
                  alt={`Vin ${i}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Nom du vin {i}
              </h3>
              <p className="text-gray-600">Domaine Exemple</p>
              <p className="text-rose-600 font-bold mt-2">18,00 €</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Section Étapes */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
          Comment ça marche ?
        </h2>
        <div className="grid gap-8 md:grid-cols-3 text-center">
          {[
            {
              step: "1",
              title: "Recherchez",
              desc: "Trouvez votre vin préféré grâce à notre moteur.",
            },
            {
              step: "2",
              title: "Choisissez",
              desc: "Comparez les cavistes près de chez vous.",
            },
            {
              step: "3",
              title: "Réservez",
              desc: "En quelques clics, votre bouteille vous attend.",
            },
          ].map((e) => (
            <div key={e.step} className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold mb-4">
                {e.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{e.title}</h3>
              <p className="text-gray-600 mt-2">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

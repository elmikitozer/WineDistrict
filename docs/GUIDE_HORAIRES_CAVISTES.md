# Guide - Horaires des Cavistes

## Question : Comment gérer les horaires d'ouverture ?

Il y a **2 options** principales :

---

## Option 1 : Saisie Manuelle ⌨️ **(RECOMMANDÉ pour MVP)**

### ✅ Avantages

- **Simple** : Pas de configuration API
- **Gratuit** : Pas de frais Google
- **Contrôle total** : Le caviste gère ses horaires
- **Fiable** : Pas de dépendance externe

### ❌ Inconvénients

- Mise à jour manuelle nécessaire
- Risque d'horaires obsolètes

### 📝 Implémentation

Les horaires sont déjà dans la base de données :

```sql
-- Champ dans la table Caviste
"horaires" TEXT

-- Exemple de format (multi-lignes) :
Lundi - Vendredi : 10h - 19h
Samedi : 10h - 20h
Dimanche : Fermé
```

### 🔧 Interface Admin (À créer plus tard)

Un formulaire permettrait aux cavistes de modifier leurs horaires :

- Champs pour chaque jour de la semaine
- Horaires d'ouverture/fermeture
- Jours de fermeture
- Horaires exceptionnels (jours fériés)

---

## Option 2 : Google Places API 🌐

### ✅ Avantages

- **Automatique** : Horaires toujours à jour
- **Google Business** : Si le caviste a un profil Google
- **Données riches** : Notes, avis, photos

### ❌ Inconvénients

- **Payant** : ~$7 pour 1000 requêtes (Places Details)
- **Complexe** : Configuration API + gestion clé
- **Dépendance** : Si Google tombe, pas d'horaires
- **Pas universel** : Tous les cavistes n'ont pas Google Business

### 📝 Implémentation

```typescript
// app/api/caviste/[id]/hours/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const cavisteId = params.id;

  // 1. Récupérer le caviste
  const caviste = await prisma.caviste.findUnique({
    where: { id: Number(cavisteId) },
    select: { nom: true, adresse: true },
  });

  if (!caviste) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // 2. Rechercher le place_id via Google Places API (Autocomplete)
  const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    `${caviste.nom} ${caviste.adresse}`
  )}&inputtype=textquery&fields=place_id&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const placeId = searchData.candidates?.[0]?.place_id;

  if (!placeId) {
    return NextResponse.json({ error: 'Place not found' }, { status: 404 });
  }

  // 3. Récupérer les détails (horaires)
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=opening_hours&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  const detailsRes = await fetch(detailsUrl);
  const detailsData = await detailsRes.json();

  return NextResponse.json({
    opening_hours: detailsData.result?.opening_hours,
  });
}
```

### 💰 Coût Estimé

- **MVP (100 cavistes, 1000 visiteurs/mois)** : ~$7-10/mois
- **Production (1000 cavistes, 10k visiteurs/mois)** : ~$70-100/mois

---

## Recommandation 🎯

### **Pour le MVP : MANUEL** ⌨️

1. **Saisie manuelle** via formulaire admin
2. **Format texte libre** stocké dans `horaires`
3. **Affichage simple** sur la page caviste
4. **Pas de frais** Google

### **Pour la Production : HYBRIDE** 🔄

1. **Par défaut** : Horaires manuels
2. **Option** : Sync Google Places (si caviste a Google Business)
3. **Cache** : Stocker les horaires Google en DB (rafraîchir 1x/jour)
4. **Fallback** : Horaires manuels si Google échoue

---

## Exemple de Formulaire Admin (Future)

```typescript
// app/dashboard/caviste/horaires/page.tsx
export default function HorairesPage() {
  return (
    <form>
      {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((jour) => (
        <div key={jour}>
          <label>{jour}</label>
          <input type="checkbox" name={`${jour}_ferme`} /> Fermé
          <input type="time" name={`${jour}_ouverture`} />
          <input type="time" name={`${jour}_fermeture`} />
        </div>
      ))}
      <button type="submit">Enregistrer</button>
    </form>
  );
}
```

---

## Actuellement dans le Code

✅ **Déjà implémenté** :

- Champ `horaires` dans la DB
- Affichage sur la page caviste si renseigné
- Support multi-lignes (whitespace-pre-line)

❌ **Pas encore** :

- Interface pour modifier les horaires
- Intégration Google Places API
- Système de cache

---

## Prochaines Étapes

1. ✅ **MVP** : Les cavistes envoient leurs horaires par email → on les saisit
2. 🔜 **V1** : Interface admin pour que les cavistes modifient eux-mêmes
3. 🔮 **V2** : Option Google Places avec cache + fallback manuel

---

**Conclusion** : Pour l'instant, **saisie manuelle** dans la DB. On pourra ajouter Google Places plus tard si besoin.

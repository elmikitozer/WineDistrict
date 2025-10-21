import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="text-center">
        {/* Icône de succès */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Commande confirmée ! 🍷</h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Votre commande a été enregistrée avec succès. Les cavistes sélectionnés ont été notifiés
          et vous contacteront prochainement pour finaliser votre réservation.
        </p>

        {/* Informations supplémentaires */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-blue-900 mb-3">Prochaines étapes :</h2>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Les cavistes vont vérifier la disponibilité de vos vins</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Vous recevrez une confirmation par email ou téléphone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Rendez-vous en boutique pour retirer vos bouteilles</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition font-medium inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Suivre mes commandes
          </Link>
          <Link
            href="/vins"
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition font-medium inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Continuer mes achats
          </Link>
        </div>
      </div>
    </div>
  );
}

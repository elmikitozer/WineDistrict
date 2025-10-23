/**
 * DashboardCharts - Graphiques statistiques pour caviste
 *
 * 🎯 AFFICHE :
 * 1. Évolution des réservations (ligne du temps)
 * 2. Top 5 des vins les plus réservés (bar chart)
 * 3. Répartition par statut (donut chart)
 */

'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  evolutionData: Array<{ date: string; count: number }>;
  topVinsData: Array<{ nom: string; count: number }>;
  statusData: Array<{ name: string; value: number }>;
}

const STATUS_COLORS = {
  'En attente': '#f59e0b', // amber
  Confirmée: '#10b981', // green
  Annulée: '#6b7280', // gray
};

export default function DashboardCharts({ cavisteId }: { cavisteId: number }) {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7days' | '30days' | '90days'>('30days');

  useEffect(() => {
    async function fetchChartData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/dashboard/stats?cavisteId=${cavisteId}&period=${period}`);
        if (res.ok) {
          const chartData = await res.json();
          setData(chartData);
        }
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchChartData();

    // 🔄 Écouter l'événement de refresh depuis les actions en masse
    const handleRefresh = () => fetchChartData();
    window.addEventListener('dashboard:refresh', handleRefresh);

    return () => {
      window.removeEventListener('dashboard:refresh', handleRefresh);
    };
  }, [cavisteId, period]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Sélecteur de période */}
      <div className="flex justify-end gap-2">
        {[
          { value: '7days', label: '7 jours' },
          { value: '30days', label: '30 jours' },
          { value: '90days', label: '90 jours' },
        ].map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value as typeof period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              period === p.value
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 1. Évolution des réservations */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">📈 Évolution des réservations</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.evolutionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#e11d48"
              strokeWidth={2}
              name="Réservations"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Top 5 des vins */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">🏆 Top 5 des vins</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topVinsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="nom" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="count" fill="#e11d48" name="Réservations" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Répartition par statut */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">📊 Répartition par statut</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || '#gray'}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

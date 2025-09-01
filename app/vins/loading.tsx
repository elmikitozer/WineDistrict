// app/vins/loading.tsx
export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({length:6}).map((_,i)=>(
          <div key={i} className="h-48 rounded-2xl border bg-gray-50 animate-pulse" />
        ))}
      </div>
    </main>
  );
}

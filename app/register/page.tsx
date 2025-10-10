import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import RegisterForm from './RegisterForm';

export default function Page({
  searchParams,
}: {
  searchParams?: { [k: string]: string | string[] | undefined };
}) {
  const raw = searchParams?.token;
  const token = Array.isArray(raw) ? raw[0] : raw || '';
  if (!token) notFound();
  return (
    <Suspense>
      <RegisterForm token={token} />
    </Suspense>
  );
}

"use client";

import React from "react";

type CancelPageProps = {
  searchParams: Promise<{ bookingId?: string }>;
};

export default function CancelPage({ searchParams }: CancelPageProps) {
  const { bookingId } = React.use(searchParams);

  return (
    <div className="hg-page flex items-center justify-center p-10">
      <div className="hg-card max-w-xl mx-auto text-center">
        <h1 className="hg-h2 mb-2 text-hg-teal">Pagamento cancelado</h1>

        <p className="hg-body mb-4">
          Sua sessão de pagamento foi cancelada. Nenhuma cobrança foi realizada.
        </p>

        {bookingId && (
          <p className="hg-caption mb-4">
            Referência da reserva:{" "}
            <span className="font-semibold">{bookingId}</span>
          </p>
        )}

        <p className="hg-body mb-6 text-gray-700">
          Se desejar, você pode escolher outro horário ou tentar novamente mais
          tarde.
        </p>

        <a href="/book" className="hg-btn mt-2">
          Ver profissionais
        </a>

        <a href="/" className="hg-body mt-4 block text-gray-600">
          Voltar ao início
        </a>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";

interface BookingData {
  id: number;
  status: string;
  slot: string;
  patient: {
    name: string;
    email: string;
    phone: string;
  };
  practitioner: {
    id: number;
    name: string;
    specialty: string;
  };
}

export default function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = React.use(searchParams);

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError("Booking ID ausente.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Não foi possível carregar a reserva.");
          setLoading(false);
          return;
        }

        setBooking(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar dados do booking.");
        setLoading(false);
      }
    }

    load();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="hg-page flex items-center justify-center p-10">
        <div className="hg-card text-center max-w-md">
          <h2 className="hg-h2 mb-3">Carregando sua reserva...</h2>
          <p className="hg-body">Aguarde um instante.</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="hg-page flex items-center justify-center p-10">
        <div className="hg-card text-center max-w-md border-red-300 bg-red-50">
          <h2 className="hg-h2 text-red-600 mb-3">Algo deu errado</h2>
          <p className="hg-body mb-6">{error || "Reserva não encontrada."}</p>

          <a href="/" className="hg-btn mt-4">
            Voltar ao início
          </a>
        </div>
      </div>
    );
  }

  const slot = new Date(booking.slot).toLocaleString("pt-BR", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const confirmed = booking.status === "confirmed";

  return (
    <div className="hg-page flex items-center justify-center p-10">
      <div className="hg-card max-w-xl mx-auto text-center">
        <h1 className="hg-h2 mb-2 text-hg-teal">
          {confirmed ? "Consulta confirmada! 🎉" : "Pagamento em processamento…"}
        </h1>

        <p className="hg-body mb-6">
          {confirmed
            ? "Sua consulta foi agendada com sucesso."
            : "Estamos finalizando a confirmação do pagamento."}
        </p>

        {/* Summary */}
        <div className="bg-hg-bg-section rounded-xl p-5 mb-6 text-left">
          <h3 className="hg-h3 mb-3 text-hg-teal">Resumo da Reserva</h3>

          <p className="hg-body">
            <strong>Profissional:</strong> {booking.practitioner.name}
          </p>
          <p className="hg-body">
            <strong>Especialidade:</strong> {booking.practitioner.specialty}
          </p>
          <p className="hg-body">
            <strong>Horário:</strong> {slot}
          </p>
          <p className="hg-body">
            <strong>Status:</strong>{" "}
            <span
              className={
                confirmed ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"
              }
            >
              {booking.status}
            </span>
          </p>

          <p className="hg-caption mt-1">
            Código da reserva: <span className="font-semibold">{booking.id}</span>
          </p>
        </div>

        {!confirmed && (
          <p className="hg-body text-gray-600 mb-6">
            Você pode atualizar esta página em alguns segundos para verificar a confirmação.
          </p>
        )}

        <a href="/" className="hg-btn mt-4">
          Voltar ao início
        </a>
      </div>
    </div>
  );
}

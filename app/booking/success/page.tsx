"use client";

import React, { useEffect, useState } from "react";

interface BookingData {
  id: number;
  status: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  practitioner: {
    id: number;
    name: string;
    specialty: string;
  };
}

type SuccessPageProps = {
  searchParams: Promise<{ bookingId?: string }>;
};

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const { bookingId } = React.use(searchParams);

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError("ID da reserva ausente.");
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
        setError("Erro ao buscar dados da reserva.");
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
          <p className="hg-body mb-6">
            {error || "Reserva não encontrada ou inválida."}
          </p>

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

  const status = booking.status;
  const isConfirmed = status === "confirmed";
  const isPending = status === "pending";
  const isFailed = status === "failed";

  if (isFailed) {
    return (
      <div className="hg-page flex items-center justify-center p-10">
        <div className="hg-card max-w-xl mx-auto text-center border-red-300 bg-red-50">
          <h1 className="hg-h2 mb-2 text-red-600">
            Pagamento não concluído ❌
          </h1>

          <p className="hg-body mb-6">
            Não foi possível processar o seu pagamento. Nenhuma cobrança foi
            realizada.
          </p>

          <div className="bg-hg-bg-section rounded-xl p-5 mb-6 text-left">
            <h3 className="hg-h3 mb-3 text-hg-teal">Resumo da tentativa</h3>

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
              <span className="text-red-600 font-semibold">
                {booking.status}
              </span>
            </p>

            <p className="hg-caption mt-1">
              Código da reserva:{" "}
              <span className="font-semibold">{booking.id}</span>
            </p>
          </div>

          <p className="hg-body text-gray-700 mb-6">
            Você pode tentar novamente agendar esta consulta com outro método
            de pagamento ou em outro horário.
          </p>

          <a
            href={`/book/${booking.practitioner.id}`}
            className="hg-btn mt-4"
          >
            Tentar novamente
          </a>

          <a href="/" className="hg-body mt-4 block text-gray-600">
            Voltar ao início
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="hg-page flex items-center justify-center p-10">
      <div className="hg-card max-w-xl mx-auto text-center">
        <h1 className="hg-h2 mb-2 text-hg-teal">
          {isConfirmed
            ? "Consulta confirmada! 🎉"
            : "Pagamento em processamento…"}
        </h1>

        <p className="hg-body mb-6">
          {isConfirmed
            ? "Sua consulta foi agendada com sucesso."
            : "Estamos aguardando a confirmação do seu pagamento. Isso pode levar alguns segundos."}
        </p>

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
            <strong>Paciente:</strong> {booking.name}
          </p>
          <p className="hg-body">
            <strong>Status:</strong>{" "}
            <span
              className={
                isConfirmed
                  ? "text-green-600 font-semibold"
                  : "text-yellow-600 font-semibold"
              }
            >
              {booking.status}
            </span>
          </p>

          <p className="hg-caption mt-1">
            Código da reserva:{" "}
            <span className="font-semibold">{booking.id}</span>
          </p>
        </div>

        {isPending && (
          <p className="hg-body text-gray-600 mb-6">
            Você pode atualizar esta página em alguns segundos para verificar a
            confirmação.
          </p>
        )}

        <a href="/" className="hg-btn mt-4">
          Voltar ao início
        </a>
      </div>
    </div>
  );
}

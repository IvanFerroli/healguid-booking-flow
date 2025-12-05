export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold text-green-600">Pagamento confirmado! 🎉</h1>
      <p className="mt-4 text-lg text-gray-700">
        Sua reserva foi processada com sucesso.
      </p>

      <a
        href="/"
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        Voltar ao início
      </a>
    </div>
  );
}

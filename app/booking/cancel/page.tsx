export default function CancelPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        ❌ Pagamento cancelado
      </h1>

      <p>
        O pagamento não foi concluído. Sua reserva continua registrada como{" "}
        <strong>pendente</strong>.
      </p>

      <p style={{ marginTop: "12px" }}>
        Você pode tentar novamente a qualquer momento.
      </p>

      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "10px 18px",
          background: "#4f46e5",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Voltar ao início
      </a>
    </div>
  );
}

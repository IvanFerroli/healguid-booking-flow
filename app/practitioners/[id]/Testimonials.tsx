export default function Testimonials() {
  return (
    <section className="space-y-6 py-10">
      <h2 className="text-center text-xl font-semibold">
        Hear from Our Early Members
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          "I wanted someone qualified in gut health but didn’t trust what I found online. Two sessions and I finally understand what's driving my issues.",
          "After years of bouncing between doctors, I finally feel supported.",
          "Scheduling was easy and the practitioner really listened.",
        ].map((t, i) => (
          <blockquote
            key={i}
            className="bg-white border border-border-soft shadow rounded-xl p-6 text-sm text-text-main leading-relaxed"
          >
            {t}
          </blockquote>
        ))}
      </div>
    </section>
  );
}

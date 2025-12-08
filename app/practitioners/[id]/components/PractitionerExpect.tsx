/**
 * @file PractitionerExpect
 *
 * Static section describing what clients can expect during their first session.
 */

export default function PractitionerExpect() {
  const items = [
    {
      title: "Comprehensive Assessment",
      desc: "We’ll discuss your history, current challenges and define your personalised approach.",
      color: "brand-teal",
    },
    {
      title: "Tailored Strategy",
      desc: "Practical techniques and strategies specific to your unique situation.",
      color: "brand-orange",
    },
    {
      title: "Ongoing Support Plan",
      desc: "Next steps, measures, and continued progress.",
      color: "brand-blue",
    },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-center text-xl font-semibold">
        What to Expect in Your First Session
      </h2>

      <div className="grid sm:grid-cols-3 gap-6">
        {items.map((it) => (
          <div
            key={it.title}
            className="bg-white shadow rounded-lg p-6 border border-border-soft"
          >
            <h3 className={`font-semibold text-${it.color} mb-1`}>
              {it.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {it.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

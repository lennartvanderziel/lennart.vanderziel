import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col justify-center max-w-6xl mx-auto px-6 py-24">
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Health Optimization Coaching</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight max-w-3xl mb-8">
          Perform at your<br />highest level.
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mb-10">
          Personalized coaching to optimize your health, energy, and performance — built around your biology.
        </p>
        <div className="flex gap-4">
          <Link href="/contact" className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:opacity-80 transition-opacity">
            Work with me
          </Link>
          <Link href="/platform" className="px-6 py-3 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Shoulder to Shoulder →
          </Link>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">What I offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "1-on-1 Coaching", desc: "Deep-dive health optimization tailored to your biomarkers, lifestyle, and goals." },
              { title: "Shoulder to Shoulder", desc: "Group coaching program for high performers who want accountability and community." },
              { title: "Health Audits", desc: "A comprehensive review of your current health status with a clear action plan." },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

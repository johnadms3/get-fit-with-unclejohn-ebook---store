import Image from "next/image"

export default function Hero() {
  return (
    <section 
    className="bg-gray-50 py-10 px-6 text-center"
    style={{ background: "var(--bg-surface ", borderBottom: "0.5px, solid var(--border)" }}
    >

      <h1 className="text-3xl font-medium mb-2" style={{ color: "var=(--accent)" }}>
        Get Fit With Uncle John
      </h1>

      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        Your no-nonsense guide to getting in shape
      </p>

      <div className="flex justify-center">
        <Image
          src="/GetRightWithUncleJohn.jpeg"
          alt="Get Fit With Uncle John book cover"
          width={130}
          height={175}
          className="rounded-lg"
          style={{ border: "0.5px solid var(--border)" }}
        />
      </div>

    </section>
  )
}
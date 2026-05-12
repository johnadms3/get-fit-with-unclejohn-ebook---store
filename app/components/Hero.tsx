import Image from "next/image"

export default function Hero() {
  return (
    <section className="bg-gray-50 py-10 px-6 text-center border-b border-gray-200">

      <h1 className="text-3xl font-medium mb-2">
        Get Fit With Uncle John
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Your no-nonsense guide to getting in shape
      </p>

      <div className="flex justify-center">
        <Image
          src="/GetRightWithUncleJohn.jpeg"
          alt="Get Fit With Uncle John book cover"
          width={130}
          height={175}
          className="rounded-lg border border-gray-200"
        />
      </div>

    </section>
  )
}
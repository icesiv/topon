import Image from "next/image";
import { Leaf, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SustainabilitySection() {
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28 text-white">
      {/* Background Image with Crisp Nature Aesthetics */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sustainability_bg.jpg"
          alt="Sustainability and Environmental Stewardship"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center scale-105 transform motion-safe:animate-pulse [animation-duration:12s]"
        />
        {/* Layered Gradient Overlays to match the rich green mood from reference */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#072415]/95 via-[#0c3520]/85 to-[#082314]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04130b] via-transparent to-[#04130b]/60" />
        <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[0.5px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>ESG &amp; Environmental Responsibility</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-white drop-shadow-sm leading-tight">
            Partner in sustainability
          </h2>

          {/* Subtitle / Paragraph */}
          <p className="text-base sm:text-xl text-emerald-50/90 font-normal leading-relaxed max-w-3xl">
            We prioritize sustainability and help major conglomerates adopt sustainable practices to benefit people and the environment.
          </p>

          {/* Metric Cards Grid */}
          <div className="pt-6 sm:pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Metric 1: Planted 56000 Trees */}
            <div className="group flex items-center space-x-5 sm:space-x-6 p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/40 transition-all duration-300 backdrop-blur-md">
              {/* Tree Icon with Roots */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-white/70 bg-white/10 flex items-center justify-center p-3 shadow-lg group-hover:scale-105 group-hover:border-emerald-400 transition-all">
                  <svg
                    className="w-full h-full text-white"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Tree Canopy */}
                    <path
                      d="M50 18C42 18 36 23 34.5 29.5C29.5 30.8 26 35 26 40.5C26 46.5 31 51 37 51H63C69 51 74 46.5 74 40.5C74 35 70.5 30.8 65.5 29.5C64 23 58 18 50 18Z"
                      fill="currentColor"
                    />
                    {/* Trunk */}
                    <path
                      d="M47 51H53V65C53 66 52 67 50 67C48 67 47 66 47 65V51Z"
                      fill="currentColor"
                    />
                    {/* Root System */}
                    <path
                      d="M50 67L34 78M50 67L42 81M50 67L50 84M50 67L58 81M50 67L66 78M43 74L37 83M57 74L63 83"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Block */}
              <div className="space-y-1 text-white">
                <div className="text-sm sm:text-base text-emerald-200/90 font-medium">
                  Planted
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
                  56000
                </div>
                <div className="text-xs sm:text-sm text-emerald-100/80 font-normal leading-snug">
                  trees across country
                </div>
              </div>
            </div>

            {/* Metric 2: Consulted & guided 10 Bangladeshi conglomerates */}
            <div className="group flex items-center space-x-5 sm:space-x-6 p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/40 transition-all duration-300 backdrop-blur-md">
              {/* Eco Factory Badge */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#52BA69] flex items-center justify-center p-3.5 shadow-xl shadow-emerald-950/40 group-hover:scale-105 transition-transform">
                  <svg
                    className="w-full h-full text-white"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Chimney */}
                    <rect
                      x="22"
                      y="42"
                      width="12"
                      height="30"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* Factory Roof & Body */}
                    <path
                      d="M34 54L52 38V54L70 38V72H34V54Z"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* Sprout / Leaves growing from chimney */}
                    <path
                      d="M28 42V31M28 31C28 25 20 25 20 31C20 37 28 31 28 31ZM28 31C28 25 36 25 36 31C36 37 28 31 28 31Z"
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Factory Windows / Details */}
                    <rect
                      x="52"
                      y="58"
                      width="10"
                      height="8"
                      rx="1"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Block */}
              <div className="space-y-1 text-white">
                <div className="text-sm sm:text-base text-emerald-200/90 font-medium">
                  Consulted &amp; guided
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl text-emerald-300">10</span>
                  <span className="text-xl sm:text-2xl text-white font-bold">Bangladeshi</span>
                </div>
                <div className="text-xs sm:text-sm text-emerald-100/80 font-normal leading-snug">
                  conglomerates in importing sustainable production facility equipment.
                </div>
              </div>
            </div>

          </div>

          {/* Action Link / Bottom strip */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-emerald-200">
            <Link
              href="/about/values"
              className="inline-flex items-center space-x-2 text-white hover:text-emerald-300 font-semibold underline underline-offset-4 decoration-emerald-400/60 hover:decoration-emerald-300 transition-colors"
            >
              <span>Explore our environmental &amp; ESG commitments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

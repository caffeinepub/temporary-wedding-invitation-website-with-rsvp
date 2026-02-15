import SectionOrnaments from './SectionOrnaments';

export default function InvitationHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/generated/wedding-hero-bg.dim_1920x1080.png)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/40 via-rose-900/20 to-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16">
        <SectionOrnaments position="top" />
        
        <div className="max-w-3xl mx-auto">
          {/* Emblem */}
          <div className="mb-8 flex justify-center">
            <img
              src="/assets/generated/wedding-emblem.dim_512x512.png"
              alt="Wedding Emblem"
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"
            />
          </div>

          {/* Names */}
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-4 drop-shadow-lg">
            Sarah & Michael
          </h1>
          
          <div className="w-24 h-px bg-rose-200 mx-auto mb-6" />
          
          <p className="font-serif text-2xl md:text-3xl text-rose-50 mb-8 drop-shadow">
            Together with their families
          </p>
          
          <p className="text-xl md:text-2xl text-white font-light drop-shadow">
            Request the honor of your presence
          </p>
        </div>

        <SectionOrnaments position="bottom" />
      </div>
    </section>
  );
}

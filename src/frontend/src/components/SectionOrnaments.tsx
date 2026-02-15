interface SectionOrnamentsProps {
  position: 'top' | 'bottom';
}

export default function SectionOrnaments({ position }: SectionOrnamentsProps) {
  return (
    <div className={`flex justify-center ${position === 'top' ? 'mb-8' : 'mt-8'}`}>
      <img
        src="/assets/generated/floral-corners.dim_512x512.png"
        alt=""
        className={`w-16 h-16 md:w-20 md:h-20 object-contain opacity-80 ${
          position === 'bottom' ? 'rotate-180' : ''
        }`}
      />
    </div>
  );
}

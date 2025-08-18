export default function SectionWaveBottom({ fillClass = "text-white", className = "" }) {
    return (
      <div className={`pointer-events-none absolute bottom-0 left-0 right-0 ${className}`}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className={`block w-full h-16 fill-current ${fillClass}`}
          aria-hidden="true"
        >
          {/* gentle curve */}
          <path d="M0,32 C120,64 240,0 360,16 C480,32 600,80 720,64 C840,48 960,0 1080,8 C1200,16 1320,56 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    );
  }
  
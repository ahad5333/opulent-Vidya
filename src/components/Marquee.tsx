const Marquee = () => {
  const partners = [
    "University of Oxford", "Harvard University", "Stanford University", 
    "MIT", "University of Cambridge", "Yale University", 
    "ETH Zurich", "UCL", "University of Toronto", "Imperial College London"
  ];

  return (
    <div className="marquee-wrapper border-y border-gray-100">
      <div className="container mb-8">
        <p className="text-center text-xs font-black uppercase tracking-[0.25em] text-text-muted/60">
          Global Strategic Partners & Universities
        </p>
      </div>
      <div className="marquee-track">
        {[...partners, ...partners].map((partner, index) => (
          <span key={index} className="marquee-item text-3xl md:text-4xl font-black text-secondary/20 hover:text-primary transition-colors cursor-default whitespace-nowrap">
            {partner}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

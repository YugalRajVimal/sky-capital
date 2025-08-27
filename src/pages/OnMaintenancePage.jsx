const OnMaintenancePage = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#03055B] to-[#032B44] text-white text-center  flex flex-col items-center justify-center w-screen px-4 py-10">
      <img
        src="/maintenance.gif"
        alt="Maintenance"
        className="w-1/3 mx-auto mb-4"
      />
      <h1 className="text-2xl md:text-5xl font-bold font-serif">
        Site is Under Maintenance
      </h1>
      <p className="text-xl py-2">Please check back in sometime.</p>
    </div>
  );
};

export default OnMaintenancePage;

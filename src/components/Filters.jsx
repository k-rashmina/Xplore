const Filters = ({ onFilter }) => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const languages = ["English", "Spanish", "French", "German", "Arabic"];

  return (
    <div className="flex gap-8 mb-8">
      <div className="flex items-center gap-2">
        <label htmlFor="region"></label>
        <select
          id="region"
          onChange={(e) => onFilter("region", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="language"></label>
        <select
          id="language"
          onChange={(e) => onFilter("language", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Languages</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;

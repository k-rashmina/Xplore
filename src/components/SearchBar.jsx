const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value.trim();
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <input
        type="text"
        name="search"
        placeholder="Search for a country..."
        className="p-2 border border-gray-300 rounded mr-2 w-100"
      />
      <button
        type="submit"
        className="bg-primary text-blue-400 px-4 py-2 rounded border-2 border-blue-400 hover:bg-blue-400 hover:cursor-pointer hover:text-white font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

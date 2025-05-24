import React from 'react';
import { useSearch } from '../context/SearchContext';

const SearchResults = () => {
  const { searchQuery } = useSearch();  // Use searchQuery from context

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Results for "{searchQuery}"</h2>
      {/* Later, you can filter your product list using this `searchQuery` */}
      <p>Show products matching: {searchQuery}</p>
    </div>
  );
};

export default SearchResults;

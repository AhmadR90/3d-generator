import { useState } from 'react';

const GalleryHeader = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        {/* Left side header content */}
      </div>
      <div className="flex gap-2">
        {/* Filter/sort controls */}
      </div>
    </div>
  );
};

export default GalleryHeader;
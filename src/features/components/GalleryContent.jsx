import GalleryHeader from './GalleryHeader';
import GalleryGrid from './GalleryGrid';

const GalleryContent = ({
  items,
  isLoading,
  generatingThumbnail,
  thumbnails,
  imageErrors,
  sortOrder,
  setSortOrder,
  openModelViewer,
  generateThumbnail,
  handleImageError
}) => {
  return (
    <div className="container mx-auto px-4">
      <GalleryHeader 
        sortOrder={sortOrder} 
        setSortOrder={setSortOrder} 
      />
      
      <GalleryGrid
        items={items}
        isLoading={isLoading}
        generatingThumbnail={generatingThumbnail}
        thumbnails={thumbnails}
        imageErrors={imageErrors}
        openModelViewer={openModelViewer}
        generateThumbnail={generateThumbnail}
        handleImageError={handleImageError}
      />
    </div>
  );
};

export default GalleryContent;
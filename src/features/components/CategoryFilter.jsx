import { Button } from "@/components/ui/button";

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map(category => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2 rounded-full transition-all ${
            activeCategory === category
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
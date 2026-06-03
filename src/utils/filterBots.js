/**
 * Client-side bot filtering and sorting functions.
 */

export const filterBots = (bots, filters) => {
  const { categories, priceRange, minRating, search } = filters;
  
  return bots.filter(bot => {
    // 1. Category Filter (multi-select array)
    if (categories && categories.length > 0) {
      if (!categories.includes(bot.category)) {
        return false;
      }
    }
    
    // 2. Price Range Filter
    // Expected structure: "0-50", "50-100", "100+" or "all"
    if (priceRange && priceRange !== 'all') {
      const price = bot.price;
      if (priceRange === '0-50') {
        if (price > 50) return false;
      } else if (priceRange === '50-100') {
        if (price < 50 || price > 100) return false;
      } else if (priceRange === '100+') {
        if (price < 100) return false;
      }
    }
    
    // 3. Rating Filter (minimum threshold)
    if (minRating) {
      const min = parseFloat(minRating);
      if (bot.rating < min) {
        return false;
      }
    }
    
    // 4. Search Filter (checks Name, Description, and Tech Stack tags)
    if (search && search.trim() !== '') {
      const query = search.toLowerCase().trim();
      const matchName = bot.name.toLowerCase().includes(query);
      const matchDesc = bot.description.toLowerCase().includes(query);
      const matchTech = bot.techStack.some(tech => tech.toLowerCase().includes(query));
      
      if (!matchName && !matchDesc && !matchTech) {
        return false;
      }
    }
    
    return true;
  });
};

export const sortBots = (bots, sortBy) => {
  const sorted = [...bots];
  switch (sortBy) {
    case 'popular': // Most reviews = most popular
      return sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
    case 'rating': // Highest rating score
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'price-asc': // Lowest to Highest
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc': // Highest to Lowest
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted; // No sorting / default order
  }
};

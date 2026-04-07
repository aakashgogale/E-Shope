import { Star } from 'lucide-react';

const StarRating = ({ rating, count, size = 14 }) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={size}
            className={star <= full ? 'fill-yellow-400 text-yellow-400' : star === full + 1 && hasHalf ? 'fill-yellow-200 text-yellow-400' : 'fill-gray-200 text-gray-200'}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500">{rating.toFixed(1)}/{count}</span>
      )}
    </div>
  );
};

export default StarRating;

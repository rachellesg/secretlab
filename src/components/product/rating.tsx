import { RatingProps } from "@/utils/types/product";

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <>
      <div className="flex items-center mr-2">
        {[1, 2, 3, 4, 5].map((value) => {
          const filledStars = Math.floor(rating);
          const hasHalfStar = value === Math.ceil(rating) && rating % 1 >= 0.5;
          const isFilled = value <= filledStars || hasHalfStar;

          return (
            <div
              key={value}
              className={`${
                isFilled ? "text-yellow-500" : "text-gray-300"
              } text-2xl focus:outline-none`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isFilled ? "currentColor" : "none"}
                viewBox="0 0 20 20"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    "M10 1L12.39 6.3L18.19 7.36L13.93 11.28L15.16 17L10 14.34L4.84 17L6.07 11.28L1.81 7.36L7.61 6.3L10 1z"
                  }
                />
              </svg>
            </div>
          );
        })}
      </div>
      <div className="text-sm">({rating})</div>
    </>
  );
};

export default Rating;

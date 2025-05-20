export type Housekeeper = {
  id?: number;
  name?: string;
  age?: number;
  gender?: "hombre" | "mujer";
  stars_over_five?: number;
  hourly_price?: number;
  image?: {
    src: string;
    alt: string;
    author: string;
  };
};

export const housekeepers: Housekeeper[] = [
  {
    id: 1,
    name: "Antonio",
    age: 29,
    gender: "hombre",
    stars_over_five: 4.5,
    hourly_price: 23.5,
    image: {
      src: "/images/male_1.png",
      alt: "Antonio",
      author: "Antonio",
    },
  },
  {
    id: 2,
    name: "Alicia",
    age: 40,
    gender: "mujer",
    stars_over_five: 4.0,
    hourly_price: 12,
    image: {
      src: "/images/female_1.png",
      alt: "Alicia",
      author: "Alicia",
    },
  },
  {
    id: 3,
    name: "Julia",
    age: 32,
    gender: "mujer",
    stars_over_five: 5.0,
    hourly_price: 11,
    image: {
      src: "/images/female_2.png",
      alt: "Julia",
      author: "Julia",
    },
  },
  {
    id: 4,
    name: "Francisca",
    age: 50,
    gender: "mujer",
    stars_over_five: 2.7,
    hourly_price: 18.5,
    image: {
      src: "/images/female_3.png",
      alt: "Francisca",
      author: "Francisca",
    },
  },
  {
    id: 5,
    name: "Jesús",
    age: 47,
    gender: "hombre",
    stars_over_five: 3.1,
    hourly_price: 15,
    image: {
      src: "/images/male_2.png",
      alt: "Jesús",
      author: "Jesús",
    },
  },
  {
    id: 6,
    name: "Byron",
    age: 17,
    gender: "hombre",
    stars_over_five: 3.5,
    hourly_price: 17,
    image: {
      src: "/images/male_3.png",
      alt: "Byron",
      author: "Byron",
    },
  },
  {
    id: 7,
    name: "René",
    age: 24,
    gender: "mujer",
    stars_over_five: 4.1,
    hourly_price: 25,
    image: {
      src: "/images/female_4.png",
      alt: "René",
      author: "René",
    },
  },
];

export type Housekeeper = {
  id?: number;
  name?: string;
  age?: number;
  gender?: "male" | "female";
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
    gender: "male",
    stars_over_five: 4.5,
    hourly_price: 23.5,
    image: {
      src: "/images/male_1.png",
      alt: "Hyundai Kona",
      author: "Hyundai Motor Group",
    },
  },
  {
    id: 2,
    name: "Alicia",
    age: 40,
    gender: "female",
    stars_over_five: 4,
    hourly_price: 12,
    image: {
      src: "/images/female_1.png",
      alt: "Kia Tasman",
      author: "Hyundai Motor Group",
    },
  },
  {
    id: 3,
    name: "Julia",
    age: 32,
    gender: "female",
    stars_over_five: 5,
    hourly_price: 11,
    image: {
      src: "/images/female_2.png",
      alt: "Kia EV6",
      author: "Hyundai Motor Group",
    },
  },
  {
    id: 4,
    name: "Francisca",
    age: 50,
    gender: "female",
    stars_over_five: 2.7,
    hourly_price: 18.5,
    image: {
      src: "/images/female_3.png",
      alt: "Kia EV9",
      author: "Hyundai Motor Group",
    },
  },
  {
    id: 5,
    name: "Jesús",
    age: 47,
    gender: "male",
    stars_over_five: 3,
    hourly_price: 15,
    image: {
      src: "/images/male_2.png",
      alt: "Hyundai Santa Fe",
      author: "Hyundai Motor Group",
    },
  },
  {
    id: 6,
    name: "Byron",
    age: 17,
    gender: "male",
    stars_over_five: 3.5,
    hourly_price: 17,
    image: {
      src: "/images/male_3.png",
      alt: "Hyundai Santa Fe",
      author: "Hyundai Motor Group",
    },
  },
  {
    id: 7,
    name: "René",
    age: 24,
    gender: "female",
    stars_over_five: 4.1,
    hourly_price: 25,
    image: {
      src: "/images/female_4.png",
      alt: "Hyundai Santa Fe",
      author: "Hyundai Motor Group",
    },
  },
];

export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  detailImage: string;
  detailImage2?: string;
  detailImage3?: string;
  hasSecondImage?: boolean;
  hasThirdImage?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Journey to Dreams",
    subtitle: "From Point, Line to Plane and Beyond",
    image: "/architecture1.jpg",
    detailImage: "/project-details/detail1.jpg",
    hasSecondImage: false,
    hasThirdImage: false
  },
  {
    id: 2,
    title: "The Urban Oasis Pavilion",
    subtitle: "Student Plaza, East Los Angeles College",
    image: "/architecture2.jpg",
    detailImage: "/project-details/detail2.jpg",
    detailImage2: "/project-details/detail2b.jpg",
    hasSecondImage: true,
    hasThirdImage: false
  },
  {
    id: 3,
    title: "The Wellness Space",
    subtitle: "Universal Spiritual Building, Venice Beach",
    image: "/architecture3.jpg",
    detailImage: "/project-details/detail3.jpg",
    detailImage2: "/project-details/detail3b.jpg",
    hasSecondImage: true,
    hasThirdImage: false
  },
  {
    id: 4,
    title: "The SkyFarm",
    subtitle: "Urban Farming Institute, East Los Angeles College",
    image: "/architecture4.jpg",
    detailImage: "/project-details/detail4.jpg",
    detailImage2: "/project-details/detail4b.jpg",
    hasSecondImage: true,
    hasThirdImage: false
  },
  {
    id: 5,
    title: "Plasencia Congress Center",
    subtitle: "Precedent Study, Plasencia, Spain",
    image: "/architecture5.png",
    detailImage: "/project-details/detail5.jpg",
    hasSecondImage: false,
    hasThirdImage: false
  },
  {
    id: 6,
    title: "Circular Momentum",
    subtitle: "Community Train Station, South Pasadena",
    image: "/architecture6.jpg",
    detailImage: "/project-details/detail6.jpg",
    detailImage2: "/project-details/detail6b.jpg",
    detailImage3: "/project-details/detail6c.jpg",
    hasSecondImage: true,
    hasThirdImage: true
  },
  {
    id: 7,
    title: "Sketches",
    subtitle: "Sketches",
    image: "/architecture7.jpg",
    detailImage: "/project-details/detail7.jpg",
    detailImage2: "/project-details/detail7b.jpg",
    hasSecondImage: true,
    hasThirdImage: false
  },
  {
    id: 8,
    title: "Grasshopper",
    subtitle: "Grasshopper",
    image: "/architecture8.jpg",
    detailImage: "/project-details/detail8.jpg",
    detailImage2: "/project-details/detail8b.jpg",
    hasSecondImage: true,
    hasThirdImage: false
  }
]; 
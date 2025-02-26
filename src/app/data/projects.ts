export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  detailImage: string;
  slug: string;
  description: string;
}

// Add a timestamp to force image refresh
const timestamp = Date.now();

export const projects: Project[] = [
  {
    id: 1,
    title: "Journey to Dreams",
    subtitle: "From Point, Line to Plane and Beyond",
    image: `/architecture1.jpg?v=${timestamp}`,
    detailImage: `/project-details/detail1.jpg?v=${timestamp}`,
    slug: "urban-housing",
    description: "Traveling the journey to reach your dreams is no easy path. It starts off with  a big entry point that's filled with opportunity and hope. There are struggles and challenges along the way that can irritate or anger you. But if you put in the effort and get free of any restraints or constrictions to achieve your ambitions, you'll find the strength to rise, symbolized by wings, and achieve the freedom to soar. At the end of the path is your dreams fulfilled where you can find bliss and happiness."
  },
  {
    id: 2,
    title: "The Urban Oasis Pavilion",
    subtitle: "Student Plaza, East Los Angeles College",
    image: `/architecture2.jpg?v=${timestamp}`,
    detailImage: `/project-details/detail2.jpg?v=${timestamp}`,
    slug: "cultural-center",
    description: "The Urban Oasis Pavilion is a transformative space in the central plaza of East Los Angeles College, that uses the interaction between the built environment and it's users. The biggest idea that I wanted in this design was to incorporate existing lines so that it's a cohesive design. I took a subtractive design approach, starting off with a larger form and removing pieces to create a dynamic interplay of positive and negative spaces. I wanted the pavilion to integrate seamlessly with the existing geometry and walkways of the landscape to have a fluid circulation from all directions, and to incorporate rooftop gardens as to not take away from the greenery. The program includes bicycle parking and study seating areas to promote sustainability and student interactions. This design features things like sun protection, elevated landscapes, private and public areas, and accessibility with stairs and ramps. The idea was to enhance the plaza by creating a cohesive space that lets the users engage with the ground."
  },
  {
    id: 3,
    title: "The Wellness Space",
    subtitle: "Universal Spiritual Building , Venice Beach",
    image: `/architecture3.jpg?v=${timestamp}`,
    detailImage: `/project-details/detail3.jpg?v=${timestamp}`,
    slug: "eco-complex",
    description: "Green building with innovative energy solutions"
  },
  {
    id: 4,
    title: "The SkyFarm",
    subtitle: "Urban Farming Institute, East Los Angeles College",
    image: `/architecture4.jpg?v=${timestamp}`,
    detailImage: `/project-details/detail4.jpg?v=${timestamp}`,
    slug: "public-library",
    description: "Contemporary knowledge center"
  },
  {
    id: 5,
    title: "Plasencia Congress Center",
    subtitle: "Precedent Study, Plasencia, Spain",
    image: `/architecture5.jpg?v=${timestamp}`,
    detailImage: `/project-details/detail5.jpg?v=${timestamp}`,
    slug: "residential-tower",
    description: "Luxury apartments with panoramic views"
  },
  {
    id: 6,
    title: "Circular Momentum",
    subtitle: "Community Train Station, South Pasadena",
    image: `/architecture6.jpg?v=${timestamp}`,
    detailImage: `/project-details/detail6.jpg?v=${timestamp}`,
    slug: "sports-complex",
    description: "Multi-purpose athletic facility"
  },
  {
    id: 7,
    title: "Sketches",
    subtitle: "Sketches",
    image: `/architecture7.jpg?v=${timestamp}`,
    detailImage: `/project-details/detail7.jpg?v=${timestamp}`,
    slug: "education-campus",
    description: "Innovative learning spaces with integrated technology and sustainable design principles"
  },
  {
    id: 8,
    title: "Grasshopper",
    subtitle: "Grasshopper",
    image: `/architecture8.jpg?v=${timestamp}`,
    detailImage: `/project-details/detail8.jpg?v=${timestamp}`,
    slug: "wellness-center",
    description: "Biophilic design merging nature and architecture for holistic wellbeing"
  }
]; 
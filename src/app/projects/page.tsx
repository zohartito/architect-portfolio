import Image from 'next/image'

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Modern Residential Complex",
      description: "A sustainable housing project focusing on community integration and environmental consciousness. This project features innovative use of natural light and energy-efficient systems.",
      image: "/project1.jpg",
      year: "2023",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      title: "Urban Cultural Center",
      description: "Revitalizing downtown through cultural spaces. This multi-purpose facility combines art galleries, performance spaces, and community areas.",
      image: "/project2.jpg",
      year: "2022",
      location: "Chicago, IL"
    },
    {
      id: 3,
      title: "Green Office Building",
      description: "Eco-friendly workplace design with LEED certification. Features include solar panels, green roofs, and state-of-the-art water management systems.",
      image: "/project3.jpg",
      year: "2021",
      location: "Seattle, WA"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Featured Projects</h1>
        <div className="space-y-16">
          {projects.map((project) => (
            <div key={project.id} className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] group overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{project.title}</h2>
                <div className="flex space-x-4 text-gray-600">
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.location}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

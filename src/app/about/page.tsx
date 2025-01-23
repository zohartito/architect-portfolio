import Image from 'next/image'

export default function About() {
  const skills = [
    "Architectural Design",
    "Sustainable Architecture",
    "Urban Planning",
    "3D Modeling",
    "AutoCAD",
    "Revit",
    "SketchUp",
    "Project Management",
    "Building Information Modeling (BIM)",
    "Green Building Standards"
  ]

  const experiences = [
    {
      year: "2020-Present",
      role: "Senior Architect",
      company: "Modern Design Studio",
      description: "Leading innovative architectural projects with a focus on sustainability and urban integration."
    },
    {
      year: "2015-2020",
      role: "Project Architect",
      company: "Urban Architects Inc.",
      description: "Managed multiple residential and commercial projects from concept to completion."
    },
    {
      year: "2012-2015",
      role: "Junior Architect",
      company: "Global Architecture Firm",
      description: "Collaborated on international projects and developed expertise in sustainable design."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-6">About Me</h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              With over 10 years of experience in architectural design, I specialize in creating 
              sustainable and innovative spaces that harmoniously blend with their surroundings. 
              My approach combines modern design principles with environmental consciousness, 
              ensuring each project contributes positively to its community.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                <p className="text-gray-600">Projects</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900">10+</h3>
                <p className="text-gray-600">Years</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900">20+</h3>
                <p className="text-gray-600">Awards</p>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/hero-bg.jpg"
              alt="John Architect"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition"
              >
                <span className="text-gray-800">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-4 hover:border-gray-900 transition">
                <div className="text-gray-600">{exp.year}</div>
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <div className="text-gray-800 mb-2">{exp.company}</div>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

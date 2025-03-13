import Image from 'next/image'
import ContactSection from '../components/ContactSection'

export default function About() {
  const skills = [
    "Architectural Design",
    "Sustainable Architecture",
    "Urban Planning",
    "3D Modeling",
    "AutoCAD",
    "Revit",
    "SketchUp",
    "Design Visualization",
    "Building Information Modeling (BIM)",
    "Green Building Standards"
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold mb-8">About Me</h1>
            <p className="text-gray-600 leading-relaxed">
              "Designing complex things and the always changing world of technology fuels my original drive. Multidisciplinary solutions are demanded by many challenges in a world where I am found thriving at the convergence of architecture, innovation and purpose. I, an aspiring architect, along with an original thinker, look beyond customary blueprints. I envision projects as components of a larger system, integrating at least three key elements: sustainability, function, as well as aesthetic balance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Design is increasingly not limited to singular principles; rather, it is characterized by deeply dynamic as well as layered approaches, which are influenced by a collection of disciplines along with global challenges. In each project that I pursue, I deliberately strive to powerfully adjust my work with considerably larger goals of meaningful effect, using sustainable design strategies, revolutionary spatial planning, or by carefully creating experiences that deeply resonate on a human level.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I fundamentally base my approach on collaboration. I collaborate with at least four types of professionals—engineers, artists, technologists and community leaders—to integrate several fresh perspectives. I then create designs that challenge conventions while respecting context. It is believed that the most powerful ideas are generated not from singularly brilliant minds, but from the collaborative intellect of a deeply committed team, bound together by a commonly held vision.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I intend to aggressively push the boundaries of architecture, skillfully merging original vision with practical application. I am driven by a powerful desire to build and by a meaningful responsibility to shape environments that inspire, connect and undergo. Each design, regardless of its size, presents at least one opportunity to effect positive change—a single step toward a more considerate, along with a more linked future."
            </p>
            <p className="text-gray-600 leading-relaxed">
            <br />
            </p>
            <p className="text-gray-600 leading-relaxed">
              -Zohar Tito
            </p>
            <p className="text-gray-600 leading-relaxed">
              Aspiring Architect & Creative Designer
            </p>
          </div>
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/hero-bg.jpg"
              alt="Zohar Tito"
              fill
              priority
              unoptimized
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
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}

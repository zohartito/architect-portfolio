import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gray-900 text-white relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Architecture background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="z-10 text-center">
          <h1 className="text-6xl font-bold mb-4">Zohar Tito</h1>
          <p className="text-xl mb-8">Creating spaces that inspire</p>
          <Link 
            href="/projects" 
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md hover:bg-gray-200 transition"
          >
            View Projects
          </Link>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <Link href="/projects" key={project} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                  <Image
                    src={`/project${project}.jpg`}
                    alt={`Project ${project}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">View Project</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/projects"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Architectural Design</h3>
              <p className="text-gray-600">Comprehensive architectural design services for residential and commercial projects.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Urban Planning</h3>
              <p className="text-gray-600">Strategic urban planning solutions that create sustainable and livable communities.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Interior Design</h3>
              <p className="text-gray-600">Thoughtful interior design that balances aesthetics with functionality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-gray-300">Let's create something amazing together</p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md hover:bg-gray-200 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  )
}

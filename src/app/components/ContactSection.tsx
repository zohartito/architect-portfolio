export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-white py-16 min-h-[40vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold mb-2">Email</h3>
              <a 
                href="mailto:zohartito96@gmail.com" 
                className="text-gray-600 hover:text-gray-900 transition inline-block text-sm"
              >
                zohartito96@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-base font-bold mb-2">Phone</h3>
              <a 
                href="tel:+18185188596" 
                className="text-gray-600 hover:text-gray-900 transition inline-block text-sm"
              >
                (818) 518-8596
              </a>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="mt-8">
            <h3 className="text-base font-bold mb-4">Connect with Me</h3>
            <div className="flex justify-center space-x-6">
              <a 
                href="#" 
                className="text-gray-600 hover:text-gray-900 transition text-sm"
              >
                LinkedIn
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-gray-900 transition text-sm"
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-gray-900 transition text-sm"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
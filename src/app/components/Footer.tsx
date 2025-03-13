'use client';

export default function Footer() {
  return (
    <footer className="bg-[#1a1f2e] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Zohar Tito</h3>
            <p className="text-gray-400">Aspiring Architect | USC Candidate</p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Email: zohar.tito@example.com</p>
            <p className="text-gray-400">Based in California</p>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Follow</h3>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Behance</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Zohar Tito. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
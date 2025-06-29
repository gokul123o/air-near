export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">About</h3>
            <p className="text-base text-gray-300">
              Find the nearest airport to your location with our easy-to-use tool.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-base text-gray-300 hover:text-gray-100 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-base text-gray-300 hover:text-gray-100 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2">
              <li className="text-base text-gray-300">
                Email: info@air-near.com
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Air-Near. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
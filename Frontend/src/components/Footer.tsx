import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">FlowEstate</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          FlowEstate is a real estate platform where you will find great properties and investment opportunities. Here each property is beautifully presented with detailed information.
        </p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-gray-400 transition-colors">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            <FaYoutube size={24} />
          </a>
          <a href="#" className="hover:text-gray-400 transition-colors">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
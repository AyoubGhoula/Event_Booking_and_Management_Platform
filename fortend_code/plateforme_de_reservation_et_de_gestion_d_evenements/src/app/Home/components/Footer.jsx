const Footer = () => {
  return (
    <footer className=" text-gray-300 mt-44">
      <div class="w-full  bg-gradient-to-r from-blue-800 via-sky-600 to-cyan-500 pt-0.5">
      <div class="w-full  bg-gradient-to-r from-slate-800  to-slate-900 p-1">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6 ">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          <div>
            <h2 className="text-lg font-semibold text-white mb-4">About EventMaster</h2>
            <p className="text-sm">
              EventMaster is your one-stop solution for creating, managing, and participating in events. Simplify your event planning today!
            </p>
          </div>


          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/events" className="hover:text-white">Upcoming Events</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>


          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Contact Us</h2>
            
              <div className="pb-2 text-sm">📍 123 Event Street, EventCity, EM 45678</div> 
              <div className="pb-2 text-sm">📞 +123 456 7890 </div>
              <div className="pb-2 text-sm">✉️ support@eventmaster.com </div>

          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 pb-2 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} EventMaster. All rights reserved.</p>
        </div>
      </div>
      </div>
      </div>
      
    </footer>
  );
};

export default Footer;

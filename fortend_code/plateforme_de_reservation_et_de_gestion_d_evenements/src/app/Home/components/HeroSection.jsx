// import video1 from "../../public/vide
// import video2 from "../assets/video2.mp4";

// import serche_page from "../../search_page/search_page";
import { SparklesCore } from "../components/ui/sparkles";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const HeroSection = () => {
  const router = useRouter();
  
  const searchPageFunction = () => {
    router.push('/events');
    console.log("searchPageFunction");
  };
  return (
    <>
     <div className="flex flex-col items-center ml-auto ">
      <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20 mt-18">
      Welcome to
      </h1>
      <div>
      <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center relative z-20 bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text text-gradient">
      EventMaster
      </h1>
      <div className="h-40  relative">

        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 

        <div className="absolute inset-0 w-full h-full bg-gray-900 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
      <p className="text-center md:text-lg lg:text-xl leading-8 text-gray-800 dark:text-gray-300 mt-24">
      Discover and book exciting events near you!
      </p>
      
      <div className="flex flex-col items-center mt-10 lg:mt-4"> 
      <div className="mt-10 text-lg text-center text-neutral-400 max-w-4x">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
        <section className="mb-8 pt-8">
          <h2 className="text-2xl font-bold mb-10">Explore Our Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="h-36  w-full rounded-md bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 p-0.5">
            <div className="  h-full w-full rounded-md bg-gray-800 pt-4 "> 
              <h3 className="text-xl font-bold">Live Concerts</h3>
              <p className="mt-2">Enjoy live performances from your favorite artists.</p>
            </div>
            </div>
            
            <div class="h-36  w-full rounded-md bg-gradient-to-r from-cyan-500 via-sky-500 to-sky-500 p-0.5">
            <div className="  h-full w-full rounded-md bg-gray-800 pt-4 "> 
              <h3 className="text-xl font-bold">Creative Workshops</h3>
              <p className="mt-2">Learn something new in our interactive workshops.</p>
            </div>
            </div>
            <div class="h-36  w-full rounded-md bg-gradient-to-r from-sky-500 via-sky-500 to-cyan-500 p-0.5">
            <div className="  h-full w-full rounded-md bg-gray-800 pt-4 "> 
              <h3 className="text-xl font-bold">Inspiring Conferences</h3>
              <p className="mt-2">Attend conferences that will inspire and motivate you.</p>
            </div>
            </div>
            <div class="h-36  w-full rounded-md bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 p-0.5">
            <div className="  h-full w-full rounded-md bg-gray-800 pt-4 "> 
              <h3 className="text-xl font-bold">Festive Parties</h3>
              <p className="mt-2">Dance all night at our exclusive parties.</p>
            </div>
            </div>
          </div>
        </section>
        
        



      
      
        
        <section className="mb-8 pt-8 mt-12 ">
          <h2 className="text-2xl font-bold mb-10">How It Works?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div class="h-36  w-full rounded-md bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 p-0.5">
            <div className="  h-full w-full rounded-md bg-gray-800 pt-4 "> 
              <h3 className="text-2xl font-bold">1. Explore:</h3>
              <p className="mt-2 text-2xl">Browse our event catalog.</p>
            </div>
            </div>
            
            <div class="h-36  w-full rounded-md bg-gradient-to-r from-cyan-500 via-sky-500 to-sky-500 p-0.5">
            <div className="  h-full w-full rounded-md bg-gray-800 pt-4 "> 
              <h3 className="text-2xl font-bold">2. Book:</h3>
              <p className="mt-2 text-2xl">Book your tickets in a few clicks.</p>
            </div>
            </div>
            <div class="h-36  w-full rounded-md bg-gradient-to-r from-sky-500 via-sky-500 to-cyan-500 p-0.5">
            <div className="  h-full w-full rounded-md bg-gray-800 pt-4 "> 
              <h3 className="text-2xl font-bold">3. Enjoy:</h3>
              <p className="mt-2 text-2xl">Attend the event and have an unforgettable experience.</p>
            </div>
            </div>
           
          </div>
        </section>
        
        

        <div className="flex justify-center my-10 mt-12">
        <Link
          href="/sign-in"
          className="bg-gradient-to-r text-white from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md"
        >
         Sign In
        </Link>
        <Link href="/sign-up" className="py-3 px-7 mx-3  text-white rounded-md border hover:border-blue-500">
        Create an account
        </Link>
      </div>
        
      </div>
      
</div>
</div>      
</>        
  );
};

export default HeroSection;

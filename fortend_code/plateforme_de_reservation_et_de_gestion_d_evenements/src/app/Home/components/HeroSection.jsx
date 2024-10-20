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
      <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20">
      Bienvenue sur 
      </h1>
      <div>
      <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center relative z-20 bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text text-gradient">
      EventMaster
      </h1>
      <div className="h-40  relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 
        
        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-gray-900 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
      <p className="text-center md:text-lg lg:text-xl leading-8 text-gray-800 dark:text-gray-300 mt-28">
      Découvrez et réservez des événements passionnants près de chez vous !
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
          <h2 className="text-2xl font-bold mb-10">Explorez Nos Événements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="mb-4 rounded bg-gray-50 dark:bg-gray-800 shadow px-4 py-3 "> 
              <h3 className="text-xl font-bold">Concerts en Live</h3>
              <p className="mt-2">Profitez de performances en direct de vos artistes préférés.</p>
            </div>
            <div className="mb-4 rounded bg-gray-50 dark:bg-gray-800 shadow px-4 py-3">
              <h3 className="text-xl font-bold">Ateliers Créatifs</h3>
              <p className="mt-2">Apprenez quelque chose de nouveau dans nos ateliers interactifs.</p>
            </div>
            <div className="mb-4 rounded bg-gray-50 dark:bg-gray-800 shadow px-4 py-3">
              <h3 className="text-xl font-bold">Conférences Inspirantes</h3>
              <p className="mt-2">Assistez à des conférences qui vous inspireront et vous motiveront.</p>
            </div>
            <div className="mb-4 rounded bg-gray-50 dark:bg-gray-800 shadow px-4 py-3">
              <h3 className="text-xl font-bold">Soirées Festives</h3>
              <p className="mt-2">Dansez toute la nuit lors de nos soirées exclusives.</p>
            </div>
          </div>
        </section>
        <div className="flex justify-center my-10">
        <Link
          href="event"
          className="bg-gradient-to-r text-white from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md"
        >
          Participate in Event
        </Link>
        <Link href="#" className="py-3 px-7 mx-3  text-white rounded-md border hover:border-blue-500">
        My Events
        </Link>
      </div>
        {/* searche bar
      <form className="max-w-md mx-auto md-12 pb-14 " onSubmit={searchPageFunction}  methode="post">   
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit"  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
          </form> */}



      <div className="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800 pt-2 sm:mt-8 sm:mb-4 sm:justify-between">
        <section className="mb-8 ">
          <h2 className="text-2xl sm:font-bold mb-6">Fonctionnalités Clés</h2>
          <div className="grid grid-cols-1 gap-4 mb-4 my-4 pt-4 sm:grid-cols-3 sm: py-4">
        
            <div><p className="text-2xl text-gray-400 dark:text-gray-500"><span className="font-bold">Recherche Facile :</span><br/> Trouvez rapidement des événements grâce à notre barre de recherche intuitive.</p>
            </div><p className="text-2xl text-gray-400 dark:text-gray-500"><span className="font-bold">Réservation Sécurisée :<br/></span> Réservez vos billets en toute sécurité avec notre système de paiement intégré.</p>
            <p className="text-2xl text-gray-400 dark:text-gray-500"><span className="font-bold">Notifications en Temps Réel :<br/></span> Recevez des mises à jour instantanées sur vos réservations et événements favoris.</p>
        
        </div>
        </section>
      </div>
      <div className="flex items-center justify-center  mb-9 rounded bg-gray-50 dark:bg-gray-800 pt-8 mt-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Inscrivez-vous Maintenant</h2>
           <p className="text-2xl text-gray-400 dark:text-gray-500">Créez un compte gratuit dès aujourd'hui et ne manquez plus jamais un événement !</p>
        </section>
        </div>
        <div className="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800 pt-2 sm:mt-8 sm:mb-4 sm:justify-between">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Comment ça Marche ?</h2>
          <div className="grid grid-cols-1 gap-4 mb-4 my-2 pt-4  sm:grid-cols-3 sm: py-5">
          <p className="text-2xl text-gray-400 dark:text-gray-500"><span className="font-bold">1. Explorez :</span> Parcourez notre catalogue d'événements.</p>
          <p className="text-2xl text-gray-400 dark:text-gray-500"><span className="font-bold">2. Réservez :</span> Réservez vos billets en quelques clics.</p>
          <p className="text-2xl text-gray-400 dark:text-gray-500 ml-1"><span className="font-bold">3. Profitez :</span> Assistez à l'événement et vivez une expérience inoubliable.</p>
            </div>
        </section>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Témoignages</h2>
          <div className="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800 py-4 sm:mt-3 sm:mb-4 ">
            <p>"Grâce à EventMaster, j'ai découvert des événements incroyables dans ma ville. La réservation est super facile et rapide !" - <strong>Marie</strong></p>

          </div>
          <div className="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800 py-4 sm:mt-3 sm:mb-4 ">

            <p>"Je recommande vivement EventMaster pour sa grande variété d'événements et son interface conviviale." - <strong>Jean</strong></p>
          </div>
        </section>
      </div>
      <div className="flex justify-center my-10">
        <Link
          href="event"
          className="bg-gradient-to-r text-white from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md"
        >
          Participate in Event
        </Link>
        <Link href="#" className="py-3 px-7 mx-3  text-white rounded-md border hover:border-blue-500">
        My Events
        </Link>
      </div>
</div>
</div>      
</>        
  );
};

export default HeroSection;

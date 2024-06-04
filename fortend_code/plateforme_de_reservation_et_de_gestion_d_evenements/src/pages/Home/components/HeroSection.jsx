// import video1 from "../../public/vide
// import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <>
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
      Bienvenue sur 
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          {" "}
          EventMaster
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      Découvrez et réservez des événements passionnants près de chez vous !
      </p>
      <main className="mt-10 text-lg text-center text-neutral-400 max-w-4x">
        <section className="mb-8 pt-8">
          <h2 className="text-2xl font-bold mb-4">Explorez Nos Événements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black p-4 rounded shadow">
              <h3 className="text-xl font-bold">Concerts en Live</h3>
              <p className="mt-2">Profitez de performances en direct de vos artistes préférés.</p>
            </div>
            <div className="bg-black p-4 rounded shadow">
              <h3 className="text-xl font-bold">Ateliers Créatifs</h3>
              <p className="mt-2">Apprenez quelque chose de nouveau dans nos ateliers interactifs.</p>
            </div>
            <div className="bg-black p-4 rounded shadow">
              <h3 className="text-xl font-bold">Conférences Inspirantes</h3>
              <p className="mt-2">Assistez à des conférences qui vous inspireront et vous motiveront.</p>
            </div>
            <div className="bg-black p-4 rounded shadow">
              <h3 className="text-xl font-bold">Soirées Festives</h3>
              <p className="mt-2">Dansez toute la nuit lors de nos soirées exclusives.</p>
            </div>
          </div>
        </section>

        <section className="mb-8 pt-20">
          <h2 className="text-2xl font-bold mb-4">Fonctionnalités Clés</h2>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Recherche Facile :</span> Trouvez rapidement des événements grâce à notre barre de recherche intuitive.</p>
          </div>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Réservation Sécurisée :</span> Réservez vos billets en toute sécurité avec notre système de paiement intégré.</p>
          </div>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Gestion de Profil :</span> Gérez facilement vos réservations et votre profil utilisateur.</p>
          </div>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Notifications en Temps Réel :</span> Recevez des mises à jour instantanées sur vos réservations et événements favoris.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Inscrivez-vous Maintenant</h2>
          <p className="mb-4">Créez un compte gratuit dès aujourd'hui et ne manquez plus jamais un événement !</p>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Simple et Rapide :</span> Inscription en quelques clics.</p>
          </div>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Accès Exclusif :</span> Accédez à des événements et offres spéciales réservés à nos membres.</p>
          </div>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Gestion de Réservations :</span> Suivez vos réservations et recevez des rappels.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Pourquoi Choisir EventMaster ?</h2>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Large Sélection d'Événements :</span> Des événements pour tous les goûts et intérêts.</p>
          </div>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Facilité d'Utilisation :</span> Interface utilisateur intuitive et agréable.</p>
          </div>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">Support Client :</span> Une équipe dédiée prête à vous aider en cas de besoin.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Comment ça Marche ?</h2>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">1. Explorez :</span> Parcourez notre catalogue d'événements.</p>
          </div>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">2. Réservez :</span> Réservez vos billets en quelques clics.</p>
          </div>
          <div className="bg-black p-4 rounded shadow mb-4">
            <p><span className="font-bold">3. Profitez :</span> Assistez à l'événement et vivez une expérience inoubliable.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Témoignages</h2>
          <blockquote className="bg-black p-4 rounded shadow mb-4">
            <p>"Grâce à EventMaster, j'ai découvert des événements incroyables dans ma ville. La réservation est super facile et rapide !" - <strong>Marie</strong></p>
          </blockquote>
          <blockquote className="bg-black p-4 rounded shadow">
            <p>"Je recommande vivement EventMaster pour sa grande variété d'événements et son interface conviviale." - <strong>Jean</strong></p>
          </blockquote>
        </section>
      </main>
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md"
        >
          Start for free
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border hover:border-blue-500">
          Documentation
        </a>
      </div>
</div>
      {/* searche bar */}
      <form class="max-w-md mx-auto md-12 ">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
          </form>
</>        
  );
};

export default HeroSection;

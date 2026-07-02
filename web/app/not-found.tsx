import Link from "next/link";

function NotFoundPage() {
  return (
    <div className='page-404 px-lg- py-header-h text-center-'>
      <div className='inner'>
        {/* <div className='h-header-height'></div> */}
        {/* <div className='h-4xl md:h-lg'></div> */}

        <h1 className='mb-md md:text-2xl-'>Oups ! Page introuvable</h1>
        <div className='mb-2xl'>
          <p>
            Il semble que cette page n’existe plus
            <br />
            ou peut-être n’a-t-elle jamais existé.
          </p>
        </div>
        <Link href='/' className='ui-btn ui-btn__accent'>
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;

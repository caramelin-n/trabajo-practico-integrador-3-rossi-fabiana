export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-yellow-400 text-black fixed bottom-0 left-0 right-0 w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm font-semibold">
            &copy; {currentYear} Fabiana Rossi. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
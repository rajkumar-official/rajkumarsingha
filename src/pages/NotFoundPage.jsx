import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFoundPage = () => (
  <main className="grid min-h-screen place-items-center px-4">
    <div className="text-center">
      <p className="gradient-text text-8xl font-bold sm:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <FiHome />
        Back to Home
      </Link>
    </div>
  </main>
);

export default NotFoundPage;

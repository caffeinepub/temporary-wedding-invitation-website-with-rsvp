import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useIsCurrentUserAdmin } from './hooks/useQueries';
import InvitationHero from './components/InvitationHero';
import InvitationDetails from './components/InvitationDetails';
import RSVPForm from './components/RSVPForm';
import AdminRSVPList from './components/AdminRSVPList';
import LoginButton from './components/LoginButton';
import { Heart } from 'lucide-react';

export default function App() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCurrentUserAdmin();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span className="font-serif text-lg text-rose-900">Our Wedding</span>
          </div>
          <LoginButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {isAuthenticated && isAdmin && !isAdminLoading ? (
          <AdminRSVPList />
        ) : (
          <>
            <InvitationHero />
            <InvitationDetails />
            <RSVPForm />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-rose-900 text-rose-50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} • Built with{' '}
            <Heart className="inline w-3 h-3 fill-rose-400 text-rose-400" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-rose-200 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

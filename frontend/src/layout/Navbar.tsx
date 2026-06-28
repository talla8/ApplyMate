import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/applications', label: 'Applications' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/profile', label: 'Profile' },
];

export function Navbar() {
  const { logout, user } = useAuth();

  return (
    <div className="rounded-[2rem] border border-brand-100 bg-white/90 p-4 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
            ApplyMate
          </p>
          <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
        </div>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
      <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
                isActive ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

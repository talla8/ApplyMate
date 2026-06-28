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
    <div className="school-panel rounded-[2rem] p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
            ApplyMate
          </p>
          <p className="text-lg font-bold text-ink-900">{user?.name}</p>
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
                isActive ? 'bg-ink-900 text-white' : 'bg-brand-50 text-ink-700'
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

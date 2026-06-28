import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/applications', label: 'Applications' },
  { to: '/applications/new', label: 'Add Application' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/profile', label: 'Profile' },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-brand-100 bg-white/90 p-6 shadow-soft lg:block">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
          ApplyMate
        </p>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-900">Track every opportunity</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-brand-100 text-brand-700'
                  : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

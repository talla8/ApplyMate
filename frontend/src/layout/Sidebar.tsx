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
    <aside className="school-panel school-paper hidden w-72 shrink-0 rounded-[2.25rem] p-6 lg:block">
      <div className="relative mb-10">
        <div className="mb-6 inline-flex rounded-full bg-accent-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-500">
          Career studio
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
          ApplyMate
        </p>
        <h1 className="mt-3 max-w-[12rem] text-3xl font-extrabold leading-tight text-ink-900">
          Track every opportunity with clarity
        </h1>
        <p className="mt-3 max-w-[14rem] text-sm leading-6 text-ink-700">
          A simple workflow for applications, follow-ups, and notes that need attention.
        </p>
      </div>
      <nav className="relative space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `block rounded-[1.4rem] px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-ink-900 text-white shadow-soft'
                  : 'bg-white/60 text-ink-700 hover:bg-brand-50 hover:text-ink-900'
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

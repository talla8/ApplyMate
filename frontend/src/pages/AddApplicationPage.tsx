import { useNavigate } from 'react-router-dom';
import { applicationsApi } from '../api/applications';
import { ApplicationForm } from '../components/ApplicationForm';
import { useAuth } from '../context/AuthContext';

export function AddApplicationPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">Add application</h2>
        <p className="mt-2 text-sm text-slate-500">Save a new job opportunity and keep the full process visible.</p>
      </div>
      <ApplicationForm
        submitLabel="Create Application"
        onSubmit={async (values) => {
          if (!token) return;
          const application = await applicationsApi.create(token, values);
          navigate(`/applications/${application.id}`);
        }}
      />
    </div>
  );
}

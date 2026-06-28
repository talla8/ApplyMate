import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { applicationsApi } from '../api/applications';
import { ApplicationForm } from '../components/ApplicationForm';
import { useAuth } from '../context/AuthContext';
import { Application } from '../types';

export function EditApplicationPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (!token || !id) return;
    applicationsApi.get(token, id).then(setApplication);
  }, [id, token]);

  if (!application) {
    return <div className="text-sm text-slate-500">Loading application...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">Edit application</h2>
        <p className="mt-2 text-sm text-slate-500">Update status, notes, deadlines, or supporting details.</p>
      </div>
      <ApplicationForm
        initialValues={application}
        submitLabel="Save Changes"
        onSubmit={async (values) => {
          if (!token || !id) return;
          await applicationsApi.update(token, id, values);
          navigate(`/applications/${id}`);
        }}
      />
    </div>
  );
}

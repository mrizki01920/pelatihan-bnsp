import { useState } from 'react';
import { z } from 'zod';

const memberSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  role: z.string().min(1, 'Pilih peran tim'),
  bio: z.string().min(10, 'Bio min 10 karakter').max(80, 'Bio maks 80 karakter'),
});

export default function AddMemberForm({ onAddMember }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError('');
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = memberSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    setSubmitError('');
    try {
      await onAddMember(result.data);
      setFormData({ name: '', email: '', role: '', bio: '' });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="add-member-form" onSubmit={handleSubmit}>
      <div className="form-title">
        <span style={{ color: '#0284c7' }}>+</span> Tambah Anggota Tim
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Nama Lengkap</label>
          <input
            type="text"
            name="name"
            placeholder="Contoh: Rina"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email Perusahaan</label>
          <input
            type="email"
            name="email"
            placeholder="rina@company.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Posisi / Peran</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? 'input-error' : ''}
          >
            <option value="">Pilih Posisi</option>
            <option value="Frontend Dev">Frontend Dev</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>

        <div className="form-group">
          <label>Bio Singkat</label>
          <input
            type="text"
            name="bio"
            placeholder="React Developer..."
            value={formData.bio}
            onChange={handleChange}
            className={errors.bio ? 'input-error' : ''}
          />
          {errors.bio && <span className="error-text">{errors.bio}</span>}
        </div>

        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting ? 'Menyimpan...' : '+ Tambah'}
        </button>
      </div>
      {submitError && <p className="error-text" role="alert">{submitError}</p>}
    </form>
  );
}
import React, { useState, useEffect } from 'react';
import './userdashboardkyc.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Userdashboardheader from '../userdashboardheader/Userdashboardheader';
import Loader from '../Loader';
import { FaUserAlt, FaCheckCircle, FaTimesCircle, FaClock, FaShieldAlt } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { FiChevronLeft, FiChevronRight, FiUpload } from 'react-icons/fi';

// Normalize whatever the backend sends into one of our 4 states
const normalizeStatus = (raw) => {
  if (!raw) return 'not_submitted';
  const s = raw.toLowerCase();
  if (['processing', 'pending', 'under_review', 'submitted', 'in_review'].includes(s)) return 'processing';
  if (['approved', 'verified', 'complete', 'completed', 'success'].includes(s))         return 'approved';
  if (['rejected', 'declined', 'failed', 'denied'].includes(s))                          return 'rejected';
  return 'not_submitted';
};

const UserdashboardKyc = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    middlename: '', dateOfBirth: '', nationality: '', city: '', address: '',
    employmentStatus: '', occupation: '', annualIncome: '', sourceOfFunds: '',
    investmentExperience: '', idType: '', idNumber: '', idExpiry: '',
    idDocumentFront: '', idDocumentBack: '', proofOfAddress: '', selfiePhoto: ''
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        const data = await (await fetch(`${route}/api/getData`, {
          headers: { 'x-access-token': token, 'Content-Type': 'application/json' }
        })).json();
        if (data.status === 'error') { localStorage.removeItem('token'); navigate('/login'); }
        else {
          setUserData(data);
          // Pre-fill form if they've submitted before (any non-fresh status)
          if (normalizeStatus(data.kycStatus) !== 'not_submitted') {
            setFormData(prev => ({
              ...prev,
              middlename: data.middlename || '', dateOfBirth: data.dateOfBirth || '',
              nationality: data.nationality || '', city: data.city || '',
              address: data.address || '', employmentStatus: data.employmentStatus || '',
              occupation: data.occupation || '', annualIncome: data.annualIncome || '',
              sourceOfFunds: data.sourceOfFunds || '',
              investmentExperience: data.investmentExperience || '',
              idType: data.idType || '', idNumber: data.idNumber || '',
              idExpiry: data.idExpiry || '', idDocumentFront: data.idDocumentFront || '',
              idDocumentBack: data.idDocumentBack || '', proofOfAddress: data.proofOfAddress || '',
              selfiePhoto: data.selfiePhoto || ''
            }));
          }
        }
      } catch { navigate('/login'); }
      finally { setLoader(false); }
    };
    getData();
  }, [navigate, route]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const uploadDocument = async (file, fieldName) => {
    setUploadingDoc(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'upload');
    try {
      const res = await (await fetch('https://api.cloudinary.com/v1_1/duesyx3zu/image/upload', { method: 'POST', body: fd })).json();
      if (res.secure_url) {
        setFormData(prev => ({ ...prev, [fieldName]: res.secure_url }));
        Swal.fire({ icon: 'success', title: 'Uploaded!', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      }
    } catch { Swal.fire('Error', 'Upload failed', 'error'); }
    finally { setUploadingDoc(false); }
  };

  const validateStep = (step) => {
    if (step === 1) return formData.middlename && formData.dateOfBirth && formData.nationality && formData.city;
    if (step === 2) return formData.employmentStatus && formData.occupation && formData.annualIncome && formData.sourceOfFunds && formData.investmentExperience;
    if (step === 3) return formData.idType && formData.idNumber && formData.idExpiry && formData.idDocumentFront && formData.idDocumentBack && formData.proofOfAddress && formData.selfiePhoto;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return Swal.fire('Incomplete', 'Please fill all required fields', 'warning');
    setCurrentStep(s => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return Swal.fire('Incomplete', 'Complete all steps and upload all documents', 'warning');
    setLoader(true);
    try {
      const res = await (await fetch(`${route}/api/submitKYC`, {
        method: 'POST',
        headers: { 'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })).json();
      if (res.status === 'ok') {
        Swal.fire('KYC Submitted!', 'Your documents are under review.', 'success').then(() => window.location.reload());
      } else {
        Swal.fire('Error', res.message || 'Submission failed', 'error');
      }
    } catch { Swal.fire('Error', 'An error occurred', 'error'); }
    finally { setLoader(false); }
  };

  const kycStatus = normalizeStatus(userData?.kycStatus);
  const isFormDisabled = kycStatus === 'approved' || kycStatus === 'processing';

  const steps = ['Personal Info', 'Financial Info', 'Documents'];

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">KYC Verification</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">

          {/* ── APPROVED STATE ── */}
          {userData && kycStatus === 'approved' && (
            <div className="kyc-verified-wrap">
              <div className="kyc-verified-hero">
                <div className="kyc-verified-icon"><FaShieldAlt /></div>
                <h2 className="kyc-verified-title">Identity Verified</h2>
                <p className="kyc-verified-sub">Your KYC has been approved. You have full access to the platform.</p>
              </div>
              <div className="ud-card kyc-verified-details">
                <h3 className="kyc-section-title">Verified Information</h3>
                <div className="kyc-detail-grid">
                  {[
                    ['Full Name',    `${userData.firstname || ''} ${userData.middlename || ''} ${userData.lastname || ''}`.trim()],
                    ['Nationality',  userData.nationality  || '—'],
                    ['Date of Birth',userData.dateOfBirth  || '—'],
                    ['City',         userData.city         || '—'],
                    ['Employment',   userData.employmentStatus || '—'],
                    ['ID Type',      userData.idType       || '—'],
                  ].map(([label, value]) => (
                    <div className="kyc-detail-item" key={label}>
                      <span className="kyc-detail-label">{label}</span>
                      <span className="kyc-detail-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PROCESSING STATE ── */}
          {userData && kycStatus === 'processing' && (
            <div className="kyc-review-wrap">
              <div className="kyc-status-banner kyc-status-review">
                <span className="kyc-status-icon"><FaClock /></span>
                <div>
                  <p className="kyc-status-label">Under Review</p>
                  <p className="kyc-status-msg">Your documents are being reviewed. This typically takes 24–48 hours.</p>
                </div>
              </div>
              <div className="ud-card kyc-review-card">
                <h3 className="kyc-section-title">Submitted Information</h3>
                <div className="kyc-detail-grid">
                  {[
                    ['Full Name',    `${userData.firstname || ''} ${userData.middlename || ''} ${userData.lastname || ''}`.trim()],
                    ['Nationality',  userData.nationality  || '—'],
                    ['Date of Birth',userData.dateOfBirth  || '—'],
                    ['City',         userData.city         || '—'],
                    ['Employment',   userData.employmentStatus || '—'],
                    ['ID Type',      userData.idType       || '—'],
                    ['ID Number',    userData.idNumber     || '—'],
                  ].map(([label, value]) => (
                    <div className="kyc-detail-item" key={label}>
                      <span className="kyc-detail-label">{label}</span>
                      <span className="kyc-detail-value">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="kyc-review-notice">
                  <FaClock style={{flexShrink:0}} />
                  You cannot edit your submission while it is under review. Contact support if you need to make changes.
                </div>
              </div>
            </div>
          )}

          {/* ── REJECTED STATE — banner + form ── */}
          {userData && kycStatus === 'rejected' && (
            <div className="kyc-status-banner kyc-status-rejected" style={{marginBottom:'28px'}}>
              <span className="kyc-status-icon"><FaTimesCircle /></span>
              <div>
                <p className="kyc-status-label">KYC Rejected</p>
                <p className="kyc-status-msg">
                  {userData?.kycRejectionReason || 'Your submission was rejected. Please correct your documents and resubmit.'}
                </p>
              </div>
            </div>
          )}

          {/* ── NOT SUBMITTED — info banner ── */}
          {userData && kycStatus === 'not_submitted' && (
            <div className="kyc-status-banner kyc-status-pending" style={{marginBottom:'28px'}}>
              <span className="kyc-status-icon"><FaClock /></span>
              <div>
                <p className="kyc-status-label">KYC Not Submitted</p>
                <p className="kyc-status-msg">Complete your KYC verification to unlock full platform access.</p>
              </div>
            </div>
          )}

          {/* ── FORM (not_submitted or rejected) ── */}
          {!isFormDisabled && userData && (
            <div className="kyc-form-wrap">
              <div className="kyc-stepper">
                {steps.map((label, idx) => {
                  const stepNum = idx + 1;
                  const done   = currentStep > stepNum;
                  const active = currentStep === stepNum;
                  return (
                    <React.Fragment key={label}>
                      <div className={`kyc-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
                        <div className="kyc-step-circle">{done ? '✓' : stepNum}</div>
                        <span className="kyc-step-label">{label}</span>
                      </div>
                      {idx < steps.length - 1 && <div className={`kyc-step-line ${done ? 'done' : ''}`} />}
                    </React.Fragment>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="kyc-form ud-card">

                {/* ── STEP 1 ── */}
                {currentStep === 1 && (
                  <div className="kyc-step-body">
                    <h3 className="kyc-step-title">Personal Information</h3>
                    <div className="kyc-grid">
                      <div className="ud-form-field"><label>First Name</label><input className="ud-form-input" type="text" value={userData?.firstname || ''} disabled /></div>
                      <div className="ud-form-field"><label>Middle Name *</label><input className="ud-form-input" type="text" name="middlename" value={formData.middlename} onChange={handleChange} required /></div>
                      <div className="ud-form-field"><label>Last Name</label><input className="ud-form-input" type="text" value={userData?.lastname || ''} disabled /></div>
                      <div className="ud-form-field"><label>Date of Birth *</label><input className="ud-form-input" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required /></div>
                      <div className="ud-form-field"><label>Nationality *</label><input className="ud-form-input" type="text" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="e.g., American" required /></div>
                      <div className="ud-form-field"><label>City *</label><input className="ud-form-input" type="text" name="city" value={formData.city} onChange={handleChange} required /></div>
                      <div className="ud-form-field kyc-full"><label>Address</label><input className="ud-form-input" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Full address" /></div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2 ── */}
                {currentStep === 2 && (
                  <div className="kyc-step-body">
                    <h3 className="kyc-step-title">Financial Information</h3>
                    <div className="kyc-grid">
                      <div className="ud-form-field">
                        <label>Employment Status *</label>
                        <select className="ud-form-select" name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} required>
                          <option value="">Select…</option>
                          {['employed','self-employed','unemployed','retired','student'].map(v =>
                            <option key={v} value={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</option>)}
                        </select>
                      </div>
                      <div className="ud-form-field"><label>Occupation *</label><input className="ud-form-input" type="text" name="occupation" value={formData.occupation} onChange={handleChange} required /></div>
                      <div className="ud-form-field">
                        <label>Annual Income *</label>
                        <select className="ud-form-select" name="annualIncome" value={formData.annualIncome} onChange={handleChange} required>
                          <option value="">Select range…</option>
                          <option value="0-25000">$0 – $25,000</option>
                          <option value="25000-50000">$25,000 – $50,000</option>
                          <option value="50000-100000">$50,000 – $100,000</option>
                          <option value="100000-250000">$100,000 – $250,000</option>
                          <option value="250000+">$250,000+</option>
                        </select>
                      </div>
                      <div className="ud-form-field">
                        <label>Source of Funds *</label>
                        <select className="ud-form-select" name="sourceOfFunds" value={formData.sourceOfFunds} onChange={handleChange} required>
                          <option value="">Select…</option>
                          {['salary','business','investment','inheritance','savings','other'].map(v =>
                            <option key={v} value={v}>{v.charAt(0).toUpperCase()+v.slice(1)}</option>)}
                        </select>
                      </div>
                      <div className="ud-form-field kyc-full">
                        <label>Investment Experience *</label>
                        <select className="ud-form-select" name="investmentExperience" value={formData.investmentExperience} onChange={handleChange} required>
                          <option value="">Select…</option>
                          <option value="beginner">Beginner (0–1 years)</option>
                          <option value="intermediate">Intermediate (1–5 years)</option>
                          <option value="advanced">Advanced (5+ years)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3 ── */}
                {currentStep === 3 && (
                  <div className="kyc-step-body">
                    <h3 className="kyc-step-title">Identity Documents</h3>
                    <div className="kyc-grid">
                      <div className="ud-form-field">
                        <label>ID Type *</label>
                        <select className="ud-form-select" name="idType" value={formData.idType} onChange={handleChange} required>
                          <option value="">Select…</option>
                          <option value="passport">Passport</option>
                          <option value="drivers_license">Driver's License</option>
                          <option value="national_id">National ID</option>
                        </select>
                      </div>
                      <div className="ud-form-field"><label>ID Number *</label><input className="ud-form-input" type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required /></div>
                      <div className="ud-form-field"><label>Expiry Date *</label><input className="ud-form-input" type="date" name="idExpiry" value={formData.idExpiry} onChange={handleChange} required /></div>
                    </div>
                    <div className="kyc-uploads">
                      {[
                        { field:'idDocumentFront', label:'ID Front *',        hint:'' },
                        { field:'idDocumentBack',  label:'ID Back *',         hint:'' },
                        { field:'proofOfAddress',  label:'Proof of Address *',hint:'Utility bill or bank statement — max 3 months old' },
                        { field:'selfiePhoto',     label:'Selfie *',          hint:'Clear face photo' },
                      ].map(({ field, label, hint }) => (
                        <div className="kyc-upload-item" key={field}>
                          <p className="kyc-upload-label">{label}</p>
                          {hint && <p className="kyc-upload-hint">{hint}</p>}
                          {formData[field]
                            ? <div className="kyc-upload-done"><FaCheckCircle /> Uploaded</div>
                            : (
                              <label className="kyc-upload-btn">
                                <FiUpload /> Choose File
                                <input type="file" accept="image/*,.pdf" style={{display:'none'}}
                                  onChange={e => e.target.files[0] && uploadDocument(e.target.files[0], field)} />
                              </label>
                            )
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="kyc-nav">
                  {currentStep > 1 && (
                    <button type="button" className="ud-btn-ghost" onClick={() => setCurrentStep(s => s - 1)}>
                      <FiChevronLeft /> Back
                    </button>
                  )}
                  {currentStep < 3
                    ? <button type="button" className="ud-btn-primary" onClick={nextStep}>Next <FiChevronRight /></button>
                    : <button type="submit" className="ud-btn-primary" disabled={uploadingDoc}>
                        {uploadingDoc ? 'Uploading…' : kycStatus === 'rejected' ? 'Resubmit KYC' : 'Submit KYC'}
                      </button>
                  }
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserdashboardKyc;

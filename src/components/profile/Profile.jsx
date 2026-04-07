import React, { useState, useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Userdashboardheader from '../userdashboardheader/Userdashboardheader';
import Loader from '../Loader';
import { FaUserAlt, FaCamera } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Profile = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        else setUserData(data);
      } catch { navigate('/login'); }
      finally { setLoader(false); }
    };
    getData();
  }, [navigate, route]);

  const uploadProfilePicture = async (file) => {
    setUploadingImage(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'upload');
    try {
      const res = await (await fetch('https://api.cloudinary.com/v1_1/duesyx3zu/image/upload', { method: 'POST', body: fd })).json();
      if (res.secure_url) {
        const update = await (await fetch(`${route}/api/updateUserData`, {
          method: 'POST',
          headers: { 'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/json' },
          body: JSON.stringify({ profilepicture: res.secure_url })
        })).json();
        if (update.status === 200) {
          setUserData({ ...userData, profilepicture: res.secure_url });
          Swal.fire({ icon: 'success', title: 'Profile picture updated!', toast: true, position: 'top-end', showConfirmButton: false, timer: 2500 });
        } else {
          Swal.fire('Error', 'Failed to save picture', 'error');
        }
      }
    } catch { Swal.fire('Error', 'Upload failed', 'error'); }
    finally { setUploadingImage(false); }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return Swal.fire('Error', 'Max image size is 5 MB', 'error');
    uploadProfilePicture(file);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return Swal.fire('Error', 'New passwords do not match', 'error');
    if (passwordData.newPassword.length < 6)
      return Swal.fire('Error', 'Password must be at least 6 characters', 'error');
    if (passwordData.currentPassword !== userData.password)
      return Swal.fire('Error', 'Current password is incorrect', 'error');

    setLoader(true);
    try {
      const res = await (await fetch(`${route}/api/updateUserData`, {
        method: 'POST',
        headers: { 'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordData.newPassword })
      })).json();
      if (res.status === 200) {
        Swal.fire('Success', 'Password updated successfully', 'success').then(() => window.location.reload());
      } else {
        Swal.fire('Error', res.message || 'Update failed', 'error');
      }
    } catch { Swal.fire('Error', 'An error occurred', 'error'); }
    finally { setLoader(false); }
  };

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Profile</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">
          <div className="prf-wrap">

            {/* ── PROFILE PICTURE CARD ── */}
            <div className="ud-card prf-pic-card">
              <h3 className="prf-card-title">Profile Picture</h3>
              <div className="prf-pic-row">
                <div className="prf-pic-frame">
                  {userData?.profilepicture
                    ? <img src={userData.profilepicture} alt="Profile" className="prf-pic-img" />
                    : <div className="prf-pic-placeholder"><FaUserAlt size={28} /></div>
                  }
                  <label htmlFor="prf-upload" className={`prf-cam-btn ${uploadingImage ? 'uploading' : ''}`}>
                    <FaCamera size={13} />
                    <input type="file" id="prf-upload" accept="image/*" onChange={handleFileChange} disabled={uploadingImage} style={{display:'none'}} />
                  </label>
                </div>
                <div className="prf-pic-info">
                  <p className="prf-name">{userData?.firstname} {userData?.lastname}</p>
                  <p className="prf-email">{userData?.email}</p>
                  <p className="prf-hint">Click the camera icon to upload · Max 5 MB</p>
                </div>
              </div>
            </div>

            {/* ── CHANGE PASSWORD CARD ── */}
            <div className="ud-card prf-pw-card">
              <h3 className="prf-card-title">Change Password</h3>
              <form onSubmit={handlePasswordSubmit}>
                {[
                  { label:'Current Password', key:'currentPassword', show:showCurrentPassword, setShow:setShowCurrentPassword },
                  { label:'New Password',      key:'newPassword',     show:showNewPassword,     setShow:setShowNewPassword },
                  { label:'Confirm Password',  key:'confirmPassword', show:showConfirmPassword, setShow:setShowConfirmPassword },
                ].map(({ label, key, show, setShow }) => (
                  <div className="ud-form-field" key={key}>
                    <label>{label}</label>
                    <div className="prf-pw-wrap">
                      <input
                        className="ud-form-input"
                        type={show ? 'text' : 'password'}
                        name={key}
                        value={passwordData[key]}
                        onChange={e => setPasswordData({...passwordData, [key]: e.target.value})}
                        placeholder="••••••••"
                        required
                        minLength="6"
                        style={{paddingRight:'44px'}}
                      />
                      <span className="prf-pw-toggle" onClick={() => setShow(!show)}>
                        {show ? <BsEye /> : <BsEyeSlash />}
                      </span>
                    </div>
                  </div>
                ))}
                <button type="submit" className="ud-btn-primary" style={{marginTop:'8px'}}>Update Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

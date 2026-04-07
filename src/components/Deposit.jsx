import React, { useState, useRef } from 'react'
import { MdOutlineContentCopy, MdOutlineDone } from 'react-icons/md'
import { BsImageFill, BsUpload } from 'react-icons/bs'
import { FiLink } from 'react-icons/fi'
import Swal from 'sweetalert2'
import Loader from './Loader'

const Toast = Swal.mixin({
  toast: true, position: 'top-end',
  showConfirmButton: false, timer: 3000, timerProgressBar: true,
})

const Deposit = ({ amount, active, close, route }) => {
  const [copied, setCopied] = useState(false)
  const [showImage, setShowImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [loader, setLoader] = useState(false)
  const clipRef = useRef(null)

  const copyAddress = () => {
    navigator.clipboard.writeText(active.wallet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const uploadProof = async (file) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'upload')
    try {
      const res = await (await fetch('https://api.cloudinary.com/v1_1/duesyx3zu/image/upload', {
        method: 'POST', body: formData,
      })).json()
      if (res.secure_url) setShowImage(res.secure_url)
    } catch {
      Toast.fire({ icon: 'error', title: 'Image upload failed' })
    } finally { setUploading(false) }
  }

  const sendProof = async (e) => {
    e.preventDefault()
    if (!showImage) return Toast.fire({ icon: 'warning', title: 'Please upload proof of payment first' })
    setLoader(true)
    try {
      const res = await (await fetch(`${route}/api/sendproof`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
        body: JSON.stringify({ amount, method: active.method }),
      })).json()

      if (res.status === 200) {
        Toast.fire({ icon: 'success', title: `Deposit of $${amount} submitted successfully!` })

        // Send confirmation emails
        const emailBase = {
          service_id: 'service_yqknanp',
          template_id: 'template_vd5j2eh',
          user_id: '0wcKB0jFnO7iPqwgZ',
        }
        await Promise.all([
          fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...emailBase, template_params: { name: res.name, email: res.email, message: res.message, reply_to: 'saxomanagements@gmail.com', subject: res.subject } }),
          }),
          fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...emailBase, template_params: { name: 'Bro', email: 'saxomanagements@gmail.com', message: res.adminMessage, reply_to: res.email, subject: res.adminSubject } }),
          }),
        ])
      } else if (res.status === 500) {
        Toast.fire({ icon: 'error', title: 'User not found' })
      } else {
        Toast.fire({ icon: 'error', title: 'Internal server error' })
      }
    } catch {
      Toast.fire({ icon: 'error', title: 'An error occurred' })
    } finally { setLoader(false) }
  }

  return (
    <div className="dep-wrap">
      {loader && <Loader />}

      <div className="ud-section-header">
        <h2>Deposit Address</h2>
        <p>Send your payment to the address below, then upload proof</p>
      </div>

      <div className="ud-card dep-address-card">
        {/* Amount notice */}
        <div className="dep-amount-notice">
          You have requested <strong>${amount} USD</strong>. Please send exactly{' '}
          <strong>${amount} USD</strong> worth of <strong>{active.method}</strong> to the address below.
        </div>

        {/* Wallet address */}
        <div>
          <p className="dep-address-label">
            <FiLink style={{display:'inline', marginRight:'6px'}} />
            {active.method} Wallet Address
          </p>
          <div className="dep-copy-row">
            <input
              ref={clipRef}
              readOnly
              value={active.wallet}
              className="dep-address-input"
            />
            <button className={`dep-copy-btn ${copied ? 'dep-copied' : ''}`} onClick={copyAddress}>
              {copied ? <><MdOutlineDone /> Copied!</> : <><MdOutlineContentCopy /> Copy</>}
            </button>
          </div>
        </div>

        {/* Proof upload */}
        <form onSubmit={sendProof} className="dep-proof-section">
          <p className="dep-address-label">Upload Proof of Payment</p>

          <div className="dep-proof-preview">
            {uploading ? (
              <div className="dep-uploading-badge">Uploading image…</div>
            ) : showImage ? (
              <img src={showImage} alt="Proof" />
            ) : (
              <div className="dep-proof-placeholder">
                <BsImageFill />
                <span>No image selected</span>
              </div>
            )}
          </div>

          <label htmlFor="dep-proof-file" className="dep-upload-label">
            <BsUpload /> Choose Image
            <input
              type="file"
              id="dep-proof-file"
              accept=".jpg,.png,.svg,.webp,.jpeg"
              style={{ display: 'none' }}
              onChange={e => { if (e.target.files[0]) uploadProof(e.target.files[0]) }}
            />
          </label>

          <button type="submit" className="ud-btn-primary" style={{ width: '100%', justifyContent: 'center', height: '48px' }}>
            Submit Proof of Payment
          </button>
        </form>
      </div>
    </div>
  )
}

export default Deposit

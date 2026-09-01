import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import logoImg from './logo.png';

const LEVEL_OPTIONS = [
  '100 Level',
  '200 Level',
  '300 Level',
  '400 Level',
  '500 Level',
  'Graduate',
  'Other'
];

const REFERRAL_OPTIONS = [
  'WhatsApp',
  'Facebook',
  'Instagram',
  'Friend / Referral',
  'School',
  'Flyer / Poster',
  'Other'
];

// --- PUBLIC REGISTRATION PAGE ---
function Registration() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    school: '',
    level: '100 Level',
    department: '',
    address: '',
    reason_for_joining: '',
    referral_source: 'WhatsApp',
    active_participation: false,
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (!formData.consent || !formData.active_participation) {
      setErrorMessage(
        'You must agree to active participation and data processing to continue.'
      );
      return;
    }

    if (!supabase) {
      setErrorMessage(
        'Registration service is currently unavailable. Please try again later.'
      );
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([formData]);

      if (error) {
        console.error('Supabase Error:', error);

        if (error.code === '23505') {
          setErrorMessage(
            'A registration with this phone number or email already exists.'
          );
        } else {
          setErrorMessage(
            'Unable to submit your registration. Please check your connection and try again.'
          );
        }
      } else {
        setSubmitted(true);
      }

    } catch (err) {
      console.error('Network Error:', err);
      setErrorMessage(
        'A network error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">

          <img
            src={logoImg}
            alt="DIGITREE"
            className="h-24 w-auto mx-auto mb-6 object-contain"
          />

          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ✓
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful
          </h2>

          <p className="text-gray-600 mb-8">
            Thank you for registering for the DIGITREE Data Analysis Basic Training Program. Further information will be communicated to you.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-digitree-700 text-white py-3 rounded-xl font-medium"
          >
            Return Home
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">

      <div className="max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        <div className="bg-white px-6 py-8 sm:p-10 border-b border-gray-100 text-center">

          <img
            src={logoImg}
            alt="DIGITREE"
            className="h-28 w-auto mx-auto mb-6 object-contain"
          />

          <h1 className="text-2xl sm:text-3xl font-bold text-digitree-900">
            DIGITREE DATA ANALYSIS
            <br />
            BASIC TRAINING PROGRAM
          </h1>

          <p className="text-gray-500 mt-3">
            Please complete this form to secure your place.
          </p>

        </div>      if (error) {
        if (error.code === '23505') setErrorMessage('A registration with this phone number or email already exists.');
        else setErrorMessage('Unable to submit your registration. Please check your connection and try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 animate-slide-up">
          <img src={logoImg} alt="DIGITREE" className="h-24 w-auto mx-auto mb-6 object-contain" />
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for registering for the DIGITREE Data Analysis Basic Training Program. Further information will be communicated to you.
          </p>
          <button onClick={() => window.location.reload()} className="w-full bg-digitree-700 text-white py-3 rounded-xl font-medium hover:bg-digitree-600 transition-all transform hover:-translate-y-0.5 shadow-md">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-slide-up">
        
        {/* Header Section */}
        <div className="bg-white px-6 py-8 sm:p-10 border-b border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-digitree-500 to-digitree-700"></div>
          <img src={logoImg} alt="DIGITREE" className="h-28 w-auto mx-auto mb-6 object-contain animate-fade-in" />
          <h1 className="text-2xl sm:text-3xl font-bold text-digitree-900 tracking-tight mb-2">
            DIGITREE DATA ANALYSIS<br className="hidden sm:block" /> BASIC TRAINING PROGRAM
          </h1>
          <p className="text-gray-500">Please complete this form to secure your place.</p>
        </div>

        {/* Form Section */}
        <div className="px-6 py-8 sm:p-10">
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md animate-fade-in">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input required type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-digitree-500 focus:border-transparent transition-all duration-200 outline-none" placeholder="e.g. John Doe" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-digitree-500 focus:border-transparent transition-all duration-200 outline-none" placeholder="080..." />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Email Address (Optional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-digitree-500 focus:border-transparent transition-all duration-200 outline-none" placeholder="your@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">School / Institution *</label>
                <input required type="text" name="school" value={formData.school} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-digitree-500 focus:border-transparent transition-all duration-200 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Level *</label>
                <select name="level" value={formData.level} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-digitree-500 focus:border-transparent transition-all duration-200 outline-none appearance-none">
                  {LEVEL_OPTIONS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Department / Course of Study *</label>
              <input required type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-digitree-500 focus:border-transparent transition-all duration-200 outline-none" />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Address / Location *</label>
              <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-digitree-500 focus:border-transparent transition-all duration-200 outline-none" />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Why do you want to join this training? *</label>
              <textarea required rows={3} name="reason_for_joining" value={formData.reason_for_joining} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-digitree-500 focus:border-transparent transition-all duration-200 outline-none resize-none" />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">How did you hear about this training? *</label>
              <select name="referral_source" value={formData.referral_source} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-digitree-500 focus:border-transparent transition-all duration-200 outline-none appearance-none">
                {REFERRAL_OPTIONS.map(ref => <option key={ref} value={ref}>{ref}</option>)}
              </select>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="flex-shrink-0 mt-1">
                  <input required type="checkbox" name="active_participation" checked={formData.active_participation} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-digitree-600 focus:ring-digitree-500" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">I confirm that I am willing to participate actively throughout the training program. *</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="flex-shrink-0 mt-1">
                  <input required type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-digitree-600 focus:ring-digitree-500" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">I consent to the collection and processing of my submitted details for the purposes of this training. *</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-digitree-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-digitree-600 transition-all transform hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(0,51,160,0.39)] hover:shadow-[0_6px_20px_rgba(0,51,160,0.23)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4">
              {loading ? 'Processing Registration...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- APP ENTRY & ROUTING ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

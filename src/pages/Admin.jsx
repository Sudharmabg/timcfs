import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Admin.css';

const Admin = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  // New Update Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Check initial auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Fetch initial menu visibility
    const fetchConfig = async () => {
      const { data } = await supabase
        .from('site_config')
        .select('config_value')
        .eq('config_key', 'latest_updates_visible')
        .single();
      if (data) setIsMenuVisible(data.config_value === 'true');
    };
    fetchConfig();

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = () => supabase.auth.signOut();

  const toggleMenuVisibility = async () => {
    const newValue = !isMenuVisible;
    const { error } = await supabase
      .from('site_config')
      .update({ config_value: String(newValue) })
      .eq('config_key', 'latest_updates_visible');

    if (!error) setIsMenuVisible(newValue);
    else alert('Error updating visibility: ' + error.message);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!imageFile || !title) return alert('Please provide a title and an image.');

    try {
      setUploading(true);

      // 1. Upload Image to Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `updates/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('updates')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('updates')
        .getPublicUrl(filePath);

      // 3. Insert into Database
      const { error: dbError } = await supabase
        .from('latest_updates')
        .insert([{ title, description, image_url: publicUrl }]);

      if (dbError) throw dbError;

      alert('Update posted successfully! ✨');
      // Reset Form
      setTitle('');
      setDescription('');
      setImageFile(null);
      e.target.reset();

    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!session) {
    return (
      <div className="admin-page">
        <Header />
        <main className="admin-login-container">
          <form className="admin-login-form" onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Enter Dashboard'}
            </button>
          </form>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <Header />
      <main className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>

        {/* SECTION 1: GLOBAL SETTINGS */}
        <section className="dashboard-section">
          <h2>Global Site Controls</h2>
          <div className="control-card">
            <div className="control-info">
              <h3>Latest Updates Link</h3>
              <p>Show or hide the "Latest Updates" menu item in the website header.</p>
            </div>
            <button 
              className={`toggle-btn ${isMenuVisible ? 'on' : 'off'}`} 
              onClick={toggleMenuVisibility}
            >
              {isMenuVisible ? 'Currently VISIBLE' : 'Currently HIDDEN'}
            </button>
          </div>
        </section>

        {/* SECTION 2: ADD NEW UPDATE */}
        <section className="dashboard-section">
          <h2>Post a New Update</h2>
          <form className="update-form" onSubmit={handleSubmitUpdate}>
            <div className="form-group">
              <label>Headline Title</label>
              <input 
                type="text" 
                placeholder="Ex: Winners of our Spring Cup!" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <textarea 
                rows="4" 
                placeholder="Give more details about this news..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Update Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setImageFile(e.target.files[0])} 
                required 
              />
              <p className="helper-text">This will be uploaded to Supabase Storage</p>
            </div>
            <button type="submit" className="post-btn" disabled={uploading}>
              {uploading ? 'Processing & Uploading...' : '✨ Publish Update Now'}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

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
  const [allUpdates, setAllUpdates] = useState([]);
  
  // Hero Slide 3 State
  const [hero3Enabled, setHero3Enabled] = useState(false);
  const [hero3Url, setHero3Url] = useState('');
  const [hero3File, setHero3File] = useState(null);

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

    const fetchConfig = async () => {
      // 1. Menu Visibility
      const { data: menuData } = await supabase
        .from('site_config')
        .select('config_value')
        .eq('config_key', 'latest_updates_visible')
        .single();
      if (menuData) setIsMenuVisible(menuData.config_value === 'true');

      // 2. Hero 3 Config
      const { data: heroEnabledData } = await supabase
        .from('site_config')
        .select('config_value')
        .eq('config_key', 'hero_slide_3_enabled')
        .single();
      if (heroEnabledData) setHero3Enabled(heroEnabledData.config_value === 'true');

      const { data: heroUrlData } = await supabase
        .from('site_config')
        .select('config_value')
        .eq('config_key', 'hero_slide_3_url')
        .single();
      if (heroUrlData) setHero3Url(heroUrlData.config_value);
    };

    fetchConfig();
    fetchUpdates();

    return () => subscription.unsubscribe();
  }, []);

  const fetchUpdates = async () => {
    const { data } = await supabase
      .from('latest_updates')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setAllUpdates(data);
  };

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

  const toggleHero3Visibility = async () => {
    const newValue = !hero3Enabled;
    const { error } = await supabase
      .from('site_config')
      .update({ config_value: String(newValue) })
      .eq('config_key', 'hero_slide_3_enabled');

    if (!error) setHero3Enabled(newValue);
    else alert('Error updating hero visibility: ' + error.message);
  };

  const handleHero3Upload = async (e) => {
    e.preventDefault();
    if (!hero3File) return alert('Please select an image first.');

    setUploading(true);
    try {
      const fileExt = hero3File.name.split('.').pop();
      const fileName = `hero_3_${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('updates') // reuse bucket
        .upload(filePath, hero3File);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('updates')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('site_config')
        .update({ config_value: publicUrl })
        .eq('config_key', 'hero_slide_3_url');
      if (dbError) throw dbError;

      setHero3Url(publicUrl);
      alert('Hero Slide 3 updated successfully! 🚀');
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteUpdate = async (id) => {
    if (!window.confirm('Delete this post permanently?')) return;
    const { error } = await supabase.from('latest_updates').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchUpdates();
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!imageFile || !title) return alert('Please provide a title and an image.');

    try {
      setUploading(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `updates/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('updates')
        .upload(filePath, imageFile);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('updates')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('latest_updates')
        .insert([{ title, description, image_url: publicUrl }]);
      if (dbError) throw dbError;

      alert('Update posted successfully! ✨');
      setTitle('');
      setDescription('');
      setImageFile(null);
      e.target.reset();
      fetchUpdates();
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

        {/* HERO SLIDE MANAGEMENT */}
        <section className="dashboard-section">
          <h2>Hero Carousel Management</h2>
          <div className="control-card hero-control">
            <div className="control-info">
              <h3>Third Image Slide</h3>
              <p>Add a third image slide to the main hero homepage.</p>
              {hero3Url && (
                <div className="hero-preview">
                  <p>Current Slide 3 Image:</p>
                  <img src={hero3Url} alt="Hero Slide 3 Preview" style={{ width: '100px', borderRadius: '8px' }} />
                </div>
              )}
            </div>
            <div className="hero-actions">
              <button 
                className={`toggle-btn ${hero3Enabled ? 'on' : 'off'}`} 
                onClick={toggleHero3Visibility}
              >
                {hero3Enabled ? 'Currently ENABLED' : 'Currently DISABLED'}
              </button>
              
              <div className="hero-upload-miniform">
                <input type="file" accept="image/*" onChange={(e) => setHero3File(e.target.files[0])} />
                <button onClick={handleHero3Upload} disabled={uploading}>
                  {uploading ? 'Processing...' : 'Replace Slide 3 Image'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* GLOBAL SETTINGS */}
        <section className="dashboard-section">
          <h2>Latest Updates Visibility</h2>
          <div className="control-card">
            <div className="control-info">
              <h3>Header Link</h3>
              <p>Show or hide the "Latest Updates" menu item.</p>
            </div>
            <button 
              className={`toggle-btn ${isMenuVisible ? 'on' : 'off'}`} 
              onClick={toggleMenuVisibility}
            >
              {isMenuVisible ? 'Currently VISIBLE' : 'Currently HIDDEN'}
            </button>
          </div>
        </section>

        {/* POST NEWS */}
        <section className="dashboard-section">
          <h2>Post a New Update</h2>
          <form className="update-form" onSubmit={handleSubmitUpdate}>
            <div className="form-group">
              <label>Headline Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label>Update Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />
            </div>
            <button type="submit" className="post-btn" disabled={uploading}>
              {uploading ? 'Publishing...' : '✨ Publish Update'}
            </button>
          </form>
        </section>

        {/* MANAGE NEWS */}
        <section className="dashboard-section">
          <h2>Manage Existing Updates</h2>
          <div className="updates-list">
            {allUpdates.map(u => (
              <div key={u.id} className="update-item">
                <img src={u.image_url} alt="" />
                <div className="update-info">
                  <h4>{u.title}</h4>
                  <p>{new Date(u.created_at).toLocaleDateString()}</p>
                </div>
                <button className="del-btn" onClick={() => handleDeleteUpdate(u.id)}>Delete</button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;


import React, { useState, useEffect } from 'react';
import { MOCK_PARCELS, ICONS, NOTIFICATIONS } from './constants';
import TrackingCard from './components/TrackingCard';
import AnalyticsBoard from './components/AnalyticsBoard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracking' | 'analytics'>('tracking');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredParcels = MOCK_PARCELS.filter(p => 
    p.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-red-50">
      {/* Dynamic Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass-panel border-b border-stone-200 shadow-sm' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-india-post-red text-white p-2.5 rounded-2xl shadow-xl shadow-red-200">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/India_Post_Logo.svg/1200px-India_Post_Logo.svg.png" className="w-8 h-8 object-contain brightness-0 invert" alt="Logo" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter">India Post</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Logistics Core</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8">
              {['Tracking', 'Analytics'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase() as any)}
                  className={`text-xs font-black uppercase tracking-widest transition-colors ${
                    activeTab === tab.toLowerCase() ? 'text-india-post-red' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <div className="h-6 w-px bg-stone-200 hidden md:block"></div>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-900 hover:scale-110 transition-transform"
            >
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeTab === 'tracking' && (
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] mb-12">
              The future of <span className="text-india-post-red">Post</span> is here.
            </h2>
            
            {/* Minimal & Catchy Search Box */}
            <div className="relative group max-w-3xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-india-post-red to-red-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-4 shadow-2xl items-center border border-stone-100">
                <div className="flex-1 w-full relative">
                  <ICONS.Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6" />
                  <input 
                    type="text" 
                    placeholder="Enter Consignment Number..." 
                    className="w-full pl-16 pr-6 py-6 bg-transparent text-2xl font-black text-slate-900 placeholder:text-stone-200 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="w-full md:w-auto px-10 py-6 bg-india-post-red text-white text-lg font-black uppercase tracking-widest rounded-[2rem] hover:bg-slate-900 transition-all shadow-xl shadow-red-100 active:scale-95">
                  Track
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        {activeTab === 'tracking' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredParcels.map(parcel => (
              <TrackingCard key={parcel.id} parcel={parcel} />
            ))}
            
            <button className="h-[400px] border-2 border-dashed border-stone-200 rounded-[2rem] flex flex-col items-center justify-center gap-6 text-stone-300 hover:border-india-post-red hover:text-india-post-red hover:bg-white transition-all active:scale-[0.98]">
              <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">New Consignment</span>
            </button>
          </div>
        ) : (
          <div className="pt-24 animate-in slide-in-from-bottom-10 duration-700">
            <AnalyticsBoard />
          </div>
        )}
      </main>

      {/* Notification Drawer */}
      {showNotifications && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" onClick={() => setShowNotifications(false)}></div>
          <div className="fixed right-6 top-24 w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl z-[70] border border-stone-100 overflow-hidden animate-in slide-in-from-right-10">
            <div className="p-8 border-b border-stone-50 flex justify-between items-center bg-stone-50/50">
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-900">Live Logistics Stream</h3>
              <button onClick={() => setShowNotifications(false)} className="text-slate-300 hover:text-slate-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {NOTIFICATIONS.map(n => (
                <div key={n.id} className="p-5 rounded-3xl bg-white border border-stone-100 hover:shadow-md transition-shadow group">
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${n.type === 'weather' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
                      {n.type === 'weather' ? <ICONS.Cloud className="w-5 h-5" /> : <ICONS.Traffic className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-snug">{n.message}</p>
                      <p className="text-[10px] font-black text-slate-300 uppercase mt-2 tracking-tighter">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-stone-50/50">
              <button className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-india-post-red transition-all">Clear All History</button>
            </div>
          </div>
        </>
      )}

      {/* Status Bar */}
      <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-stone-100 py-4 px-8 z-40 hidden md:flex justify-between items-center">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Hubs Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">High Traffic: NH44</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">99.2% Prediction Accuracy</span>
          <div className="w-24 h-1 bg-stone-100 rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-india-post-red"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

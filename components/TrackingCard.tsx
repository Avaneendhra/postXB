
import React, { useState } from 'react';
import { Parcel, PredictionResult, DeliveryStatus, RiskLevel } from '../types';
import { ICONS } from '../constants';
import { getAdvancedPredictiveInsights, getMapsContext, getSearchGrounding } from '../services/gemini';

interface TrackingCardProps {
  parcel: Parcel;
}

const TrackingCard: React.FC<TrackingCardProps> = ({ parcel }) => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [grounding, setGrounding] = useState<{ maps: string[], search: string[] }>({ maps: [], search: [] });
  const [loading, setLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setShowAI(true);
    try {
      const [aiResult, mapsData, searchData] = await Promise.all([
        getAdvancedPredictiveInsights(parcel),
        getMapsContext(parcel.currentLocation, parcel.destination),
        getSearchGrounding(`${parcel.currentLocation} to ${parcel.destination} logistics`)
      ]);
      setPrediction(aiResult);
      setGrounding({ maps: mapsData.links, search: searchData.links });
    } catch (error) {
      console.error("Advanced AI Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level?: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return 'text-emerald-500 bg-emerald-50';
      case RiskLevel.MEDIUM: return 'text-amber-500 bg-amber-50';
      case RiskLevel.HIGH: return 'text-orange-500 bg-orange-50';
      case RiskLevel.CRITICAL: return 'text-red-500 bg-red-50';
      default: return 'text-slate-400 bg-slate-50';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(218,37,28,0.1)]">
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-india-post-red text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-100">
              <ICONS.Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{parcel.carrier}</p>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">{parcel.trackingId}</h3>
            </div>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            parcel.status === DeliveryStatus.DELAYED ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
          }`}>
            {parcel.status}
          </span>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <p className="text-slate-500">Last seen: <span className="font-bold text-slate-800">{parcel.currentLocation}</span></p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-india-post-red animate-pulse"></div>
            <p className="text-slate-500">Destination: <span className="font-bold text-slate-800">{parcel.destination}</span></p>
          </div>
        </div>

        <button 
          onClick={handlePredict}
          className="w-full group py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-india-post-red transition-all active:scale-[0.98] shadow-xl shadow-slate-100"
        >
          <ICONS.Brain className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Deep Analysis & Live Maps</span>
        </button>
      </div>

      {showAI && (
        <div className="bg-stone-50 border-t border-stone-100 p-8 space-y-6 animate-in slide-in-from-top duration-500">
          {loading ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-12 h-12 border-[3px] border-india-post-red border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Consulting India Post Intelligence...</p>
              <p className="text-xs text-slate-400 mt-2">Thinking about traffic, weather, and hub congestion...</p>
            </div>
          ) : prediction ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ICONS.Brain className="w-4 h-4 text-india-post-red" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Logic Report</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getRiskColor(prediction.riskLevel)}`}>
                  {prediction.riskLevel} Risk
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-stone-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Arrival Expectation</p>
                  <p className="text-sm font-bold text-slate-900">{prediction.estimatedArrival}</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-stone-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Success Probability</p>
                  <p className="text-sm font-bold text-slate-900">{((1 - prediction.delayProbability) * 100).toFixed(0)}%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-white rounded-2xl border border-blue-50 flex gap-4 items-start">
                  <ICONS.Cloud className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-[10px] font-bold text-blue-400 uppercase">Weather Impact</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{prediction.externalFactors.weather}</p>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-orange-50 flex gap-4 items-start">
                  <ICONS.Traffic className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <p className="text-[10px] font-bold text-orange-400 uppercase">Traffic & NH Status</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{prediction.externalFactors.traffic}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-india-post-red/5 rounded-3xl border border-red-100">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {prediction.reasoning}
                </p>
              </div>

              {grounding.maps.length > 0 && (
                <div className="pt-4 border-t border-stone-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">Live Map Verifications</p>
                  <div className="flex flex-wrap gap-2">
                    {grounding.maps.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener" className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-[10px] font-bold text-blue-600 hover:border-blue-200 transition-colors flex items-center gap-2">
                        View Route Map {i + 1}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TrackingCard;

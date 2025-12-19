
import React from 'react';
import { Parcel, DeliveryStatus, HistoricalData } from './types';

export const MOCK_PARCELS: Parcel[] = [
  {
    id: '1',
    trackingId: 'IP-MH-4001-A2',
    origin: 'Mumbai, Maharashtra',
    destination: 'Bengaluru, Karnataka',
    status: DeliveryStatus.IN_TRANSIT,
    currentLocation: 'Pune Hub, MH',
    expectedDelivery: '2024-12-22T12:00:00Z',
    carrier: 'India Post Speed Post',
    history: [
      { timestamp: '2024-12-18T10:00:00Z', location: 'Mumbai GPO', description: 'Item Booked' },
      { timestamp: '2024-12-19T04:00:00Z', location: 'Mumbai RMS', description: 'Item Dispatched' },
      { timestamp: '2024-12-19T18:30:00Z', location: 'Pune Hub', description: 'Item Received' }
    ]
  },
  {
    id: '2',
    trackingId: 'IP-DL-1100-B9',
    origin: 'New Delhi, DL',
    destination: 'Kolkata, WB',
    status: DeliveryStatus.DELAYED,
    currentLocation: 'Varanasi sorting center',
    expectedDelivery: '2024-12-21T10:00:00Z',
    carrier: 'India Post Registered Post',
    history: [
      { timestamp: '2024-12-17T12:00:00Z', location: 'New Delhi GPO', description: 'Item Booked' },
      { timestamp: '2024-12-18T22:00:00Z', location: 'Varanasi', description: 'Delayed due to heavy fog' }
    ]
  },
  {
    id: '3',
    trackingId: 'IP-TN-6000-C5',
    origin: 'Chennai, TN',
    destination: 'Hyderabad, TS',
    status: DeliveryStatus.OUT_FOR_DELIVERY,
    currentLocation: 'Hyderabad Jubilee Hills',
    expectedDelivery: '2024-12-20T17:00:00Z',
    carrier: 'India Post Speed Post',
    history: [
      { timestamp: '2024-12-18T09:00:00Z', location: 'Chennai Sorting', description: 'Dispatched' },
      { timestamp: '2024-12-19T20:00:00Z', location: 'Hyderabad Hub', description: 'Received' }
    ]
  }
];

export const HISTORICAL_STATS: HistoricalData[] = [
  { date: '12 Dec', avgDelay: 2, volume: 45000, onTimeRate: 92 },
  { date: '13 Dec', avgDelay: 4, volume: 52000, onTimeRate: 88 },
  { date: '14 Dec', avgDelay: 7, volume: 68000, onTimeRate: 82 },
  { date: '15 Dec', avgDelay: 5, volume: 75000, onTimeRate: 85 },
  { date: '16 Dec', avgDelay: 3, volume: 58000, onTimeRate: 94 },
  { date: '17 Dec', avgDelay: 6, volume: 62000, onTimeRate: 87 },
  { date: '18 Dec', avgDelay: 2, volume: 55000, onTimeRate: 96 },
];

export const NOTIFICATIONS = [
  { id: 1, type: 'weather', message: 'Heavy fog in North India may delay Delhi-bound shipments.', time: '2h ago' },
  { id: 2, type: 'traffic', message: 'Traffic congestion on Mumbai-Pune Expressway: Expect 3h logistics delay.', time: '4h ago' },
  { id: 3, type: 'update', message: 'Your parcel IP-MH-4001-A2 arrived at Pune Hub.', time: '6h ago' },
];

export const ICONS = {
  Truck: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><circle cx="7" cy="18" r="2"/><path d="M9 18h6"/><circle cx="17" cy="18" r="2"/><path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-3h-3v9"/><path d="M13 9h4"/></svg>
  ),
  Alert: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
  Check: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 6 9 17l-5-5"/></svg>
  ),
  Cloud: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.5 19x0a7 7 0 1 1-6.71-9h1.71a4.5 4.5 0 1 1 5 8.27"/><path d="M12 13v8"/><path d="M8 17l4 4 4-4"/></svg>
  ),
  Traffic: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="7" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="17" r="2"/></svg>
  ),
  Search: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Brain: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 5.888A3 3 0 1 0 9 19h6a3 3 0 1 0 4.003-2.217 4 4 0 0 0 .52-5.888 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M15 13a4.5 4.5 0 0 1-3-4"/><path d="M12 13V8"/></svg>
  )
};

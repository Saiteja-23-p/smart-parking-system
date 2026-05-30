import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, DollarSign, Compass, Search, Loader } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ParkingHub } from '../types';
import { parkingService } from '../services/parkingService';

const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

export const MapDiscovery: React.FC = () => {
  const navigate = useNavigate();
  const [hubs, setHubs] = useState<ParkingHub[]>([]);
  const [selectedHub, setSelectedHub] = useState<ParkingHub | null>(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([17.4346, 78.3866]); // Mindspace, Madhapur, Hyderabad
  const [searchQuery, setSearchQuery] = useState('');

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const defaultMockHubs: ParkingHub[] = [
    {
      id: 1,
      hubName: 'Inorbit Mall Smart Hub',
      address: 'Mindspace, Madhapur, Hyderabad, India',
      city: 'Hyderabad',
      latitude: 17.4346,
      longitude: 78.3866,
      hubType: 'MALL',
      totalCapacity: 200,
      totalFloors: 3,
      rating: 4.8,
      evEnabled: true,
      availableSlots: 62,
      totalSlots: 200,
      distanceKm: 0.8,
      lowestPrice: 50.0
    },
    {
      id: 2,
      hubName: 'GVK One Premium Parking',
      address: 'Banjara Hills, Hyderabad, India',
      city: 'Hyderabad',
      latitude: 17.4184,
      longitude: 78.4485,
      hubType: 'COMMERCIAL',
      totalCapacity: 150,
      totalFloors: 2,
      rating: 4.7,
      evEnabled: true,
      availableSlots: 15,
      totalSlots: 150,
      distanceKm: 4.2,
      lowestPrice: 70.0
    },
    {
      id: 3,
      hubName: 'T-Hub Innovation Parking',
      address: 'Raidurg, Hyderabad, India',
      city: 'Hyderabad',
      latitude: 17.4384,
      longitude: 78.3756,
      hubType: 'COMMERCIAL',
      totalCapacity: 100,
      totalFloors: 1,
      rating: 4.9,
      evEnabled: true,
      availableSlots: 48,
      totalSlots: 100,
      distanceKm: 1.2,
      lowestPrice: 40.0
    },
    {
      id: 11,
      hubName: 'Korutla Bus Stand Parking',
      address: 'Bus Stand Rd, Korutla, Telangana, India',
      city: 'Korutla',
      latitude: 18.8242,
      longitude: 78.7128,
      hubType: 'COMMERCIAL',
      totalCapacity: 100,
      totalFloors: 1,
      rating: 4.6,
      evEnabled: true,
      availableSlots: 32,
      totalSlots: 100,
      distanceKm: 0.1,
      lowestPrice: 30.0
    },
    {
      id: 12,
      hubName: 'Korutla Shopping Complex',
      address: 'Main Road, Korutla, Telangana, India',
      city: 'Korutla',
      latitude: 18.8214,
      longitude: 78.7145,
      hubType: 'MALL',
      totalCapacity: 120,
      totalFloors: 2,
      rating: 4.7,
      evEnabled: true,
      availableSlots: 45,
      totalSlots: 120,
      distanceKm: 0.4,
      lowestPrice: 40.0
    },
    {
      id: 13,
      hubName: 'Korutla Metro-Mart Terminal',
      address: 'Metpally Rd, Korutla, Telangana, India',
      city: 'Korutla',
      latitude: 18.8270,
      longitude: 78.7080,
      hubType: 'MALL',
      totalCapacity: 150,
      totalFloors: 2,
      rating: 4.5,
      evEnabled: true,
      availableSlots: 88,
      totalSlots: 150,
      distanceKm: 0.9,
      lowestPrice: 40.0
    },
    {
      id: 14,
      hubName: 'Korutla Smart Market Hub',
      address: 'Ganesh Temple Road, Korutla, Telangana, India',
      city: 'Korutla',
      latitude: 18.8185,
      longitude: 78.7160,
      hubType: 'STREET',
      totalCapacity: 50,
      totalFloors: 1,
      rating: 4.3,
      evEnabled: false,
      availableSlots: 18,
      totalSlots: 50,
      distanceKm: 1.1,
      lowestPrice: 20.0
    },
    {
      id: 4,
      hubName: 'Airport Smart Park',
      address: 'Shamshabad, Hyderabad, India',
      city: 'Hyderabad',
      latitude: 17.2315,
      longitude: 78.4294,
      hubType: 'AIRPORT',
      totalCapacity: 500,
      totalFloors: 5,
      rating: 4.6,
      evEnabled: true,
      availableSlots: 215,
      totalSlots: 500,
      distanceKm: 24.5,
      lowestPrice: 60.0
    },
    {
      id: 5,
      hubName: 'Charminar Tourist Parking',
      address: 'Charminar, Hyderabad, India',
      city: 'Hyderabad',
      latitude: 17.3616,
      longitude: 78.4747,
      hubType: 'STREET',
      totalCapacity: 50,
      totalFloors: 1,
      rating: 4.4,
      evEnabled: false,
      availableSlots: 12,
      totalSlots: 50,
      distanceKm: 9.8,
      lowestPrice: 15.0
    },
    {
      id: 6,
      hubName: 'UB City Mall Parking',
      address: 'Vittal Mallya Rd, Bengaluru, India',
      city: 'Bengaluru',
      latitude: 12.9724,
      longitude: 77.5951,
      hubType: 'MALL',
      totalCapacity: 250,
      totalFloors: 4,
      rating: 4.8,
      evEnabled: true,
      availableSlots: 182,
      totalSlots: 250,
      distanceKm: 500.0,
      lowestPrice: 60.0
    },
    {
      id: 7,
      hubName: 'Connaught Place Smart CP',
      address: 'New Delhi, India',
      city: 'New Delhi',
      latitude: 28.6304,
      longitude: 77.2177,
      hubType: 'STREET',
      totalCapacity: 80,
      totalFloors: 1,
      rating: 4.5,
      evEnabled: false,
      availableSlots: 42,
      totalSlots: 80,
      distanceKm: 1200.0,
      lowestPrice: 40.0
    },
    {
      id: 8,
      hubName: 'Piccadilly Circus Terminal',
      address: 'West End, London, UK',
      city: 'London',
      latitude: 51.5101,
      longitude: -0.1342,
      hubType: 'COMMERCIAL',
      totalCapacity: 150,
      totalFloors: 2,
      rating: 4.7,
      evEnabled: true,
      availableSlots: 55,
      totalSlots: 150,
      distanceKm: 7800.0,
      lowestPrice: 120.0
    },
    {
      id: 9,
      hubName: 'Times Square Smart Hub',
      address: 'Manhattan, New York, USA',
      city: 'New York',
      latitude: 40.7580,
      longitude: -73.9855,
      hubType: 'COMMERCIAL',
      totalCapacity: 300,
      totalFloors: 3,
      rating: 4.9,
      evEnabled: true,
      availableSlots: 91,
      totalSlots: 300,
      distanceKm: 13000.0,
      lowestPrice: 150.0
    },
    {
      id: 10,
      hubName: 'SF Wharf Station Parking',
      address: 'Fisherman\'s Wharf, San Francisco, USA',
      city: 'San Francisco',
      latitude: 37.8080,
      longitude: -122.4177,
      hubType: 'COMMERCIAL',
      totalCapacity: 100,
      totalFloors: 1,
      rating: 4.6,
      evEnabled: true,
      availableSlots: 38,
      totalSlots: 100,
      distanceKm: 14000.0,
      lowestPrice: 100.0
    }
  ];

  useEffect(() => {
    // Attempt browser HTML5 Geolocation to dynamically center and calculate distances
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Detected client geolocation: lat=${latitude}, lng=${longitude}`);
          setMapCenter([latitude, longitude]);
        },
        (err) => {
          console.log('Location access not shared. Standard map positioning loaded.', err);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchHubs = async () => {
      setLoading(true);
      try {
        const response = await parkingService.getAllHubs();
        if (response && response.length > 0) {
          const mapped: ParkingHub[] = response.map((h: any) => {
            const dist = calculateDistance(mapCenter[0], mapCenter[1], h.latitude, h.longitude);
            return {
              id: h.id,
              hubName: h.hubName || h.name,
              address: h.address,
              city: h.city,
              latitude: h.latitude,
              longitude: h.longitude,
              hubType: h.hubType,
              totalCapacity: h.totalCapacity,
              totalFloors: h.totalFloors,
              rating: h.rating || 4.5,
              evEnabled: h.evEnabled,
              availableSlots: h.availableSlots !== undefined ? h.availableSlots : 35,
              totalSlots: h.totalCapacity || h.totalSlots || 100,
              distanceKm: dist,
              lowestPrice: h.lowestPrice || 40.0
            };
          });
          setHubs(mapped);
        } else {
          // Dynamic distance for fallback hubs
          const dynamicMock = defaultMockHubs.map(h => ({
            ...h,
            distanceKm: calculateDistance(mapCenter[0], mapCenter[1], h.latitude, h.longitude)
          }));
          setHubs(dynamicMock);
        }
      } catch (e) {
        console.warn('API error. Initializing offline global map transponders.', e);
        const dynamicMock = defaultMockHubs.map(h => ({
          ...h,
          distanceKm: calculateDistance(mapCenter[0], mapCenter[1], h.latitude, h.longitude)
        }));
        setHubs(dynamicMock);
      } finally {
        setLoading(false);
      }
    };
    fetchHubs();
  }, [mapCenter]);

  const createSaasIcon = (hub: ParkingHub, isSelected: boolean) => {
    const isAvailable = hub.availableSlots > 0;
    const color = isAvailable ? '#22C55E' : '#EF4444';
    const borderGlow = isSelected ? 'border-4 border-[#2563EB] scale-110 shadow-md' : 'border border-slate-300';

    return L.divIcon({
      html: `
        <div class="relative flex items-center justify-center w-8 h-8 rounded-full bg-white ${borderGlow} transition-all duration-150">
          <div class="absolute w-3 h-3 rounded-full" style="background-color: ${color}"></div>
          ${isAvailable ? `
            <div class="absolute w-6 h-6 rounded-full animate-ping-slow opacity-25" style="border: 2px solid ${color}"></div>
          ` : ''}
        </div>
      `,
      className: 'custom-saas-marker-wrapper',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  const filteredHubs = hubs.filter(h => 
    h.hubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectHub = (hub: ParkingHub) => {
    setSelectedHub(hub);
    setMapCenter([hub.latitude, hub.longitude]);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col lg:flex-row gap-6 relative overflow-hidden bg-slate-50">
      
      {/* Map discovery window */}
      <div className="flex-1 min-h-[300px] lg:min-h-0 border border-slate-200 bg-white rounded-xl shadow-sm relative flex flex-col overflow-hidden">
        
        {/* Map toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 bg-white z-10">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-[#2563EB]" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Smart Parking System Map Discovery
            </span>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Hyderabad hubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-1.5 text-xs rounded-lg text-slate-800 focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        {/* Leaflet viewport */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-slate-50">
            <Loader className="h-6 w-6 text-[#2563EB] animate-spin" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Syncing active transponders...
            </span>
          </div>
        ) : (
          <div className="flex-1 w-full relative z-0">
            <MapContainer 
              center={mapCenter} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Light Clean tiles
              />
              <MapController center={mapCenter} />

              {filteredHubs.map((hub) => (
                <Marker
                  key={hub.id}
                  position={[hub.latitude, hub.longitude]}
                  icon={createSaasIcon(hub, selectedHub?.id === hub.id)}
                  eventHandlers={{
                    click: () => handleSelectHub(hub)
                  }}
                >
                  <Popup>
                    <div className="text-xs p-1 text-[#0F172A] font-sans">
                      <p className="font-bold text-[#2563EB] mb-1">{hub.hubName}</p>
                      <p className="text-slate-500 mb-1">{hub.address}</p>
                      <p className="text-emerald-600 font-bold">Price: ₹{hub.lowestPrice || 40.0}/hr</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>

      {/* Right detailed pane */}
      <div className="w-full lg:w-96 flex flex-col gap-4 overflow-y-auto max-h-[400px] lg:max-h-none shrink-0">
        
        {selectedHub ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Detailed hub Card */}
            <Card className="w-full shadow-md hover:border-[#2563EB]/10 transition-all duration-200">
              <div className="flex justify-between items-start mb-3">
                <Badge variant={selectedHub.availableSlots > 0 ? 'success' : 'error'}>
                  {selectedHub.availableSlots > 0 ? 'BAYS_OPEN' : 'SATURATED_FULL'}
                </Badge>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-[#2563EB]" />
                  <span>{(selectedHub.distanceKm || 1.0).toFixed(1)} KM</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#0F172A] uppercase">
                {selectedHub.hubName}
              </h3>
              
              <p className="text-xs text-slate-500 mt-2 leading-relaxed border-l-2 border-[#2563EB] pl-3">
                {selectedHub.address}
              </p>

              {/* Data specifications */}
              <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-100 pt-4 font-sans text-xs">
                <div className="flex flex-col bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Tariff Base</span>
                  <span className="text-[#0F172A] text-sm font-extrabold flex items-center mt-1">
                    ₹{(selectedHub.lowestPrice || 40.0).toFixed(2)}/hr
                  </span>
                </div>
                <div className="flex flex-col bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Vacant Bays</span>
                  <span className={`text-sm font-extrabold mt-1 ${
                    selectedHub.availableSlots > 0 ? 'text-emerald-600' : 'text-red-500'
                  }`}>
                    {selectedHub.availableSlots} / {selectedHub.totalSlots}
                  </span>
                </div>
              </div>

              {selectedHub.availableSlots > 0 ? (
                <Button
                  variant="primary"
                  className="w-full mt-6 py-3 shadow-sm"
                  onClick={() => navigate('/book', { state: { preselectedHub: selectedHub } })}
                >
                  Proceed to Slot Selection
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full mt-6 border-red-200 text-red-500 cursor-not-allowed hover:bg-transparent"
                  disabled
                >
                  Sectors Saturated
                </Button>
              )}
            </Card>

            {/* Quick directions link */}
            <Card className="text-xs text-slate-500 flex justify-between items-center py-4 bg-slate-50 border border-slate-100">
              <span className="font-semibold">GOOGLE MAPS LINKAGE:</span>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHub.latitude},${selectedHub.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#2563EB] hover:underline font-bold flex items-center gap-1.5"
              >
                <Navigation className="h-3.5 w-3.5" /> Navigate
              </a>
            </Card>
          </motion.div>
        ) : (
          <Card className="text-center py-12 flex flex-col items-center justify-center bg-slate-50/50">
            <Navigation className="h-8 w-8 text-slate-400 mb-3 animate-pulse" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Parking Terminal
            </h4>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 max-w-[200px] leading-relaxed mx-auto">
              Select a pulsating green node marker on the maps grid to establish secure telemetry lock.
            </p>
          </Card>
        )}

        {/* Directory lists */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block px-2">
            Local Grid Transponders ({filteredHubs.length})
          </span>
          <div className="space-y-2 overflow-y-auto pr-1 flex-1">
            {filteredHubs.map((hub) => (
              <div
                key={hub.id}
                onClick={() => handleSelectHub(hub)}
                className={`p-3 border rounded-lg cursor-pointer transition-all duration-150 flex items-center justify-between text-xs font-semibold ${
                  selectedHub?.id === hub.id
                    ? 'bg-[#2563EB]/5 border-[#2563EB] text-[#2563EB]'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#0F172A]'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-[#0F172A] truncate max-w-[180px]">{hub.hubName}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-normal">
                    Base: ₹{(hub.lowestPrice || 40.0).toFixed(2)}/hr &bull; Dist: {(hub.distanceKm || 1.0).toFixed(1)} KM
                  </p>
                </div>
                <Badge variant={hub.availableSlots > 0 ? 'success' : 'error'} showPip={false}>
                  {hub.availableSlots} VAC
                </Badge>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapDiscovery;

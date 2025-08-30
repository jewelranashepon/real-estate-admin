"use client"

import { useEffect, useRef, useState } from "react"
// import { getSaudiProperties } from "@/lib/data"
import { getSaudiProperties as fetchSaudiProperties } from "@/lib/data"
import type { PropertyType } from "@/lib/types"
import { AlertCircle, MapPin } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Note: Avoid augmenting Window here to prevent conflicts with other global typings (e.g., Google Identity Services)

export default function PropertyMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsAPI = () => {
      // Check if we already tried to load the API
      if (document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
        return
      }

      const script = document.createElement("script")
      // Use a placeholder API key - this will show an error but won't break the app
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places`
      script.async = true
      script.defer = true

      script.onload = () => {
        // Check if the API loaded successfully or with an error
        if ((window as any).google && (window as any).google.maps) {
          setMapLoaded(true)
        } else {
          setMapError("Failed to load Google Maps API")
        }
      }

      script.onerror = () => {
        setMapError("Failed to load Google Maps API. Please check your API key.")
      }

      document.head.appendChild(script)
    }

    // Handle Google Maps API error event
    ;(window as any).gm_authFailure = () => {
      setMapError("Google Maps API key is invalid or has expired. Please provide a valid API key.")
    }

    if (!(window as any).google) {
      loadGoogleMapsAPI()
    } else {
      setMapLoaded(true)
    }

    // Clean up
    return () => {
      ;(window as any).gm_authFailure = undefined
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || mapError) return

    try {
      // Initialize map
      const newMap = new (window as any).google.maps.Map(mapRef.current, {
        center: { lat: 31.9539, lng: 35.9106 }, // Amman, Jordan coordinates
        zoom: 11, // City-level zoom for Amman
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      })

      setMap(newMap)
      setInfoWindow(new window.google.maps.InfoWindow())
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError("Failed to initialize Google Maps. Please check your API key.")
    }

    // Clean up on unmount
    return () => {
      setMap(null)
      setInfoWindow(null)
    }
  }, [mapLoaded, mapError])

  useEffect(() => {
    if (!map || !infoWindow) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))
    setMarkers([])

    // Add property markers
    const properties = fetchSaudiProperties()
    try {
      const newMarkers = properties.map((property) => {
        const marker = new (window as any).google.maps.Marker({
          position: { lat: property.lat, lng: property.lng },
          map,
          label: {
            text: `${Math.floor(property.price / 1000)}k`,
            color: "white",
          },
          icon: {
            path: (window as any).google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#ea4335",
            fillOpacity: 1,
            strokeWeight: 0,
          },
        })

        marker.addListener("click", () => {
          infoWindow.setContent(createInfoWindowContent(property))
          infoWindow.open(map, marker)
        })

        return marker
      })

      setMarkers(newMarkers)
    } catch (error) {
      console.error("Error creating markers:", error)
      setMapError("Failed to create property markers on the map.")
    }
  }, [map, infoWindow])

  const createInfoWindowContent = (property: any) => {
    return `
      <div style="width: 200px; padding: 5px;">
        <img src="${property.imageUrl}" alt="${property.address}" style="width: 100%; height: 120px; object-fit: cover; margin-bottom: 8px;" />
        <div style="font-weight: bold; font-size: 16px;">${property.price.toLocaleString()} JOD</div>
        <div style="font-size: 14px;">${property.bedrooms} bd • ${property.bathrooms} ba • ${(property.sqft ?? 0).toLocaleString()} sqft</div>
        <div style="font-size: 14px; color: #666;">${property.address}</div>
      </div>
    `
  }

  // Render error message if there's an API key issue
  if (mapError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-6">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Google Maps API Error</AlertTitle>
          <AlertDescription>{mapError}</AlertDescription>
        </Alert>

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">How to fix this issue:</h3>
          <ol className="list-decimal pl-5 space-y-2 mb-4">
            <li>
              Go to the{" "}
              <a
                href="https://console.cloud.google.com/google/maps-apis/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Cloud Console
              </a>
            </li>
            <li>Create a new project or select an existing one</li>
            <li>Enable the "Maps JavaScript API"</li>
            <li>Create an API key in the Credentials section</li>
            <li>
              Replace <code className="bg-gray-100 px-1 py-0.5 rounded">YOUR_GOOGLE_MAPS_API_KEY</code> in the code with
              your actual API key
            </li>
          </ol>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono mb-4">
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
          </div>
        </div>

        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold mb-4">Property Locations:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fetchSaudiProperties().map((property) => (
              <div key={property.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">${property.price.toLocaleString()} JOD</p>
                  <p className="text-sm text-gray-600">{property.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Fallback UI while map is loading
  if (!mapLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p>Loading map...</p>
      </div>
    )
  }

  return <div ref={mapRef} className="w-full h-full" />
}
package com.digitalgaurdien

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.lang.Math.atan2
import java.lang.Math.cos
import java.lang.Math.sin
import java.lang.Math.sqrt

class GeofencingModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var geofenceLatitude = 0.0
    private var geofenceLongitude = 0.0
    private var geofenceRadius = 0.0

    override fun getName(): String {
        return "GeofencingModule"
    }

    @ReactMethod
    fun setGeofence(latitude: Double, longitude: Double, radius: Double) {
        geofenceLatitude = latitude
        geofenceLongitude = longitude
        geofenceRadius = radius
    }

    @ReactMethod
    fun checkGeofence(latitude: Double, longitude: Double, callback: Callback) {
        val distance = calculateDistance(latitude, longitude, geofenceLatitude, geofenceLongitude)
        val insideGeofence = distance <= geofenceRadius
        callback.invoke(insideGeofence)
    }

    private fun calculateDistance(lat1: Double, lon1: Double, lat2: Double, lon2: Double): Double {
        val earthRadius = 6371000 // Radius of the Earth in meters
        val lat1Rad = Math.toRadians(lat1)
        val lon1Rad = Math.toRadians(lon1)
        val lat2Rad = Math.toRadians(lat2)
        val lon2Rad = Math.toRadians(lon2)

        val deltaLatRad = lat2Rad - lat1Rad
        val deltaLonRad = lon2Rad - lon1Rad

        val a = sin(deltaLatRad / 2) * sin(deltaLatRad / 2) +
                cos(lat1Rad) * cos(lat2Rad) *
                sin(deltaLonRad / 2) * sin(deltaLonRad / 2)
        val c = 2 * atan2(sqrt(a), sqrt(1 - a))

        return earthRadius * c
    }
}
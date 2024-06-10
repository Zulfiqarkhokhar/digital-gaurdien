package com.digitalgaurdien

import android.app.usage.NetworkStats
import android.app.usage.NetworkStatsManager
import android.content.Context
import android.net.ConnectivityManager
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.*
import java.util.*

class DataUsageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DataUsageModule"
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    fun getDailyDataUsage(promise: Promise) {
        try {
            val calendar = Calendar.getInstance()
            calendar.set(Calendar.HOUR_OF_DAY, 0) // Set start time to 12:00 AM
            calendar.set(Calendar.MINUTE, 0)
            calendar.set(Calendar.SECOND, 0)
            calendar.set(Calendar.MILLISECOND, 0)
            val startTimeMillis = calendar.timeInMillis

            calendar.set(Calendar.HOUR_OF_DAY, 23) // Set end time to 11:59 PM
            calendar.set(Calendar.MINUTE, 59)
            calendar.set(Calendar.SECOND, 59)
            calendar.set(Calendar.MILLISECOND, 999)
            val endTimeMillis = calendar.timeInMillis

            val networkStatsManager = reactApplicationContext.getSystemService(Context.NETWORK_STATS_SERVICE) as NetworkStatsManager
            val bucket: NetworkStats.Bucket = networkStatsManager.querySummaryForDevice(
                ConnectivityManager.TYPE_MOBILE,
                "",
                startTimeMillis,
                endTimeMillis
            )
            val rxBytes = bucket.rxBytes
            val txBytes = bucket.txBytes
            val totalBytes = rxBytes + txBytes
            promise.resolve(totalBytes)
        } catch (e: Exception) {
            promise.reject("DATA_USAGE_ERROR", e.message)
        }
    }
}
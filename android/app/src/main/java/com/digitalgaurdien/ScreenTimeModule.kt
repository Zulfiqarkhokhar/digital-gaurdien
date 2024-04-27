package com.digitalgaurdien

import android.app.usage.UsageStatsManager
import android.content.Context
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap

class ScreenTimeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val usageStatsManager: UsageStatsManager by lazy {
        reactContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
    }

    override fun getName(): String {
        return "ScreenTimeModule"
    }

    @ReactMethod
    fun getScreenTimeUsage(startTime: Long, endTime: Long, promise: Promise) {
        val usageStatsList = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime)
        val resultArray = WritableNativeArray()

        if (usageStatsList != null && usageStatsList.isNotEmpty()) {
            for (usageStats in usageStatsList) {
                val map = WritableNativeMap()
                map.putString("packageName", usageStats.packageName)
                map.putDouble("totalTimeInForeground", usageStats.totalTimeInForeground.toDouble())
                resultArray.pushMap(map)
            }
            promise.resolve(resultArray)
        } else {
            promise.reject("NO_USAGE_STATS", "No usage stats retrieved.")
        }
    }
}
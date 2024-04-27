package com.digitalgaurdien

import android.content.ComponentName
import android.content.pm.PackageManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BlockAppModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BlockAppModule"
    }

    @ReactMethod
    fun blockApp(packageName: String) {
        val packageManager: PackageManager = reactApplicationContext.packageManager
        packageManager.setComponentEnabledSetting(
            ComponentName("com.rovio.baba", "com.rovio.baba.MainActivity"),
            PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
            PackageManager.DONT_KILL_APP
        )
    }
}
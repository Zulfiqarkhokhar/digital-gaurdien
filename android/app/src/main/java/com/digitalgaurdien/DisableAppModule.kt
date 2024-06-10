package com.digitalgaurdien

import android.content.ComponentName
import android.content.pm.PackageManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DisableAppModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val context = reactContext

    override fun getName(): String {
        return "DisableAppModule"
    }

    @ReactMethod
    fun disableApp(packageName: String, promise: Promise) {
        try {
            val packageManager = context.packageManager
            val componentName = ComponentName(packageName, "$packageName.MainActivity") // Adjust this according to the actual main activity of the target app
            packageManager.setComponentEnabledSetting(
                componentName,
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP
            )

            // Check if the component is disabled
            val componentState = packageManager.getComponentEnabledSetting(componentName)
            if (componentState == PackageManager.COMPONENT_ENABLED_STATE_DISABLED) {
                promise.resolve("App $packageName has been disabled successfully.")
            } else {
                promise.reject("DISABLE_FAILED", "Failed to disable the app $packageName.")
            }
        } catch (e: Exception) {
            promise.reject("DISABLE_ERROR", e.message, e)
        }
    }
}
package com.digitalgaurdien

import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class UninstallModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val context = reactContext

    override fun getName(): String {
        return "UninstallModule"
    }

    @ReactMethod
    fun uninstallApp(packageName: String) {
        try {
            val packageUri = Uri.parse("package:$packageName")
            val uninstallIntent = Intent(Intent.ACTION_UNINSTALL_PACKAGE, packageUri)
            uninstallIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            if (uninstallIntent.resolveActivity(context.packageManager) != null) {
                context.startActivity(uninstallIntent)
            } else {
                throw Exception("Package not found or cannot be uninstalled")
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
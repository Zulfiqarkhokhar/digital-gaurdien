package com.digitalgaurdien

import android.content.pm.PackageManager
import android.graphics.Bitmap
import com.facebook.react.bridge.Arguments
import android.util.Base64
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.ByteArrayOutputStream

class AppInfoModule (private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    override fun getName(): String {
        return "AppInfoModule"
    }

    @ReactMethod
    fun getAllInstalledApps(callback: Callback) {
        val appInfoHelper = AppInfoHelper(reactContext)
        val appInfoList = appInfoHelper.getAllInstalledApps()

        val resultArray = Arguments.createArray()
        for (appInfo in appInfoList) {
            val appMap = Arguments.createMap()
            appMap.putString("name", appInfo.loadLabel(reactContext.packageManager).toString())
            appMap.putString("packageName", appInfo.packageName)
            appMap.putString("icon", getBase64Icon(appInfo.packageName))
            resultArray.pushMap(appMap)
        }

        callback.invoke(resultArray)
    }

    private fun getBase64Icon(packageName: String): String {
        val pm = reactContext.packageManager
        try {
            val info = pm.getApplicationInfo(packageName, 0)
            val icon = info.loadIcon(pm)
            val drawable = icon as android.graphics.drawable.BitmapDrawable
            val bitmap = drawable.bitmap
            val byteArrayOutputStream = ByteArrayOutputStream()
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
            val byteArray = byteArrayOutputStream.toByteArray()
            return Base64.encodeToString(byteArray, Base64.DEFAULT)
        } catch (e: PackageManager.NameNotFoundException) {
            e.printStackTrace()
        }
        return ""
    }
}
package com.digitalgaurdien

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager


class AppInfoHelper(private val context: Context) {
    fun getAllInstalledApps(): List<ApplicationInfo> {
        val packageManager = context.packageManager
        return packageManager.getInstalledApplications(PackageManager.GET_META_DATA)
    }
}
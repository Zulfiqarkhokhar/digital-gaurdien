package com.digitalgaurdien

import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.media.ImageReader
import android.os.Environment
import android.util.Log
import androidx.camera.core.Camera
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.ImageProxy
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.bridge.*
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class CameraModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private lateinit var cameraExecutor: ExecutorService

    init {
        cameraExecutor = Executors.newSingleThreadExecutor()
    }

    override fun getName(): String {
        return "CameraModule"
    }

    @ReactMethod
    fun captureImage(promise: Promise) {
        val context = reactApplicationContext
        val currentActivity = getCurrentActivity()
        val outputDirectory = getOutputDirectory(context)
        val imageCapture = ImageCapture.Builder()
            .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
            .build()

        val cameraProviderFuture = ProcessCameraProvider.getInstance(context)
        cameraProviderFuture.addListener({
            // Camera provider is now guaranteed to be available
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()

            try {
                // Unbind any previously bound use cases
                cameraProvider.unbindAll()

                // Bind only the image capture use case to the camera
                val cameraSelector = CameraSelector.Builder()
                    .requireLensFacing(CameraSelector.LENS_FACING_BACK)
                    .build()
                val camera = cameraProvider.bindToLifecycle(currentActivity as LifecycleOwner, cameraSelector, imageCapture)

                // Set up image capture listener, which triggers when a photo is taken
                imageCapture.takePicture(cameraExecutor, object : ImageCapture.OnImageCapturedCallback() {
                    override fun onCaptureSuccess(image: ImageProxy) {
                        super.onCaptureSuccess(image)
                        val savedUri = File(outputDirectory, "${System.currentTimeMillis()}.jpg")

                        val fos = FileOutputStream(savedUri.path)
                        fos.write(imageToByteArray(image))
                        fos.close()

                        promise.resolve(savedUri.path)

                        image.close()
                    }

                    override fun onError(exception: ImageCaptureException) {
                        super.onError(exception)
                        promise.reject("ERROR", "Image capture failed: ${exception.message}")
                    }
                })

            } catch (exc: Exception) {
                Log.e("CameraModule", "Use case binding failed", exc)
                promise.reject("ERROR", "Use case binding failed: ${exc.message}")
            }

        }, ContextCompat.getMainExecutor(context))
    }



    private fun getOutputDirectory(context: Context): File {
        val mediaDir = context.externalMediaDirs.firstOrNull()?.let {
            File(it, "images").apply { mkdirs() }
        }
        return if (mediaDir != null && mediaDir.exists())
            mediaDir else context.filesDir
    }

    private fun imageToByteArray(image: ImageProxy): ByteArray {
        val buffer = image.planes[0].buffer
        val bytes = ByteArray(buffer.capacity())
        buffer.get(bytes)
        return bytes
    }
}
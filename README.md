#Hoomie APP :

##Starting the app :
Before starting anything, make sure you have adb installed on your computer. If not, download the adb installer [here](https://dl.google.com/android/repository/platform-tools-latest-windows.zip) and follow the steps.

Start the react native client :
    `react-native start`
    
Run the android debugging session :
    `react-native run-android`

##Issues and workarounds :


 1. **Issue when running react-native run-android :**
     >InstallException : Failed to install all .
    Error while uploading app-debug.apk : Unknown failure ([CDS]close[0]) :app:installDebug FAILED

    **Workaround** : `react-native run-android --deviceId 0123456789ABCDEF`

2. **Issue when running react-native run-android:**
    > What went wrong:
    Execution failed for task ':app:processDebugResources'.
    java.io.IOException: Could not delete path
    
    **Workaround** : `cd android && gradlew clean`
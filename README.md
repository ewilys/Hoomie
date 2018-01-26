# Hoomie APP :

26/01/18:
Current app'state:
- Possibility to switch between student and univeristy account made through a button on the menu
- Student account :
    *chart's display is correct for temperature and atmosphere by year, month or day. xAxis and Yaxis are working pretty well and displays are okay
- University account:
    *chart's display is correct for room monitoring with possibility to select the room needed
    *on general monitoring the chart displayed is always the same (it's fixed because stackedAreaChart doesn't work as expected)
    The best thing woud be to use several area chart but then the server must be changed to send the data expected

Improvements possible :
- add interaction and display of important point on chart
- succeed to combine different chart by using several Area charts or stacked Area shart (not the best solution apparently)
- add login and separate account
- add more sensors and displays
- populate settings page
- add chat page and form page to communicate with student/unviersity
- add notifications
- create algorithm to detect any problem
- gamification and rewards



Do not forget to run : npm install 


## Starting the app :
Before starting anything, make sure you have adb installed on your computer. If not, download the adb installer [here](https://dl.google.com/android/repository/platform-tools-latest-windows.zip) and follow the steps.

Start the react native client :
    `react-native start`
    
Run the android debugging session :
    `react-native run-android`

## Issues and workarounds :


 1. **Issue when running react-native run-android :**
     >InstallException : Failed to install all .
    Error while uploading app-debug.apk : Unknown failure ([CDS]close[0]) :app:installDebug FAILED

    **Workaround** : `react-native run-android --deviceId 0123456789ABCDEF`

2. **Issue when running react-native run-android:**
    > What went wrong:
    Execution failed for task ':app:processDebugResources'.
    java.io.IOException: Could not delete path
    
    **Workaround** : `cd android && gradlew clean`

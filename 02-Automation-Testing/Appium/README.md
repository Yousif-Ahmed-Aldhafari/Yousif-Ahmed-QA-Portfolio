# Android Appium smoke check

Use an English-language Android 14 AOSP emulator with a desktop Android SDK, platform-tools, JDK 17 or later, Node.js 24 and Python 3.12. The case opens Android’s own Settings app and checks navigation to Display. OEM devices may label controls differently.

In the first terminal:

```sh
npx --yes appium@3.2.0 driver install uiautomator2
npx --yes appium@3.2.0 --address 127.0.0.1
```

In a second terminal, from this directory:

```sh
adb devices
export ANDROID_UDID=emulator-5554  # replace with the listed emulator serial
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
python -m unittest -v
```

The Appium endpoint defaults to http://127.0.0.1:4723. Configure the SDK with `ANDROID_HOME` and ensure adb is on PATH. The suite has no mobile-device run evidence in this repository yet.

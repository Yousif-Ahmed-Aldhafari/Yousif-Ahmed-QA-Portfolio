import os
import unittest

from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support import expected_conditions as conditions
from selenium.webdriver.support.ui import WebDriverWait


class AndroidSettingsTest(unittest.TestCase):
    def test_open_display_settings(self):
        options = UiAutomator2Options().load_capabilities({
            'platformName': 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:udid': os.environ['ANDROID_UDID'],
            'appium:appPackage': 'com.android.settings',
            'appium:appActivity': '.Settings',
            'appium:noReset': True,
            'appium:language': 'en',
            'appium:locale': 'US',
        })
        driver = webdriver.Remote(os.getenv('APPIUM_URL', 'http://127.0.0.1:4723'), options=options)
        self.addCleanup(driver.quit)
        wait = WebDriverWait(driver, 20)
        # UiScrollable makes the case independent of emulator screen height.
        display = (AppiumBy.ANDROID_UIAUTOMATOR,
                   'new UiScrollable(new UiSelector().scrollable(true))'
                   '.scrollIntoView(new UiSelector().text("Display"))')
        wait.until(conditions.element_to_be_clickable(display)).click()
        title = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().text("Display size and text")')
        self.assertTrue(wait.until(conditions.visibility_of_element_located(title)).is_displayed())

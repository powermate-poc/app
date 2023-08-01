import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;


public class AppTests {


    public static DesiredCapabilities getSetup() {
        DesiredCapabilities dc = new DesiredCapabilities();
        dc.setCapability(MobileCapabilityType.DEVICE_NAME, "Pixel 6 API 26");
        dc.setCapability("platformName", "android");
        dc.setCapability("appium:automationName", "UIAutomator2");
        dc.setCapability("appium:app", "C:\\Users\\stadl\\Documents\\Powermate\\powermate-app\\android\\universal.apk");
        return dc;
    }


    }

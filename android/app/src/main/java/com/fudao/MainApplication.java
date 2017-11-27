package com.huodong;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.reactnative.modules.weibo.WeiboPackage;
import cn.reactnative.modules.qq.QQPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.theweflex.react.WeChatPackage;
import com.remobile.toast.RCTToastPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import io.realm.react.RealmReactPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import cn.jpush.reactnativejpush.JPushPackage;


public class MainApplication extends Application implements ReactApplication {
    private boolean SHUTDOWN_TOAST = false;
    private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BarcodeScannerPackage(),
            new WeiboPackage(),
            new QQPackage(),
            new WeChatPackage(),
            new ReactVideoPackage(),
            new SvgPackage(),
            new ImagePickerPackage(),
            new RCTToastPackage(),
            new RealmReactPackage(),
            new PickerPackage(),
            new RCTCameraPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

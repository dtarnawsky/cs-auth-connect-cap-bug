import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BrowserVault, DeviceSecurityType, IdentityVaultConfig, Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  config: IdentityVaultConfig = {
    key: 'io.ionic.ac-bio-bug',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Biometrics,
    lockAfterBackgrounded: 3000,
    shouldClearVaultAfterTooManyFailedAttempts: false,
    customPasscodeInvalidUnlockAttempts: 10,
    unlockVaultOnLoad: true,
  };

  vault: Vault | BrowserVault;

  constructor(private platform: Platform) {
    this.init();
  }

  async init() {    
    console.log('Before ready');
    await this.platform.ready();
    console.log('After ready');    

    this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(this.config) : new Vault(this.config);
    this.vault.onLock(() => {
      console.log('Vault was locked');
    });
    this.vault.onUnlock(() => {
      console.log('Vault was unlocked');
    });
    this.vault.onError((err) => {
      console.log('Vault error', err);
    });
  }
}

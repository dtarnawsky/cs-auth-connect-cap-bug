# Auth Connect App Bug
This app uses Auth Connect 3.9 with Identity Vault 5.1.0.

Setup
- Run the application on an iOS device
- Sign up for an account

To reproduce the bug:
- Run the application on an iOS device
- Sign In
- Press Home on the iOS device and wait at least 3 seconds
- Open the app again
- The biometric prompt should appear but doesnt

To fix the bug:
- In `vault.service.ts` if you move the code from `init` to the constructor then the biometric prompt will appear
- Weirder still: If you move the code back into the `init` method then the bug isn't reproducable (and you need to change the name of the vault key to make it happen again)
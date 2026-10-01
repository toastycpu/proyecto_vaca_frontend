# VAQUERO App — Running the App & Current Backlog

## Prerequisites (one-time)
- Node.js installed
- `npm install -g eas-cli`
- Installed on your phone: our custom **development build** (not plain Expo Go have someone who already has the server running to provide a QR)

---

## Three ways to run the app

### 1. Regular (`--dev-client`) — local network, default
```powershell
npx expo start --dev-client
```
**What it does:** starts the dev server on your computer, and anyone on the **same WiFi network** can scan the QR code to connect. Fastest option, use this 95% of the time (e.g. both sitting at the same place).

**Limitation:** only works if both your phone and computer are on the same WiFi.

---

### 2. Tunnel — for testing over different networks
```powershell
npx expo start --dev-client --tunnel
```
**What it does:** routes the connection through Expo's servers instead of local WiFi, so you can connect from **anywhere** (different networks, remote testing, different locations).

**Limitation:** slightly slower than local network mode. Still requires the custom dev client app installed on the phone connecting.

---

### 3. Preview build — a real standalone app, no server needed
```powershell
eas build --profile preview --platform android
```
**What it does:** builds a real, installable `.apk` file. Once installed, it runs **completely independently** — no dev server, no live coding session, works offline from the laptop. Good for "try the app whenever, on your own time" rather than live pair-testing.

**Takes ~10–20 minutes to build** (cloud build, you can close your laptop once it's queued).

---

## Installing the dev client (one-time, or after adding new native modules)
If you ever add a new native package (camera, image picker, maps, etc.), everyone needs to reinstall an updated dev client:
```powershell
eas build --profile development --platform android
```
Then open the link/QR code it gives you **on your phone** to install the update.

---
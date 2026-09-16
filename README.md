# VAQUERO — Low-Fidelity Wireframes v1
**Target:** Expo Go (React Native) · **Users (MVP):** single farmer per farm login · **Language:** Spanish (i18n-ready for QU / GN / PT)

---

## 0. Global rules that apply to every screen

**Design constraints**
- Icon-first. Every action = big icon + 1–3 word label. Never a label alone.
- Minimum touch target 64×64 dp (bigger than the usual 44). One primary action per screen.
- Bolivian formats everywhere: `1.234,5 kg` · `12/03/2027` · `Bs 4.500`
- All text pulled from `i18n/es.json`. No hardcoded strings anywhere — this is what makes adding PT/QU/GN a config drop, not a rewrite.
- Accessibility mode (toggle in Settings) adds a 🔊 button to every card and screen header that reads the screen aloud via `expo-speech`.
- Font size + button size sliders in Settings apply globally (store scale factor in context, multiply all sizes).

**Connectivity states — one component, three states, shown as a strip under the header:**
```
[ 🟢 EN LÍNEA  ]        full function
[ 🟡 SIN SEÑAL · 7 pendientes ]   input allowed, queued
[ 🔴 SIN SEÑAL — esta función necesita internet ]  blocks AI / map / sync
```
Online-only features: AI tab, cattle tracking/map, WhatsApp linking, sync.
Always-available: all data input, animal list, animal detail, progress bar (last computed value).

---

## 1. Navigation map

```
        ┌──────────────┐
        │ 00 SPLASH    │
        │ check token  │
        └──────┬───────┘
               │
     ┌─────────┴─────────┐
   no token           token
     │                   │
┌────▼──────┐            │
│ 01 LOGIN  │            │
│ user/pass │            │
│ Google    │            │
└────┬──────┘            │
     │                   │
  new user?              │
     │                   │
   yes│  no ─────────────┤
     │                   │
┌────▼────────────┐      │
│ 02 ONBOARDING   │      │
│ 4 steps         │      │
└────┬────────────┘      │
     │                   │
┌────▼────────────┐      │
│ 03 TUTORIAL     │      │
│ skippable       │      │
└────┬────────────┘      │
     └─────────┬─────────┘
               │
        ┌──────▼───────────────────────────────────┐
        │  04 INICIO  (home)      ☰ drawer          │
        └──┬────────┬────────┬────────┬────────────┘
           │        │        │        │
      ┌────▼──┐ ┌───▼───┐ ┌──▼────┐ ┌─▼──────┐
      │ 06/08 │ │ 10 AI │ │ 11    │ │ 12     │
      │REGIS- │ │VAQUERO│ │PROGRE-│ │AJUSTES │
      │TRAR   │ │       │ │SO     │ │        │
      └───┬───┘ └───────┘ └───────┘ └───┬────┘
          │                             │
   ┌──────▼──────┐              ┌───────▼────────┐
   │ 06 IDENTIFI-│              │ 13 WHATSAPP    │
   │ CAR ANIMAL  │              │ vincular       │
   └──────┬──────┘              └────────────────┘
          │
   ┌──────▼──────┐      ┌──────────────┐
   │ 07 FICHA    ├─────►│ 09 SANIDAD   │
   │ DEL ANIMAL  │      │ vacunas      │
   └──────┬──────┘      └──────────────┘
          │
   ┌──────▼──────┐
   │ 14 UBICAR   │ (online only)
   │ GANADO      │
   └─────────────┘
```

**Bottom tab bar (5 tabs, icon + word):**
`🏠 Inicio` · `➕ Registrar` · `🤠 VAQUERO` · `🏅 Progreso` · `⚙️ Ajustes`

**Hamburger ☰ (top right of Inicio only):** Sincronizar · Mi finca (UPV) · Mi perfil · WhatsApp · Tutorial · Salir

---

## 2. Screens

### 00 — SPLASH / arranque
```
┌────────────────────────────┐
│                            │
│         🤠                 │
│      V A Q U E R O         │
│                            │
│   [ ▓▓▓▓▓░░░░ ]            │
│   Revisando conexión...    │
│                            │
└────────────────────────────┘
```
Checks: stored session token → connectivity → pending sync queue count. Routes to 01 or 04.

---

### 01 — INGRESAR (login, farm-level)
```
┌────────────────────────────┐
│      🤠 VAQUERO            │
│                            │
│  Usuario                   │
│  ┌──────────────────────┐  │
│  │                      │  │
│  └──────────────────────┘  │
│  Contraseña          👁    │
│  ┌──────────────────────┐  │
│  │                      │  │
│  └──────────────────────┘  │
│                            │
│  ┌──────────────────────┐  │
│  │      ENTRAR          │  │  ← primary, full width, 72dp
│  └──────────────────────┘  │
│                            │
│  ───────  o  ───────       │
│  ┌──────────────────────┐  │
│  │  G  Entrar con Gmail │  │
│  └──────────────────────┘  │
│                            │
│  ¿Primera vez?  CREAR      │
│  🔊 Escuchar               │
└────────────────────────────┘
```
Notes: login identifies the **farm**, not the person. Worker-join-by-QR is designed but **out of MVP scope** — leave a `role` field on the session object now (`owner` default) so seniority levels drop in later without a schema migration.

---

### 02 — ONBOARDING (4 steps, progress dots at top)
One question per screen. Big back/next. Skip disabled on required fields.

```
STEP 1 — TÚ                 STEP 2 — TU FINCA
┌──────────────────┐        ┌──────────────────┐
│ ● ○ ○ ○          │        │ ○ ● ○ ○          │
│                  │        │                  │
│   ┌────────┐     │        │ Nombre de finca  │
│   │  📷    │     │        │ ┌──────────────┐ │
│   │ tu foto│     │        │ └──────────────┘ │
│   └────────┘     │        │                  │
│ Nombre           │        │ Departamento  ▾  │
│ ┌──────────────┐ │        │ Municipio     ▾  │
│ └──────────────┘ │        │                  │
│ Teléfono         │        │ ┌──────────────┐ │
│ ┌──────────────┐ │        │ │ 📍 USAR MI   │ │
│ │ +591         │ │        │ │   UBICACIÓN  │ │
│ └──────────────┘ │        │ └──────────────┘ │
│                  │        │ Hectáreas        │
│ [ SIGUIENTE → ]  │        │ ┌──────────────┐ │
└──────────────────┘        │ [ SIGUIENTE → ] │
                            └──────────────────┘

STEP 3 — TU GANADO          STEP 4 — LISTO
┌──────────────────┐        ┌──────────────────┐
│ ○ ○ ● ○          │        │ ○ ○ ○ ●          │
│ ¿Cuántos animales│        │      ✅          │
│  tienes?         │        │  ¡Todo listo,    │
│ ┌──────────────┐ │        │   Don Ramón!     │
│ │      42      │ │        │                  │
│ └──────────────┘ │        │ Ahora te muestro │
│  [ − ]   [ + ]   │        │ cómo usar la app │
│                  │        │                  │
│ ¿Cómo identificas│        │ [ VER TUTORIAL ] │
│  tus animales? ▾ │        │ [ SALTAR       ] │
│  · Caravana N°   │        └──────────────────┘
│  · Lista visual  │
│  · QR            │
│  · RFID Bluetooth│
│ [ SIGUIENTE → ]  │
└──────────────────┘
```
- Step 3 dropdown sets `preferred_id_method`, stored on the farm and reused as the default on screen 06 forever after. Changeable in Ajustes.
- API: Step 1 → `POST /farmers` · Step 2 → `POST /farms` · Step 3 count is used to seed the "faltan X animales por registrar" nudge on Inicio.

---

### 03 — TUTORIAL / DEMO (5 cards, swipeable, replayable from ☰)
```
┌────────────────────────────┐
│  ○ ● ○ ○ ○                 │
│                            │
│   ┌──────────────────┐     │
│   │                  │     │
│   │   [ilustración]  │     │
│   │   dedo tocando   │     │
│   │   botón grande   │     │
│   └──────────────────┘     │
│                            │
│  Toca ➕ REGISTRAR para    │
│  anotar un peso, una       │
│  vacuna o un nacimiento.   │
│                            │
│  🔊 Escuchar               │
│  [ SALTAR ]    [ SIGUE → ] │
└────────────────────────────┘
```
Cards: 1) what VAQUERO is for · 2) how to register data · 3) working without signal · 4) the AI helper · 5) the progress/certificate bar.

---

### 04 — INICIO (home)
```
┌────────────────────────────┐
│ VAQUERO              ☰     │
│ [🟡 SIN SEÑAL · 7 pend.]   │
├────────────────────────────┤
│ ┌────────────────────────┐ │
│ │  ➕  REGISTRAR DATO    │ │  ← hero button, ~120dp tall
│ └────────────────────────┘ │
│                            │
│ ⚠️ FALTA INFORMACIÓN (3)   │
│ ┌────────────────────────┐ │
│ │ 🐄 #1234  falta peso   │→│
│ │ 🐄 #1088  falta foto   │→│
│ │ 💉 #0455  vacuna vence │→│
│ │           en 3 días    │ │
│ └────────────────────────┘ │
│                            │
│ MI RODEO                   │
│ ┌────────────────────────┐ │
│ │ 👥 Total          42   │ │
│ │ 🌿 En la finca    38   │ │
│ │ 🚚 En tránsito     4   │ │
│ │ 🕐 Actualizado 5 min   │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ 🏅 GRASS-FED           │ │
│ │ ▓▓▓▓▓▓▓░░░  72%        │→│
│ └────────────────────────┘ │
├────────────────────────────┤
│ 🏠   ➕   🤠   🏅   ⚙️      │
└────────────────────────────┘
```
- The "falta información" list is the notification feed (`GET /notifications?farmer_id=`). Each row is tappable and jumps straight into the missing field — not to the animal, to the *field*. This is the single highest-value interaction in the app.
- Herd summary numbers come from `GET /cattle?farm_id=` counted by `status`.

---

### 05 — ☰ MENÚ LATERAL
```
┌──────────────────┐░░░░░░░░
│  👤 Don Ramón    │░░░░░░░░
│  Finca El Paraíso│░░░░░░░░
├──────────────────┤░░░░░░░░
│ 🔄 SINCRONIZAR   │░░░░░░░░
│    7 pendientes  │░░░░░░░░
│    ────────────  │░░░░░░░░
│ 🏡 Mi finca      │░░░░░░░░
│ 👤 Mi perfil     │░░░░░░░░
│ 💬 WhatsApp      │░░░░░░░░
│ 🎓 Ver tutorial  │░░░░░░░░
│ 🚪 Salir         │░░░░░░░░
└──────────────────┘░░░░░░░░
```
Sync button states: `7 pendientes` (tap to push) → `Subiendo… 3/7` → `✅ Todo al día`. If offline, tapping shows "Necesitas señal — lo haremos solo cuando vuelva."

---

### 06 — IDENTIFICAR ANIMAL
Opens on the farm's `preferred_id_method`. The method selector is a **dropdown at the top**, not four tabs — so the remembered choice feels like the only choice, and switching is still one tap away.

```
┌────────────────────────────┐
│ ← ¿Qué animal?             │
│                            │
│ Identificar por:  ▾        │
│ ┌────────────────────────┐ │
│ │ 🔢 Número de caravana  │ │
│ └────────────────────────┘ │
│     · 🔢 N° de caravana    │
│     · 📋 Lista de animales │
│     · ⬛ Código QR         │
│     · 📡 RFID Bluetooth    │
│                            │
│ ┌────────────────────────┐ │
│ │        1 2 3 4         │ │  ← big numeric input
│ └────────────────────────┘ │
│  ┌───┬───┬───┐             │
│  │ 1 │ 2 │ 3 │  numpad     │
│  ├───┼───┼───┤  on-screen  │
│  │ 4 │ 5 │ 6 │             │
│  ├───┼───┼───┤             │
│  │ 7 │ 8 │ 9 │             │
│  ├───┼───┼───┤             │
│  │ ⌫ │ 0 │ ✓ │             │
│  └───┴───┴───┘             │
└────────────────────────────┘
```
**RFID Bluetooth sub-state:**
```
┌────────────────────────────┐
│ ← RFID                     │
│  📡  Buscando lector...     │
│  ┌──────────────────────┐  │
│  │ ○ Lector-A1  (nuevo) │  │
│  │ ● Mi lector  ✅ unido│  │
│  └──────────────────────┘  │
│                            │
│      ((  📡  ))            │
│   Acerca el lector a       │
│   la caravana              │
│                            │
│   Último leído: 000154     │
└────────────────────────────┘
```
Reader stays paired; on reconnect the screen skips straight to the "acerca el lector" state. Each successful read auto-advances to 08.

---

### 07 — FICHA DEL ANIMAL (passport)
```
┌────────────────────────────┐
│ ← Nelore #1234        ✏️   │
│ ┌────────────────────────┐ │
│ │   [foto del animal]    │ │
│ │        📷 cambiar      │ │
│ └────────────────────────┘ │
│                            │
│ Caravana      1234 (Amar.) │
│ Raza          Nelore       │
│ Sexo          Hembra       │
│ Peso          510,0 kg     │
│ Edad          4 años       │
│ Potrero       7            │
│                            │
│ ┌────────────────────────┐ │
│ │ ✅ LISTA PARA VENTA    │ │
│ └────────────────────────┘ │
│   — o —                    │
│ ┌────────────────────────┐ │
│ │ ⛔ NO VENDER            │ │
│ │ Retiro de antibiótico  │ │
│ │ hasta 14/03/2027       │ │
│ └────────────────────────┘ │
│                            │
│ HISTORIAL                  │
│ │ 22/11/26 ⚖️ 301,0 kg    │ │
│ │ 18/10/26 🚪 Potrero 12  │ │
│ │ 14/08/26 💉 Aftosa      │ │
│ │ 15/03/26 🐣 Nacimiento  │ │
│ │        [ VER TODO ]     │ │
│                            │
│ [ 📍 UBICAR ] [ ➕ ANOTAR ]│
└────────────────────────────┘
```
The event timeline is the "VAQUERO Passport" from the architecture doc, rendered as a simple vertical list with an icon per event type. Ready-for-sale is **computed, not toggled**: it goes red automatically when a treatment with a withdrawal period is logged.

---

### 08 — REGISTRAR (input hub) → forms
```
┌────────────────────────────┐
│ ← Nelore #1234             │
│  ¿Qué querés anotar?       │
│ ┌──────────┐ ┌───────────┐ │
│ │   ⚖️     │ │    💉     │ │
│ │  PESO    │ │  VACUNA   │ │
│ └──────────┘ └───────────┘ │
│ ┌──────────┐ ┌───────────┐ │
│ │   🐣     │ │    🚪     │ │
│ │NACIMIENTO│ │  MOVER    │ │
│ └──────────┘ └───────────┘ │
│ ┌──────────┐ ┌───────────┐ │
│ │   📷     │ │    💰     │ │
│ │  FOTO    │ │  VENTA    │ │
│ └──────────┘ └───────────┘ │
│                            │
│ 🎤 O decímelo en voz alta  │
└────────────────────────────┘
```
**PESO form (the pattern every form follows — one field, numpad, save):**
```
┌────────────────────────────┐
│ ← Peso · #1234             │
│                            │
│      ┌──────────────┐      │
│      │   4 1 0 ,0   │  kg  │
│      └──────────────┘      │
│                            │
│  Anterior: 382,0 kg        │
│  Ganancia: +28,0 kg 📈     │
│                            │
│  Fecha  [ 02/09/2026 ] 📅  │
│                            │
│  [numpad]                  │
│                            │
│ ┌────────────────────────┐ │
│ │       GUARDAR ✓        │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```
Save → toast `✅ Guardado (sin señal, se subirá después)` → returns to 06 with the field cleared, ready for the next animal. **Never return to home after a save** — the field workflow is one animal after another.

API: `POST /cattle/{id}/weight-log`, `POST /cattle/{id}/photo`, etc. Queue locally with a `pending: true` flag; replay on sync.

---

### 09 — SANIDAD / VACUNAS
```
┌────────────────────────────┐
│ ← Vacuna · #1234           │
│                            │
│ ¿Qué le aplicaste?  ▾      │
│ ┌────────────────────────┐ │
│ │ Aftosa                 │ │
│ └────────────────────────┘ │
│   · Aftosa                 │
│   · Rabia                  │
│   · Carbunclo              │
│   · Antiparasitario        │
│   · Antibiótico  ⚠️        │
│   · Otro (escribir)        │
│                            │
│ Fecha   [ 02/09/2026 ] 📅  │
│ Lote / N°  ┌────────┐ 📷   │
│            └────────┘      │
│                            │
│ ┌────────────────────────┐ │
│ │ 🔔 Próxima dosis:      │ │
│ │    02/03/2027          │ │
│ │    (calculado)         │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ ⛔ No vender hasta     │ │
│ │    16/09/2026          │ │
│ └────────────────────────┘ │
│ [ GUARDAR ✓ ]              │
└────────────────────────────┘
```
- A `vaccine_catalog` config file holds `{ name, interval_days, withdrawal_days, blocks_organic, blocks_grassfed }`. This one table drives the next-dose reminder, the sale block, and the certification penalty — keep it as data, not code.
- Photo of the vial/label is the "evidencia" the architecture doc keeps insisting on. Optional but prompted.
- ⚠️ Applies to the **whole herd** shortcut: same form, animal selector replaced by "Todo el rodeo (42)".

---

### 10 — VAQUERO (AI tab) — ONLINE ONLY
```
┌────────────────────────────┐
│ 🤠 VAQUERO                 │
│ [🟢 EN LÍNEA]              │
│                            │
│ ¿En qué te ayudo?          │
│ ┌────────────────────────┐ │
│ │ 🎤 ANOTAR HABLANDO     │ │
│ │ "el 1234 pesó 410"     │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ 🌱 CONSEJO DE          │ │
│ │    SOSTENIBILIDAD      │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ 🎓 CÓMO USAR LA APP    │ │
│ └────────────────────────┘ │
├────────────────────────────┤
│  (conversation area)       │
│  ┌──────────────────────┐  │
│  │ Registrá el peso de  │  │
│  │ #1234 para subir tu  │  │
│  │ puntaje. +15 puntos  │  │
│  │              🔊      │  │
│  └──────────────────────┘  │
│                     ┌────┐ │
│                     │... │ │
│                     └────┘ │
│ ┌──────────────────┐ ┌───┐ │
│ │ Escribí o hablá  │ │🎤 │ │
│ └──────────────────┘ └───┘ │
└────────────────────────────┘
```
**Offline state:** the three buttons grey out, replaced by `📴 VAQUERO necesita internet. Guardá tus datos igual — te ayudo cuando vuelva la señal.`

Voice-to-data flow: 🎤 → transcribe → **show a confirmation card with the parsed fields, never save silently** → `✓ Correcto` / `✏️ Corregir`. Getting this confirmation step right is what makes voice trustworthy for a farmer who can't read the transcript back.

---

### 11 — PROGRESO (certification)
```
┌────────────────────────────┐
│ 🏅 MI PROGRESO             │
│                            │
│ ┌────────────────────────┐ │
│ │ 🌾 GRASS-FED           │ │
│ │ ▓▓▓▓▓▓▓░░░  72%        │ │
│ │ Te faltan 3 cosas      │ │
│ └────────────────────────┘ │
│   ✅ Sin granos           │
│   ✅ Pastoreo rotativo    │
│   ✅ Acceso a agua        │
│   ⬜ Fotos de 12 animales │
│      (faltan 4)        →  │
│   ⬜ Pesos al día         │
│      (faltan 7)        →  │
│   ⬜ Registro de potreros │
│                        →  │
│                            │
│ ┌────────────────────────┐ │
│ │ 🥩 BS BEEF             │ │
│ │ ▓▓▓░░░░░░░  31%        │ │
│ │ 🔒 Primero Grass-Fed   │ │
│ └────────────────────────┘ │
│                            │
│ 🤠 ¿Cómo subo más rápido?  │
└────────────────────────────┘
```
- Every ⬜ row is tappable and deep-links to the exact screen that fixes it. This turns the certificate into a to-do list, which is the "fun / gamified" part you asked for — progress you can move today, not a score you're handed.
- **Score formula decision needed** (see §4): I've drawn this against the simple `API_CONTRACT.md` formula. If you switch to the 8-dimension model, this screen gets a second view (radar or 8 small bars) and the mandatory-minimums warning: `⚠️ Bienestar 35 — no podés certificar aunque el total alcance`.

---

### 12 — AJUSTES
```
┌────────────────────────────┐
│ ⚙️ AJUSTES                  │
│                            │
│ VER MEJOR                  │
│ Tamaño de letra            │
│  A ──●────────── A         │
│ Tamaño de botones          │
│  □ ─────●────── ⬛         │
│ 🔊 Leer la pantalla   [ON] │
│ Alto contraste       [OFF] │
│                            │
│ IDIOMA                     │
│ ┌────────────────────────┐ │
│ │ 🇧🇴 Español         ▾  │ │
│ └────────────────────────┘ │
│   · Español                │
│   · Quechua    (próx.)     │
│   · Guaraní    (próx.)     │
│   · Português  (próx.)     │
│                            │
│ CÓMO IDENTIFICO ANIMALES   │
│ ┌────────────────────────┐ │
│ │ 🔢 N° de caravana   ▾  │ │
│ └────────────────────────┘ │
│                            │
│ 💬 WhatsApp        [→]     │
│ 🔄 Sincronizar     [→]     │
│ 🎓 Ver tutorial    [→]     │
└────────────────────────────┘
```
Live preview: changing the sliders resizes the settings screen itself in real time, so the farmer sees the effect without leaving.

---

### 13 — WHATSAPP
```
┌────────────────────────────┐
│ ← 💬 WhatsApp              │
│                            │
│  Recibí tu resumen y       │
│  anotá datos por WhatsApp  │
│                            │
│ Tu número                  │
│ ┌────────────────────────┐ │
│ │ +591 7 001 2345        │ │
│ └────────────────────────┘ │
│ [ ENVIAR CÓDIGO ]          │
│  ┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐  │
│  │  ││  ││  ││  ││  ││  │  │
│  └──┘└──┘└──┘└──┘└──┘└──┘  │
│                            │
│ ─── una vez vinculado ───  │
│                            │
│ QUÉ TE MANDO               │
│ ☑ Resumen semanal          │
│ ☑ Qué falta hacer          │
│ ☑ Vacunas por vencer       │
│ ☐ Nota de voz 🎤 en vez    │
│   de texto                 │
│                            │
│ Día  [ Domingo ▾ ] [ 18:00]│
│                            │
│ QUÉ PODÉS MANDARME         │
│ 💉 Vacunas                 │
│ 🐣 Nacimientos             │
│ ⚖️ Pesos                    │
│ 🎤 Notas de voz            │
│                            │
│ [ GUARDAR ]                │
└────────────────────────────┘
```
**Weekly digest content (what the bot sends):**
```
🤠 VAQUERO — Semana 12
Hiciste: 14 pesajes, 3 vacunas, 1 nacimiento
Falta: 4 animales sin foto
Próxima semana: refuerzo Aftosa (12 animales)
Grass-Fed: 72% ▓▓▓▓▓▓▓░░░  (+5 esta semana)
```
Inbound messages get the same parse → confirm → save loop as the AI tab. The bot always echoes what it understood before writing.

---

### 14 — UBICAR GANADO (online only)
```
┌────────────────────────────┐
│ ← 📍 Ubicar ganado         │
│ [🟢 EN LÍNEA]              │
│ ┌────────────────────────┐ │
│ │                        │ │
│ │   [ mapa de la finca ] │ │
│ │    🐄  🐄              │ │
│ │       🐄   ⚠️🐄        │ │
│ │  ┌──────┐   🐄         │ │
│ │  │potr.7│              │ │
│ │  └──────┘              │ │
│ └────────────────────────┘ │
│ ⚠️ 1 fuera del potrero     │
│ ┌────────────────────────┐ │
│ │ 🐄 #1088 · Potrero 3   │→│
│ │    hace 2 h            │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```
MVP honesty note: without GPS collars this shows **last recorded potrero**, not live position. Label it `Última ubicación registrada` so it doesn't over-promise. Live tracking is a hardware decision, not a UI one.

---

## 3. Expo Go build notes

| Need | Package |
|---|---|
| Read screen aloud | `expo-speech` |
| Voice input | `expo-av` record → send to STT endpoint |
| Offline queue | `expo-sqlite` + `@react-native-async-storage/async-storage` |
| Connectivity state | `@react-native-community/netinfo` |
| Google login | `expo-auth-session` |
| Camera / photos | `expo-image-picker` |
| QR scan | `expo-camera` (BarCodeScanner) |
| RFID Bluetooth | ⚠️ `react-native-ble-plx` — **does not work in Expo Go**, needs a development build |
| i18n | `i18n-js` + `expo-localization` |
| Font/button scaling | React Context holding a `scale` multiplier |

**Build the offline queue first.** Every input screen writes to a local `pending_events` table and the UI reads from local state, never from the network. Sync is a background job that drains the table. If you build screens against the API first and retrofit offline, you'll rewrite all of them.

---

## 4. Decisions still open

1. **Score formula.** `API_CONTRACT.md` (60/40 completeness+practices) vs `ARQUITECTURA_DE_VAQUERO.docx` (8 weighted dimensions, mandatory minimums). Pick one before building screen 11. Suggestion: ship the simple one, but store the raw indicators so the 8-dimension score can be computed retroactively.
2. **Grass-fed criteria.** Screen 11 needs the real checklist. Whose standard — your own BS BEEF definition, or an existing certifier's?
3. **Withdrawal periods.** Someone with veterinary knowledge needs to fill the `vaccine_catalog` table. Wrong numbers here means telling a farmer he can sell when he can't.
4. **RFID hardware.** Which reader? Its Bluetooth protocol determines screen 06's pairing flow, and it forces you off Expo Go onto a dev build.
5. **WhatsApp channel.** Business API (approved templates, costs per conversation) vs a bot number. Affects whether the weekly digest can be sent unprompted.


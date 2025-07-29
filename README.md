# 🌌 MAYA – Space Debris Tracker

![MAYA UI Preview](./WEBUI.png)

**MAYA** is a real-time, 3D space debris tracking web application visualizing **ISRO satellites**, debris, and potential orbital collisions using TLE data. It aims to support research and awareness around space sustainability.

---

## 🚀 Features

- 🌍 Real-time interactive **3D Earth Model**
- 🛰️ 3D **Satellite Model** with smooth rotation
- 🛰️ **Real Orbit Visualization** of **ISRO GSAT-7 (Rukmini)** using live TLE data
- 🧠 Dynamic debris tracking with **NORAD ID integration**
- ⚠️ Real-time **collision detection**
- 🔔 **Alerts** upon predicted collisions
- 🔥 **Heatmaps** based on dense TLE data regions

---

## 🧪 Tech Stack

- ⚛️ React + JSX
- 🎨 Tailwind CSS
- 🛰️ Satellite.js + TLE Parser
- 🌐 Three.js + @react-three/fiber + drei
- ⚡ Vite (for fast bundling and dev server)

---

## 🛠️ Getting Started

To run the project locally:

```bash
# 1. Clone the repo
git clone https://github.com/Ani008/Maya.git

# 2. Navigate into the directory
cd Maya

# 3. Install dependencies
npm install

# 4. Run the app
npm run dev

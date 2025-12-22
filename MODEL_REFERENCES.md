# Building Model References

## 📍 Model Definition Location

**File:** `components/city/assets/buildings.tsx`  
**Lines:** 9-18

```typescript
const BUILDING_FILES = {
  "building-skyscraper-a": "/models/buildings/building-skyscraper-a.glb",
  "building-skyscraper-b": "/models/buildings/building-skyscraper-b.glb",
  "building-skyscraper-c": "/models/buildings/building-skyscraper-c.glb",
  "building-skyscraper-d": "/models/buildings/building-skyscraper-d.glb",
  "building-skyscraper-e": "/models/buildings/building-skyscraper-e.glb",
  "building-b": "/models/buildings/low-detail-building-b.glb",
  "building-c": "/models/buildings/low-detail-building-c.glb",
  "building-e": "/models/buildings/low-detail-building-e.glb",
};
```

## 📂 Physical File Locations

**Base Directory:** `/Users/streetteam/landingsiteonly/public/models/buildings/`

**Full Paths:**
- `/Users/streetteam/landingsiteonly/public/models/buildings/building-skyscraper-a.glb`
- `/Users/streetteam/landingsiteonly/public/models/buildings/building-skyscraper-b.glb`
- `/Users/streetteam/landingsiteonly/public/models/buildings/building-skyscraper-c.glb`
- `/Users/streetteam/landingsiteonly/public/models/buildings/building-skyscraper-d.glb`
- `/Users/streetteam/landingsiteonly/public/models/buildings/building-skyscraper-e.glb`

## 🌐 Web URLs (when served)

Since files are in `/public`, they're accessible at:
- `http://localhost:3000/models/buildings/building-skyscraper-a.glb`
- `http://localhost:3000/models/buildings/building-skyscraper-b.glb`
- etc.

## 🔗 Model Loading Code

**File:** `components/city/assets/buildings.tsx`  
**Line 197-198:**
```typescript
const path = BUILDING_FILES[modelKey] || BUILDING_FILES["building-skyscraper-a"];
const { scene } = useGLTF(path);
```

**Library Used:** `@react-three/drei`'s `useGLTF` hook

## 🏢 Building to Model Mapping

**File:** `components/city/startupsconfig.ts`

| Building Name | Model Key | GLTF File |
|--------------|-----------|-----------|
| **Street Labs** | `building-skyscraper-a` | `building-skyscraper-a.glb` |
| **Kled AI** | `building-skyscraper-b` | `building-skyscraper-b.glb` |
| **OpenDroids** | `building-skyscraper-c` | `building-skyscraper-c.glb` |
| **Noice** | `building-skyscraper-d` | `building-skyscraper-d.glb` |
| **StarFun** | `building-skyscraper-e` | `building-skyscraper-e.glb` |

## 🔍 How to Inspect Models

### Option 1: Online GLTF Viewer
1. Go to: https://gltf-viewer.donmccurdy.com/
2. Drag and drop any `.glb` file from `/public/models/buildings/`
3. You can see:
   - All meshes and their names
   - All materials and their properties
   - Colors, textures, etc.

### Option 2: Blender
1. Open Blender
2. File → Import → glTF 2.0 (.glb/.gltf)
3. Select a building model
4. In the Outliner, you can see all meshes
5. Select a mesh → Material Properties tab to see material details

### Option 3: Browser Console
When the page loads, check the console for detailed logs showing:
- All meshes and their names
- All materials and their colors (RGB, HSL, hex)
- Geometry sizes
- Detection scores

Look for logs starting with:
```
╔══════════════════════════════════════════════════════════════════════════════╗
║ [BuildingModel building-skyscraper-X] COMPREHENSIVE MODEL ANALYSIS           ║
```

## 🪟 Window Detection

**Current Detection Code:** `components/city/assets/buildings.tsx` lines 40-165

**Detection Methods:**
1. Explicit naming (window, glass, pane) - 50 points
2. Color analysis (blueish) - up to 40 points
3. Geometry analysis (small, flat) - up to 45 points
4. Position analysis (mid-section) - 10 points
5. Material properties (transparent, glass-like) - up to 35 points

**Threshold:** 15 points minimum

**Fallback:** If no windows detected, finds top 10-15% bluest/smallest materials

## 🐛 Debugging

To see what's in the models:
1. Open browser console
2. Look for the comprehensive model analysis logs
3. Each element shows:
   - Mesh name
   - Material name
   - Color (RGB, HSL, hex)
   - Geometry size
   - Detection score and reasons


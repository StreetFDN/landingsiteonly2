# Knowledge Graph User Guide

Welcome to the Knowledge Graph User Guide! This comprehensive documentation will help you understand, navigate, and customize the interactive knowledge graph visualization.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [User Interface Overview](#user-interface-overview)
3. [Interaction Controls](#interaction-controls)
4. [Customization Guide for Non-Developers](#customization-guide-for-non-developers)
5. [Troubleshooting](#troubleshooting)
6. [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
7. [Best Practices for Data Visualization](#best-practices-for-data-visualization)
8. [Step-by-Step Tutorials](#step-by-step-tutorials)

---

## Getting Started

### What is the Knowledge Graph?

The Knowledge Graph is an interactive 3D visualization tool that displays relationships between concepts, entities, and data points. It helps you:

- **Understand complex relationships** between different pieces of information
- **Navigate hierarchical data** in an intuitive, visual way
- **Discover connections** that might not be obvious in traditional formats
- **Explore information** through interactive navigation

### System Requirements

- **Browser**: Modern web browser (Chrome, Firefox, Safari, or Edge)
  - Chrome 90+ (recommended)
  - Firefox 88+
  - Safari 14+
  - Edge 90+
- **Hardware**: 
  - Minimum 4GB RAM
  - Graphics card with WebGL support
- **Internet Connection**: Required for initial load

### Quick Start (5 Minutes)

1. **Open the Knowledge Graph**: Navigate to the knowledge graph page in your browser
2. **Wait for Loading**: Allow a few seconds for the graph to initialize
3. **Click and Drag**: Use your mouse to rotate the view
4. **Scroll to Zoom**: Use your mouse wheel to zoom in and out
5. **Click on Nodes**: Click any node (circle) to see details

```
┌─────────────────────────────────────┐
│     Knowledge Graph Interface       │
│                                     │
│   ●────●────●        [Search]      │
│   │    │    │        [Filter]      │
│   ●    ●────●        [Reset]       │
│   │         │                      │
│   ●─────────●                      │
│                                     │
│  Click nodes • Drag to rotate       │
│  Scroll to zoom • Hover for info    │
└─────────────────────────────────────┘
```

---

## User Interface Overview

### Main Visualization Area

The central area displays your knowledge graph in 3D space. Each element has a specific meaning:

#### Nodes (Circles/Spheres)
- **Size**: Represents importance or number of connections
- **Color**: Indicates category or type
- **Position**: Shows relationships to other nodes
- **Label**: Text that identifies the node

```
Visual Guide to Nodes:

  ●  Small node (few connections)
  
  ⬤  Medium node (moderate connections)
  
  ⬤  Large node (hub with many connections)
```

#### Edges (Lines/Connections)
- **Thickness**: Represents strength of relationship
- **Color**: May indicate type of relationship
- **Direction**: Arrows show directional relationships

```
Connection Types:

  ●────●    Bidirectional (two-way)
  
  ●───>●    Directional (one-way)
  
  ●════●    Strong connection (thick line)
```

### Control Panel

Located typically on the right side or top of the screen:

```
┌──────────────────────┐
│  CONTROL PANEL       │
├──────────────────────┤
│  🔍 Search           │
│  [____________]      │
│                      │
│  🎨 Display          │
│  [ ] Show Labels     │
│  [ ] Show Particles  │
│  [ ] Enable Glow     │
│                      │
│  🔧 Settings         │
│  Zoom: [====|...] 50%│
│  Speed: [==|.....] 20%│
│                      │
│  📊 Filters          │
│  Category: [All ▼]   │
│  Date: [Any ▼]       │
│                      │
│  [Reset View]        │
│  [Export Data]       │
└──────────────────────┘
```

### Information Panel

When you click a node, an information panel appears showing:

- **Node Name**: The title or identifier
- **Description**: Detailed information
- **Properties**: Attributes and metadata
- **Connections**: List of related nodes
- **Actions**: Links or operations available

### Navigation Bar

At the top of the interface:

```
[Home] [Graph View] [List View] [Settings] [Help] [User ▼]
```

---

## Interaction Controls

### Mouse Controls

| Action | Control | Description |
|--------|---------|-------------|
| **Rotate View** | Left-click + Drag | Rotates the entire graph in 3D space |
| **Zoom In/Out** | Mouse Wheel | Scroll up to zoom in, down to zoom out |
| **Pan View** | Right-click + Drag OR Middle-click + Drag | Moves the entire view left/right/up/down |
| **Select Node** | Left-click on Node | Selects and displays node information |
| **Multi-Select** | Ctrl + Left-click | Selects multiple nodes |
| **Context Menu** | Right-click on Node | Opens options menu for that node |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Space** | Pause/Resume animation |
| **R** | Reset view to default |
| **F** | Focus on selected node |
| **+** / **-** | Zoom in/out |
| **Arrow Keys** | Rotate view |
| **Ctrl + F** | Open search |
| **Esc** | Deselect all nodes |
| **H** | Hide/Show labels |
| **L** | Toggle links visibility |

### Touch Controls (Mobile/Tablet)

- **One Finger Drag**: Rotate view
- **Pinch**: Zoom in/out
- **Two Finger Drag**: Pan view
- **Tap**: Select node
- **Double Tap**: Focus on node

---

## Customization Guide for Non-Developers

### Changing Visual Appearance

#### 1. Adjusting Colors

**Using the Control Panel:**
1. Click the **Settings** button (gear icon)
2. Navigate to **"Appearance"** section
3. Select **"Color Scheme"**
4. Choose from presets:
   - **Default**: Blue and purple tones
   - **High Contrast**: Black and white with bright accents
   - **Warm**: Orange and red tones
   - **Cool**: Blue and green tones
   - **Colorblind-Friendly**: Optimized for accessibility

#### 2. Adjusting Node Sizes

1. Open **Settings** → **"Display Options"**
2. Find **"Node Size Scaling"** slider
3. Adjust from 50% (smaller) to 200% (larger)
4. Click **"Apply"** to save changes

#### 3. Enabling/Disabling Effects

Toggle these options in the Display panel:

- ☑️ **Show Node Labels**: Display text on all nodes
- ☑️ **Show Particles**: Animated particles along connections
- ☑️ **Enable Glow Effects**: Soft glow around selected nodes
- ☑️ **Show Connection Lines**: Display all relationships
- ☑️ **Animate Rotation**: Slow automatic rotation
- ☑️ **3D Mode**: Toggle between 2D and 3D view

### Filtering Data

#### Basic Filtering

1. **Open the Filter Panel** (funnel icon)
2. **Select Filter Type**:
   - **By Category**: Show only specific types
   - **By Date**: Filter by time period
   - **By Importance**: Show high-priority items only
   - **By Connections**: Minimum number of links

3. **Apply Filter**: Check boxes or use dropdowns
4. **Clear Filters**: Click "Clear All Filters" button

#### Search and Highlight

```
Step-by-Step:
1. Click search box (🔍) or press Ctrl+F
2. Type search term
3. Graph highlights matching nodes in yellow
4. Use ↑ ↓ arrows to navigate results
5. Press Enter to focus on first result
```

### Customizing Layout

#### Layout Algorithms

Different layouts work better for different data:

1. **Force-Directed** (Default)
   - Best for: General purpose, most types of data
   - Nodes naturally space themselves

2. **Hierarchical**
   - Best for: Tree-like structures, organizational charts
   - Top-down or left-right orientation

3. **Radial**
   - Best for: Showing relationships from a central concept
   - Circular arrangement around center node

4. **Grid**
   - Best for: Systematic comparison
   - Organized rows and columns

**To Change Layout:**
1. Settings → "Layout"
2. Select algorithm from dropdown
3. Click "Apply Layout"
4. Wait for animation to complete

### Saving Your Preferences

Your customizations are automatically saved to your browser. To save preferences across devices:

1. Click **User Menu** (top right)
2. Select **"Save Preferences"**
3. Choose **"Export Settings"**
4. Save the file to your computer
5. On another device: **"Import Settings"** and upload the file

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Graph Won't Load / Blank Screen

**Symptoms**: White or black screen, nothing appears

**Solutions**:
1. ✅ **Refresh the page** (F5 or Ctrl+R)
2. ✅ **Clear browser cache**:
   - Chrome: Ctrl+Shift+Delete → Clear cached images and files
   - Firefox: Ctrl+Shift+Delete → Cache
   - Safari: Safari → Clear History → All History
3. ✅ **Check internet connection**
4. ✅ **Disable browser extensions** temporarily
5. ✅ **Try a different browser**

#### Issue: Graph is Slow or Laggy

**Symptoms**: Choppy animation, delayed responses

**Solutions**:
1. ✅ **Reduce visual effects**:
   - Disable particles
   - Turn off glow effects
   - Hide labels (press H)
2. ✅ **Close other browser tabs**
3. ✅ **Reduce number of visible nodes**:
   - Apply filters to show fewer items
4. ✅ **Enable "Performance Mode"** in Settings
5. ✅ **Update graphics drivers**

#### Issue: Can't Find Specific Node

**Solutions**:
1. ✅ **Use search function** (Ctrl+F)
2. ✅ **Clear all filters** that might hide it
3. ✅ **Reset view** to default (press R)
4. ✅ **Check zoom level** - zoom out to see more

#### Issue: Nodes Are Too Small/Large

**Solutions**:
1. ✅ **Adjust zoom** with mouse wheel
2. ✅ **Change node size scaling** in Settings → Display
3. ✅ **Reset to default** if too far zoomed

#### Issue: Information Panel Won't Appear

**Solutions**:
1. ✅ **Click directly on node center** (not the label)
2. ✅ **Check if panel is hidden** - look for "Show Info" button
3. ✅ **Deselect and reselect** the node (click background, then node)
4. ✅ **Refresh the page**

#### Issue: Export/Screenshot Not Working

**Solutions**:
1. ✅ **Allow pop-ups** for the website
2. ✅ **Check browser permissions** for downloads
3. ✅ **Try alternative method**: Use browser screenshot (Ctrl+Shift+S in Firefox)
4. ✅ **Ensure you have disk space** for exports

### Browser-Specific Issues

#### Chrome/Edge
- If WebGL error appears: Go to `chrome://flags` → Enable "WebGL" and "WebGL 2.0"

#### Firefox
- If slow performance: Disable hardware acceleration in Settings → General → Performance

#### Safari
- If nothing renders: Enable WebGL in Develop menu → Experimental Features

### Getting Additional Help

If your issue isn't listed:

1. **Check the FAQ** section below
2. **Contact Support**:
   - Email: support@yourorganization.com
   - Include: Browser version, screenshot, description
3. **Report a Bug**:
   - Use the "Report Issue" button in Help menu
   - Provide steps to reproduce the problem

---

## Frequently Asked Questions (FAQ)

### General Questions

**Q: What data does the knowledge graph display?**  
A: The graph displays relationships between concepts, documents, people, or any entities in your organization's knowledge base. The specific content depends on your organization's configuration.

**Q: Is my data private?**  
A: Yes, the graph only displays data you have permission to view. All data is secured according to your organization's access policies.

**Q: Can I edit the graph directly?**  
A: For most users, the graph is read-only. If you have editing permissions, you'll see an "Edit Mode" button in the top menu.

**Q: How often is the data updated?**  
A: The graph typically updates every 24 hours. Real-time updates may be available depending on your configuration. Check the "Last Updated" timestamp in the top-right corner.

### Navigation Questions

**Q: I'm lost in the graph. How do I go back?**  
A: Press the **R** key or click the **"Reset View"** button to return to the default view. You can also click the **Home** button in the navigation bar.

**Q: How do I find a specific item?**  
A: Use the search box (press Ctrl+F or click the 🔍 icon). Type the name or keyword, and matching nodes will be highlighted.

**Q: What do the different colors mean?**  
A: Colors typically represent categories or types. Hover over a node to see its category, or check the legend in the control panel (if available).

**Q: Can I see the graph in 2D instead of 3D?**  
A: Yes! Go to Settings → Display → Toggle "3D Mode" off. This switches to a flat 2D view that may be easier to navigate.

### Interaction Questions

**Q: How do I see all connections for a node?**  
A: Click on the node to select it. Its immediate connections will be highlighted. Press **F** to focus on that node and hide unrelated connections.

**Q: Can I compare two nodes side by side?**  
A: Yes! Hold Ctrl and click both nodes to multi-select them. Then click the "Compare" button in the information panel.

**Q: How do I save my current view?**  
A: Click the bookmark icon or press Ctrl+B to save the current view. You can access saved views from the Views menu.

**Q: Can I print the graph?**  
A: Yes! Use the "Export" button and select "Print View" or "Export as PDF". For best results, use landscape orientation.

### Customization Questions

**Q: Can I change the background color?**  
A: Yes! Go to Settings → Appearance → Background. Choose from dark, light, or custom colors.

**Q: The text is too small. How do I make it bigger?**  
A: Settings → Display → "Label Size" slider. Increase it to 150% or 200% for larger text.

**Q: Can I hide nodes I'm not interested in?**  
A: Yes! Right-click on a node and select "Hide Node" or use filters to exclude certain categories. Hidden nodes can be revealed from Settings → Hidden Items.

**Q: How do I save my filter settings?**  
A: After applying filters, click "Save Filter Set" in the filter panel. Give it a name, and you can reload it anytime from the "Saved Filters" dropdown.

### Technical Questions

**Q: What browsers are supported?**  
A: Chrome (recommended), Firefox, Safari, and Edge. All browsers should be up-to-date for best performance.

**Q: Why is it running slowly on my computer?**  
A: Large graphs can be demanding. Try:
- Enabling "Performance Mode" in Settings
- Filtering to show fewer nodes
- Disabling visual effects
- Closing other applications

**Q: Can I use this on my phone or tablet?**  
A: Yes! The interface is touch-enabled. However, complex graphs may perform better on desktop computers.

**Q: Does this work offline?**  
A: Limited functionality is available offline if you've previously loaded the graph. However, search and updates require an internet connection.

### Data Questions

**Q: How do I export the data?**  
A: Click the export icon → Choose format (CSV, JSON, or Excel) → Select data to include → Download. Note: You must have export permissions.

**Q: Can I import my own data?**  
A: This depends on your permissions. Users with admin rights can import data via Settings → Data Management → Import. Contact your administrator if you need access.

**Q: What does the number on a node mean?**  
A: The number typically represents the count of connections or sub-items. Hover over the node to see details.

---

## Best Practices for Data Visualization

### Effective Navigation

✅ **DO:**
- Start with the default view to understand overall structure
- Use search to find specific items quickly
- Apply filters to focus on relevant subsets
- Reset view (R key) when disoriented
- Save interesting views for later reference

❌ **DON'T:**
- Don't zoom in too far initially - start with the big picture
- Don't apply too many filters at once - you might hide important connections
- Don't forget to check the legend for color meanings

### Understanding Relationships

#### Best Practices:

1. **Follow Connection Paths**
   - Click a node, then click a connected node
   - Trace relationships step by step
   - Use breadcrumb trail to backtrack

2. **Identify Key Hubs**
   - Large nodes are often central concepts
   - These are good starting points for exploration
   - Hover to see connection count

3. **Look for Clusters**
   - Groups of tightly connected nodes indicate related concepts
   - Clusters often represent categories or projects

### Optimizing Performance

For large graphs (500+ nodes):

1. **Use Filters Aggressively**
   - Show only what you need to see now
   - Save different filter sets for different purposes

2. **Reduce Visual Complexity**
   ```
   Settings Recommendations:
   ✓ Performance Mode: ON
   ✓ Particles: OFF
   ✓ Glow Effects: OFF
   ✓ Label Display: On Hover Only
   ✓ Animation Speed: Reduced
   ```

3. **Strategic Zooming**
   - Zoom in to specific areas rather than viewing everything at once
   - Use focus mode (F key) for detailed exploration

### Collaboration Tips

**Sharing Your View:**
1. Set up your filters and zoom
2. Click "Share View" button
3. Copy the generated link
4. Send to colleagues - they'll see exactly what you see

**Presenting the Graph:**
- Use "Presentation Mode" (Settings → Display)
- This hides controls and maximizes visualization
- Press P key to toggle
- Great for meetings and demos

**Documenting Insights:**
- Take screenshots of important patterns (Ctrl+Shift+P)
- Add annotations using the Note tool (if available)
- Export specific subgraphs for reports

### Accessibility Considerations

For users with visual impairments:

1. **Enable High Contrast Mode**
   - Settings → Appearance → High Contrast

2. **Use Colorblind-Friendly Palette**
   - Settings → Appearance → Colorblind Mode

3. **Increase Text Size**
   - Settings → Display → Label Size (200%)

4. **Enable Screen Reader Support**
   - Settings → Accessibility → Screen Reader Mode
   - Nodes become keyboard-navigable

5. **Use List View Alternative**
   - Some prefer the List View (button in nav bar)
   - Shows same data in tabular format

### Analysis Strategies

#### Strategy 1: Top-Down Exploration
```
1. Start with overview (default view)
2. Identify largest/central nodes
3. Click to explore each hub
4. Drill down into details
```

#### Strategy 2: Bottom-Up Search
```
1. Search for specific known item
2. Examine its connections
3. Follow paths to related items
4. Build understanding outward
```

#### Strategy 3: Category-Based
```
1. Filter by one category
2. Understand that domain fully
3. Switch to another category
4. Compare patterns across categories
```

#### Strategy 4: Time-Based
```
1. Filter by date range (earliest)
2. See how graph looked initially
3. Progressively add newer data
4. Observe growth patterns
```

---

## Step-by-Step Tutorials

### Tutorial 1: First Time User - Basic Navigation (10 minutes)

**Goal**: Learn to navigate and interact with the knowledge graph

**Step 1: Initial Observation (2 min)**
1. Open the knowledge graph
2. Don't touch anything yet - just observe
3. Notice:
   - Where are the largest nodes?
   - What colors do you see?
   - How are nodes arranged?

**Step 2: Basic Rotation (2 min)**
1. Click and hold left mouse button on empty space
2. Drag left and right - the graph rotates
3. Drag up and down - you're rotating in 3D
4. Practice rotating to see all sides
5. Press **R** to reset view

**Step 3: Zooming (2 min)**
1. Place cursor over a cluster of nodes
2. Scroll mouse wheel forward - zooms in
3. Scroll backward - zooms out
4. Practice: Zoom in very close, then zoom out far
5. Find a comfortable middle distance

**Step 4: Selecting Nodes (2 min)**
1. Click on any node (sphere)
2. Notice:
   - Information panel appears
   - Node highlights in bright color
   - Connected nodes may highlight
3. Read the information shown
4. Click on another node
5. Click on empty space to deselect

**Step 5: Using Search (2 min)**
1. Press **Ctrl+F** (or click search box)
2. Type a common word or name
3. Notice highlighted results
4. Press **Enter** or click a result
5. Graph centers on that node

**✅ Completion**: You now know how to view, rotate, zoom, and search the graph!

---

### Tutorial 2: Finding Related Information (15 minutes)

**Goal**: Discover relationships and navigate between connected concepts

**Step 1: Choose a Starting Point (3 min)**
1. Use search (Ctrl+F) to find a topic you're interested in
2. Click on that node to select it
3. Read its description in the info panel
4. Note how many connections it has

**Step 2: Explore First-Degree Connections (4 min)**
1. Look at the lines (edges) coming from your node
2. Follow a line to a connected node
3. Click on that connected node
4. Read its description - how does it relate to the first?
5. Repeat with 2-3 other connections

```
Visual Guide:
    (Start)
       ●
      /|\
     / | \
    ●  ●  ●   ← First-degree connections (direct)
```

**Step 3: Use Focus Mode (3 min)**
1. Select your original node again
2. Press **F** key (or click "Focus" button)
3. Graph fades everything except:
   - Your selected node
   - Its direct connections
   - Lines between them
4. This reduces clutter
5. Press **Esc** to exit focus mode

**Step 4: Navigate Multi-Level Relationships (3 min)**
1. From your original node, click a connection
2. From that node, click one of *its* connections
3. You're now 2 levels away from your start
4. Notice the breadcrumb trail (if available): Start → Node 2 → Node 3
5. Click breadcrumb to jump back

**Step 5: Save Your Discovery (2 min)**
1. When you find an interesting pattern
2. Click bookmark icon (or Ctrl+B)
3. Give it a name: "Project Connections" or similar
4. Access later from Views menu

**✅ Completion**: You can now trace relationships and discover connections!

---

### Tutorial 3: Filtering and Customizing Your View (20 minutes)

**Goal**: Create a customized, focused view of relevant data

**Step 1: Understanding Filters (4 min)**
1. Click the filter icon (funnel) to open filter panel
2. Review available filters:
   - Category/Type
   - Date range
   - Connection count
   - Other metadata
3. Don't apply anything yet - just explore options
4. Each filter will hide/show different nodes

**Step 2: Apply a Category Filter (4 min)**
1. Find "Category" or "Type" filter
2. Uncheck "Select All"
3. Check only ONE category
4. Click "Apply"
5. Notice: Graph now shows only that category
6. Observe: Connections between those nodes
7. Click "Clear Filters" to reset

**Step 3: Combine Multiple Filters (4 min)**
1. Apply Category filter again (choose one)
2. Also apply a Date filter (e.g., "Last 6 months")
3. Click "Apply"
4. You're now seeing: One category from recent period
5. This is great for: "Show me recent Projects"
6. Note the count: "Showing X of Y nodes"

**Step 4: Save Your Filter Set (3 min)**
1. With filters applied, click "Save Filter Set"
2. Name it something descriptive: "Recent Projects"
3. Click "Save"
4. Clear filters
5. Use "Load Filter Set" dropdown to reload it instantly
6. Create 2-3 different filter sets for common needs

**Step 5: Visual Customization (5 min)**
1. Open Settings → Appearance
2. Try different color schemes - find one you like
3. Settings → Display:
   - Increase "Node Size" if nodes are too small
   - Increase "Label Size" if text is hard to read
   - Toggle "Show Labels" - which do you prefer?
4. Settings → Performance:
   - If slow: Enable "Performance Mode"
5. Your changes save automatically

**✅ Completion**: You can now filter data and customize appearance!

---

### Tutorial 4: Advanced Analysis - Pattern Recognition (25 minutes)

**Goal**: Identify patterns, clusters, and insights in the data

**Step 1: Identify Clusters (6 min)**
1. Reset to default view (R key)
2. Zoom out to see the entire graph
3. Look for clusters: Groups of densely connected nodes
4. Count them: How many distinct clusters?
5. Each cluster often represents a:
   - Project team
   - Topic area
   - Time period
6. Take note of cluster locations

**Step 2: Find Hub Nodes (5 min)**
1. Look for the LARGEST nodes
2. These are hubs with many connections
3. Click on the largest node
4. Check info panel: How many connections?
5. These nodes are often:
   - Key people
   - Core concepts
   - Important documents
6. List the top 3 hubs you find

**Step 3: Analyze Connection Patterns (6 min)**
1. Select a hub node
2. Use Focus mode (F key)
3. Observe its connections:
   - Are they in one cluster or spread out?
   - Are there different types?
4. Click each connection type
5. Pattern recognition:
   - Star pattern: One central hub (hierarchical)
   - Mesh pattern: All interconnected (collaborative)
   - Chain pattern: Linear sequence (process)

```
Patterns:

Star (Hierarchical):        Mesh (Collaborative):
       ●                           ●───●
      /|\                          ├─┼─┤
     / | \                         ●─┼─●
    ●  ●  ●                          ●

Chain (Process):
    ●───●───●───●───●
```

**Step 4: Compare Timeframes (4 min)**
1. Apply filter: Date range = "Last month"
2. Note which nodes are visible
3. Change filter: Date range = "Last year"
4. Compare: What's new? What's grown?
5. This reveals:
   - Growth areas
   - Dormant projects
   - Seasonal patterns

**Step 5: Document Your Findings (4 min)**
1. Take screenshots of key patterns:
   - Press Ctrl+Shift+P (or use Export)
2. Create a view for each finding:
   - Set up filters
   - Save view with descriptive name
3. Export data if needed:
   - Click Export button
   - Choose CSV or Excel
   - Open in spreadsheet for further analysis

**✅ Completion**: You can now analyze patterns and extract insights!

---

### Tutorial 5: Collaboration and Sharing (15 minutes)

**Goal**: Share discoveries with your team

**Step 1: Create a Shareable View (4 min)**
1. Set up an interesting view:
   - Apply relevant filters
   - Zoom to appropriate level
   - Select key node (if relevant)
2. Click "Share" button (or link icon)
3. Dialog appears with options:
   - Share current view
   - Share selected nodes only
   - Share with filters
4. Toggle options as needed
5. Click "Generate Link"

**Step 2: Copy and Share the Link (3 min)**
1. Click "Copy Link" button
2. Paste into email or chat: Ctrl+V
3. Recipients will see exactly your view
4. Test it: Open in private/incognito window
5. If not working:
   - Check if link permissions are correct
   - Ensure recipients have access to the system

**Step 3: Export for Presentation (4 min)**
1. Click Export button
2. Choose "Image (PNG)" for screenshots
3. Or choose "PDF" for full-page export
4. Options to configure:
   - Include/exclude labels
   - Background color
   - Resolution/quality
5. Click "Download"
6. Image saves to your downloads folder

**Step 4: Presentation Mode (2 min)**
1. Set up your ideal view
2. Press **P** key (or Settings → Presentation Mode)
3. Controls hide, graph maximizes
4. Present in meetings:
   - Screen share this window
   - Navigate with arrow keys
   - Click nodes to explain
5. Press **P** again to exit

**Step 5: Collaborative Annotations (2 min)**
1. If annotation feature available:
   - Right-click on node or space
   - Select "Add Note"
   - Type your comment
   - Notes save automatically
2. Team members can see your notes
3. Great for collaborative analysis

**✅ Completion**: You can now share insights with your team!

---

## Additional Resources

### Quick Reference Card

```
╔════════════════════════════════════════╗
║      KNOWLEDGE GRAPH QUICK REF        ║
╠════════════════════════════════════════╣
║ MOUSE CONTROLS                         ║
║ • Rotate: Left-click + drag            ║
║ • Zoom: Mouse wheel                    ║
║ • Pan: Right-click + drag              ║
║ • Select: Click node                   ║
║                                        ║
║ KEYBOARD SHORTCUTS                     ║
║ • R - Reset view                       ║
║ • F - Focus mode                       ║
║ • H - Hide/show labels                 ║
║ • P - Presentation mode                ║
║ • Space - Pause animation              ║
║ • Ctrl+F - Search                      ║
║ • Esc - Deselect                       ║
║                                        ║
║ TIPS                                   ║
║ • Start with overview, zoom to detail  ║
║ • Use search to find specific items    ║
║ • Apply filters to reduce complexity   ║
║ • Save interesting views               ║
╚════════════════════════════════════════╝
```

### Glossary of Terms

- **Node**: A circle/sphere representing an entity (person, concept, document)
- **Edge**: A line connecting two nodes, representing a relationship
- **Hub**: A node with many connections
- **Cluster**: A group of densely interconnected nodes
- **Force-Directed**: Algorithm that positions nodes based on connection strength
- **Focus Mode**: View showing only selected node and its direct connections
- **Filter**: Criteria to show/hide specific nodes
- **Breadcrumb**: Navigation trail showing your path through the graph

### Video Tutorials

(If available, links to video walkthroughs would go here)

### Support Contacts

- **Email**: support@yourorganization.com
- **Documentation**: https://docs.yourorganization.com
- **Community Forum**: https://community.yourorganization.com
- **Feature Requests**: Submit via Help menu → "Request Feature"

---

## Conclusion

Congratulations! You now have comprehensive knowledge of how to use the Knowledge Graph visualization tool. Remember:

1. **Start Simple**: Begin with basic navigation before advanced features
2. **Explore Freely**: You can't break anything - experiment!
3. **Use Search**: When in doubt, search for what you need
4. **Save Your Work**: Bookmark views and save filter sets
5. **Ask for Help**: Use the Help menu or contact support

### Next Steps

- Complete the beginner tutorial (Tutorial 1)
- Explore your organization's specific data
- Create saved views for your common tasks
- Share interesting findings with your team
- Provide feedback to help us improve the tool

### We Want Your Feedback!

Found something confusing? Have suggestions for improvement? Use the feedback button in the Help menu or email us directly.

---

*Last Updated: December 27, 2025*  
*Version: 1.0*  
*For questions or support: support@yourorganization.com*

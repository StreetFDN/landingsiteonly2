# Street Foundation - Landing Site

A [Next.js](https://nextjs.org) project for Street Foundation featuring an interactive **Knowledge Graph** of controversial and cutting-edge technology sectors.

---

## 🔬 Knowledge Graph Feature

### 200+ Node Research Network
Explore 6 controversial technology sectors with comprehensive company, investor, and relationship data:

- 🌱 **AI Agriculture** - Precision farming, vertical agriculture, autonomous equipment
- 🛡️ **Military & Defense** - Autonomous weapons, AI defense, surveillance systems
- 💜 **AI Adult Content** - AI companions, generated content, chatbot platforms
- 👁️ **Surveillance Tech** - Biometric ID, facial recognition, tracking systems
- 🧬 **Genetic Editing** - CRISPR, gene therapy, base editing
- 🥽 **Augmented Reality** - AR/VR headsets, smart glasses, spatial computing

### Quick Access
- **Web Interface**: Navigate to `/knowledge-graph`
- **Documentation**: See `docs/KNOWLEDGE_GRAPH_QUICKSTART.md`
- **Data Details**: See `docs/KNOWLEDGE_GRAPH_DATA.md`

### Features
- ✅ Interactive force-directed graph with D3.js
- ✅ Sector-based filtering
- ✅ Search functionality
- ✅ Geographic clustering
- ✅ Funding relationship visualization
- ✅ Opposition/criticism tracking
- ✅ Performance optimized for 200+ nodes
- ✅ Mobile responsive

---

## 🚀 Getting Started

### Installation
```bash
npm install
# or
yarn install
```

### Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Access Knowledge Graph
Navigate to [http://localhost:3000/knowledge-graph](http://localhost:3000/knowledge-graph)

---

## 📁 Project Structure

```
landingsiteonly2/
├── app/
│   ├── knowledge-graph/     # Knowledge graph page
│   ├── page.tsx              # Main landing page
│   └── globals.css           # Global styles
├── components/
│   └── KnowledgeGraph.tsx    # Main graph component
├── lib/
│   └── graphdata.ts          # 200+ nodes data structure
├── public/
│   └── data/
│       └── comprehensive-research-graph.json  # JSON data
├── docs/
│   ├── KNOWLEDGE_GRAPH_DATA.md          # Data documentation
│   └── KNOWLEDGE_GRAPH_QUICKSTART.md    # Quick start guide
└── README.md
```

---

## 🎨 Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **D3.js** - Data visualization
- **Tailwind CSS** - Styling (optional)
- **React** - UI library

---

## 📊 Data Overview

### Node Count by Sector
| Sector | Companies | Investors | Total |
|--------|-----------|-----------|-------|
| AI Agriculture | 20 | 5 | 25 |
| Military & Defense | 20 | 5 | 25 |
| AI Adult Content | 10 | 3 | 13 |
| Surveillance Tech | 11 | 4 | 15 |
| Genetic Editing | 15 | 5 | 20 |
| Augmented Reality | 15 | 7 | 22 |
| **Total** | **91+** | **29+** | **200+** |

### Relationship Types
- Funding relationships (VC to company)
- Competition networks
- Strategic partnerships
- Opposition/criticism (privacy orgs vs surveillance)
- Co-investment patterns
- Technology collaborations

---

## 🔧 Configuration

### Update Graph Data
Edit `lib/graphdata.ts` to add new companies, investors, or relationships.

### Customize Appearance
Modify colors, sizes, and forces in `components/KnowledgeGraph.tsx`:

```typescript
const categoryColors: Record<string, string> = {
  'ai-agriculture': '#4CAF50',
  'military-defense': '#E53935',
  // ... customize colors
};
```

### Performance Tuning
For larger graphs (300+ nodes), adjust simulation parameters:

```typescript
.alphaDecay(0.02)      // Convergence speed
.velocityDecay(0.4)    // Stability
.force('charge', d3.forceManyBody().strength(-200))
```

---

## 📖 Documentation

- **[Quick Start Guide](docs/KNOWLEDGE_GRAPH_QUICKSTART.md)** - Get up and running
- **[Data Documentation](docs/KNOWLEDGE_GRAPH_DATA.md)** - Detailed sector breakdown
- **[Knowledge Graph README](KNOWLEDGE_GRAPH_README.md)** - Component documentation

---

## 🌍 Geographic Clusters

### Major Hubs
- **San Francisco Bay Area**: 40+ companies (agriculture, defense, AR)
- **Cambridge, MA**: 15+ companies (genetic editing, agriculture)
- **New York**: 10+ companies (surveillance, VCs)
- **China**: 10+ companies (AR hardware, agriculture)
- **Europe**: 15+ companies (defense, AR, biotech)

---

## 💡 Use Cases

### Research Applications
- Venture capital deal flow analysis
- Competitive landscape mapping
- Technology trend identification
- Funding pattern analysis
- Geographic cluster analysis

### Educational Uses
- Understanding controversial tech sectors
- Exploring AI ethics and implications
- Studying VC investment patterns
- Learning about emerging technologies

### Journalism
- Investigating defense tech funding
- Tracking surveillance technology
- Mapping tech industry relationships
- Following the money in controversial sectors

---

## 🤝 Contributing

### Adding Data
1. Research company information
2. Add to appropriate sector in `lib/graphdata.ts`
3. Define relationships in `allLinks` array
4. Update documentation
5. Submit pull request with sources

### Suggested Expansions
- Climate Tech (Carbon Capture, Renewables)
- Nuclear Energy (SMRs, Fusion startups)
- Brain-Computer Interfaces (Neuralink, Synchron)
- Quantum Computing (IonQ, Rigetti)
- Longevity/Anti-Aging (Calico, Unity Bio)

---

## 📝 Data Sources

Research compiled from:
- Crunchbase & PitchBook
- Company press releases
- Public SEC filings
- News: TechCrunch, Bloomberg, The Information
- Industry reports and analyst coverage

*Note: Funding amounts and valuations are approximate based on public reporting.*

---

## ⚠️ Disclaimer

This knowledge graph presents research data on controversial technology sectors. Inclusion does not imply endorsement. Data is compiled from public sources for educational and research purposes.

Some sectors involve sensitive topics:
- Military applications of AI
- Privacy and surveillance concerns
- Adult content generation
- Genetic modification ethics

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🔗 Links

- **Website**: [street.foundation](https://street.foundation)
- **GitHub**: [StreetFDN/landingsiteonly2](https://github.com/StreetFDN/landingsiteonly2)
- **Documentation**: See `docs/` directory

---

## 📧 Contact

For questions, data corrections, or collaboration:
- Open an issue on GitHub
- Email: gruber@street.app

---

## 🎯 Roadmap

- [ ] Expand to 300+ nodes
- [ ] Add time-series data (funding over time)
- [ ] Implement advanced filtering (by location, funding range)
- [ ] Add export functionality (PNG, SVG, JSON)
- [ ] Mobile app version
- [ ] Real-time data updates via API
- [ ] User-contributed data with verification
- [ ] Machine learning for pattern detection

---

## 🏆 Credits

Built with:
- Next.js by Vercel
- D3.js by Mike Bostock
- Research by Street Foundation team

---

**Last Updated**: December 2025  
**Version**: 2.0  
**Node Count**: 200+  
**Status**: Production Ready

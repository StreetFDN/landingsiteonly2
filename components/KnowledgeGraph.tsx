'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import styles from './KnowledgeGraph.module.css';

interface Node {
  id: string;
  label: string;
  category: string;
  importance: number;
  description?: string;
  location?: string;
  funding?: string;
  type?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
  type?: string;
  value?: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface KnowledgeGraphProps {
  dataUrl?: string;
  width?: number;
  height?: number;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  dataUrl = '/data/comprehensive-research-graph.json',
  width = 1400,
  height = 900,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<GraphData | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Enhanced category colors for all 6 sectors
  const categoryColors: Record<string, string> = {
    // AI Agriculture - Green spectrum
    'ai-agriculture': '#4CAF50',
    'ai-agriculture-vc': '#66BB6A',
    
    // Military & Defense - Red spectrum
    'military-defense': '#E53935',
    'defense-vc': '#EF5350',
    
    // AI Adult Content - Purple spectrum
    'ai-adult-content': '#9C27B0',
    'adult-content-investor': '#BA68C8',
    
    // Surveillance Tech - Dark Blue spectrum
    'surveillance-tech': '#1565C0',
    'privacy-org': '#1976D2',
    
    // Genetic Editing - Cyan spectrum
    'genetic-editing': '#00BCD4',
    'biotech-vc': '#26C6DA',
    
    // Augmented Reality - Orange spectrum
    'augmented-reality': '#FF9800',
    'ar-hardware-partner': '#FFB74D',
    'ar-investor': '#FFA726',
    
    // Legacy categories
    hardware: '#ff6b6b',
    software: '#4ecdc4',
    algorithms: '#45b7d1',
    applications: '#96ceb4',
    sensors: '#ffeaa7',
  };

  // Category groupings for filter
  const categoryGroups = {
    'AI Agriculture': ['ai-agriculture', 'ai-agriculture-vc'],
    'Military & Defense': ['military-defense', 'defense-vc'],
    'AI Adult Content': ['ai-adult-content', 'adult-content-investor'],
    'Surveillance Tech': ['surveillance-tech', 'privacy-org'],
    'Genetic Editing': ['genetic-editing', 'biotech-vc'],
    'Augmented Reality': ['augmented-reality', 'ar-hardware-partner', 'ar-investor'],
  };

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((jsonData: GraphData) => setData(jsonData))
      .catch((error) => console.error('Error loading data:', error));
  }, [dataUrl]);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g');

    // Filter data based on category group
    let filteredNodes = data.nodes;
    if (categoryFilter !== 'all') {
      const categoriesToShow = categoryGroups[categoryFilter as keyof typeof categoryGroups];
      if (categoriesToShow) {
        filteredNodes = data.nodes.filter((n) => categoriesToShow.includes(n.category));
      }
    }

    const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredLinks = data.links.filter(
      (l) =>
        filteredNodeIds.has(
          typeof l.source === 'string' ? l.source : l.source.id
        ) &&
        filteredNodeIds.has(
          typeof l.target === 'string' ? l.target : l.target.id
        )
    );

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    svg.call(zoom);

    // Create simulation with optimizations for 200+ nodes
    const simulation = d3
      .forceSimulation(filteredNodes)
      .force(
        'link',
        d3
          .forceLink(filteredLinks)
          .id((d: any) => d.id)
          .distance(80)
          .strength(0.3)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(35))
      .alphaDecay(0.02) // Faster convergence for large graphs
      .velocityDecay(0.4); // Better stability

    // Draw links with reduced opacity for large graphs
    const link = g
      .append('g')
      .selectAll('line')
      .data(filteredLinks)
      .enter()
      .append('line')
      .attr('class', styles.link)
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', (d: any) => Math.sqrt(d.value || 1) * 0.5);

    // Draw nodes
    const node = g
      .append('g')
      .selectAll('g')
      .data(filteredNodes)
      .enter()
      .append('g')
      .attr('class', styles.node)
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append('circle')
      .attr('r', (d) => (d.importance ? d.importance * 8 : 16))
      .attr('fill', (d) => categoryColors[d.category] || '#95a5a6')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    node
      .append('text')
      .text((d) => d.label)
      .attr('x', 0)
      .attr('y', (d) => (d.importance ? d.importance * 8 : 16) + 12)
      .attr('text-anchor', 'middle')
      .attr('class', styles.nodeLabel)
      .style('font-size', '10px')
      .style('pointer-events', 'none');

    // Event handlers
    node
      .on('mouseover', function (event, d) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', (d.importance ? d.importance * 8 : 16) * 1.3)
          .attr('stroke-width', 4);
        
        // Highlight connected links
        link
          .attr('stroke-opacity', (l: any) => {
            const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
            const targetId = typeof l.target === 'string' ? l.target : l.target.id;
            return (sourceId === d.id || targetId === d.id) ? 0.8 : 0.1;
          });
      })
      .on('mouseout', function (event, d) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', d.importance ? d.importance * 8 : 16)
          .attr('stroke-width', 2);
        
        // Reset link opacity
        link.attr('stroke-opacity', 0.3);
      })
      .on('click', (event, d) => {
        setSelectedNode(d);
      });

    // Apply search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      node.each(function (d) {
        const matches =
          d.label.toLowerCase().includes(lowerQuery) ||
          (d.description && d.description.toLowerCase().includes(lowerQuery)) ||
          (d.location && d.location.toLowerCase().includes(lowerQuery));
        d3.select(this).select('circle').attr('opacity', matches ? 1 : 0.2);
        d3.select(this).select('text').attr('opacity', matches ? 1 : 0.2);
      });
    }

    // Update positions
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Stop simulation after convergence for performance
    simulation.on('end', () => {
      console.log('Simulation converged');
    });

  }, [data, categoryFilter, searchQuery, width, height]);

  const getConnections = (node: Node): Link[] => {
    if (!data) return [];
    return data.links.filter(
      (l) =>
        (typeof l.source === 'string' ? l.source : l.source.id) === node.id ||
        (typeof l.target === 'string' ? l.target : l.target.id) === node.id
    );
  };

  const stats = useMemo(() => {
    if (!data) return null;
    return {
      totalNodes: data.nodes.length,
      totalLinks: data.links.length,
      sectors: Object.keys(categoryGroups).length,
    };
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="category-filter">Filter by Sector:</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Sectors ({stats?.totalNodes || 0} nodes)</option>
            <option value="AI Agriculture">🌱 AI Agriculture</option>
            <option value="Military & Defense">🛡️ Military & Defense</option>
            <option value="AI Adult Content">💜 AI Adult Content</option>
            <option value="Surveillance Tech">👁️ Surveillance Tech</option>
            <option value="Genetic Editing">🧬 Genetic Editing</option>
            <option value="Augmented Reality">🥽 Augmented Reality</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="search-input">Search:</label>
          <input
            type="text"
            id="search-input"
            placeholder="Search companies, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          className={styles.btn}
          onClick={() => {
            setCategoryFilter('all');
            setSearchQuery('');
          }}
        >
          Reset View
        </button>
      </div>

      {stats && (
        <div style={{ padding: '10px', fontSize: '12px', color: '#666' }}>
          {stats.totalNodes} nodes • {stats.totalLinks} connections • {stats.sectors} sectors
        </div>
      )}

      <div className={styles.graphContainer}>
        <svg ref={svgRef} width={width} height={height} />
      </div>

      {selectedNode && (
        <div className={styles.nodeDetails}>
          <button
            className={styles.closeBtn}
            onClick={() => setSelectedNode(null)}
          >
            ×
          </button>
          <h2>{selectedNode.label}</h2>
          <p
            className={styles.categoryBadge}
            style={{
              backgroundColor: categoryColors[selectedNode.category],
            }}
          >
            {selectedNode.category.toUpperCase().replace(/-/g, ' ')}
          </p>
          {selectedNode.location && (
            <p><strong>📍 Location:</strong> {selectedNode.location}</p>
          )}
          {selectedNode.funding && (
            <p><strong>💰 Funding:</strong> {selectedNode.funding}</p>
          )}
          <p>{selectedNode.description || 'No description available.'}</p>
          <div>
            <h3>Connections ({getConnections(selectedNode).length}):</h3>
            <ul>
              {getConnections(selectedNode).map((conn, idx) => {
                const connectedNodeId =
                  (typeof conn.source === 'string'
                    ? conn.source
                    : conn.source.id) === selectedNode.id
                    ? typeof conn.target === 'string'
                      ? conn.target
                      : conn.target.id
                    : typeof conn.source === 'string'
                    ? conn.source
                    : conn.source.id;
                const connectedNode = data?.nodes.find(
                  (n) => n.id === connectedNodeId
                );
                return (
                  <li key={idx}>
                    {connectedNode?.label} 
                    <span style={{ color: '#888', fontSize: '11px' }}>
                      {' '}({conn.type || 'related'})
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <div className={styles.legend}>
        <h3>Research Sectors</h3>
        {Object.entries(categoryGroups).map(([groupName, categories]) => (
          <div key={groupName} className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ backgroundColor: categoryColors[categories[0]] }}
            />
            <span>{groupName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeGraph;

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styles from './KnowledgeGraph.module.css';

interface Node {
  id: string;
  label: string;
  category: string;
  importance: number;
  description?: string;
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
  dataUrl = '/data/robotics-data.json',
  width = 1200,
  height = 800,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<GraphData | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryColors: Record<string, string> = {
    hardware: '#ff6b6b',
    software: '#4ecdc4',
    algorithms: '#45b7d1',
    applications: '#96ceb4',
    sensors: '#ffeaa7',
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

    // Filter data based on category
    const filteredNodes =
      categoryFilter === 'all'
        ? data.nodes
        : data.nodes.filter((n) => n.category === categoryFilter);

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

    // Create simulation
    const simulation = d3
      .forceSimulation(filteredNodes)
      .force(
        'link',
        d3
          .forceLink(filteredLinks)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Draw links
    const link = g
      .append('g')
      .selectAll('line')
      .data(filteredLinks)
      .enter()
      .append('line')
      .attr('class', styles.link)
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d: any) => Math.sqrt(d.value || 1));

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
      .attr('r', (d) => (d.importance ? d.importance * 10 : 20))
      .attr('fill', (d) => categoryColors[d.category] || '#95a5a6')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    node
      .append('text')
      .text((d) => d.label)
      .attr('x', 0)
      .attr('y', (d) => (d.importance ? d.importance * 10 : 20) + 15)
      .attr('text-anchor', 'middle')
      .attr('class', styles.nodeLabel);

    // Event handlers
    node
      .on('mouseover', function (event, d) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', (d.importance ? d.importance * 10 : 20) * 1.3)
          .attr('stroke-width', 4);
      })
      .on('mouseout', function (event, d) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', d.importance ? d.importance * 10 : 20)
          .attr('stroke-width', 2);
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
          (d.description && d.description.toLowerCase().includes(lowerQuery));
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
  }, [data, categoryFilter, searchQuery, width, height]);

  const getConnections = (node: Node): Link[] => {
    if (!data) return [];
    return data.links.filter(
      (l) =>
        (typeof l.source === 'string' ? l.source : l.source.id) === node.id ||
        (typeof l.target === 'string' ? l.target : l.target.id) === node.id
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="algorithms">Algorithms</option>
            <option value="applications">Applications</option>
            <option value="sensors">Sensors</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="search-input">Search:</label>
          <input
            type="text"
            id="search-input"
            placeholder="Search nodes..."
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
            {selectedNode.category.toUpperCase()}
          </p>
          <p>{selectedNode.description || 'No description available.'}</p>
          <div>
            <h3>Connections:</h3>
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
                    {connectedNode?.label} ({conn.type || 'related'})
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <div className={styles.legend}>
        <h3>Legend</h3>
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ backgroundColor: color }}
            />
            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeGraph;
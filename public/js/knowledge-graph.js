class KnowledgeGraph {
    constructor(containerId, dataUrl) {
        this.containerId = containerId;
        this.dataUrl = dataUrl;
        this.svg = d3.select(`#${containerId}`);
        this.width = 0;
        this.height = 0;
        this.simulation = null;
        this.nodes = [];
        this.links = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupDimensions();
        this.loadData();
        this.setupEventListeners();
        window.addEventListener('resize', () => this.handleResize());
    }

    setupDimensions() {
        const container = document.getElementById('graph-container');
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        this.svg.attr('width', this.width).attr('height', this.height);
    }

    async loadData() {
        try {
            const response = await fetch(this.dataUrl);
            const data = await response.json();
            this.nodes = data.nodes;
            this.links = data.links;
            this.render();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    getColorByCategory(category) {
        const colors = {
            hardware: '#ff6b6b',
            software: '#4ecdc4',
            algorithms: '#45b7d1',
            applications: '#96ceb4',
            sensors: '#ffeaa7'
        };
        return colors[category] || '#95a5a6';
    }

    render() {
        this.svg.selectAll('*').remove();

        const g = this.svg.append('g');

        // Setup zoom
        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        this.svg.call(zoom);

        // Filter data
        const filteredNodes = this.currentFilter === 'all' 
            ? this.nodes 
            : this.nodes.filter(n => n.category === this.currentFilter);
        
        const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
        const filteredLinks = this.links.filter(l => 
            filteredNodeIds.has(l.source.id || l.source) && 
            filteredNodeIds.has(l.target.id || l.target)
        );

        // Create force simulation
        this.simulation = d3.forceSimulation(filteredNodes)
            .force('link', d3.forceLink(filteredLinks)
                .id(d => d.id)
                .distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(40));

        // Draw links
        const link = g.append('g')
            .selectAll('line')
            .data(filteredLinks)
            .enter().append('line')
            .attr('class', 'link')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', d => Math.sqrt(d.value || 1));

        // Draw nodes
        const node = g.append('g')
            .selectAll('g')
            .data(filteredNodes)
            .enter().append('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', (event, d) => this.dragstarted(event, d))
                .on('drag', (event, d) => this.dragged(event, d))
                .on('end', (event, d) => this.dragended(event, d)));

        node.append('circle')
            .attr('r', d => d.importance ? d.importance * 10 : 20)
            .attr('fill', d => this.getColorByCategory(d.category))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);

        node.append('text')
            .text(d => d.label)
            .attr('x', 0)
            .attr('y', d => (d.importance ? d.importance * 10 : 20) + 15)
            .attr('text-anchor', 'middle')
            .attr('class', 'node-label');

        // Add hover effects
        node.on('mouseover', (event, d) => {
            d3.select(event.currentTarget).select('circle')
                .transition()
                .duration(200)
                .attr('r', (d.importance ? d.importance * 10 : 20) * 1.3)
                .attr('stroke-width', 4);
        })
        .on('mouseout', (event, d) => {
            d3.select(event.currentTarget).select('circle')
                .transition()
                .duration(200)
                .attr('r', d.importance ? d.importance * 10 : 20)
                .attr('stroke-width', 2);
        })
        .on('click', (event, d) => {
            this.showNodeDetails(d);
        });

        // Update positions on simulation tick
        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });
    }

    showNodeDetails(node) {
        const detailsPanel = document.getElementById('node-details');
        const title = document.getElementById('detail-title');
        const category = document.getElementById('detail-category');
        const description = document.getElementById('detail-description');
        const connectionsList = document.getElementById('connections-list');

        title.textContent = node.label;
        category.textContent = node.category.toUpperCase();
        category.style.backgroundColor = this.getColorByCategory(node.category);
        description.textContent = node.description || 'No description available.';

        // Find connections
        const connections = this.links.filter(l => 
            (l.source.id === node.id || l.source === node.id) ||
            (l.target.id === node.id || l.target === node.id)
        );

        connectionsList.innerHTML = '';
        connections.forEach(conn => {
            const connectedNodeId = (conn.source.id || conn.source) === node.id 
                ? (conn.target.id || conn.target) 
                : (conn.source.id || conn.source);
            const connectedNode = this.nodes.find(n => n.id === connectedNodeId);
            if (connectedNode) {
                const li = document.createElement('li');
                li.textContent = `${connectedNode.label} (${conn.type || 'related'})`;
                connectionsList.appendChild(li);
            }
        });

        detailsPanel.classList.remove('hidden');
    }

    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    filterByCategory(category) {
        this.currentFilter = category;
        this.render();
    }

    search(query) {
        if (!query) {
            this.svg.selectAll('.node circle').attr('opacity', 1);
            this.svg.selectAll('.node text').attr('opacity', 1);
            return;
        }

        const lowerQuery = query.toLowerCase();
        this.svg.selectAll('.node').each(function(d) {
            const matches = d.label.toLowerCase().includes(lowerQuery) ||
                          (d.description && d.description.toLowerCase().includes(lowerQuery));
            d3.select(this).select('circle').attr('opacity', matches ? 1 : 0.2);
            d3.select(this).select('text').attr('opacity', matches ? 1 : 0.2);
        });
    }

    reset() {
        this.currentFilter = 'all';
        document.getElementById('category-filter').value = 'all';
        document.getElementById('search-input').value = '';
        this.render();
    }

    handleResize() {
        this.setupDimensions();
        this.render();
    }

    setupEventListeners() {
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filterByCategory(e.target.value);
        });

        document.getElementById('search-input').addEventListener('input', (e) => {
            this.search(e.target.value);
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.reset();
        });

        document.getElementById('close-details').addEventListener('click', () => {
            document.getElementById('node-details').classList.add('hidden');
        });
    }
}

// Initialize the knowledge graph
document.addEventListener('DOMContentLoaded', () => {
    const graph = new KnowledgeGraph('knowledge-graph', '/data/robotics-data.json');
});
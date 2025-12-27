/**
 * 3D Knowledge Graph Visualization Engine
 * Interactive Three.js-powered robotics company network
 */

class KnowledgeGraph3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.nodes = [];
        this.edges = [];
        this.particles = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredNode = null;
        this.selectedNode = null;
        this.animationId = null;
        
        // Graph data
        this.companies = [
            { 
                id: 'tesla', 
                name: 'Tesla', 
                sector: 'Autonomous Vehicles',
                color: 0xe82127,
                description: 'Electric vehicles and autonomous driving technology',
                connections: ['nvidia', 'waymo', 'boston-dynamics']
            },
            { 
                id: 'boston-dynamics', 
                name: 'Boston Dynamics', 
                sector: 'Humanoid Robotics',
                color: 0x00a8e1,
                description: 'Advanced mobile manipulation and legged robotics',
                connections: ['tesla', 'nvidia', 'abb']
            },
            { 
                id: 'nvidia', 
                name: 'NVIDIA', 
                sector: 'AI Computing',
                color: 0x76b900,
                description: 'GPU computing and AI platforms for robotics',
                connections: ['tesla', 'boston-dynamics', 'waymo', 'universal-robots']
            },
            { 
                id: 'abb', 
                name: 'ABB Robotics', 
                sector: 'Industrial Automation',
                color: 0xff0000,
                description: 'Industrial robots and automation solutions',
                connections: ['kuka', 'fanuc', 'universal-robots', 'boston-dynamics']
            },
            { 
                id: 'kuka', 
                name: 'KUKA', 
                sector: 'Industrial Robotics',
                color: 0xff6600,
                description: 'Manufacturing automation and industrial robots',
                connections: ['abb', 'fanuc', 'universal-robots']
            },
            { 
                id: 'universal-robots', 
                name: 'Universal Robots', 
                sector: 'Collaborative Robots',
                color: 0x0066cc,
                description: 'Collaborative robot arms (cobots) for industry',
                connections: ['abb', 'kuka', 'fanuc', 'nvidia']
            },
            { 
                id: 'fanuc', 
                name: 'FANUC', 
                sector: 'Factory Automation',
                color: 0xffcc00,
                description: 'CNC systems and industrial robotics',
                connections: ['abb', 'kuka', 'universal-robots']
            },
            { 
                id: 'irobot', 
                name: 'iRobot', 
                sector: 'Consumer Robotics',
                color: 0x00a0d2,
                description: 'Home cleaning robots and consumer products',
                connections: ['amazon-robotics', 'dji']
            },
            { 
                id: 'intuitive-surgical', 
                name: 'Intuitive Surgical', 
                sector: 'Medical Robotics',
                color: 0x6b4c9a,
                description: 'Robotic-assisted surgical systems',
                connections: ['nvidia', 'boston-dynamics']
            },
            { 
                id: 'dji', 
                name: 'DJI', 
                sector: 'Aerial Robotics',
                color: 0x000000,
                description: 'Commercial and consumer drones',
                connections: ['irobot', 'waymo', 'nvidia']
            },
            { 
                id: 'waymo', 
                name: 'Waymo', 
                sector: 'Autonomous Driving',
                color: 0x4285f4,
                description: 'Self-driving technology and autonomous vehicles',
                connections: ['tesla', 'nvidia', 'dji']
            },
            { 
                id: 'amazon-robotics', 
                name: 'Amazon Robotics', 
                sector: 'Warehouse Automation',
                color: 0xff9900,
                description: 'Fulfillment center robotics and automation',
                connections: ['irobot', 'abb', 'kuka']
            }
        ];
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0f);
        this.scene.fog = new THREE.Fog(0x0a0a0f, 50, 200);
        
        // Camera setup
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
        this.camera.position.set(0, 0, 80);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        
        // Orbit controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 0.5;
        this.controls.minDistance = 30;
        this.controls.maxDistance = 150;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.5;
        
        // Lighting setup
        this.setupLighting();
        
        // Create particle background
        this.createParticleBackground();
        
        // Create graph
        this.createGraph();
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        this.scene.add(directionalLight);
        
        // Point lights for atmosphere
        const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100);
        pointLight1.position.set(30, 30, 30);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff00ff, 1, 100);
        pointLight2.position.set(-30, -30, 30);
        this.scene.add(pointLight2);
        
        const pointLight3 = new THREE.PointLight(0xffff00, 1, 100);
        pointLight3.position.set(0, 40, -30);
        this.scene.add(pointLight3);
    }
    
    createParticleBackground() {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 200;
            positions[i + 1] = (Math.random() - 0.5) * 200;
            positions[i + 2] = (Math.random() - 0.5) * 200;
            
            // Color
            const color = new THREE.Color();
            color.setHSL(Math.random(), 0.8, 0.5);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    createGraph() {
        // Position nodes in 3D space using force-directed algorithm
        this.positionNodes();
        
        // Create node meshes
        this.companies.forEach((company, index) => {
            const node = this.createNode(company);
            this.nodes.push(node);
            this.scene.add(node);
        });
        
        // Create connection edges
        this.createEdges();
        
        // Apply force-directed layout
        this.applyForceLayout();
    }
    
    positionNodes() {
        // Arrange nodes in a sphere initially
        const radius = 40;
        this.companies.forEach((company, index) => {
            const phi = Math.acos(-1 + (2 * index) / this.companies.length);
            const theta = Math.sqrt(this.companies.length * Math.PI) * phi;
            
            company.position = {
                x: radius * Math.cos(theta) * Math.sin(phi),
                y: radius * Math.sin(theta) * Math.sin(phi),
                z: radius * Math.cos(phi)
            };
            
            company.velocity = { x: 0, y: 0, z: 0 };
        });
    }
    
    createNode(company) {
        // Create node group
        const nodeGroup = new THREE.Group();
        
        // Main sphere
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: company.color,
            emissive: company.color,
            emissiveIntensity: 0.3,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        nodeGroup.add(sphere);
        
        // Glow effect
        const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: company.color,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        nodeGroup.add(glow);
        
        // Outer ring
        const ringGeometry = new THREE.TorusGeometry(3, 0.1, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: company.color,
            transparent: true,
            opacity: 0.5
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        nodeGroup.add(ring);
        
        // Set position
        nodeGroup.position.set(
            company.position.x,
            company.position.y,
            company.position.z
        );
        
        // Store company data
        nodeGroup.userData = company;
        nodeGroup.name = company.id;
        
        return nodeGroup;
    }
    
    createEdges() {
        this.companies.forEach(company => {
            const sourceNode = this.nodes.find(n => n.name === company.id);
            
            company.connections.forEach(targetId => {
                const targetNode = this.nodes.find(n => n.name === targetId);
                
                if (sourceNode && targetNode) {
                    const edge = this.createEdge(sourceNode, targetNode);
                    this.edges.push(edge);
                    this.scene.add(edge);
                }
            });
        });
    }
    
    createEdge(sourceNode, targetNode) {
        const points = [];
        points.push(sourceNode.position.clone());
        points.push(targetNode.position.clone());
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0x4a9eff,
            transparent: true,
            opacity: 0.3,
            linewidth: 1
        });
        
        const line = new THREE.Line(geometry, material);
        line.userData = {
            source: sourceNode,
            target: targetNode
        };
        
        return line;
    }
    
    applyForceLayout() {
        const iterations = 100;
        const k = 2; // Optimal distance
        const c = 0.1; // Repulsion strength
        
        for (let iter = 0; iter < iterations; iter++) {
            // Reset forces
            this.companies.forEach(company => {
                company.velocity = { x: 0, y: 0, z: 0 };
            });
            
            // Repulsion between all nodes
            for (let i = 0; i < this.companies.length; i++) {
                for (let j = i + 1; j < this.companies.length; j++) {
                    const c1 = this.companies[i];
                    const c2 = this.companies[j];
                    
                    const dx = c1.position.x - c2.position.x;
                    const dy = c1.position.y - c2.position.y;
                    const dz = c1.position.z - c2.position.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.1;
                    
                    const force = (c * k * k) / (dist * dist);
                    
                    c1.velocity.x += (dx / dist) * force;
                    c1.velocity.y += (dy / dist) * force;
                    c1.velocity.z += (dz / dist) * force;
                    
                    c2.velocity.x -= (dx / dist) * force;
                    c2.velocity.y -= (dy / dist) * force;
                    c2.velocity.z -= (dz / dist) * force;
                }
            }
            
            // Attraction along edges
            this.companies.forEach(company => {
                company.connections.forEach(targetId => {
                    const target = this.companies.find(c => c.id === targetId);
                    if (!target) return;
                    
                    const dx = target.position.x - company.position.x;
                    const dy = target.position.y - company.position.y;
                    const dz = target.position.z - company.position.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.1;
                    
                    const force = (dist * dist) / k;
                    
                    company.velocity.x += (dx / dist) * force * 0.01;
                    company.velocity.y += (dy / dist) * force * 0.01;
                    company.velocity.z += (dz / dist) * force * 0.01;
                });
            });
            
            // Update positions
            this.companies.forEach(company => {
                company.position.x += company.velocity.x;
                company.position.y += company.velocity.y;
                company.position.z += company.velocity.z;
            });
        }
        
        // Update node positions
        this.nodes.forEach((node, index) => {
            const company = this.companies[index];
            node.position.set(
                company.position.x,
                company.position.y,
                company.position.z
            );
        });
        
        // Update edges
        this.updateEdges();
    }
    
    updateEdges() {
        this.edges.forEach(edge => {
            const positions = edge.geometry.attributes.position.array;
            positions[0] = edge.userData.source.position.x;
            positions[1] = edge.userData.source.position.y;
            positions[2] = edge.userData.source.position.z;
            positions[3] = edge.userData.target.position.x;
            positions[4] = edge.userData.target.position.y;
            positions[5] = edge.userData.target.position.z;
            edge.geometry.attributes.position.needsUpdate = true;
        });
    }
    
    setupEventListeners() {
        // Mouse move for hover
        this.renderer.domElement.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        });
        
        // Click for selection
        this.renderer.domElement.addEventListener('click', (event) => {
            this.onMouseClick(event);
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }
    
    onMouseMove(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.nodes, true);
        
        // Reset previous hover
        if (this.hoveredNode && this.hoveredNode !== this.selectedNode) {
            this.resetNodeScale(this.hoveredNode);
        }
        
        if (intersects.length > 0) {
            const node = intersects[0].object.parent;
            if (node !== this.selectedNode) {
                this.hoveredNode = node;
                this.highlightNode(node, 1.3);
                this.renderer.domElement.style.cursor = 'pointer';
            }
        } else {
            this.hoveredNode = null;
            this.renderer.domElement.style.cursor = 'default';
        }
    }
    
    onMouseClick(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.nodes, true);
        
        // Reset previous selection
        if (this.selectedNode) {
            this.resetNodeScale(this.selectedNode);
        }
        
        if (intersects.length > 0) {
            const node = intersects[0].object.parent;
            this.selectedNode = node;
            this.highlightNode(node, 1.5);
            this.showCompanyDetails(node.userData);
            this.highlightConnections(node);
        } else {
            this.selectedNode = null;
            this.hideCompanyDetails();
            this.resetAllConnections();
        }
    }
    
    highlightNode(node, scale) {
        gsap.to(node.scale, {
            x: scale,
            y: scale,
            z: scale,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    resetNodeScale(node) {
        gsap.to(node.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    highlightConnections(node) {
        const companyId = node.name;
        
        this.edges.forEach(edge => {
            const isConnected = 
                edge.userData.source.name === companyId ||
                edge.userData.target.name === companyId;
            
            if (isConnected) {
                edge.material.opacity = 0.8;
                edge.material.color.setHex(0x00ff00);
            } else {
                edge.material.opacity = 0.1;
            }
        });
    }
    
    resetAllConnections() {
        this.edges.forEach(edge => {
            edge.material.opacity = 0.3;
            edge.material.color.setHex(0x4a9eff);
        });
    }
    
    showCompanyDetails(company) {
        // Remove existing popup if any
        this.hideCompanyDetails();
        
        // Create popup
        const popup = document.createElement('div');
        popup.id = 'company-popup';
        popup.className = 'company-popup';
        popup.innerHTML = `
            <div class="popup-header">
                <h3>${company.name}</h3>
                <button class="popup-close" onclick="knowledgeGraph.hideCompanyDetails()">×</button>
            </div>
            <div class="popup-content">
                <p class="company-sector">${company.sector}</p>
                <p class="company-description">${company.description}</p>
                <div class="company-connections">
                    <h4>Connected to:</h4>
                    <ul>
                        ${company.connections.map(connId => {
                            const conn = this.companies.find(c => c.id === connId);
                            return `<li>${conn ? conn.name : connId}</li>`;
                        }).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Animate in
        gsap.from(popup, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    }
    
    hideCompanyDetails() {
        const popup = document.getElementById('company-popup');
        if (popup) {
            gsap.to(popup, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
                onComplete: () => popup.remove()
            });
        }
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Update controls
        this.controls.update();
        
        // Rotate particles slowly
        if (this.particles) {
            this.particles.rotation.y += 0.0002;
            this.particles.rotation.x += 0.0001;
        }
        
        // Animate node rings
        this.nodes.forEach((node, index) => {
            const ring = node.children[2];
            if (ring) {
                ring.rotation.z += 0.01;
            }
            
            // Pulse glow
            const time = Date.now() * 0.001;
            const glow = node.children[1];
            if (glow) {
                glow.material.opacity = 0.2 + Math.sin(time + index) * 0.1;
            }
        });
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.renderer.dispose();
        this.controls.dispose();
        
        // Clean up geometries and materials
        this.scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
    
    // Public API
    focusOnNode(companyId) {
        const node = this.nodes.find(n => n.name === companyId);
        if (node) {
            const targetPosition = node.position.clone();
            targetPosition.z += 20;
            
            gsap.to(this.camera.position, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: 1.5,
                ease: 'power2.inOut',
                onUpdate: () => {
                    this.controls.target.copy(node.position);
                }
            });
        }
    }
    
    resetView() {
        gsap.to(this.camera.position, {
            x: 0,
            y: 0,
            z: 80,
            duration: 1.5,
            ease: 'power2.inOut'
        });
        
        gsap.to(this.controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: 'power2.inOut'
        });
    }
    
    toggleAutoRotate() {
        this.controls.autoRotate = !this.controls.autoRotate;
    }
}

// Initialize when DOM is ready
let knowledgeGraph;

document.addEventListener('DOMContentLoaded', () => {
    // Check if container exists
    const container = document.getElementById('knowledge-graph-container');
    if (container) {
        knowledgeGraph = new KnowledgeGraph3D('knowledge-graph-container');
        
        // Expose to window for external access
        window.knowledgeGraph = knowledgeGraph;
        
        console.log('3D Knowledge Graph initialized successfully');
    }
});

// CSS styles (inject into page)
const style = document.createElement('style');
style.textContent = `
    .company-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(10, 10, 15, 0.95);
        border: 2px solid #4a9eff;
        border-radius: 12px;
        padding: 0;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 10px 40px rgba(74, 158, 255, 0.3);
        z-index: 10000;
        backdrop-filter: blur(10px);
    }
    
    .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid rgba(74, 158, 255, 0.3);
    }
    
    .popup-header h3 {
        margin: 0;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
    }
    
    .popup-close {
        background: none;
        border: none;
        color: #fff;
        font-size: 32px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
    }
    
    .popup-close:hover {
        transform: rotate(90deg);
        color: #4a9eff;
    }
    
    .popup-content {
        padding: 20px;
    }
    
    .company-sector {
        color: #4a9eff;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 12px;
    }
    
    .company-description {
        color: #ccc;
        line-height: 1.6;
        margin-bottom: 20px;
    }
    
    .company-connections h4 {
        color: #fff;
        font-size: 16px;
        margin-bottom: 10px;
    }
    
    .company-connections ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .company-connections li {
        color: #aaa;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .company-connections li:last-child {
        border-bottom: none;
    }
    
    @media (max-width: 768px) {
        .company-popup {
            max-width: 90%;
        }
        
        .popup-header h3 {
            font-size: 20px;
        }
    }
`;
document.head.appendChild(style);

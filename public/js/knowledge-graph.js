// Robotics companies data with relationships
const graphData = {
    nodes: [
        {
            id: 1,
            name: "Tesla",
            category: "Automotive & AI Robotics",
            description: "Leading electric vehicle manufacturer developing advanced autopilot systems, humanoid robots (Optimus), and AI-driven manufacturing automation.",
            color: "#e74c3c"
        },
        {
            id: 2,
            name: "Boston Dynamics",
            category: "Advanced Robotics",
            description: "Pioneering advanced robotics with dynamic mobility systems. Known for Spot (quadruped robot), Atlas (humanoid), and Stretch (logistics robot).",
            color: "#3498db"
        },
        {
            id: 3,
            name: "NVIDIA",
            category: "AI & Computing",
            description: "Leader in GPU computing and AI platforms. Provides Isaac robotics platform, Omniverse simulation, and Jetson edge AI computing for robotics.",
            color: "#76b900"
        },
        {
            id: 4,
            name: "ABB Robotics",
            category: "Industrial Automation",
            description: "Global leader in industrial robots and automation solutions. Specializes in collaborative robots, machine automation, and smart manufacturing systems.",
            color: "#ff6b6b"
        },
        {
            id: 5,
            name: "KUKA",
            category: "Industrial Robotics",
            description: "German robotics company providing intelligent automation solutions for industries including automotive, electronics, and logistics.",
            color: "#f39c12"
        },
        {
            id: 6,
            name: "Universal Robots",
            category: "Collaborative Robots",
            description: "Pioneer in collaborative robot arms (cobots) designed to work alongside humans safely. Focus on flexible, easy-to-program automation.",
            color: "#1abc9c"
        },
        {
            id: 7,
            name: "FANUC",
            category: "Industrial Automation",
            description: "Japanese robotics giant specializing in CNC systems, industrial robots, and factory automation with AI-enhanced capabilities.",
            color: "#e67e22"
        },
        {
            id: 8,
            name: "iRobot",
            category: "Consumer Robotics",
            description: "Consumer robotics company famous for Roomba vacuum robots and developing home automation solutions with advanced navigation.",
            color: "#9b59b6"
        },
        {
            id: 9,
            name: "Intuitive Surgical",
            category: "Medical Robotics",
            description: "Leader in robotic-assisted minimally invasive surgery with the da Vinci Surgical System, transforming healthcare worldwide.",
            color: "#16a085"
        },
        {
            id: 10,
            name: "DJI",
            category: "Aerial Robotics",
            description: "World leader in drone technology and aerial imaging systems for consumer, enterprise, and agricultural applications.",
            color: "#2980b9"
        },
        {
            id: 11,
            name: "Waymo",
            category: "Autonomous Vehicles",
            description: "Alphabet's self-driving technology company developing autonomous vehicle systems with advanced sensor fusion and AI.",
            color: "#27ae60"
        },
        {
            id: 12,
            name: "Amazon Robotics",
            category: "Warehouse Automation",
            description: "Develops mobile robots, automated storage systems, and AI-powered logistics solutions for Amazon's fulfillment centers.",
            color: "#ff9800"
        }
    ],
    edges: [
        { source: 1, target: 3, relationship: "AI Partnership" },
        { source: 1, target: 11, relationship: "Autonomous Tech" },
        { source: 2, target: 3, relationship: "AI Computing" },
        { source: 2, target: 4, relationship: "Industrial Collab" },
        { source: 3, target: 4, relationship: "AI Integration" },
        { source: 3, target: 5, relationship: "Smart Manufacturing" },
        { source: 3, target: 6, relationship: "Vision Systems" },
        { source: 3, target: 11, relationship: "Autonomous Driving" },
        { source: 4, target: 5, relationship: "Industry Standards" },
        { source: 4, target: 7, relationship: "Automation Tech" },
        { source: 5, target: 7, relationship: "Manufacturing" },
        { source: 6, target: 4, relationship: "Collaborative Robots" },
        { source: 6, target: 7, relationship: "Cobot Technology" },
        { source: 8, target: 12, relationship: "Consumer Robotics" },
        { source: 9, target: 3, relationship: "Medical AI" },
        { source: 10, target: 3, relationship: "Computer Vision" },
        { source: 11, target: 3, relationship: "AI Platform" },
        { source: 12, target: 3, relationship: "Logistics AI" },
        { source: 12, target: 6, relationship: "Warehouse Automation" },
        { source: 1, target: 2, relationship: "Robotics Innovation" },
        { source: 2, target: 12, relationship: "Logistics Robots" }
    ]
};

// Three.js scene setup
let scene, camera, renderer, controls;
let nodeObjects = [];
let edgeObjects = [];
let selectedNode = null;
let raycaster, mouse;
let isAnimating = true;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e27, 0.0015);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;
    camera.position.y = 10;

    // Renderer
    const canvas = document.getElementById('graph-canvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6366f1, 0.8);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0xa855f7, 0.6, 100);
    fillLight.position.set(-20, 10, -20);
    scene.add(fillLight);

    const accentLight = new THREE.PointLight(0xec4899, 0.5, 100);
    accentLight.position.set(20, -10, 20);
    scene.add(accentLight);

    // Raycaster for mouse interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Create graph
    createGraph();

    // Controls (simple rotation)
    setupControls();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    canvas.addEventListener('click', onNodeClick);
    canvas.addEventListener('mousemove', onMouseMove);

    // Update stats
    document.getElementById('node-count').textContent = graphData.nodes.length;
    document.getElementById('edge-count').textContent = graphData.edges.length;

    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);

    // Start animation
    animate();
}

function createGraph() {
    // Create nodes
    graphData.nodes.forEach((node, index) => {
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: node.color,
            emissive: node.color,
            emissiveIntensity: 0.3,
            shininess: 100,
            specular: 0xffffff
        });
        const sphere = new THREE.Mesh(geometry, material);

        // Position nodes in 3D space (circular layout)
        const angle = (index / graphData.nodes.length) * Math.PI * 2;
        const radius = 25;
        const height = (Math.random() - 0.5) * 20;
        
        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.y = height;
        sphere.position.z = Math.sin(angle) * radius;

        sphere.castShadow = true;
        sphere.receiveShadow = true;
        sphere.userData = node;

        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: node.color,
            transparent: true,
            opacity: 0.2
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        sphere.add(glow);

        scene.add(sphere);
        nodeObjects.push(sphere);
    });

    // Create edges
    graphData.edges.forEach(edge => {
        const sourceNode = nodeObjects[edge.source - 1];
        const targetNode = nodeObjects[edge.target - 1];

        const points = [];
        points.push(sourceNode.position);
        points.push(targetNode.position);

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.3
        });
        const line = new THREE.Line(geometry, material);
        line.userData = { relationship: edge.relationship };
        
        scene.add(line);
        edgeObjects.push(line);
    });

    // Add particle background
    createParticleBackground();
}

function createParticleBackground() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.3,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
}

function setupControls() {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotation = { x: 0, y: 0 };

    const canvas = document.getElementById('graph-canvas');

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            rotation.y += deltaX * 0.005;
            rotation.x += deltaY * 0.005;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.05;
        camera.position.z = Math.max(20, Math.min(100, camera.position.z));
    });

    // Apply rotation
    function updateRotation() {
        nodeObjects.forEach((node, index) => {
            const originalPos = {
                x: Math.cos((index / graphData.nodes.length) * Math.PI * 2) * 25,
                y: (Math.random() - 0.5) * 20,
                z: Math.sin((index / graphData.nodes.length) * Math.PI * 2) * 25
            };

            // Apply rotation
            const cosX = Math.cos(rotation.x);
            const sinX = Math.sin(rotation.x);
            const cosY = Math.cos(rotation.y);
            const sinY = Math.sin(rotation.y);

            // Rotate around Y axis
            let x = originalPos.x * cosY - originalPos.z * sinY;
            let z = originalPos.x * sinY + originalPos.z * cosY;
            
            // Rotate around X axis
            let y = originalPos.y * cosX - z * sinX;
            z = originalPos.y * sinX + z * cosX;

            node.position.set(x, y, z);
        });

        // Update edge positions
        edgeObjects.forEach((edge, index) => {
            const sourceNode = nodeObjects[graphData.edges[index].source - 1];
            const targetNode = nodeObjects[graphData.edges[index].target - 1];

            const points = [];
            points.push(sourceNode.position.clone());
            points.push(targetNode.position.clone());

            edge.geometry.setFromPoints(points);
        });
    }

    // Auto-rotation when not dragging
    setInterval(() => {
        if (!isDragging && isAnimating) {
            rotation.y += 0.001;
            updateRotation();
        }
    }, 16);

    updateRotation();
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodeObjects);

    // Reset all nodes
    nodeObjects.forEach(node => {
        node.scale.set(1, 1, 1);
    });

    // Highlight hovered node
    if (intersects.length > 0) {
        const hoveredNode = intersects[0].object;
        hoveredNode.scale.set(1.3, 1.3, 1.3);
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'default';
    }
}

function onNodeClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodeObjects);

    if (intersects.length > 0) {
        const clickedNode = intersects[0].object;
        selectedNode = clickedNode.userData;
        showNodeDetail(selectedNode);
    }
}

function showNodeDetail(node) {
    const card = document.getElementById('node-detail-card');
    const nodeName = document.getElementById('node-name');
    const nodeCategory = document.getElementById('node-category');
    const nodeDescription = document.getElementById('node-description');
    const nodeConnections = document.getElementById('node-connections');

    nodeName.textContent = node.name;
    nodeCategory.textContent = node.category;
    nodeDescription.textContent = node.description;

    // Find connections
    const connections = graphData.edges.filter(
        edge => edge.source === node.id || edge.target === node.id
    ).map(edge => {
        const connectedNodeId = edge.source === node.id ? edge.target : edge.source;
        const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
        return {
            name: connectedNode.name,
            relationship: edge.relationship,
            color: connectedNode.color
        };
    });

    nodeConnections.innerHTML = '<h3>Connections</h3>';
    connections.forEach(conn => {
        const connDiv = document.createElement('div');
        connDiv.className = 'connection-item';
        connDiv.style.borderLeftColor = conn.color;
        connDiv.innerHTML = `<strong>${conn.name}</strong><br><small>${conn.relationship}</small>`;
        nodeConnections.appendChild(connDiv);
    });

    card.classList.remove('hidden');
}

function closeNodeDetail() {
    document.getElementById('node-detail-card').classList.add('hidden');
    selectedNode = null;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Animate node glow
    nodeObjects.forEach((node, index) => {
        const time = Date.now() * 0.001;
        const glow = node.children[0];
        if (glow) {
            glow.scale.set(
                1 + Math.sin(time + index) * 0.1,
                1 + Math.sin(time + index) * 0.1,
                1 + Math.sin(time + index) * 0.1
            );
        }
    });

    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
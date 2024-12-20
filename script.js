let scene, camera, renderer, graph;
const gui = new dat.GUI();

const params = {
  xMin: -5,
  xMax: 5,
  yMin: -5,
  yMax: 5,
  resolution: 50,
  height: 2,
  wireframe: true,
  rotation: true,
};

function init() {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Add axes
  addAxes();

  // GUI controls
  gui.add(params, "xMin", -20, 0).onChange(updateGraph);
  gui.add(params, "xMax", 0, 20).onChange(updateGraph);
  gui.add(params, "yMin", -20, 0).onChange(updateGraph);
  gui.add(params, "yMax", 0, 20).onChange(updateGraph);
  gui.add(params, "resolution", 10, 100).step(1).onChange(updateGraph);
  gui.add(params, "height", 0.1, 5).onChange(updateGraph);
  gui.add(params, "wireframe").onChange(updateGraph);
  gui.add(params, "rotation");

  // Initial graph
  updateGraph();

  // Handle window resize
  window.addEventListener("resize", onWindowResize, false);
}

function addAxes() {
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
}

function updateGraph() {
  // Remove existing graph if it exists
  if (graph) {
    scene.remove(graph);
  }

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];

  // Get function from input
  const functionString = document.getElementById("function-input").value;
  const func = new Function("x", "y", `return ${functionString}`);

  // Create vertices
  const xStep = (params.xMax - params.xMin) / params.resolution;
  const yStep = (params.yMax - params.yMin) / params.resolution;

  for (let i = 0; i <= params.resolution; i++) {
    for (let j = 0; j <= params.resolution; j++) {
      const x = params.xMin + i * xStep;
      const y = params.yMin + j * yStep;
      try {
        const z = func(x, y) * params.height;
        vertices.push(x, z, y); // Note: y and z are swapped for better visualization
      } catch (e) {
        vertices.push(x, 0, y);
      }
    }
  }

  // Create indices for triangles
  for (let i = 0; i < params.resolution; i++) {
    for (let j = 0; j < params.resolution; j++) {
      const a = i * (params.resolution + 1) + j;
      const b = a + 1;
      const c = a + params.resolution + 1;
      const d = c + 1;

      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: params.wireframe,
    side: THREE.DoubleSide,
  });

  graph = new THREE.Mesh(geometry, material);
  scene.add(graph);
}

function animate() {
  requestAnimationFrame(animate);

  if (params.rotation && graph) {
    graph.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();

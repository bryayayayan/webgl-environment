const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);
camera.lookAt(0, 0, 0);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x22B822, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

function addTree(x, z, scale = 1) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2 * scale, 0.2 * scale, 1 * scale),
    new THREE.MeshBasicMaterial({ color: 0x8B4513 })
  );
  trunk.position.set(x, 0.5 * scale, z);

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(0.6 * scale, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x228B22 })
  );
  leaves.position.set(x, 1.3 * scale, z);

  scene.add(trunk, leaves);
}

function addHouse(x, z) {
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 2),
    new THREE.MeshBasicMaterial({ color: 0xffcc99 })
  );
  base.position.set(x, 0.75, z);

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 1, 4),
    new THREE.MeshBasicMaterial({ color: 0x8b0000 })
  );
  roof.position.set(x, 1.75, z);
  roof.rotation.y = Math.PI / 4;

  scene.add(base, roof);
}

function addCloud(x, y, z) {
  const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const cloud = new THREE.Group();
  const parts = [
    new THREE.SphereGeometry(0.6, 12, 12),
    new THREE.SphereGeometry(0.5, 12, 12),
    new THREE.SphereGeometry(0.4, 12, 12)
  ];
  const offsets = [-0.5, 0, 0.5];

  parts.forEach((geo, i) => {
    const puff = new THREE.Mesh(geo, cloudMaterial);
    puff.position.x = offsets[i];
    cloud.add(puff);
  });

  cloud.position.set(x, y, z);
  scene.add(cloud);
}

function addAnimal(x, z, type = 'dog') {
  if (type === 'dog') {
    const dogGroup = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.5, 0.4),
      new THREE.MeshBasicMaterial({ color: 0x8B4513 })
    );
    body.position.set(0, 0.25, 0);
    dogGroup.add(body);

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.4, 0.4),
      new THREE.MeshBasicMaterial({ color: 0xA0522D })
    );
    head.position.set(0.7, 0.35, 0);
    dogGroup.add(head);

    const earMaterial = new THREE.MeshBasicMaterial({ color: 0x5C3317 });
    const ear1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.05), earMaterial);
    const ear2 = ear1.clone();
    ear1.position.set(0.75, 0.55, -0.1);
    ear2.position.set(0.75, 0.55, 0.1);
    dogGroup.add(ear1, ear2);

    const legMaterial = new THREE.MeshBasicMaterial({ color: 0x5C3317 });
    const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
    const legPositions = [
      [-0.35, 0, -0.15], [0.35, 0, -0.15],
      [-0.35, 0, 0.15], [0.35, 0, 0.15]
    ];
    legPositions.forEach(p => {
      const leg = new THREE.Mesh(legGeo, legMaterial);
      leg.position.set(...p);
      dogGroup.add(leg);
    });

    const tail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.4),
      new THREE.MeshBasicMaterial({ color: 0x5C3317 })
    );
    tail.position.set(-0.55, 0.4, 0);
    tail.rotation.z = Math.PI / 4;
    dogGroup.add(tail);

    dogGroup.position.set(x, 0, z);
    scene.add(dogGroup);
  } else if (type === 'sheep') {
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    body.position.set(x, 0.4, z);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x333333 })
    );
    head.position.set(x + 0.4, 0.4, z);

    scene.add(body, head);
  }
}

function addGrass(x, z) {
  const blade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.3),
    new THREE.MeshBasicMaterial({ color: 0x006400 })
  );
  blade.position.set(x, 0.15, z);
  scene.add(blade);
}

function addPond(x, z, width, height) {
  const pondGeometry = new THREE.PlaneGeometry(width, height);
  const pondMaterial = new THREE.MeshBasicMaterial({
    color: 0x1E90FF,
    opacity: 0.7,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const pond = new THREE.Mesh(pondGeometry, pondMaterial);
  pond.rotation.x = -Math.PI / 2;
  pond.position.set(x, 0.1, z);

  scene.add(pond);
}

for (let i = -10; i <= 10; i += 5) addTree(i, -5, 1);
for (let i = -15; i <= 15; i += 1) addGrass(i, 1);

addTree(3, 3, 1.2);
addTree(-5, 4, 0.8);

addHouse(-7, -3);
addHouse(6, -2);
addHouse(0, 4);

addAnimal(2, 2, 'dog');
addAnimal(-3, 3, 'sheep');

const cloudPositions = [
  [-5, 7, -10], [3, 8, -8], [8, 6, -9],
  [-10, 9, -12], [0, 10, -14], [5, 7.5, -13],
  [-7, 6.5, -11], [10, 9, -10], [12, 8, -13],
  [-12, 8, -9]
];
cloudPositions.forEach(pos => addCloud(...pos));

addPond(0, 0, 5, 3);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xFFFF00 })
);
sun.position.set(10, 8, -15);
scene.add(sun);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

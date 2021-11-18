export const ambientLightProps = { intensity: 0.55 };
export const cameraProps = { fov: 20, position: [30, 0, 0] };
export const pixelRatio = 1;
export const pointLightProps = { decay: 2, position: [10, 20, 15], shadowMapSize: 4096 };

export const controlsProps = { maxPolarAngle: 2 *Math.PI, minPolarAngle: 0, target: [0, 0, 0], maxDistance: 130, minDistance: 10 };

export const modelProps = { position: [0, 1, 8] };

export const groundProps = { posiiton: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0] };

export const models = [
    {
        modelPath: "./model/barracuda_fish/scene.gltf",
    },
    {
        modelPath: "./model/betta_splendens/scene.gltf",
    },
    {
        modelPath: "./model/bream_fish/scene.gltf",
    },
    {
        modelPath: "./model/bream_fish__dorade_royale/scene.gltf",
    },
    {
        modelPath: "./model/clown_fish/scene.gltf",
        elementPath: {
            'Circle_0' : "./model/clown_fish/elements/body.png",
            'Sphere_0' : "./model/clown_fish/elements/eye.png"
        }
    },
    {
        modelPath: "./model/fish/scene.gltf",
    },
    {
        modelPath: "./model/great_white_shark/scene.gltf",
    },
    {
        modelPath: "./model/guppy_fish/scene.gltf",
    },
    {
        modelPath: "./model/headpone/scene.gltf",
    },
    {
        modelPath: "./model/paracheirodon_innesi___tetra_neon/scene.gltf",
    },
    {
        modelPath: "./model/shiny_fish/scene.gltf",
    },
    {
        modelPath: "./model/killer_whale/scene.gltf",
    },
    {
        modelPath: "./model/sailfish/scene.gltf",
    },
];

export const BackPaths = [
    "./skybox/ocean1.jpg",
    "./skybox/ocean2.jpg",
    "./skybox/ocean3.jpg"
];
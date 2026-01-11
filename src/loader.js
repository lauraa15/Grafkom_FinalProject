import * as THREE from "three";
export function loadTexture(path, options = {}) {
    const maps = {};
    const textureLoader = new THREE.TextureLoader();
    if (options.color !== false) {
        maps.map = textureLoader.load(`/textures/${path.folder}/${path.name}_Color.jpg`);
        maps.map.colorSpace = THREE.SRGBColorSpace;
    }

    if (options.normal !== false)
        maps.normalMap = textureLoader.load(`/textures/${path.folder}/${path.name}_NormalGL.jpg`);

    if (options.roughness !== false)
        maps.roughnessMap = textureLoader.load(`/textures/${path.folder}/${path.name}_Roughness.jpg`);

    if (options.metalness !== false)
        maps.metalnessMap = textureLoader.load(`/textures/${path.folder}/${path.name}_Metalness.jpg`);

    if (options.displacement)
        maps.displacementMap = textureLoader.load(`/textures/${path.folder}/${path.name}_Displacement.jpg`);

    if (options.ao)
        maps.aoMap = textureLoader.load(`/textures/${path.folder}/${path.name}_AmbientOcclusion.jpg`);

    return maps;
}

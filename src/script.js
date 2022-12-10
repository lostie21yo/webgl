import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap'
import * as dat from 'lil-gui'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

const a180 = Math.PI
const a90 = Math.PI / 2
const a45 = Math.PI / 4
const a30 = Math.PI / 6
const a15 = Math.PI / 12





// SCENE & CANVAS =======================================================================================================
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()





// Light ======================================================================================
const gui = new dat.GUI()

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01)
scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
// directionalLight.position.set(1, 0.25, 0)
// scene.add(directionalLight)

// const directionallightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
// scene.add(directionallightHelper)

// // const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
// // scene.add(hemisphereLight)

// const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
// pointLight.position.x = 1
// pointLight.position.y = 3
// pointLight.position.z = 1
// scene.add(pointLight)

// const PointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
// scene.add(PointLightHelper)

// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
// rectAreaLight.position.set(-1.5, 5, 1.5)
// rectAreaLight.lookAt(new THREE.Vector3)
// scene.add(rectAreaLight)

// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
// scene.add(rectAreaLightHelper)

// const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
// spotLight.position.set(0, 7, 3)
// spotLight.target.position.x = -0.75
// scene.add(spotLight)
// scene.add(spotLight.target)





// TEXTURES ================================================================================================

//const gui2 = new dat.GUI()
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg'
])

const acousticColor = new THREE.MeshStandardMaterial({ color: "grey" })
const acousticTexture = textureLoader.load('/textures/acousticTexture.jpg')
acousticColor.envMap = environmentMapTexture
acousticColor.map = acousticTexture
acousticColor.side = THREE.DoubleSide
acousticColor.metalness = 0
acousticColor.roughness = 0.8
    //gui.add(acousticColor, 'metalness').min(0).max(1).step(0.0001)
    //gui.add(acousticColor, 'roughness').min(0).max(1).step(0.0001)

const drumKitColor = new THREE.MeshStandardMaterial({ color: "red" })
const drumRedTexture = textureLoader.load('/textures/drumRedTexture.jpg')
drumKitColor.envMap = environmentMapTexture
drumKitColor.map = drumRedTexture
drumKitColor.side = THREE.DoubleSide
drumKitColor.metalness = 0.2
drumKitColor.roughness = 0.05

const metalicMaterial = new THREE.MeshStandardMaterial()
metalicMaterial.envMap = environmentMapTexture
metalicMaterial.side = THREE.DoubleSide
metalicMaterial.metalness = 0.9
metalicMaterial.roughness = 0.1

const microMaterial = new THREE.MeshStandardMaterial()
const microTexture = textureLoader.load('/textures/microTexture.jpg')
microMaterial.envMap = environmentMapTexture
microMaterial.normalScale.set(4, 4)
microMaterial.map = microTexture
microMaterial.side = THREE.DoubleSide
microMaterial.metalness = 0.4
microMaterial.roughness = 0.5

const drumKitLeather = new THREE.MeshStandardMaterial({ color: "white" })
const drumLeatherTexture = textureLoader.load('/textures/drumLeatherTexture.jpg')
drumKitLeather.envMap = environmentMapTexture
drumKitLeather.map = drumLeatherTexture
drumKitLeather.side = THREE.DoubleSide
drumKitLeather.metalness = 0.05
drumKitLeather.roughness = 0.4

const cymbalColor = new THREE.MeshStandardMaterial({ color: "#fcda72" })
const cymbalTexture = textureLoader.load('/textures/cymbalTexture.jpg')
cymbalColor.map = cymbalTexture
cymbalColor.envMap = environmentMapTexture
cymbalColor.side = THREE.DoubleSide
cymbalColor.metalness = 0.24
cymbalColor.roughness = 0.15

const blackLeather = new THREE.MeshStandardMaterial({ color: "black" })
blackLeather.envMap = environmentMapTexture
blackLeather.side = THREE.DoubleSide
blackLeather.metalness = 0.3
blackLeather.roughness = 0.15

const acousticDiffuserMaterial = new THREE.MeshStandardMaterial({ color: "white" })
const acousticDiffuserTexture = textureLoader.load('/textures/acousticDiffuserTexture.png')
acousticDiffuserMaterial.envMap = environmentMapTexture
acousticDiffuserMaterial.map = acousticDiffuserTexture
acousticDiffuserMaterial.side = THREE.DoubleSide
acousticDiffuserMaterial.metalness = 0.05
acousticDiffuserMaterial.roughness = 0.4

const settMaterial = new THREE.MeshStandardMaterial()
const settTexture = textureLoader.load('/textures/settTexture.jpg')
settMaterial.envMap = environmentMapTexture
settMaterial.map = settTexture
settMaterial.side = THREE.DoubleSide
settMaterial.metalness = 0.05
settMaterial.roughness = 0.4
settTexture.wrapS = THREE.MirroredRepeatWrapping
settTexture.wrapT = THREE.MirroredRepeatWrapping
settTexture.repeat.x = 12
settTexture.repeat.y = 15
settTexture.center.x = 0.5
settTexture.center.y = 0.5
    // colorTexture.offset.x = 0.5
    // colorTexture.offset.y = 0.5
    // colorTexture.rotation= Math.PI * 0.25

// //colorTexture.generateMipmaps = false // разгрузка gpu
// //colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter





// MATERIALS =========================================================================================

// const gui2 = new dat.GUI()
// const textureLoader = new THREE.TextureLoader()

// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
// const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
// const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
// const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
// const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

// const cubeTextureLoader = new THREE.CubeTextureLoader()
// const environmentMapTexture = cubeTextureLoader.load([
//     '/textures/environmentMaps/1/px.jpg',
//     '/textures/environmentMaps/1/nx.jpg',
//     '/textures/environmentMaps/1/py.jpg',
//     '/textures/environmentMaps/1/ny.jpg',
//     '/textures/environmentMaps/1/pz.jpg',
//     '/textures/environmentMaps/1/nz.jpg'
// ])


// const material = new THREE.MeshStandardMaterial()
// material.envMap = environmentMapTexture
//     // material.gradientMap = gradientTexture
//     // material.matcap = matcapTexture
//     // material.map = doorColorTexture
//     // material.color = new THREE.Color('#ff0000')
// material.transparent = true
//     // material.opacity = 0.5
//     // material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide
//     // material.flatShading = true
//     // material.shininess = 100
//     // material.specular = new THREE.Color(0x1188ff)

// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
//
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
//
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
//
// material.alphaMap = doorAlphaTexture

// material.metalness = 0.7
// material.roughness = 0.2

// gui2.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui2.add(material, 'roughness').min(0).max(1).step(0.0001)


// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
// sphere.position.y = 3
// sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

// const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
// plane.position.y = 5
// plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

// const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material)
// torus.position.y = 7
// torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

// scene.add(sphere, plane, torus)





// OBJECTS =======================================================================================================


// Пол
function MakeFloor() {
    const floor = new THREE.Mesh(new THREE.BoxGeometry(36, 1, 40), settMaterial)
    floor.position.set(0, -0.5, 2)
    scene.add(floor)
}
MakeFloor()


// Стены + 3D текст 
function MakeWalls() {
    const wallPaper = textureLoader.load('/textures/wallpaper.jpg')
    const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(28, 10, 1),
        new THREE.MeshBasicMaterial({ map: wallPaper })
    )
    frontWall.position.set(0, 4, -4)
        // colorTexture.wrapS = THREE.MirroredRepeatWrapping
        // colorTexture.wrapT = THREE.MirroredRepeatWrapping
        // colorTexture.repeat.x = 3
        // colorTexture.repeat.y = 2
        // colorTexture.offset.x = 0.5
        // colorTexture.offset.y = 0.5
        // colorTexture.rotation= Math.PI * 0.25
        // colorTexture.center.x= 0.5
        // colorTexture.center.y= 0.5

    //colorTexture.generateMipmaps = false // разгрузка gpu
    //colorTexture.minFilter = THREE.NearestFilter
    wallPaper.magFilter = THREE.NearestFilter

    // Текст на стене
    const fontLoader = new FontLoader()

    fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
        const textGeometry = new TextGeometry('Rock Scene', {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
        })

        const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const text = new THREE.Mesh(textGeometry, material)
        textGeometry.center()
        text.position.set(0, frontWall.position.y + 2.5, frontWall.position.z + 0.6)
        scene.add(text)
    })

    const upperWall = new THREE.Mesh(
        new THREE.BoxGeometry(30, 2, 15),
        new THREE.MeshBasicMaterial({ color: "#212121" })
    )
    upperWall.position.set(0, 9, -9)

    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(2, 11, 15),
        new THREE.MeshBasicMaterial({ color: "#212121" })
    )
    leftWall.position.set(14, 4, -9)

    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(2, 11, 15),
        new THREE.MeshBasicMaterial({ color: "#212121" })
    )
    rightWall.position.set(-14, 4, -9)

    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(28, 10, 1),
        new THREE.MeshBasicMaterial({ color: "#212121" })
    )
    backWall.position.set(0, 4, -16)

    scene.add(frontWall, upperWall, leftWall, rightWall, backWall)
}
MakeWalls()


// Платформа сцены
const groupPlatform = new THREE.Group()

function MakePlatform() {
    const platform = new THREE.Mesh(
        new THREE.CylinderGeometry(14.5, 14, 1, 64, 1),
        new THREE.MeshBasicMaterial({ color: 'brown', wireframe: false })
    )
    groupPlatform.add(platform)
    groupPlatform.position.y = 0.5
}
MakePlatform()


// Создание металлической фермы
function MakeTrusses(X, Y, Z, H, W) {
    function MakeFrame(X, Y, Z, Zrot) {
        const tubelength = 1
        const fs = tubelength / 2 //frame size
        const frameGeometry1 = new THREE.CylinderGeometry(0.03, 0.03, tubelength * 1.35, 12, 1)
        const frameMaterial = metalicMaterial

        frameMaterial.metalness = 0.8
        frameMaterial.roughness = 0.25
        const groupFrame = new THREE.Group()
        groupFrame.rotateZ(Zrot)

        let frame_params1 = [
            [a45, 0, 0, X - fs, Y, Z],
            [-a45, 0, 0, X - fs, Y, Z],
            [a45, 0, 0, X + fs, Y, Z],
            [-a45, 0, 0, X + fs, Y, Z],
            [0, 0, a45, X, Y, Z - fs],
            [0, 0, -a45, X, Y, Z - fs],
            [0, 0, a45, X, Y, Z + fs],
            [0, 0, -a45, X, Y, Z + fs]
        ];

        for (let i = 0; i < frame_params1.length; i++) {

            const frame = new THREE.Mesh(frameGeometry1, frameMaterial)
                //frame.geometry.setAttribute('uv2', new THREE.BufferAttribute(frame.geometry.attributes.uv.array, 2))
            frame.rotation.set(frame_params1[i][0], frame_params1[i][1], frame_params1[i][2])
            frame.position.set(frame_params1[i][3], frame_params1[i][4], frame_params1[i][5])
            groupFrame.add(frame)
        }

        const frameGeometry2 = new THREE.CylinderGeometry(0.05, 0.05, tubelength, 12, 1)
        let frame_params2 = [
            [a90, 0, 0, X - fs, Y + fs, Z],
            [a90, 0, 0, X - fs, Y - fs, Z],
            [a90, 0, 0, X + fs, Y + fs, Z],
            [a90, 0, 0, X + fs, Y - fs, Z],
            [0, 0, a90, X, Y - fs, Z + fs],
            [0, 0, a90, X, Y - fs, Z - fs],
            [0, 0, a90, X, Y + fs, Z + fs],
            [0, 0, a90, X, Y + fs, Z - fs],
            [0, 0, 0, X - fs, Y, Z + fs],
            [0, 0, 0, X - fs, Y, Z - fs],
            [0, 0, 0, X + fs, Y, Z + fs],
            [0, 0, 0, X + fs, Y, Z - fs]
        ];
        for (let i = 0; i < frame_params2.length; i++) {

            const frame = new THREE.Mesh(frameGeometry2, frameMaterial)
            frame.rotation.set(frame_params2[i][0], frame_params2[i][1], frame_params2[i][2])
            frame.position.set(frame_params2[i][3], frame_params2[i][4], frame_params2[i][5])
            groupFrame.add(frame)
        }

        scene.add(groupFrame)
    }
    const groupTrusses = new THREE.Group()
    groupTrusses.position.set(X, Y, Z)

    for (let i = 0; i < H; i++) {
        MakeFrame(X, Y + i, Z, 0)
        MakeFrame(X + W, Y + i, Z, 0)
    }
    for (let i = 0; i <= W; i++) MakeFrame(X + i, Y + H, Z, 0)
    scene.add(groupTrusses)
}
MakeTrusses(-16, 0.5, 0, 12, 32)
MakeTrusses(-16, 0.5, 10, 12, 32)


// Создание акустики
function MakeAcoustic() {
    function MakeSpeaker(X, Y, Z, Xrot, Yrot, Zrot, Sc) {
        const groupAcoustic = new THREE.Group()
        groupAcoustic.position.set(X, Y, Z)
        groupAcoustic.rotation.set(Xrot, Yrot, Zrot)

        const corob = new THREE.Mesh(new THREE.BoxGeometry(1 * Sc, 1.5 * Sc, 1 * Sc), acousticColor)

        const guba1 = new THREE.Mesh(new THREE.TorusGeometry(0.35 * Sc, 0.05 * Sc, 16, 32), blackLeather)
        guba1.position.set(0, -0.25 * Sc, 0.5 * Sc)
        const diffuser1 = new THREE.Mesh(new THREE.CircleGeometry(0.35 * Sc, 16), acousticDiffuserMaterial)
        diffuser1.position.set(0, -0.25 * Sc, 0.51 * Sc)
        const cap1 = new THREE.Mesh(new THREE.SphereGeometry(0.17 * Sc, 16, 16), blackLeather)
        cap1.position.set(0, -0.25 * Sc, 0.38 * Sc)

        const guba2 = new THREE.Mesh(new THREE.TorusGeometry(0.2 * Sc, 0.04 * Sc, 16, 32), blackLeather)
        guba2.position.set(-0.2 * Sc, 0.42 * Sc, 0.5 * Sc)
        const diffuser2 = new THREE.Mesh(new THREE.CircleGeometry(0.2 * Sc, 16), acousticDiffuserMaterial)
        diffuser2.position.set(-0.2 * Sc, 0.42 * Sc, 0.51 * Sc)
        const cap2 = new THREE.Mesh(new THREE.SphereGeometry(0.08 * Sc, 16, 16), blackLeather)
        cap2.position.set(-0.2 * Sc, 0.42 * Sc, 0.45 * Sc)

        const guba3 = new THREE.Mesh(new THREE.TorusGeometry(0.12 * Sc, 0.03 * Sc, 16, 32), blackLeather)
        guba3.position.set(0.25 * Sc, 0.42 * Sc, 0.5 * Sc)
        const diffuser3 = new THREE.Mesh(new THREE.CircleGeometry(0.12 * Sc, 16), acousticDiffuserMaterial)
        diffuser3.position.set(0.25 * Sc, 0.42 * Sc, 0.51 * Sc)

        groupAcoustic.add(corob, guba1, guba2, guba3, cap1, cap2, diffuser1, diffuser2, diffuser3)
        groupPlatform.add(groupAcoustic)
        scene.add(groupPlatform)
    }

    let ap = [
        [10.95, 2, 1, 0, 0, 0, 2],
        [13, 2, 1, 0, 0, 0, 2],
        [10.8, 4.2, 1, 0, -a15, 0, 1],
        [12, 4.2, 1.3, 0, 0, 0, 1],
        [13.2, 4.2, 1, 0, a15, 0, 1],
        [-10.95, 2, 1, 0, 0, 0, 2],
        [-13, 2, 1, 0, 0, 0, 2],
        [-10.8, 4.2, 1, 0, a15, 0, 1],
        [-12, 4.2, 1.3, 0, 0, 0, 1],
        [-13.2, 4.2, 1, 0, -a15, 0, 1],
        [5, 11.35, 11, a15, 0, 0, 1],
        [-5, 11.35, 11, a15, 0, 0, 1],
        [12, 11.35, 11, a15, 0, 0, 1],
        [-12, 11.35, 11, a15, 0, 0, 1]
    ]

    for (let i = 0; i < ap.length; i++) {
        MakeSpeaker(ap[i][0], ap[i][1], ap[i][2], ap[i][3], ap[i][4], ap[i][5], ap[i][6])
    }
}

MakeAcoustic()


// Создание ударной установки
function MakeDrumKit(X, Y, Z, Yrot, Sc) {
    const groupDrumKit = new THREE.Group()
    groupDrumKit.position.set(X, Y, Z)
    groupDrumKit.scale.set(Sc, Sc, Sc)
    groupDrumKit.rotateY(Yrot)

    // Барабан
    function MakeDrum(X, Y, Z, Xrot, Yrot, Zrot, H, R) {
        const groupDrum = new THREE.Group()
        const drum = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 64, 1), drumKitColor)
        const steelstrip = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.015, R * 1.015, H, 6, 1), metalicMaterial)
        const steelcircle1 = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.03, R * 1.03, H * 0.06, 64, 1), metalicMaterial)
        const steelcircle2 = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.03, R * 1.03, H * 0.06, 64, 1), metalicMaterial)
        const leather = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.999, R * 0.999, H * 1.061, 64, 1), drumKitLeather)

        steelcircle1.position.y = (H / 2)
        steelcircle2.position.y = -(H / 2)

        groupDrum.add(drum, steelcircle1, steelcircle2, leather, steelstrip)
        groupDrum.position.set(X, Y, Z)
        groupDrum.rotation.set(Xrot, Yrot, Zrot)
        groupDrumKit.add(groupDrum)
    }

    // Тарелка
    function MakeCymbal(X, Y, Z, Xrot, Yrot, Zrot, H, R) {
        const groupCymbal = new THREE.Group()
        const cymbal = new THREE.Mesh(new THREE.ConeGeometry(R, H, 64, 1), cymbalColor)

        groupCymbal.add(cymbal)
        groupCymbal.position.set(X, Y, Z)
        groupCymbal.rotation.set(Xrot, Yrot, Zrot)
        groupDrumKit.add(groupCymbal)
    }

    function MakeStick(X, Y, Z, Xrot, Yrot, Zrot, H) {
        const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, H, 64, 1), metalicMaterial)
        stick.position.set(X, Y, Z)
        stick.rotation.set(Xrot, Yrot, Zrot)

        groupDrumKit.add(stick)
    }

    function MakeStickLegs(X, Y, Z, H) {
        MakeStick(X - 0.25, Y, Z, 0, 0, -a30 * 2, 0.7)
        MakeStick(X + 0.25, Y, Z, 0, 0, a30 * 2, 0.7)
        MakeStick(X, Y, Z - 0.25, a30 * 2, 0, 0, 0.7)
        MakeStick(X, Y, Z + 0.25, -a30 * 2, 0, 0, 0.7)
        MakeStick(X, -0.63 + H / 2, Z, 0, 0, 0, H)
    }

    // Басс-барабан
    MakeDrum(0, 0.05, 0, a90, 0, 0, 1, 1)
    MakeStick(-1, -0.8, 0.5, 0, 0, -a45, 0.6)
    MakeStick(1, -0.8, 0.5, 0, 0, a45, 0.6)

    // Напольный том-том
    MakeDrum(-1.7, 0.4, -1.2, -a15 / 1.5, 0, -a15 / 1.5, 0.9, 0.6)
    MakeStick(-1.2, -0.7, -1.2, 0, 0, 0, 1.05)
    MakeStick(-2.37, -0.47, -1.2, 0, 0, 0, 1.05)
    MakeStick(-1.7, -0.5, -0.53, 0, 0, 0, 1.05)
    MakeStick(-1.7, -0.5, -1.2 - 0.5, 0, 0, 0, 1.05)

    // Малый барабан
    MakeDrum(1.5, 0.5, -1.2, 0, 0, 0, 0.4, 0.6)
    MakeStickLegs(1.5, -0.8, -1.2, 1.2)

    // Том-том альты
    MakeDrum(0.7, 1.5, -0.2, -a30, 0, a15, 0.5, 0.4)
    MakeDrum(-0.7, 1.5, -0.2, -a30, 0, -a15, 0.5, 0.4)
    MakeStick(0, 1.3, 0.2, 0, 0, 0, 0.6)
    MakeStick(0.2, 1.6, 0.1, -a15 * 4, 0, -a15 * 4, 0.47)
    MakeStick(-0.2, 1.6, 0.1, -a15 * 4, 0, a15 * 4, 0.47)

    // Большая тарелка
    MakeCymbal(-2, 2, -0.7, -a15, 0, -a15, 0.15, 0.8)
    MakeStick(-2.15, 1.7, -0.3, -a45, 0, -a15, 1.05)
    MakeStickLegs(-2.25, -0.8, 0, 2.2)

    // Малая тарелка (хай-хэт)
    MakeCymbal(2.2, 1.5, -0.5, 0, 0, 0, 0.1, 0.5)
    MakeCymbal(2.2, 1.39, -0.5, a180, 0, 0, 0.07, 0.5)
    MakeStickLegs(2.2, -0.8, -0.5, 2.1)

    // Табурет
    const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.3, 64, 1), blackLeather)
    stool.position.set(0, 0.3, -2.2)
    groupDrumKit.add(stool)
    MakeStickLegs(0, -0.8, -2.2, 0.8)

    groupPlatform.add(groupDrumKit)
}

MakeDrumKit(5.5, 1.5, 4, -a45 / 2, 1)

// Создание микрофона
function MakeMicro(X, Y, Z, Yrot, Sc) {
    const groupMicro = new THREE.Group()
    const stand1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 64, 1), blackLeather)
    const stand2 = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.15, 64, 1), blackLeather)
    const stick1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2, 64), metalicMaterial)
    const stick2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1, 64), metalicMaterial)
    const micro1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.4, 64), blackLeather)
    const micro2 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 32, 32), microMaterial)

    stand1.position.set(0, -0.96, 0)
    stand2.position.set(0, -0.85, 0)
    stick1.position.set(0, 0, 0)
    stick2.position.set(0, 1.2, -0.1)
    stick2.rotation.set(-a45 / 2, 0, 0)
    micro1.position.set(0, 1.65, -0.28)
    micro1.rotation.set(-a45, 0, 0)
    micro2.position.set(0, 1.8, -0.43)

    groupMicro.add(stick1, stick2, stand1, stand2, micro1, micro2)
    groupMicro.position.set(X, Y, Z)
    groupMicro.rotation.set(0, Yrot, 0)
    groupMicro.scale.set(Sc, Sc, Sc)
    groupPlatform.add(groupMicro)
}

MakeMicro(0, 1.75, 9, 0, 1.3)

// Создание прожекторов
function MakeSpotlight() {

}

MakeSpotlight()

// const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
// for (let i = 0; i < 100; i++) {
//     const donut = new THREE.Mesh(donutGeometry, material)

//     donut.position.x = (Math.random() - 0.5) * 10
//     donut.position.y = (Math.random() - 0.5) * 10
//     donut.position.z = (Math.random() - 0.5) * 10

//     donut.rotation.x = Math.random() * Math.PI
//     donut.rotation.y = Math.random() * Math.PI

//     const scale = Math.random()
//     donut.scale.set(scale, scale, scale)

//     scene.add(donut)
// }



// GUI =======================================================================================================
// const parameters = {
//     color: 0xff0000,
//     spin: () => {
//         gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
//     }
// }

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: parameters.color })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// const gui = new dat.GUI({ width: 400 })
//     // gui.add(mesh.position, 'y', -3, 3, 0.01)
// gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')
// gui.add(mesh, 'visible')
// gui.add(material, 'wireframe')
// gui.addColor(parameters, 'color').onChange(() => {
//     material.color.set(parameters.color)
// })
// gui.add(parameters, 'spin')



// CAMERA & RENDER & WINDOW ==============================================================================================
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.set(0, 5, 15)
camera.lookAt(groupPlatform.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Resize Window
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Double Click Fullscreen
window.addEventListener('dblclick', () => {

    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullScreenElement) {

        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }

    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})



// ANIMATION =======================================================================================================
const clock = new THREE.Clock()

//gsap.to(platform.rotation, {duration: 1, delay: 1, x: Math.PI})
//gsap.to(platform.position, {duration: 1, delay: 2, x: 3})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update camera
    // mesh.rotation.y = elapsedTime;
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)

    // Update objects
    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = 0.15 * elapsedTime
    // plane.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Update controls
    controls.update()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
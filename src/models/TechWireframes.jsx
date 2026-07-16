import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import shipUrl from "../assets/3d/low-poly_spaceship.glb";
import m68kUrl from "../assets/3d/motorola_68000_cpu_with_quartz_window.glb";
import nautilusUrl from "../assets/3d/nautilus_concept.glb";
import woodCubeUrl from "../assets/3d/wood_cube.glb";

const LINE_DIM = new THREE.Color("#585d61");
const LINE_LIT = new THREE.Color("#ffffff");

const edges = (geometry, threshold = 20) =>
  new THREE.EdgesGeometry(geometry, threshold);

// circle outline in the XY plane, for lineLoop
const ringGeometry = (radius, segments = 24) => {
  const pts = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
};

// open polyline from a flat [x,y,z, x,y,z, ...] list, for lineSegments
const strokeGeometry = (flat) => {
  const pts = [];
  for (let i = 0; i + 5 < flat.length; i += 3) {
    pts.push(
      new THREE.Vector3(flat[i], flat[i + 1], flat[i + 2]),
      new THREE.Vector3(flat[i + 3], flat[i + 4], flat[i + 5])
    );
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
};

/*
 * Wrapper that gives each wireframe object its shared behaviour:
 * slow tumble + bob, brightens on hover, and a spin impulse on click.
 * Raycasting against line segments is unreliable, so each object gets
 * an invisible box as its pointer hit-target.
 */
const WireObject = ({
  position,
  scale = 1,
  hitSize = [6, 6, 6],
  baseSpeed = 0.15,
  bobAmplitude = 0.4,
  phase = 0,
  children,
}) => {
  const group = useRef();
  const aim = useRef();
  const spin = useRef(baseSpeed);
  const [hovered, setHovered] = useState(false);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: LINE_DIM.clone(),
        transparent: true,
        opacity: 0.85,
      }),
    []
  );

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    // spin impulse decays back to the idle tumble rate
    spin.current += (baseSpeed - spin.current) * Math.min(delta * 1.5, 1);
    group.current.rotation.y += spin.current * delta * 2;
    group.current.rotation.x += spin.current * delta * 0.35;
    group.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.45 + phase) * bobAmplitude;

    // inner gimbal leans the object toward the mouse
    if (aim.current) {
      aim.current.rotation.y +=
        (pointer.x * 1.1 - aim.current.rotation.y) * 0.08;
      aim.current.rotation.x +=
        (-pointer.y * 0.8 - aim.current.rotation.x) * 0.08;
    }

    // hover: brighten to full white, fade opacity up, grow slightly
    material.color.lerp(hovered ? LINE_LIT : LINE_DIM, delta * 8);
    material.opacity += ((hovered ? 1 : 0.85) - material.opacity) * delta * 8;
    const targetScale = scale * (hovered ? 1.12 : 1);
    group.current.scale.x +=
      (targetScale - group.current.scale.x) * delta * 8;
    group.current.scale.y = group.current.scale.x;
    group.current.scale.z = group.current.scale.x;
  });

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "crosshair";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        spin.current = 4;
      }}
    >
      <mesh>
        <boxGeometry args={hitSize} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <group ref={aim}>{children(material)}</group>
    </group>
  );
};

const Line = ({ geometry, material, ...props }) => (
  <lineSegments geometry={geometry} material={material} {...props} />
);

const Ring = ({ geometry, material, ...props }) => (
  <lineLoop geometry={geometry} material={material} {...props} />
);

/* ------------------------- the objects ------------------------- */

const Chip = (props) => {
  const geo = useMemo(() => {
    const body = edges(new THREE.BoxGeometry(4.4, 0.7, 4.4));
    const die = edges(new THREE.BoxGeometry(2, 0.3, 2));
    // grid etched into the die, like exposed silicon blocks
    const dieGrid = new THREE.WireframeGeometry(
      new THREE.PlaneGeometry(1.7, 1.7, 4, 4)
    );
    const pin = edges(new THREE.BoxGeometry(0.18, 0.16, 0.65));
    const cap = edges(new THREE.BoxGeometry(0.4, 0.18, 0.22));
    const marker = ringGeometry(0.16, 12);
    // silkscreen notch lines across one edge of the package
    const notch = strokeGeometry([
      -2.2, 0.36, -1.4, -1.6, 0.36, -2.2,
    ]);
    return { body, die, dieGrid, pin, cap, marker, notch };
  }, []);

  // 10 pins per side
  const pins = useMemo(() => {
    const list = [];
    for (let i = 0; i < 10; i++) {
      const off = -1.98 + i * 0.44;
      list.push({ pos: [off, -0.15, 2.55], rot: 0 });
      list.push({ pos: [off, -0.15, -2.55], rot: 0 });
      list.push({ pos: [2.55, -0.15, off], rot: Math.PI / 2 });
      list.push({ pos: [-2.55, -0.15, off], rot: Math.PI / 2 });
    }
    return list;
  }, []);

  const caps = [
    [1.6, 0.4, 1.6],
    [-1.6, 0.4, 1.6],
    [1.6, 0.4, -1.6],
    [-1.6, 0.4, -1.6],
  ];

  return (
    <WireObject hitSize={[6.5, 4.5, 6.5]} {...props}>
      {(mat) => (
        <>
          <Line geometry={geo.body} material={mat} />
          <Line geometry={geo.die} material={mat} position={[0, 0.5, 0]} />
          <Line
            geometry={geo.dieGrid}
            material={mat}
            position={[0, 0.66, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <Line geometry={geo.notch} material={mat} />
          {/* pin-1 marker dot */}
          <Ring
            geometry={geo.marker}
            material={mat}
            position={[-1.75, 0.36, 1.75]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          {caps.map((p, i) => (
            <Line
              key={`c${i}`}
              geometry={geo.cap}
              material={mat}
              position={p}
              rotation={[0, i % 2 ? Math.PI / 2 : 0, 0]}
            />
          ))}
          {pins.map((p, i) => (
            <Line
              key={i}
              geometry={geo.pin}
              material={mat}
              position={p.pos}
              rotation={[0, p.rot, 0]}
            />
          ))}
        </>
      )}
    </WireObject>
  );
};

const Rocket = (props) => {
  const geo = useMemo(() => {
    const body = edges(new THREE.CylinderGeometry(0.9, 1.05, 4.6, 14), 12);
    const nose = edges(new THREE.ConeGeometry(0.9, 1.9, 14), 12);
    const nozzle = edges(new THREE.CylinderGeometry(0.5, 0.95, 0.9, 14), 12);
    const nozzleInner = edges(
      new THREE.CylinderGeometry(0.35, 0.6, 0.5, 10),
      12
    );
    // hull frames: rings at intervals along the tapered body
    const frames = [
      { r: 0.93, y: 1.5 },
      { r: 0.97, y: 0.3 },
      { r: 1.0, y: -0.9 },
      { r: 1.04, y: -2.0 },
    ].map((f) => ({ ...f, geo: ringGeometry(f.r, 28) }));
    const noseRing = ringGeometry(0.62, 22);
    const window = ringGeometry(0.28, 18);
    const windowInner = ringGeometry(0.19, 14);
    // fin with a kicked-back trailing edge
    const finShape = new THREE.Shape([
      new THREE.Vector2(0, 0.4),
      new THREE.Vector2(1.35, -1.35),
      new THREE.Vector2(1.35, -2.0),
      new THREE.Vector2(0, -1.9),
    ]);
    const fin = edges(new THREE.ShapeGeometry(finShape));
    // rib line across each fin
    const finRib = strokeGeometry([0, -0.6, 0, 1.1, -1.75, 0]);
    return {
      body,
      nose,
      nozzle,
      nozzleInner,
      frames,
      noseRing,
      window,
      windowInner,
      fin,
      finRib,
    };
  }, []);

  return (
    <WireObject hitSize={[4, 9.5, 4]} {...props}>
      {(mat) => (
        <>
          <Line geometry={geo.body} material={mat} />
          <Line geometry={geo.nose} material={mat} position={[0, 3.25, 0]} />
          <Ring
            geometry={geo.noseRing}
            material={mat}
            position={[0, 3.6, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          {geo.frames.map((f, i) => (
            <Ring
              key={i}
              geometry={f.geo}
              material={mat}
              position={[0, f.y, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            />
          ))}
          <Ring
            geometry={geo.window}
            material={mat}
            position={[0, 1.35, 0.95]}
            rotation={[0.2, 0, 0]}
          />
          <Ring
            geometry={geo.windowInner}
            material={mat}
            position={[0, 1.35, 0.96]}
            rotation={[0.2, 0, 0]}
          />
          <Line geometry={geo.nozzle} material={mat} position={[0, -2.75, 0]} />
          <Line
            geometry={geo.nozzleInner}
            material={mat}
            position={[0, -3.1, 0]}
          />
          {[0, 1, 2, 3].map((i) => (
            <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
              <Line
                geometry={geo.fin}
                material={mat}
                position={[1, -1, 0]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <Line
                geometry={geo.finRib}
                material={mat}
                position={[1, -1, 0]}
                rotation={[0, Math.PI / 2, 0]}
              />
            </group>
          ))}
        </>
      )}
    </WireObject>
  );
};

const Satellite = (props) => {
  const geo = useMemo(() => {
    const body = edges(new THREE.BoxGeometry(1.7, 1.7, 2.3));
    const greeble1 = edges(new THREE.BoxGeometry(0.5, 0.3, 0.7));
    const greeble2 = edges(new THREE.BoxGeometry(0.35, 0.35, 0.35));
    // solar panels as wire grids, with an arm out to each one
    const panel = new THREE.WireframeGeometry(
      new THREE.PlaneGeometry(3.6, 1.6, 9, 4)
    );
    const arm = edges(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 5));
    const dish = edges(new THREE.ConeGeometry(1.0, 0.45, 14, 1, true), 10);
    const dishRim = ringGeometry(1.0, 26);
    const mast = edges(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 4));
    const feed = edges(new THREE.ConeGeometry(0.1, 0.25, 6));
    const antenna = edges(new THREE.CylinderGeometry(0.02, 0.02, 1.4, 3));
    const thruster = edges(new THREE.ConeGeometry(0.4, 0.55, 10, 1, true), 10);
    return {
      body,
      greeble1,
      greeble2,
      panel,
      arm,
      dish,
      dishRim,
      mast,
      feed,
      antenna,
      thruster,
    };
  }, []);

  return (
    <WireObject hitSize={[10.5, 5, 4.5]} {...props}>
      {(mat) => (
        <>
          <Line geometry={geo.body} material={mat} />
          <Line
            geometry={geo.greeble1}
            material={mat}
            position={[0.35, 0.9, 0.4]}
          />
          <Line
            geometry={geo.greeble2}
            material={mat}
            position={[-0.5, 0.95, -0.6]}
          />
          {/* panel arms + wire-grid solar panels */}
          {[1, -1].map((side) => (
            <group key={side}>
              <Line
                geometry={geo.arm}
                material={mat}
                position={[side * 1.25, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
              />
              <Line
                geometry={geo.panel}
                material={mat}
                position={[side * 3.5, 0, 0]}
              />
            </group>
          ))}
          {/* dish assembly on a mast */}
          <Line geometry={geo.mast} material={mat} position={[0, 1.35, 0]} />
          <Line
            geometry={geo.dish}
            material={mat}
            position={[0, 2.1, 0]}
            rotation={[Math.PI, 0, 0]}
          />
          <Ring
            geometry={geo.dishRim}
            material={mat}
            position={[0, 2.32, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Line geometry={geo.feed} material={mat} position={[0, 2.05, 0]} />
          {/* whip antennas */}
          <Line
            geometry={geo.antenna}
            material={mat}
            position={[0.6, 0.4, -1.6]}
            rotation={[0.5, 0, 0.15]}
          />
          <Line
            geometry={geo.antenna}
            material={mat}
            position={[-0.6, 0.4, -1.6]}
            rotation={[0.5, 0, -0.15]}
          />
          <Line
            geometry={geo.thruster}
            material={mat}
            position={[0, 0, -1.4]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </>
      )}
    </WireObject>
  );
};

const RadioTelescope = (props) => {
  const geo = useMemo(() => {
    // lattice tower: four legs + cross-braces
    const leg = edges(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 4));
    const brace = strokeGeometry([
      -0.7, -1.3, -0.7, 0.5, -0.3, 0.5, 0.5, -0.3, 0.5, -0.7, 0.7, -0.7,
    ]);
    const base = edges(new THREE.BoxGeometry(2.2, 0.35, 2.2));
    const yoke = edges(new THREE.BoxGeometry(0.5, 0.7, 0.5));
    // parabolic dish built as a lathe
    const profile = [];
    for (let i = 0; i <= 8; i++) {
      const r = (i / 8) * 2.2;
      profile.push(new THREE.Vector2(r, r * r * 0.22));
    }
    const dish = edges(new THREE.LatheGeometry(profile, 16), 5);
    const dishRim = ringGeometry(2.2, 32);
    const dishMid = ringGeometry(1.3, 24);
    const feedStrut = edges(new THREE.CylinderGeometry(0.03, 0.03, 1.6, 3));
    const feed = edges(new THREE.BoxGeometry(0.3, 0.3, 0.3));
    return {
      leg,
      brace,
      base,
      yoke,
      dish,
      dishRim,
      dishMid,
      feedStrut,
      feed,
    };
  }, []);

  const legPositions = [
    [0.75, 0.75],
    [-0.75, 0.75],
    [0.75, -0.75],
    [-0.75, -0.75],
  ];

  return (
    <WireObject hitSize={[5.5, 7, 5.5]} {...props}>
      {(mat) => (
        <>
          <Line geometry={geo.base} material={mat} position={[0, -2.9, 0]} />
          {legPositions.map(([x, z], i) => (
            <Line
              key={i}
              geometry={geo.leg}
              material={mat}
              position={[x * 0.75, -1.5, z * 0.75]}
              rotation={[z * 0.28, 0, -x * 0.28]}
            />
          ))}
          <Line geometry={geo.brace} material={mat} position={[0, -1.2, 0]} />
          <Line geometry={geo.yoke} material={mat} position={[0, -0.1, 0]} />
          {/* dish assembly, tipped toward the sky */}
          <group position={[0, 0.6, 0]} rotation={[-0.7, 0, 0]}>
            <Line geometry={geo.dish} material={mat} />
            <Ring
              geometry={geo.dishRim}
              material={mat}
              position={[0, 1.07, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <Ring
              geometry={geo.dishMid}
              material={mat}
              position={[0, 0.37, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            {[0, 1, 2].map((i) => (
              <Line
                key={i}
                geometry={geo.feedStrut}
                material={mat}
                position={[
                  Math.cos((i * Math.PI * 2) / 3) * 0.9,
                  1.1,
                  Math.sin((i * Math.PI * 2) / 3) * 0.9,
                ]}
                rotation={[
                  Math.sin((i * Math.PI * 2) / 3) * 0.45,
                  0,
                  Math.cos((i * Math.PI * 2) / 3) * 0.45,
                ]}
              />
            ))}
            <Line geometry={geo.feed} material={mat} position={[0, 1.8, 0]} />
          </group>
        </>
      )}
    </WireObject>
  );
};

/*
 * A GLB asset processed into a wireframe: every mesh is reduced to its
 * hard edges, then the whole thing is centred and normalised to a
 * common size so any model drops into the scene at a sensible scale.
 */
const GlbWire = ({ url, size = 6, threshold = 20, ...props }) => {
  const { scene } = useGLTF(url);

  const { geometries, scale, offset } = useMemo(() => {
    scene.updateMatrixWorld(true);
    const list = [];
    const box = new THREE.Box3();
    scene.traverse((obj) => {
      if (obj.isMesh) {
        const g = edges(obj.geometry, threshold);
        g.applyMatrix4(obj.matrixWorld);
        list.push(g);
        box.expandByObject(obj);
      }
    });
    const dims = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    return {
      geometries: list,
      scale: size / Math.max(dims.x, dims.y, dims.z),
      offset: centre.multiplyScalar(-1),
    };
  }, [scene, size, threshold]);

  return (
    <WireObject hitSize={[size * 1.4, size * 1.4, size * 1.4]} {...props}>
      {(mat) => (
        <group scale={scale}>
          <group position={offset}>
            {geometries.map((g, i) => (
              <lineSegments key={i} geometry={g} material={mat} />
            ))}
          </group>
        </group>
      )}
    </WireObject>
  );
};

/* --------------------------- backdrop --------------------------- */

const Stars = () => {
  const ref = useRef();
  const positions = useMemo(() => {
    const count = 900;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 700;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 700;
      arr[i * 3 + 2] = -Math.random() * 400 - 80;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * 0.003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8d9297"
        size={1}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
};

/* ---------------------- random composition ---------------------- */

// everything that can appear in the scene
const POOL = [
  { id: "chip", Component: Chip, props: { scale: 0.9 } },
  { id: "rocket", Component: Rocket, props: { scale: 0.85 } },
  { id: "satellite", Component: Satellite, props: { scale: 0.75 } },
  { id: "telescope", Component: RadioTelescope, props: { scale: 0.85 } },
  {
    id: "ship",
    Component: GlbWire,
    props: { url: shipUrl, size: 6.5, threshold: 12 },
  },
  {
    id: "m68k",
    Component: GlbWire,
    props: { url: m68kUrl, size: 6, threshold: 20 },
  },
  {
    id: "nautilus",
    Component: GlbWire,
    props: { url: nautilusUrl, size: 7, threshold: 45 },
  },
  {
    id: "nautilus",
    Component: GlbWire,
    props: { url: nautilusUrl, size: 7, threshold: 20 },
  },
  {
    id: "wood-cube",
    Component: GlbWire,
    props: { url: woodCubeUrl, size: 5, threshold: 20 },
  },
];

// anchor points in the margins either side of the bento column
const SLOTS = [
  [-13.5, 6, -18],
  [-13.5, -6.5, -17],
  [14.5, 5.5, -19],
  [14.5, -7, -17],
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const TechWireframes = () => {
  const rig = useRef();

  // a fresh random cast + placement every page load
  const cast = useMemo(() => {
    const picked = shuffle(POOL).slice(0, SLOTS.length);
    const slots = shuffle(SLOTS);
    return picked.map((entry, i) => ({
      ...entry,
      position: slots[i],
      baseSpeed: 0.08 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
      scaleJitter: 0.9 + Math.random() * 0.25,
    }));
  }, []);

  // gentle parallax toward the pointer
  useFrame(({ pointer }) => {
    if (!rig.current) return;
    rig.current.rotation.y += (pointer.x * 0.05 - rig.current.rotation.y) * 0.03;
    rig.current.rotation.x += (-pointer.y * 0.035 - rig.current.rotation.x) * 0.03;
  });

  return (
    <group ref={rig}>
      <Stars />
      {cast.map(({ id, Component, props, position, baseSpeed, phase, scaleJitter }) => (
        <Suspense key={id} fallback={null}>
          <Component
            {...props}
            position={position}
            scale={(props.scale ?? 1) * scaleJitter}
            baseSpeed={baseSpeed}
            phase={phase}
          />
        </Suspense>
      ))}
    </group>
  );
};

export default TechWireframes;
"use client"
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { useModal } from "../Providers";

const PricingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

   const { openWishlist } = useModal();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Create floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.OctahedronGeometry(0.3),
      new THREE.TetrahedronGeometry(0.4),
      new THREE.TorusGeometry(0.3, 0.1, 16, 100)
    ];

    const material = new THREE.MeshPhongMaterial({
      color: 0x6B7280,
      transparent: true,
      opacity: 0.15,
      wireframe: true
    });

    const shapes: THREE.Mesh<THREE.BoxGeometry | THREE.OctahedronGeometry | THREE.TetrahedronGeometry | THREE.TorusGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap>[] = [];
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = (Math.random() - 0.5) * 15;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10 - 5;

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      mesh.userData.velocity = {
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        rotation: (Math.random() - 0.5) * 0.01
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.velocity.rotation;
        shape.rotation.y += shape.userData.velocity.rotation;

        shape.position.x += shape.userData.velocity.x;
        shape.position.y += shape.userData.velocity.y;

        // Boundary check
        if (Math.abs(shape.position.x) > 8) shape.userData.velocity.x *= -1;
        if (Math.abs(shape.position.y) > 5) shape.userData.velocity.y *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometries.forEach(geo => geo.dispose());
      material.dispose();
    };
  }, []);

  const plans = [
    {
      id: 'go',
      name: 'GO PLAN',
      price: '₹399',
      period: '/month',
      subtitle: 'For interior designers, freelancers, and students.',
      features: [
        'Detects basic drawing issues (line gaps, overlap, layer confusion, scale mismatches, missing dimensions)',
        'Ensures clean drafting standards before client/firm delivery',
        'Perfect for interiors, furniture layouts, and concept plans'
      ],
      note: 'Think of this as: "AutoCAD Clean-Up + Drawing Hygiene Check, so your files look professional."',
      highlight: 'No code compliance in this plan. It\'s purely for drawing correctness.',
      color: 'from-gray-400 to-gray-500',
      popular: false
    },
    {
      id: 'basic',
      name: 'ESSENTIAL PLAN',
      price: '₹5,999',
      period: '/month',
      subtitle: 'For architecture studios handling submission-ready work.',
      features: [
        'Includes Full Building Compliance Check',
        'Rule-based code validation against local building bye-laws',
        'Generates marked drawings + compliance notes',
        'Multi-user seats for small teams'
      ],
      note: 'This is where compliance actually starts.',
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      id: 'pro',
      name: 'PRO PLAN',
      price: '₹9,999',
      period: '/month',
      subtitle: 'For firms working on mid to large projects.',
      features: [
        'Everything in BASIC, plus:',
        'Architectural + Structural + MEP cross-checks',
        'Clash detection & layer discipline checks',
        'Priority processing + dedicated support manager'
      ],
      note: 'Designed to eliminate expensive rework across multiple consultants.',
      color: 'from-purple-500 to-purple-600',
      popular: false
    },
    {
      id: 'enterprise',
      name: 'ENTERPRISE',
      price: 'Custom',
      period: '',
      subtitle: 'For large firms, developers & approval consultants.',
      features: [
        'Custom-code rule sets for specific city/authority norms',
        'On-prem / VPC deployment available',
        'Firm-wide onboarding & workflow redesign'
      ],
      color: 'from-slate-600 to-slate-700',
      popular: false
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-20 pb-16 px-4 text-center animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
            <span className="text-sm font-medium text-gray-600">Experimental Version</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ensure every drawing is born compliant, accelerating projects, improving safety,
            <br />and giving professionals their time back.
          </p>
        </header>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  relative group cursor-pointer
                  transition-all duration-500 ease-out
                  ${hoveredCard === plan.id ? 'scale-105 -translate-y-2' : 'scale-100'}
                  ${plan.popular ? 'lg:col-span-1 lg:scale-105' : ''}
                `}
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${index * 100}ms`,
                  opacity: 0
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`
                    relative h-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl
                    border-2 transition-all duration-500
                    ${hoveredCard === plan.id ? 'border-gray-400 shadow-2xl' : 'border-gray-200'}
                    ${plan.popular ? 'border-blue-400 bg-white/90' : ''}
                    overflow-hidden
                  `}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.color}`} />

                  <div className="p-8">
                    {/* Plan Name */}
                    <h3 className="text-sm font-bold text-gray-500 tracking-wider mb-2">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && (
                        <span className="text-gray-500 text-lg ml-1">{plan.period}</span>
                      )}
                    </div>

                    {/* Subtitle */}
                    <p className="text-sm text-gray-600 mb-6 min-h-[2.5rem]">
                      {plan.subtitle}
                    </p>

                    {/* CTA Button */}
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`
                        w-full py-3 px-6 rounded-xl font-semibold
                        transition-all duration-300 mb-6
                        ${plan.popular
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:scale-105'
                          : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
                        }
                      `}
                    >
                      {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                    </button>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm text-gray-700 leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Note */}
                    {plan.note && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 italic leading-relaxed">
                          {plan.note}
                        </p>
                      </div>
                    )}

                    {/* Highlight */}
                    {plan.highlight && (
                      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-xs text-amber-800 font-medium">
                          {plan.highlight}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pb-20 px-4">
          <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Not sure which plan is right for you?
            </h2>
            <p className="text-gray-600 mb-6">
              Schedule a demo with our team to see Starline in action and find the perfect fit for your workflow.
            </p>
            <button onClick={openWishlist} className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PricingPage;
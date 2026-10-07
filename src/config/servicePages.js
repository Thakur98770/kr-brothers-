/**
 * Per-service page copy: search-facing metadata and the FAQ block used by
 * /services/:slug. Kept out of businessConfig.js because this is marketing
 * page content, not operational configuration. Every key here must match a
 * service `id` in businessConfig.js — buildServicePages() and ServicePage
 * both fail loudly if one goes missing.
 *
 * metaTitle is kept near 50-60 characters and metaDescription near 155 so
 * neither gets truncated in search results.
 */

const SERVICE_PAGES = {
  'crane-rental-fleet-hire': {
    metaTitle: 'Crane Rental & Fleet Hire Punjab | KR Brothers',
    metaDescription:
      'Crane rental in Mukerian, Hoshiarpur & Pathankot. Mobile, rough-terrain and truck-mounted cranes on hourly, shift, daily or monthly hire with operator included.',
    keywords: [
      'crane rental Mukerian',
      'crane hire Hoshiarpur',
      'mobile crane rental Punjab',
      'monthly crane hire',
      'crane rental with operator',
    ],
    faq: [
      {
        question: 'What is the minimum hire duration for a crane?',
        answer: 'There is no hard minimum. Single-hour jobs are common for maintenance and yard work, while construction and erection projects are usually booked per shift or per day. Monthly rates apply when a machine stays on one site continuously.',
      },
      {
        question: 'Is the operator and rigging crew included in the hire rate?',
        answer: 'Yes. Every hire is supplied as a complete package: the machine, a certified operator and a rigger. You are not asked to arrange the crew separately, and the rigging plan is agreed before mobilisation.',
      },
      {
        question: 'Can you deploy more than one machine to a single site?',
        answer: 'Yes. Large lifting campaigns and factory moves often need parallel machines. Tell us the number of lifts and the programme, and we will plan the fleet deployment and crew accordingly.',
      },
      {
        question: 'Which areas do you deliver machines to?',
        answer: 'We mobilise across Punjab and Himachal Pradesh, including Mukerian, Hajipur, Hoshiarpur and Pathankot. Sites outside these districts are quoted case by case based on mobilisation distance and machine class.',
      },
    ],
  },

  'hydra-crane-services': {
    metaTitle: 'Hydra Crane Services in Hoshiarpur & Mukerian | KR Brothers',
    metaDescription:
      'Hydra crane hire for yard stacking, truck loading and confined-site handling in Hoshiarpur & Mukerian. 12-25 T class with certified operator.',
    keywords: [
      'hydra crane Hoshiarpur',
      'hydra crane hire Mukerian',
      'hydra crane for loading',
      'yard material handling',
      'hydra crane Punjab',
    ],
    faq: [
      {
        question: 'When is a Hydra crane better than a truck-mounted crane?',
        answer: 'A Hydra gives more reach with a shorter wheelbase, so it works in congested yards and narrow lanes where a truck-mounted crane cannot position or manoeuvre. If the site is tight, a Hydra is usually the faster and cheaper option.',
      },
      {
        question: 'What load capacity does a Hydra crane handle?',
        answer: 'Our Hydra fleet covers the 12 T to 25 T class with long reach. The exact capacity for your job depends on the boom extension used and the working radius, so send us the load weight and reach for a firm answer.',
      },
      {
        question: 'Can you work inside a running factory shed?',
        answer: 'Yes. Confined-space lifting inside factory sheds is routine work for us. We survey the path and set outriggers on firm, level ground with proper mats, and station a banksman for every movement cycle.',
      },
      {
        question: 'Do you handle truck and trailer loading at site?',
        answer: 'Yes. Truck and trailer loading, unloading and re-stacking at site are core Hydra jobs, including transfers between warehouse and worksite and long-reach work over compound walls.',
      },
    ],
  },

  'heavy-duty-mobile-cranes': {
    metaTitle: 'Heavy Duty Hydraulic Mobile Cranes 25-100T | KR Brothers',
    metaDescription:
      'High-tonnage hydraulic mobile cranes for plant, structural steel and heavy machinery lifts in Punjab. Pre-lift planning, outrigger mats and certified crew.',
    keywords: [
      'heavy duty mobile crane',
      'hydraulic truck crane hire',
      'rough terrain crane Punjab',
      '100 ton crane rental',
      'heavy machinery lifting',
    ],
    faq: [
      {
        question: 'Which capacity do I need for my lift?',
        answer: 'Capacity is a function of load weight and working radius, not weight alone. A 30 T machine may only lift a fraction of that at full outreach. Share the load weight and the radius from your crane spot to the load and we will confirm the right class from the load chart.',
      },
      {
        question: 'Is a pre-lift plan included?',
        answer: 'Yes, on every high-tonnage job. We review the lift with your site engineer before mobilising: ground bearing pressure, outrigger matting, counterweight configuration for the planned radius, and slew and wind limits.',
      },
      {
        question: 'What ground preparation do you need at my site?',
        answer: 'Level, compacted ground that can take the outrigger load. We check ground bearing pressure ourselves and bring mats where the surface is soft. If the access road or the standing area cannot take the machine, we will tell you before the shift, not on arrival.',
      },
      {
        question: 'Can you handle rough-terrain and quarry sites?',
        answer: 'Yes. Rough-terrain and quarry-condition deployment is routine. Machines are selected and driven to suit the surface, and the approach route is surveyed as part of the pre-lift plan.',
      },
    ],
  },

  'construction-site-lifting-erection': {
    metaTitle: 'Construction Site Lifting & Erection Crews | KR Brothers',
    metaDescription:
      'Site lifting for steel erection, precast and slab placement on live projects in Mukerian, Hoshiarpur & Pathankot. Full crew, method statement, night shifts.',
    keywords: [
      'construction site lifting',
      'steel erection crew Punjab',
      'precast slab lifting',
      'site lifting contractor',
      'night shift erection',
    ],
    faq: [
      {
        question: 'Do you work to our lifting schedule?',
        answer: 'Yes. We plan the lift sequence with your site contractor rather than working through a list. Programme-driven sites are our normal case, so we align machine, crew and element delivery with your build schedule.',
      },
      {
        question: 'Do you prepare a method statement before starting?',
        answer: 'Every site starts with a site-specific method statement covering the lift plan, rigging, exclusion zones and emergency arrangements. A daily toolbox talk is then held with the crew for the duration of the work.',
      },
      {
        question: 'Can you handle night-shift erection?',
        answer: 'Yes. Multi-level and night-shift erection programs are supported, with full LED flood lighting for night work and marshals on the site.',
      },
      {
        question: 'Will your crew keep other site workers clear?',
        answer: 'Yes. Unauthorised personnel are kept out of the lifting zone for the duration of each lift, barricades are enforced, and certified tag lines and guides are used on every element lift.',
      },
    ],
  },

  'plant-relocation-loading-unloading': {
    metaTitle: 'Industrial Plant Equipment Relocation & Loading | KR Brothers',
    metaDescription:
      'In-plant machinery shifting, truck unloading and foundation positioning in Punjab. Shut-down planning, permit-to-work and no production loss.',
    keywords: [
      'plant equipment relocation',
      'in-plant machinery shifting',
      'truck unloading at site',
      'factory equipment moving',
      'plant layout contractor',
    ],
    faq: [
      {
        question: 'Can you move equipment without stopping production?',
        answer: 'It depends on the route and your process. We plan the move around your shut-down window so the line restarts on schedule, and we survey the internal path before mobilising the crane to the spot. Early planning is what avoids production loss.',
      },
      {
        question: 'How do you avoid damaging existing plant services?',
        answer: 'Utilities, cable trays and pipe lines are verified and marked before any move, and permit-to-work and lock-out are coordinated with your plant safety team. Spotters are stationed at blind corners inside the shop.',
      },
      {
        question: 'Do you handle positioning and alignment on foundations?',
        answer: 'Yes. We set equipment on the foundation and align it. Grouting, anchor-bolt alignment and levelling support are part of the scope so the machine is ready for commissioning when we leave.',
      },
      {
        question: 'What kinds of machines can you relocate?',
        answer: 'Presses, furnaces, CNC machines, transformers, rolling-mill equipment and similar heavy units. Send us the machine weight, its centre of gravity and the lifting points, and we will plan the rigging around it.',
      },
    ],
  },

  'structural-steel-girder-positioning': {
    metaTitle: 'Structural Steel & Girder Positioning | KR Brothers',
    metaDescription:
      'Roof truss, gantry girder, bridge girder and column erection in Hoshiarpur & Pathankot. Approved rigging schematic, tag lines and engineered slinging.',
    keywords: [
      'structural steel erection',
      'girder positioning',
      'bridge girder lifting',
      'roof truss erection',
      'steel erection Punjab',
    ],
    faq: [
      {
        question: 'How do you ensure girders land exactly in position?',
        answer: 'Every member is handled with tag lines and guides from certified riggers, using an engineered sling arrangement agreed before the lift. Loads are re-hung only after the slinger has re-checked the rigging, so nothing is placed on guesswork.',
      },
      {
        question: 'Do you work on bridge and highway projects?',
        answer: 'Yes. Bridge girders and deck segment placement is a regular part of our structural steel work. We coordinate with the site contractor on segment delivery and place members to the drawing.',
      },
      {
        question: 'Will you lift over occupied areas?',
        answer: 'No. Lifting over occupied zones is not permitted. Barricades are enforced and exclusion zones are maintained around every lift, so work continues around your people without risk.',
      },
      {
        question: 'What member weight can you handle?',
        answer: 'We regularly handle girders of 10 T and above per member, with heavier members handled on the high-tonnage fleet. Send the member weight and the lift radius for a firm confirmation.',
      },
    ],
  },

  'factory-machinery-shifting': {
    metaTitle: 'Factory Machinery Shifting & Foundation Loading | KR Brothers',
    metaDescription:
      'CNC, press, transformer and kiln shifting between shops and onto foundations. Careful handling by trained riggers in Hoshiarpur & Mukerian.',
    keywords: [
      'factory machinery shifting',
      'CNC machine moving',
      'transformer loading',
      'foundation loading crane',
      'industrial equipment handling',
    ],
    faq: [
      {
        question: 'How do you avoid damaging sensitive machine surfaces?',
        answer: 'We verify the machine centre of gravity and lifting points first, and never lift from non-rated points. Base plates and precision surfaces are protected during transit, so a machine arrives without shimming damage or lost accuracy.',
      },
      {
        question: 'Do you align machines on their foundations?',
        answer: 'Yes. Foundation pit preparation, grouting, anchor-bolt alignment and precision levelling are all in scope. Electrical isolation is confirmed before any internal move, and the machine is handed over ready for commissioning.',
      },
      {
        question: 'Can you move machines within the same plant?',
        answer: 'Yes. Shop-to-shop and machine-to-machine shifting inside one plant is routine. We survey the internal route and plan around your production schedule and shut-down window.',
      },
      {
        question: 'Do you handle transformers?',
        answer: 'Yes. Transformer loading, unloading and yard placement are handled with the lifting points and capacity appropriate to the unit. Oil-filled units are moved with the client’s electrical isolation in place.',
      },
    ],
  },

  'breakdown-emergency-support': {
    metaTitle: '24/7 Breakdown & Emergency Crane Recovery | KR Brothers',
    metaDescription:
      'Round-the-clock crane and Hydra support for breakdowns, hydraulic failures and stuck-lorry recovery in Punjab. Night and festival shifts.',
    keywords: [
      'emergency crane recovery',
      'crane breakdown service',
      'stuck lorry recovery Punjab',
      '24 hour crane hire',
      'hydraulic failure recovery',
    ],
    faq: [
      {
        question: 'How fast can you reach a breakdown call?',
        answer: 'Call the operations desk and we mobilise. Response time depends on your location and machine class, and we will tell you honestly what is achievable rather than promise something the road conditions will not allow.',
      },
      {
        question: 'Can you recover an overturned or stuck lorry?',
        answer: 'Yes. Overturned and stuck lorry and tipper recovery is regular work. We coordinate with the site authorities and highway patrol where the recovery is on the road, and we bring barricades and marshals.',
      },
      {
        question: 'Do you handle crane breakdowns?',
        answer: 'Yes. We assist with crane breakdowns and hook-block recovery, and supply workshop-to-site machine hire when a machine cannot be moved under its own power.',
      },
      {
        question: 'Are night and festival shifts available?',
        answer: 'Yes. Night, Sunday and festival-shift deployments are routine because industrial sites and breakdown call-outs do not keep office hours. Night road lifting is done with full LED flood and warning lighting.',
      },
    ],
  },
}

export default SERVICE_PAGES
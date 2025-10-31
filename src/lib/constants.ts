import { CheckpointCategory, Mode } from "@/types/workspace";

export const checkpoints: Record<Mode, CheckpointCategory[]> = {
  base: [
    {
      title: "Dimensions & Geometry",
      points: [
        "All linear dimensions present.",
        "Dimensions consistent with scale.",
        "Cross-check between plan, elevation, and section dimensions.",
        "No missing critical dimensions.",
        "Unit consistency (mm/m/cm).",
        "Wall thicknesses labeled correctly.",
        "Door/window dimensions correct.",
        "Staircase width matches plan.",
        "Ramp slopes annotated correctly.",
        "Grid lines properly labeled.",
        "Centerlines of walls, columns, and beams correct.",
        "Column sizes consistent with drawing notes.",
        "Beam sizes and locations marked.",
        "Floor-to-floor heights indicated.",
        "Roof/floor thicknesses labeled.",
      ],
    },
    {
      title: "Labels & Annotations",
      points: [
        "All rooms labeled clearly.",
        "Doors and windows labeled.",
        "Furniture/fixed equipment labeled.",
        "Section cuts labeled consistently.",
        "Elevation markers consistent.",
        "Legends present and complete.",
        "Symbols and abbreviations consistent.",
        "Room numbers match floor plan.",
        "North direction indicated.",
        "Title block present with revision numbers.",
      ],
    },
    {
      title: "Drawing Clarity & Presentation",
      points: [
        "Scale mentioned and correct.",
        "All lines visible and not overlapping.",
        "Annotations legible and readable.",
        "Layering of elements clear.",
        "Drawing background clean (no stray marks).",
        "Hatching consistent and readable.",
        "Text size uniform.",
        "Symbols not cluttered.",
        "Dimension arrows clear and not overlapping lines.",
        "Overall drawing visually uncluttered.",
      ],
    },
    {
      title: "Typographical & Text Errors",
      points: [
        "Spelling errors in room names corrected.",
        "Abbreviations standardized.",
        "Notes written clearly without typos.",
        "Consistency of units in annotations.",
        "Legends match symbols used in drawing.",
      ],
    },
    {
      title: "Consistency & References",
      points: [
        "Floor numbering consistent across all sheets.",
        "Drawing numbers follow sequence.",
        "Revision numbers updated.",
        "Cross-references (sections/elevations) correct.",
        "Reference drawings linked properly.",
      ],
    },
    {
      title: "Miscellaneous Basic Checks",
      points: [
        "Margins and borders correct.",
        "North arrow correctly oriented.",
        "Sheet size correct (A0, A1, etc.).",
        "Printing scale matches title block.",
        "Drawing ready for submission/presentation.",
      ],
    },
  ],
  plus: [
    {
      title: "Spatial Planning & Layout",
      points: [
        "Minimum room areas per NBC recommendations.",
        "Bedroom dimensions verified.",
        "Living room dimensions verified.",
        "Kitchen area and layout verified.",
        "Bathroom/toilet sizes and layouts correct.",
        "Corridor widths meet functional requirements.",
        "Circulation space clear and logical.",
        "Room adjacencies make sense functionally (e.g., kitchen near dining).",
        "Proper zoning: private vs. public spaces.",
        "Staircase location logical within layout.",
        "Door swing directions do not obstruct movement.",
        "Window placement supports natural lighting.",
        "Ventilation and cross-ventilation considered.",
        "Balcony/terrace access logical and safe.",
        "Storage spaces integrated appropriately.",
      ],
    },
    {
      title: "Architectural Elements & Detailing",
      points: [
        "Wall thickness appropriate for room function.",
        "Partition walls correctly located.",
        "Openings (doors/windows) align with walls and partitions.",
        "Door sizes match furniture clearance.",
        "Windows placed to optimize daylight and airflow.",
        "Staircase rise/run ratio reasonable and consistent.",
        "Stair landings sufficient in size.",
        "Handrail positions correct.",
        "Railings and parapets drawn correctly.",
        "Furniture layout checked for circulation and ergonomics.",
        "Fixed elements (kitchen counters, wardrobes) dimensioned.",
        "Ceiling heights consistent across rooms.",
        "Slopes for terraces or ramps logical for drainage.",
        "Door & window tags consistent across drawings.",
        "Room labels match their intended function.",
      ],
    },
    {
      title: "Annotation & Presentation Quality",
      points: [
        "Dimensions readable and clear.",
        "Text font size consistent.",
        "Room names not overlapping walls or furniture.",
        "Symbols match legend.",
        "Section markers accurate and consistent.",
        "Elevation markers correct.",
        "Drawing layers properly organized.",
        "Hatching consistent and readable.",
        "North arrow present and oriented.",
        "Sheet borders, margins, and title blocks correct.",
      ],
    },
    {
      title: "Circulation & Accessibility",
      points: [
        "Door swings do not block furniture or other doors.",
        "Passageways unobstructed.",
        "Corridor intersections logical and safe.",
        "Main entrances accessible and clearly defined.",
        "Emergency exits (non-code) logically reachable.",
        "Stair access not blocked by furniture or walls.",
        "Ramp slopes reasonable for usability.",
        "Balcony/terrace access safe and clear.",
        "Room door positions functional for daily use.",
        "Spaces allow easy movement of furniture/appliances.",
      ],
    },
    {
      title: "Internal Consistency Checks",
      points: [
        "Floor plans, elevations, and sections consistent.",
        "Room sizes match between plan and schedule.",
        "Ceiling heights match across related rooms.",
        "Levels and floor elevations consistent.",
        "Symbols and line types consistent.",
        "Annotations match dimensions.",
        "Tags and labels consistent.",
        "Wall openings match doors/windows schedule.",
        "Furniture layout matches functional planning.",
        "Internal cross-references (sections/elevations) correct.",
      ],
    },
  ],
  code: [
    {
      title: "Plot & Site Planning",
      points: [
        "Plot area meets minimum NBC requirements.",
        "FAR (Floor Area Ratio) compliance.",
        "Site coverage within permissible limits.",
        "Front setback complies with NBC/municipal norms.",
        "Rear setback complies with NBC/municipal norms.",
        "Side setbacks meet NBC/municipal rules.",
        "Open space percentage is adequate.",
        "Orientation/solar considerations noted per code guidelines.",
        "Plot boundaries clearly defined.",
        "Adjacency to public roads compliant.",
        "Access for emergency vehicles as per NBC.",
        "Site slope/drainage provisions noted.",
        "Boundary wall height within permitted limits.",
        "Road width & access aligns with municipal rules.",
        "Encroachments on easements or public land flagged.",
      ],
    },
    {
      title: "Building Envelope",
      points: [
        "Building height limits per NBC/municipal rules.",
        "Number of permissible floors verified.",
        "Parapet height meets safety standards.",
        "Roof terrace safety provisions checked.",
        "Wall thickness aligns with minimum structural code requirements.",
        "Window-to-wall ratio within NBC limits.",
        "Minimum fenestration for natural light per NBC.",
        "Minimum ventilation openings per NBC.",
        "External openings distance from boundaries meets code.",
        "Overhangs and projections comply with regulations.",
        "Balcony dimensions within legal limits.",
        "Staircase well clearance per NBC.",
        "Roof slope/drainage considerations noted.",
        "Parapet/railing height checked for safety.",
        "External cladding complies with fire safety norms.",
        "Rainwater drainage compliance verified.",
        "External staircase placement meets evacuation norms.",
        "Sun shading devices compliant with local regulations.",
        "Fences/gates height and location compliant.",
        "Roof access points comply with NBC.",
      ],
    },
    {
      title: "Circulation & Access",
      points: [
        "Staircase width meets NBC requirements.",
        "Tread and riser ratios compliant with code.",
        "Handrail provision for all staircases.",
        "Ramp slopes for accessibility.",
        "Door widths per NBC/IS standards.",
        "Main entrance clearance checked.",
        "Corridor widths meet minimum code requirements.",
        "Passage alignment for emergency evacuation.",
        "Exit doors swing direction compliance.",
        "Number of exits per floor verified.",
        "Lift lobby access per NBC/IS standards.",
        "Barrier-free path from main entrance to lifts.",
        "Emergency access for fire brigade vehicles.",
        "Staircase landing dimensions verified.",
        "Staircase headroom compliance.",
        "Lift size and clearances referenced against standards.",
        "Entry/exit for service areas compliant.",
        "Fire exit location alignment with NBC.",
        "Accessibility to toilets and public areas.",
        "Access for maintenance areas checked.",
      ],
    },
    {
      title: "Room Sizes & Functional Layout",
      points: [
        "Minimum bedroom area per NBC.",
        "Minimum living room area.",
        "Minimum kitchen area.",
        "Minimum toilet/bathroom area.",
        "Dining area minimum dimensions.",
        "Circulation area minimum ratio.",
        "Corridor width vs occupant load.",
        "Staircase capacity vs occupant load.",
        "Room-to-room adjacency compliance.",
        "Door clearance and swing checked.",
        "Internal openings meet NBC/IS spacing requirements.",
        "Minimum headroom in habitable spaces.",
        "Minimum ceiling height in service areas.",
        "Ventilation ratio per NBC.",
        "Natural lighting ratio per NBC.",
        "Staircase enclosure requirements met.",
        "Storage room area per code.",
        "Service rooms (electrical, MEP) sizes compliant.",
        "Common areas dimension verified.",
        "Fire escape access from each room.",
      ],
    },
    {
      title: "Structural References",
      points: [
        "Wall thickness meets NBC/IS minimum.",
        "Column grid spacing aligns with NBC.",
        "Beam placement references structural code guidelines.",
        "Openings in load-bearing walls flagged.",
        "Foundation type referenced against soil/building codes.",
        "Plinth height meets NBC requirements.",
        "Floor-to-floor height referenced to NBC.",
        "Roof slab thickness per IS code.",
        "RCC lintels height checked vs IS 456.",
        "Seismic zone considerations flagged.",
      ],
    },
    {
      title: "Fire Safety & Emergency",
      points: [
        "Fire escape routes clearly marked.",
        "Exit widths compliant with NBC.",
        "Number of emergency exits per floor.",
        "Staircase enclosure type referenced to code.",
        "Fire lift provisions flagged.",
        "Fire hydrant access routes noted.",
        "Fire extinguisher placements flagged.",
        "Smoke ventilation locations verified.",
        "Assembly areas for emergency evacuation.",
        "Material/fire rating references for walls/doors.",
      ],
    },
    {
      title: "Miscellaneous & References",
      points: [
        "Drawing references (title block, sheet numbers, revision notes).",
        "NBC clause references for all highlighted items.",
        "IS code references included where applicable.",
        "Municipal bylaw cross-checks.",
        "Clear textual feedback linking non-compliance to reference codes.",
      ],
    },
  ],
};

export const idealForText: Record<Mode, string> = {
  base: "Professionals needing a fast, reliable check of their construction drawings. Ideal for architects, draftsmen, and interior engineers to ensure basic standards are met without deep code analysis.",
  plus: "Architects and designers looking for a comprehensive review of spatial planning, functionality, and architectural detailing beyond just the basic checks.",
  code: "Essential for engineers and builders who require strict adherence to building codes, ensuring drawings meet NBC/municipal regulations for safety and compliance.",
};

export const modeImages: Record<Mode, { image: string; diagram: string }> = {
  base: {
    image: "/Base2.png",
    diagram: "/Base1.png",
  },
  plus: {
    image: "/Plus2.jpg",
    diagram: "/Plus1.png",
  },
  code: {
    image: "/Code2.jpg",
    diagram: "/Code1.png",
  },
};

export const mockApiResponse = {
  markedUpImageUrl: "/marked-up-drawing.jpeg",
  outputPdfUrl: "/output_coord.pdf", // Placeholder for the final PDF
  notes: [
    {
      id: 1,
      confidence: 0.95,
      description: "Dimension 6'-11' missing inch symbol",
      location: [371.1, 219.1],
      recommendation: "Correct to 6'-11\"",
    },
    {
      id: 2,
      confidence: 0.95,
      description: "Dimension 5'-51' ambiguous",
      location: [354.8, 223.4],
      recommendation: "Correct to intended value (e.g., 5'-5\" or 5'-5 1/2\")",
    },
    {
      id: 3,
      confidence: 0.95,
      description: "Units note missing",
      location: [702.3, 460.6],
      recommendation: "Add global units note in title block",
    },
    {
      id: 4,
      confidence: 0.95,
      description: "Grid system unclear (numeric stack 1·13)",
      location: [
        [308.0, 170.0],
        [352.4, 249.1],
      ],
      recommendation:
        "Convert to proper grid or remove; provide clear chained dimensions",
    },
    {
      id: 5,
      confidence: 0.95,
      description: "Missing overall elevation dimensions",
      location: [
        [60.0, 150.0],
        [640.0, 300.0],
      ],
      recommendation: "Add overall width/height baselines",
    },
    {
      id: 6,
      confidence: 0.95,
      description: "Datum levels not indicated clearly",
      location: [165.8, 273.0],
      recommendation: "Add FFL/ceiling/lintel datums on sections",
    },
    {
      id: 7,
      confidence: 0.95,
      description: "Detail A missing sheet reference",
      location: [637.8, 157.5],
      recommendation: "Add complete reference (e.g., A/INT_LB_LT-xx)",
    },
    {
      id: 8,
      confidence: 0.95,
      description: "Detail B (upper) missing sheet reference",
      location: [221.7, 114.7],
      recommendation: "Add complete reference",
    },
    {
      id: 9,
      confidence: 0.95,
      description: "Duplicate Detail B tag (lower)",
      location: [539.6, 354.8],
      recommendation: "Rename uniquely (e.g., Detail C) with sheet ref",
    },
    {
      id: 10,
      confidence: 0.95,
      description: "Generic ·as/detail· ambiguous",
      location: [425.7, 282.3],
      recommendation: "Replace with explicit detail reference",
    },
    {
      id: 11,
      confidence: 0.95,
      description: "Section B-B· lacks plan cross-ref",
      location: [165.8, 273.0],
      recommendation: "Add plan sheet/section cut reference",
    },
    {
      id: 12,
      confidence: 0.95,
      description: "Section D-D· lacks plan cross-ref",
      location: [190.9, 497.5],
      recommendation: "Add plan sheet/section cut reference",
    },
    {
      id: 13,
      confidence: 0.95,
      description: "Legend missing",
      location: [
        [700.0, 350.0],
        [820.0, 410.0],
      ],
      recommendation: "Add legend for symbols/abbreviations",
    },
    {
      id: 14,
      confidence: 0.95,
      description: "North arrow missing",
      location: [780.0, 140.0],
      recommendation: "Add north arrow",
    },
    {
      id: 15,
      confidence: 0.95,
      description: "Scale unacceptable for working drawing",
      location: [702.3, 460.6],
      recommendation: "Provide working scale (e.g., 1:25)",
    },
    {
      id: 16,
      confidence: 0.95,
      description: "N.T.S. punctuation nonstandard",
      location: [702.3, 460.6],
      recommendation: "Use ·N.T.S.·",
    },
    {
      id: 17,
      confidence: 0.95,
      description: "Drawing title content incomplete",
      location: [703.9, 421.9],
      recommendation:
        "Populate with ·Basement Lobby Wall Elevations· and drawing no.",
    },
    {
      id: 18,
      confidence: 0.95,
      description: "Date format inconsistent",
      location: [749.6, 459.7],
      recommendation: "Use ISO or office-standard format consistently",
    },
    {
      id: 19,
      confidence: 0.95,
      description: "Revision table empty",
      location: [
        [707.3, 280.0],
        [728.8, 279.8],
      ],
      recommendation: "Populate revision entries",
    },
    {
      id: 20,
      confidence: 0.95,
      description: "Plotting scale unverifiable",
      location: [702.3, 460.6],
      recommendation: "Provide scale and graphic scale bar",
    },
    {
      id: 21,
      confidence: 0.95,
      description: "Sheet/plot info missing",
      location: [
        [680.0, 380.0],
        [830.0, 590.0],
      ],
      recommendation: "Add sheet size and plotting instructions",
    },
    {
      id: 22,
      confidence: 0.95,
      description: "Project title verification",
      location: [710.9, 78.8],
      recommendation: "Ensure exact contract title",
    },
    {
      id: 23,
      confidence: 0.95,
      description: "Legal note formatting",
      location: [707.3, 54.5],
      recommendation: "Reformat to avoid crowding",
    },
    {
      id: 24,
      confidence: 0.95,
      description: "DWG name not populated",
      location: [
        [700.0, 430.0],
        [820.0, 470.0],
      ],
      recommendation: "Fill in DWG name per CAD standard",
    },
  ],
};

export const mockCodeReport = {
  reportUrl: "/Compliance-Audit-Report.pdf",
  riskScore: 12, // Example score
};

export const mockApiResponsePlus = {
  markedUpImageUrl: "/final_drawing_2.jpeg", // Naya output image 'Plus' ke liye
  outputPdfUrl: "/architecture_review_annotated.pdf", // Naya report PDF 'Plus' ke liye
  notes: [
    {
      id: 1,
      description:
        "Bedroom dimensions potentially not meeting minimum standards. Location: 'Baba Ji Room'",
      recommendation:
        "Review and confirm compliance with NBC recommendations for minimum room sizes.",
      confidence: 0.9,
    },
    {
      id: 2,
      description:
        "Bathroom/toilet sizing and layout may not be optimal for functionality. Location: Toilet in 'Master Bedroom'",
      recommendation:
        "Verify compliance with space and accessibility guidelines.",
      confidence: 0.9,
    },
    {
      id: 3,
      description:
        "Corridor width seems narrow for functional requirements. Location: 'Passage'",
      recommendation:
        "Ensure corridors meet minimum width requirements for safe passage.",
      confidence: 0.9,
    },
    {
      id: 4,
      description:
        "Door swing into narrow corridor could obstruct movement. Location: '10'-5\" wide'",
      recommendation:
        "Change door swing direction or adjust position to prevent obstruction.",
      confidence: 0.7,
    },
    {
      id: 5,
      description:
        "Text and dimensions overlap, affecting readability. Location: 'Dimensions'",
      recommendation:
        "Adjust text placement to avoid overlap and improve clarity.",
      confidence: 0.7, // Confidence nahi diya tha, maine 0.7 assume kiya
    },
    {
      id: 6,
      description:
        "Staircase rise/run does not appear reasonable. Location: 'No. of steps- 23'",
      recommendation:
        "Reevaluate stair dimensions to conform to ergonomic standards.",
      confidence: 0.7,
    },
    {
      id: 7,
      description:
        "North arrow missing, affects orientation understanding. Location: 'Drawing'",
      recommendation: "Add a north arrow to all drawings for clarity.",
      confidence: 0.9,
    },
    {
      id: 8,
      description:
        "Handrail positions and design potentially incorrect for safety. Location: 'Staircase'",
      recommendation: "Review and ensure handrails meet safety requirements.",
      confidence: 0.7, // Confidence nahi diya tha, maine 0.7 assume kiya
    },
    {
      id: 9,
      description:
        "Room labels overlap furniture and walls. Location: 'Baba Ji Room'",
      recommendation: "Adjust placement of room labels for clarity.",
      confidence: 0.9,
    },
    {
      id: 10,
      description:
        "Bathroom/toilet layout may not be optimal. Location: A (Master Bedroom)",
      recommendation: "Review layout against standards.", // Recommendation infer kiya hai
      confidence: 0.3,
    },
    {
      id: 11,
      description: "Corridor width seems narrow. Location: A (Passage)",
      recommendation: "Verify width against building codes.",
      confidence: 0.3,
    },
    {
      id: 12,
      description:
        "Staircase location may impact circulation. Location: A (Staircase)",
      recommendation: "Review circulation flow.",
      confidence: 0.3,
    },
    {
      id: 13,
      description: "Door swing obstructs corridor. Location: D (10'-5\" wide)",
      recommendation: "Consider reversing the door swing.",
      confidence: 0.3,
    },
    {
      id: 14,
      description:
        "Staircase rise/run not reasonable. Location: B (No. of steps)",
      recommendation: "Check calculations for rise and run.",
      confidence: 0.3,
    },
    {
      id: 15,
      description: "North arrow missing. Location: C (Drawing)",
      recommendation: "Add North arrow for orientation.",
      confidence: 0.3,
    },
    {
      id: 16,
      description:
        "Handrail positions potentially incorrect. Location: B (Staircase)",
      recommendation: "Ensure handrail height and design meet safety codes.",
      confidence: 0.3,
    },
  ],
};

export const checkpointQuestions: Record<
  string,
  { checkpoint: number; question: string }[]
> = {
  code: [
    {
      checkpoint: 52, // Corresponds roughly to "Staircase width meets NBC requirements."
      question: "Where do each main fire exits and stair discharges lead?",
    },
    // {
    //   checkpoint: 56, // Corresponds roughly to "Minimum bedroom area per NBC."
    //   question:
    //     "What occupancy type does this building fall under (e.g., Residential A-2, A-4, Commercial E)? This affects minimum room sizes.",
    // },
    // {
    //   checkpoint: 78, // Corresponds roughly to "Foundation type referenced..."
    //   question:
    //     "Has a soil investigation report been prepared for the site, and what foundation type is recommended?",
    // },
    // {
    //   checkpoint: 87, // Corresponds roughly to "Number of emergency exits per floor."
    //   question:
    //     "Based on the floor area and occupant load, what is the minimum number of exits required per floor as per NBC Part 4?",
    // },
  ],
  // You can add questions for 'base' and 'plus' modes here if needed
};

import logo from "./logo.png";
import logo_dark from "./logo_dark.svg";
import search_icon from "./search_icon.svg";
import cross_icon from "./cross_icon.svg";
import upload_area from "./upload_area.svg";
import sketch from "./sktech.svg";
import microsoft_logo from "./microsoft_logo.svg";
import walmart_logo from "./walmart_logo.svg";
import accenture_logo from "./accenture_logo.svg";
import adobe_logo from "./adobe_logo.svg";
import paypal_logo from "./paypal_logo.svg";
import google_logo from "./google_logo.svg";
import amazon_logo from "./amazon_logo.png";
import apple_logo from "./apple_logo.svg";
import ibm_logo from "./ibm.png";
import oracle_logo from "./oracle.png";
import intel_logo from "./intel.png";
import netflix_logo from "./netflix_logo.svg";
import samsung_logo from "./samsung_logo.svg";
import cisco_logo from "./cisco_logo.svg";
import meta_logo from "./meta_logo.svg";
import tesla_logo from "./tesla_logo.svg";
import course_1_thumbnail from "./course_1.png";
import course_2_thumbnail from "./course_2.png";
import course_3_thumbnail from "./course_3.png";
import course_4_thumbnail from "./course_4.png";
import course_5_thumbnail from "./course_5.png";
import course_6_thumbnail from "./course_6.png";
import course_7_thumbnail from "./course_7.png";
import course_8_thumbnail from "./course_8.png";
import course_9_thumbnail from "./course_9.png";
import course_10_thumbnail from "./course_10.png";
import course_11_thumbnail from "./course_11.png";
import course_12_thumbnail from "./course_12.png";
import course_13_thumbnail from "./course_13.png";
import course_14_thumbnail from "./course_14.png";
import course_15_thumbnail from "./course_15.png";
import course_16_thumbnail from "./course_16.png";
import course_17_thumbnail from "./course_17.png";
import course_18_thumbnail from "./course_18.png";
import course_19_thumbnail from "./course_19.png";
import course_20_thumbnail from "./course_20.png";
import course_21_thumbnail from "./course_21.png";
import course_22_thumbnail from "./course_22.png";
import course_23_thumbnail from "./course_23.png";
import course_24_thumbnail from "./course_24.png";
import course_25_thumbnail from "./course_25.png";
import course_26_thumbnail from "./course_26.png";
import star from "./rating_star.svg";
import star_blank from "./star_dull_icon.svg";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import profile_img_3 from "./profile_img_3.png";
import arrow_icon from "./arrow_icon.svg";
import down_arrow_icon from "./down_arrow_icon.svg";
import time_left_clock_icon from "./time_left_clock_icon.svg";
import time_clock_icon from "./time_clock_icon.svg";
import user_icon from "./user_icon.svg";
import home_icon from "./home_icon.svg";
import add_icon from "./add_icon.svg";
import my_course_icon from "./my_course_icon.svg";
import person_tick_icon from "./person_tick_icon.svg";
import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import file_upload_icon from "./file_upload_icon.svg";
import appointments_icon from "./appointments_icon.svg";
import earning_icon from "./earning_icon.svg";
import dropdown_icon from "./dropdown_icon.svg";
import patients_icon from "./patients_icon.svg";
import play_icon from "./play_icon.svg";
import blue_tick_icon from "./blue_tick_icon.svg";
import course_4 from "./course_4.png";
import profile_img from "./profile_img.png";
import profile_img2 from "./profile_img2.png";
import profile_img3 from "./profile_img3.png";
import lesson_icon from "./lesson_icon.svg";

const generateRatings = (count) => {
  const ratings = [];
  for (let i = 0; i < count; i++) {
    const random = Math.random();
    if (random > 0.6) {
      ratings.push(5); // 40% chance of 5 stars
    } else if (random > 0.25) {
      ratings.push(4); // 35% chance of 4 stars
    } else {
      ratings.push(3); // 25% chance of 3 stars
    }
  }
  return ratings;
};

// Generate course content with realistic chapter titles based on course topic
const generateCourseContent = (courseId) => {
  // YouTube video IDs for different topics (verified working videos)
  const videoIdsByTopic = {
    HTML: [
      "qz0aGYrrlhU",
      "UB1O30fR-EE",
      "MDLn5-zSQQI",
      "pQN-pnXPaVg",
      "kUMe1FH4CHE",
      "HD13eq_Pmp8",
      "salY_Sm6mv4",
      "PlxWf493en4",
      "88PXJAA6szs",
      "qz0aGYrrlhU",
      "UB1O30fR-EE",
      "MDLn5-zSQQI",
      "pQN-pnXPaVg",
      "kUMe1FH4CHE",
      "HD13eq_Pmp8",
    ],
    CSS: [
      "yfoY53QXEnI",
      "1PnVor36_40",
      "Edsxf_NBFrw",
      "OXGznpKZ_sA",
      "ieTHC78giGQ",
      "Z-5QVutAEW4",
      "1Rs2ND1ryYc",
      "FqmB-Zj2-PA",
      "phWxA89Dy94",
      "wRNinF7YQqQ",
      "yfoY53QXEnI",
      "1PnVor36_40",
      "Edsxf_NBFrw",
      "OXGznpKZ_sA",
      "ieTHC78giGQ",
    ],
    JavaScript: [
      "PkZNo7MFNFg",
      "W6NZfCO5SIk",
      "hdI2bqOjy3c",
      "lkIFF4maKMU",
      "jS4aFq5-91M",
      "DHjqpvDnNGE",
      "EerdGm-ehJQ",
      "Oe421EPjeBE",
      "PMsVM7rjupU",
      "TlB_eWDSMt4",
      "PkZNo7MFNFg",
      "W6NZfCO5SIk",
      "hdI2bqOjy3c",
      "lkIFF4maKMU",
      "jS4aFq5-91M",
    ],
    Node: [
      "TlB_eWDSMt4",
      "fBNz5xF-Kx4",
      "Oe421EPjeBE",
      "f2EqECiTBL8",
      "zb3Qk8SG5Ms",
      "LAUi8pPlcUM",
      "VShtPwEkDD0",
      "ohIAiuHMKMI",
      "TlB_eWDSMt4",
      "fBNz5xF-Kx4",
      "Oe421EPjeBE",
      "f2EqECiTBL8",
      "zb3Qk8SG5Ms",
      "LAUi8pPlcUM",
      "VShtPwEkDD0",
    ],
    React: [
      "w7ejDZ8SWv8",
      "SqcY0GlETPk",
      "Ke90Tje7VS0",
      "nTeuhbP7wdE",
      "bMknfKXIFA8",
      "Tn6-PIqc4UM",
      "DLX62G4lc44",
      "CgkZ7MvWUAA",
      "w7ejDZ8SWv8",
      "SqcY0GlETPk",
      "Ke90Tje7VS0",
      "nTeuhbP7wdE",
      "bMknfKXIFA8",
      "Tn6-PIqc4UM",
      "DLX62G4lc44",
    ],
    MongoDB: [
      "ExcRbA7fy_A",
      "c2M-rlkkT5o",
      "ofme2o29ngU",
      "J6mDkcqU_ZE",
      "AYDP1S5BbTo",
      "2QQGWYe7IDU",
      "bhiEJW5poHU",
      "ExcRbA7fy_A",
      "c2M-rlkkT5o",
      "ofme2o29ngU",
      "J6mDkcqU_ZE",
      "AYDP1S5BbTo",
      "2QQGWYe7IDU",
      "bhiEJW5poHU",
      "ExcRbA7fy_A",
    ],
    TypeScript: [
      "BwuLxPH8IDs",
      "30LWjhZzg50",
      "d56mG7DezGs",
      "ahCwqrYpIuM",
      "zQnBQ4tB3ZA",
      "BCg4U1FzODs",
      "BwuLxPH8IDs",
      "30LWjhZzg50",
      "d56mG7DezGs",
      "ahCwqrYpIuM",
      "zQnBQ4tB3ZA",
      "BCg4U1FzODs",
      "BwuLxPH8IDs",
      "30LWjhZzg50",
      "d56mG7DezGs",
    ],
    PostgreSQL: [
      "qw--VYLpxG4",
      "SpfIwlAYaKk",
      "zsjvFFKOm3c",
      "eMIxuk0nOkU",
      "qw--VYLpxG4",
      "SpfIwlAYaKk",
      "zsjvFFKOm3c",
      "eMIxuk0nOkU",
      "qw--VYLpxG4",
      "SpfIwlAYaKk",
      "zsjvFFKOm3c",
      "eMIxuk0nOkU",
      "qw--VYLpxG4",
      "SpfIwlAYaKk",
      "zsjvFFKOm3c",
    ],
    Next: [
      "ZVnjOPwW4ZA",
      "Sklc_fQBmcs",
      "wm5gMKuwSYk",
      "NgayZAuTgwM",
      "mTz0GXj8NN0",
      "ZVnjOPwW4ZA",
      "Sklc_fQBmcs",
      "wm5gMKuwSYk",
      "NgayZAuTgwM",
      "mTz0GXj8NN0",
      "ZVnjOPwW4ZA",
      "Sklc_fQBmcs",
      "wm5gMKuwSYk",
      "NgayZAuTgwM",
      "mTz0GXj8NN0",
    ],
    ReactNative: [
      "0-S5a0eXPoc",
      "ur6I5m2nTvk",
      "ANdSdIlgsEw",
      "obH0Po_RdWk",
      "AkEnidfZnCU",
      "0-S5a0eXPoc",
      "ur6I5m2nTvk",
      "ANdSdIlgsEw",
      "obH0Po_RdWk",
      "AkEnidfZnCU",
      "0-S5a0eXPoc",
      "ur6I5m2nTvk",
      "ANdSdIlgsEw",
      "obH0Po_RdWk",
      "AkEnidfZnCU",
    ],
    Dart: [
      "5rtujDjt50I",
      "Ej_Pcr4uC2Q",
      "F3JuuYuOUK4",
      "NrO0CJCbYLA",
      "71xacHz7kGs",
      "5rtujDjt50I",
      "Ej_Pcr4uC2Q",
      "F3JuuYuOUK4",
      "NrO0CJCbYLA",
      "71xacHz7kGs",
      "5rtujDjt50I",
      "Ej_Pcr4uC2Q",
      "F3JuuYuOUK4",
      "NrO0CJCbYLA",
      "71xacHz7kGs",
    ],
    Flutter: [
      "x0uinJvhNxI",
      "1ukSR1GRtMU",
      "VPvVD8t02U8",
      "CD1Y2DmL5JM",
      "C5lpPjoivaw",
      "x0uinJvhNxI",
      "1ukSR1GRtMU",
      "VPvVD8t02U8",
      "CD1Y2DmL5JM",
      "C5lpPjoivaw",
      "x0uinJvhNxI",
      "1ukSR1GRtMU",
      "VPvVD8t02U8",
      "CD1Y2DmL5JM",
      "C5lpPjoivaw",
    ],
    Python: [
      "_uQrJ0TkZlc",
      "rfscVS0vtbw",
      "kqtD5dpn9C8",
      "eWRfhZUzrAc",
      "8ext9G7xspg",
      "_uQrJ0TkZlc",
      "rfscVS0vtbw",
      "kqtD5dpn9C8",
      "eWRfhZUzrAc",
      "8ext9G7xspg",
      "_uQrJ0TkZlc",
      "rfscVS0vtbw",
      "kqtD5dpn9C8",
      "eWRfhZUzrAc",
      "8ext9G7xspg",
      "eWRfhZUzrAc",
      "8ext9G7xspg",
      "rfscVS0vtbw",
      "_uQrJ0TkZlc",
      "kqtD5dpn9C8",
    ],
  };

  // Project-specific video IDs
  const projectVideosByTopic = {
    HTML: [
      "qz0aGYrrlhU",
      "UB1O30fR-EE",
      "MDLn5-zSQQI",
      "pQN-pnXPaVg",
      "kUMe1FH4CHE",
    ],
    CSS: [
      "yfoY53QXEnI",
      "1PnVor36_40",
      "Edsxf_NBFrw",
      "OXGznpKZ_sA",
      "ieTHC78giGQ",
    ],
    JavaScript: [
      "PkZNo7MFNFg",
      "W6NZfCO5SIk",
      "hdI2bqOjy3c",
      "lkIFF4maKMU",
      "jS4aFq5-91M",
    ],
    Node: [
      "TlB_eWDSMt4",
      "fBNz5xF-Kx4",
      "Oe421EPjeBE",
      "f2EqECiTBL8",
      "zb3Qk8SG5Ms",
    ],
    React: [
      "w7ejDZ8SWv8",
      "SqcY0GlETPk",
      "Ke90Tje7VS0",
      "nTeuhbP7wdE",
      "bMknfKXIFA8",
    ],
    MongoDB: [
      "ExcRbA7fy_A",
      "c2M-rlkkT5o",
      "ofme2o29ngU",
      "J6mDkcqU_ZE",
      "AYDP1S5BbTo",
    ],
    TypeScript: [
      "BwuLxPH8IDs",
      "30LWjhZzg50",
      "d56mG7DezGs",
      "ahCwqrYpIuM",
      "zQnBQ4tB3ZA",
    ],
    PostgreSQL: [
      "qw--VYLpxG4",
      "SpfIwlAYaKk",
      "zsjvFFKOm3c",
      "eMIxuk0nOkU",
      "qw--VYLpxG4",
    ],
    Next: [
      "ZVnjOPwW4ZA",
      "Sklc_fQBmcs",
      "wm5gMKuwSYk",
      "NgayZAuTgwM",
      "mTz0GXj8NN0",
    ],
    ReactNative: [
      "0-S5a0eXPoc",
      "ur6I5m2nTvk",
      "ANdSdIlgsEw",
      "obH0Po_RdWk",
      "AkEnidfZnCU",
    ],
    Dart: [
      "5rtujDjt50I",
      "Ej_Pcr4uC2Q",
      "F3JuuYuOUK4",
      "NrO0CJCbYLA",
      "71xacHz7kGs",
    ],
    Flutter: [
      "x0uinJvhNxI",
      "1ukSR1GRtMU",
      "VPvVD8t02U8",
      "CD1Y2DmL5JM",
      "C5lpPjoivaw",
    ],
    Python: [
      "_uQrJ0TkZlc",
      "rfscVS0vtbw",
      "kqtD5dpn9C8",
      "eWRfhZUzrAc",
      "8ext9G7xspg",
    ],
  };

  const getVideoIds = (topicKey) => {
    const ids = videoIdsByTopic[topicKey] || videoIdsByTopic["JavaScript"];
    return ids;
  };

  const getProjectVideoIds = (topicKey) => {
    const ids =
      projectVideosByTopic[topicKey] || projectVideosByTopic["JavaScript"];
    return ids;
  };

  const getVideoIdForLecture = (topicKey, chapterIndex, lectureIndex) => {
    const ids = getVideoIds(topicKey);
    const index = (chapterIndex * 5 + lectureIndex) % ids.length;
    return ids[index];
  };

  const getVideoIdForProject = (topicKey, projectIndex) => {
    const ids = getProjectVideoIds(topicKey);
    return ids[projectIndex % ids.length];
  };
  const courseChapters = {
    "HTML Fundamentals": [
      {
        title: "Introduction to HTML and Web Structure",
        topics: [
          "What is HTML",
          "Browser Basics",
          "HTML Syntax",
          "Document Structure",
          "First Web Page",
        ],
      },
      {
        title: "Essential HTML Elements",
        topics: [
          "Headings and Paragraphs",
          "Links and Navigation",
          "Images and Media",
          "Lists and Tables",
          "Div and Span",
        ],
      },
      {
        title: "Forms and User Input",
        topics: [
          "Form Basics",
          "Input Types",
          "Form Validation",
          "Labels and Accessibility",
          "Form Submission",
        ],
      },
      {
        title: "Semantic HTML5 Elements",
        topics: [
          "Header and Footer",
          "Nav and Main",
          "Section and Article",
          "Aside and Figure",
          "Semantic Best Practices",
        ],
      },
      {
        title: "HTML Attributes and Metadata",
        topics: [
          "Common Attributes",
          "Meta Tags",
          "Link Relations",
          "Data Attributes",
          "ARIA Basics",
        ],
      },
      {
        title: "HTML Tables Deep Dive",
        topics: [
          "Table Structure",
          "Complex Tables",
          "Table Styling",
          "Responsive Tables",
          "Accessibility",
        ],
      },
      {
        title: "Embedded Content and Media",
        topics: [
          "Video and Audio",
          "Iframes",
          "Canvas Basics",
          "SVG Introduction",
          "Responsive Media",
        ],
      },
      {
        title: "HTML Best Practices",
        topics: [
          "Code Organization",
          "Naming Conventions",
          "Accessibility Standards",
          "SEO Basics",
          "Performance Tips",
        ],
      },
    ],
    "Advanced HTML": [
      {
        title: "Advanced Semantic Markup",
        topics: [
          "Semantic Element Deep Dive",
          "Document Outlining",
          "Microdata",
          "Schema.org Integration",
          "Rich Snippets",
        ],
      },
      {
        title: "Web Accessibility (WCAG)",
        topics: [
          "WCAG Guidelines",
          "Screen Reader Testing",
          "Keyboard Navigation",
          "Color Contrast",
          "Focus Management",
        ],
      },
      {
        title: "ARIA Roles and Attributes",
        topics: [
          "ARIA Introduction",
          "Roles and States",
          "Live Regions",
          "Labels and Descriptions",
          "ARIA Best Practices",
        ],
      },
      {
        title: "HTML5 APIs Introduction",
        topics: [
          "Geolocation API",
          "Web Storage",
          "Drag and Drop",
          "History API",
          "File API",
        ],
      },
      {
        title: "Progressive Web App Basics",
        topics: [
          "Service Workers",
          "Web Manifests",
          "Offline Support",
          "Push Notifications",
          "App-like Experience",
        ],
      },
      {
        title: "Forms and Validation Advanced",
        topics: [
          "Custom Validation",
          "Pattern Matching",
          "Client-Side Security",
          "Multi-Step Forms",
          "Form UX Best Practices",
        ],
      },
      {
        title: "HTML Performance Optimization",
        topics: [
          "Resource Hints",
          "Lazy Loading",
          "Critical CSS",
          "Image Optimization",
          "Preloading Assets",
        ],
      },
      {
        title: "HTML in Modern Applications",
        topics: [
          "Component-Based HTML",
          "Template Elements",
          "Web Components",
          "Shadow DOM",
          "Custom Elements",
        ],
      },
    ],
    "CSS Essentials": [
      {
        title: "CSS Fundamentals",
        topics: [
          "What is CSS",
          "Selectors Basics",
          "CSS Syntax",
          "Including CSS",
          "Browser DevTools",
        ],
      },
      {
        title: "Box Model and Layout Basics",
        topics: [
          "Box Model Explained",
          "Margin and Padding",
          "Border Properties",
          "Width and Height",
          "Box Sizing",
        ],
      },
      {
        title: "Colors and Backgrounds",
        topics: [
          "Color Values",
          "Background Images",
          "Gradients",
          "Opacity and Transparency",
          "Multiple Backgrounds",
        ],
      },
      {
        title: "Typography and Text Styling",
        topics: [
          "Font Properties",
          "Web Fonts",
          "Text Properties",
          "Line Height",
          "Text Alignment",
        ],
      },
      {
        title: "CSS Selectors Mastery",
        topics: [
          "Class and ID",
          "Descendant Selectors",
          "Pseudo-classes",
          "Pseudo-elements",
          "Attribute Selectors",
        ],
      },
      {
        title: "Display and Positioning",
        topics: [
          "Display Property",
          "Static Positioning",
          "Relative Positioning",
          "Absolute Positioning",
          "Fixed and Sticky",
        ],
      },
      {
        title: "Flexbox Basics",
        topics: [
          "Flex Container",
          "Flex Items",
          "Flex Direction",
          "Justify and Align",
          "Flex Wrap",
        ],
      },
      {
        title: "Responsive Design Introduction",
        topics: [
          "Media Queries",
          "Viewport Units",
          "Mobile-First Design",
          "Breakpoints",
          "Responsive Images",
        ],
      },
    ],
    "Advanced CSS": [
      {
        title: "CSS Grid Layout",
        topics: [
          "Grid Container",
          "Grid Template",
          "Grid Areas",
          "Auto Placement",
          "Grid Alignment",
        ],
      },
      {
        title: "Advanced Flexbox Patterns",
        topics: [
          "Flex Patterns",
          "Complex Layouts",
          "Flex Ordering",
          "Flex Sizing",
          "Real-World Examples",
        ],
      },
      {
        title: "CSS Animations and Transitions",
        topics: [
          "Transition Properties",
          "Animation Keyframes",
          "Timing Functions",
          "Transform Properties",
          "Performance Tips",
        ],
      },
      {
        title: "CSS Variables and Custom Properties",
        topics: [
          "Declaring Variables",
          "Using Variables",
          "Dynamic Theming",
          "Scope and Inheritance",
          "JavaScript Integration",
        ],
      },
      {
        title: "Advanced Selectors and Specificity",
        topics: [
          "Specificity Calculation",
          "Combinators",
          "Advanced Pseudo-classes",
          "Nth-child Patterns",
          "Selector Performance",
        ],
      },
      {
        title: "Responsive Design Mastery",
        topics: [
          "Container Queries",
          "Responsive Typography",
          "Aspect Ratios",
          "Modern Layouts",
          "CSS Clamp",
        ],
      },
      {
        title: "CSS Architecture and Methodology",
        topics: [
          "BEM Methodology",
          "CSS Modules",
          "SMACSS",
          "Utility-First CSS",
          "Component Styling",
        ],
      },
      {
        title: "Modern CSS Features",
        topics: [
          "Subgrid",
          "Logical Properties",
          "CSS Houdini",
          "Scroll Snap",
          "CSS Shapes",
        ],
      },
    ],
    "JavaScript Basics": [
      {
        title: "JavaScript Introduction",
        topics: [
          "What is JavaScript",
          "JS in Browsers",
          "Console Basics",
          "Syntax Overview",
          "First Program",
        ],
      },
      {
        title: "Variables and Data Types",
        topics: [
          "Variables Declaration",
          "Primitive Types",
          "Type Coercion",
          "Undefined and Null",
          "Symbol and BigInt",
        ],
      },
      {
        title: "Operators and Expressions",
        topics: [
          "Arithmetic Operators",
          "Comparison Operators",
          "Logical Operators",
          "Assignment Operators",
          "Operator Precedence",
        ],
      },
      {
        title: "Control Flow",
        topics: [
          "If Statements",
          "Switch Cases",
          "Ternary Operator",
          "Loops (for, while)",
          "Break and Continue",
        ],
      },
      {
        title: "Functions Fundamentals",
        topics: [
          "Function Declaration",
          "Function Expression",
          "Arrow Functions",
          "Parameters and Arguments",
          "Return Values",
        ],
      },
      {
        title: "Arrays and Array Methods",
        topics: [
          "Array Basics",
          "Array Methods",
          "Iteration Methods",
          "Array Manipulation",
          "Array Destructuring",
        ],
      },
      {
        title: "Objects and Object Basics",
        topics: [
          "Object Literals",
          "Properties and Methods",
          "Object Access",
          "Object Manipulation",
          "Object Destructuring",
        ],
      },
      {
        title: "DOM Manipulation Basics",
        topics: [
          "Selecting Elements",
          "Modifying Content",
          "Event Listeners",
          "Creating Elements",
          "DOM Traversal",
        ],
      },
    ],
    "Advanced JavaScript": [
      {
        title: "ES6+ Modern Syntax",
        topics: [
          "Let and Const",
          "Template Literals",
          "Spread and Rest",
          "Default Parameters",
          "Enhanced Object Literals",
        ],
      },
      {
        title: "Asynchronous JavaScript",
        topics: [
          "Callbacks",
          "Promises",
          "Async/Await",
          "Error Handling",
          "Promise Chaining",
        ],
      },
      {
        title: "Advanced Functions",
        topics: [
          "Closures",
          "Higher-Order Functions",
          "Currying",
          "Function Composition",
          "IIFE",
        ],
      },
      {
        title: "Object-Oriented JavaScript",
        topics: [
          "Constructor Functions",
          "Prototypes",
          "ES6 Classes",
          "Inheritance",
          "Encapsulation",
        ],
      },
      {
        title: "Advanced Array Methods",
        topics: [
          "Map, Filter, Reduce",
          "Find and Every",
          "Chaining Methods",
          "Array Performance",
          "Immutability",
        ],
      },
      {
        title: "Error Handling and Debugging",
        topics: [
          "Try-Catch-Finally",
          "Custom Errors",
          "Debugging Tools",
          "Error Patterns",
          "Stack Traces",
        ],
      },
      {
        title: "Modules and Module Patterns",
        topics: [
          "ES6 Modules",
          "Import/Export",
          "Module Bundlers",
          "Module Patterns",
          "Code Organization",
        ],
      },
      {
        title: "JavaScript Design Patterns",
        topics: [
          "Singleton",
          "Factory",
          "Observer",
          "Module Pattern",
          "Revealing Module",
        ],
      },
    ],
    "Node.js Fundamentals": [
      {
        title: "Node.js Introduction",
        topics: [
          "What is Node.js",
          "Runtime Environment",
          "Installation",
          "REPL",
          "First Node App",
        ],
      },
      {
        title: "Node.js Core Modules",
        topics: [
          "File System (fs)",
          "Path Module",
          "HTTP Module",
          "Events Module",
          "OS Module",
        ],
      },
      {
        title: "NPM and Package Management",
        topics: [
          "NPM Basics",
          "Package.json",
          "Installing Packages",
          "Semantic Versioning",
          "NPM Scripts",
        ],
      },
      {
        title: "Asynchronous Node.js",
        topics: [
          "Event Loop",
          "Callbacks in Node",
          "Promises in Node",
          "Async/Await",
          "Error-First Callbacks",
        ],
      },
      {
        title: "Express.js Basics",
        topics: [
          "Express Setup",
          "Routing",
          "Middleware",
          "Request/Response",
          "Static Files",
        ],
      },
      {
        title: "REST API Development",
        topics: [
          "RESTful Principles",
          "HTTP Methods",
          "Status Codes",
          "API Routes",
          "JSON Responses",
        ],
      },
      {
        title: "Working with Databases",
        topics: [
          "Database Connections",
          "MongoDB Integration",
          "Queries",
          "CRUD Operations",
          "Database Drivers",
        ],
      },
      {
        title: "Environment and Configuration",
        topics: [
          "Environment Variables",
          "Config Files",
          "dotenv Package",
          "Different Environments",
          "Security Best Practices",
        ],
      },
    ],
    "Advanced Node.js": [
      {
        title: "Advanced Express Patterns",
        topics: [
          "Router Modules",
          "Controller Pattern",
          "Service Layer",
          "Error Handling Middleware",
          "Request Validation",
        ],
      },
      {
        title: "Authentication and Authorization",
        topics: [
          "JWT Tokens",
          "Password Hashing",
          "Session Management",
          "OAuth",
          "Role-Based Access",
        ],
      },
      {
        title: "API Security",
        topics: [
          "CORS",
          "Rate Limiting",
          "Helmet.js",
          "Input Sanitization",
          "XSS Prevention",
        ],
      },
      {
        title: "Database Advanced Topics",
        topics: [
          "Indexing",
          "Aggregation Pipelines",
          "Transactions",
          "Query Optimization",
          "Schema Design",
        ],
      },
      {
        title: "File Uploads and Storage",
        topics: [
          "Multer",
          "File Validation",
          "Cloud Storage",
          "Image Processing",
          "Streaming",
        ],
      },
      {
        title: "Real-time Communication",
        topics: [
          "WebSockets",
          "Socket.io",
          "Real-time Events",
          "Broadcasting",
          "Room Management",
        ],
      },
      {
        title: "Testing Node Applications",
        topics: [
          "Jest Basics",
          "Unit Testing",
          "Integration Testing",
          "Mocking",
          "Test Coverage",
        ],
      },
      {
        title: "Performance and Scalability",
        topics: [
          "Caching Strategies",
          "Load Balancing",
          "Clustering",
          "Memory Management",
          "Profiling",
        ],
      },
    ],
    "React Fundamentals": [
      {
        title: "React Introduction",
        topics: [
          "What is React",
          "Virtual DOM",
          "Component Basics",
          "JSX Syntax",
          "Create React App",
        ],
      },
      {
        title: "Components and Props",
        topics: [
          "Functional Components",
          "Component Composition",
          "Props Basics",
          "Props Validation",
          "Children Props",
        ],
      },
      {
        title: "State Management Basics",
        topics: [
          "useState Hook",
          "State Updates",
          "Multiple State Variables",
          "State as Snapshot",
          "State Best Practices",
        ],
      },
      {
        title: "Event Handling in React",
        topics: [
          "Synthetic Events",
          "Event Handlers",
          "Passing Arguments",
          "Event Bubbling",
          "Preventing Defaults",
        ],
      },
      {
        title: "Conditional Rendering",
        topics: [
          "If-Else in JSX",
          "Ternary Operators",
          "Logical AND",
          "Conditional Components",
          "Rendering Lists",
        ],
      },
      {
        title: "Lists and Keys",
        topics: [
          "Rendering Arrays",
          "Key Prop",
          "List Performance",
          "Dynamic Lists",
          "Filtering Lists",
        ],
      },
      {
        title: "Forms in React",
        topics: [
          "Controlled Components",
          "Form State",
          "Multiple Inputs",
          "Form Validation",
          "Form Submission",
        ],
      },
      {
        title: "Lifecycle and Effects",
        topics: [
          "useEffect Hook",
          "Effect Dependencies",
          "Cleanup Functions",
          "Multiple Effects",
          "Effect Best Practices",
        ],
      },
    ],
    "Advanced React": [
      {
        title: "Advanced Hooks",
        topics: [
          "useReducer",
          "useCallback",
          "useMemo",
          "useRef",
          "Custom Hooks",
        ],
      },
      {
        title: "Context API Deep Dive",
        topics: [
          "Creating Context",
          "Context Provider",
          "useContext Hook",
          "Multiple Contexts",
          "Context Best Practices",
        ],
      },
      {
        title: "React Performance",
        topics: [
          "React.memo",
          "Memoization",
          "Code Splitting",
          "Lazy Loading",
          "Performance Profiler",
        ],
      },
      {
        title: "Advanced Patterns",
        topics: [
          "Render Props",
          "Higher-Order Components",
          "Compound Components",
          "Controlled vs Uncontrolled",
          "State Reducers",
        ],
      },
      {
        title: "React Router",
        topics: [
          "Route Setup",
          "Navigation",
          "Route Parameters",
          "Nested Routes",
          "Protected Routes",
        ],
      },
      {
        title: "State Management Libraries",
        topics: [
          "Redux Basics",
          "Actions and Reducers",
          "Redux Toolkit",
          "Zustand",
          "State Management Comparison",
        ],
      },
      {
        title: "API Integration",
        topics: [
          "Fetch API",
          "Axios",
          "Data Fetching Patterns",
          "Loading States",
          "Error Handling",
        ],
      },
      {
        title: "Testing React Apps",
        topics: [
          "React Testing Library",
          "Component Testing",
          "Hook Testing",
          "Mocking",
          "Integration Tests",
        ],
      },
    ],
    "MongoDB Basics": [
      {
        title: "MongoDB Introduction",
        topics: [
          "What is MongoDB",
          "NoSQL Concepts",
          "Installation",
          "MongoDB Atlas",
          "Compass GUI",
        ],
      },
      {
        title: "MongoDB CRUD Operations",
        topics: [
          "Creating Documents",
          "Reading Documents",
          "Updating Documents",
          "Deleting Documents",
          "Query Basics",
        ],
      },
      {
        title: "MongoDB Data Types",
        topics: [
          "Strings and Numbers",
          "Arrays",
          "Objects",
          "Dates",
          "ObjectId",
        ],
      },
      {
        title: "Query Operators",
        topics: [
          "Comparison Operators",
          "Logical Operators",
          "Element Operators",
          "Array Operators",
          "Evaluation Operators",
        ],
      },
      {
        title: "Indexes in MongoDB",
        topics: [
          "Index Basics",
          "Single Field Index",
          "Compound Index",
          "Index Performance",
          "Index Types",
        ],
      },
      {
        title: "Data Modeling",
        topics: [
          "Document Structure",
          "Embedded Documents",
          "References",
          "One-to-Many",
          "Many-to-Many",
        ],
      },
      {
        title: "Aggregation Framework Basics",
        topics: [
          "Pipeline Stages",
          "$match and $group",
          "$project",
          "$sort and $limit",
          "Basic Aggregations",
        ],
      },
      {
        title: "MongoDB with Node.js",
        topics: [
          "MongoDB Driver",
          "Connection Setup",
          "CRUD with Driver",
          "Error Handling",
          "Connection Pooling",
        ],
      },
    ],
    "Advanced MongoDB": [
      {
        title: "Advanced Schema Design",
        topics: [
          "Design Patterns",
          "Denormalization",
          "Schema Anti-patterns",
          "Versioning",
          "Migration Strategies",
        ],
      },
      {
        title: "Complex Aggregations",
        topics: [
          "Advanced Pipeline",
          "$lookup Joins",
          "$unwind",
          "$facet",
          "Multi-stage Aggregations",
        ],
      },
      {
        title: "Indexing Strategies",
        topics: [
          "Compound Indexes",
          "Text Indexes",
          "Geospatial Indexes",
          "Partial Indexes",
          "Index Optimization",
        ],
      },
      {
        title: "Transactions in MongoDB",
        topics: [
          "Multi-document Transactions",
          "ACID Properties",
          "Transaction Best Practices",
          "Rollbacks",
          "Session Management",
        ],
      },
      {
        title: "Performance Optimization",
        topics: [
          "Query Optimization",
          "Explain Plans",
          "Profiling",
          "Memory Management",
          "Bulk Operations",
        ],
      },
      {
        title: "Replication and Sharding",
        topics: [
          "Replica Sets",
          "High Availability",
          "Sharding Basics",
          "Shard Keys",
          "Distributed Queries",
        ],
      },
      {
        title: "MongoDB Security",
        topics: [
          "Authentication",
          "Authorization",
          "Role-Based Access",
          "Encryption",
          "Security Best Practices",
        ],
      },
      {
        title: "MongoDB Atlas Advanced",
        topics: [
          "Atlas Features",
          "Serverless",
          "Data API",
          "Charts and Analytics",
          "Backup and Restore",
        ],
      },
    ],
    "TypeScript Fundamentals": [
      {
        title: "TypeScript Introduction",
        topics: [
          "What is TypeScript",
          "Why TypeScript",
          "Installation",
          "TSC Compiler",
          "First TS Program",
        ],
      },
      {
        title: "Basic Types",
        topics: [
          "Primitive Types",
          "Type Annotations",
          "Type Inference",
          "Union Types",
          "Type Aliases",
        ],
      },
      {
        title: "Functions in TypeScript",
        topics: [
          "Function Types",
          "Optional Parameters",
          "Default Parameters",
          "Rest Parameters",
          "Function Overloading",
        ],
      },
      {
        title: "Interfaces",
        topics: [
          "Interface Basics",
          "Optional Properties",
          "Readonly Properties",
          "Extending Interfaces",
          "Interface vs Type",
        ],
      },
      {
        title: "Classes in TypeScript",
        topics: [
          "Class Basics",
          "Access Modifiers",
          "Constructors",
          "Inheritance",
          "Abstract Classes",
        ],
      },
      {
        title: "Arrays and Tuples",
        topics: [
          "Array Types",
          "Generic Arrays",
          "Readonly Arrays",
          "Tuple Types",
          "Tuple Labels",
        ],
      },
      {
        title: "Enums and Literals",
        topics: [
          "Numeric Enums",
          "String Enums",
          "Const Enums",
          "Literal Types",
          "Const Assertions",
        ],
      },
      {
        title: "Type Narrowing",
        topics: [
          "Type Guards",
          "Typeof",
          "Instanceof",
          "Discriminated Unions",
          "Assertion Functions",
        ],
      },
    ],
    "Advanced TypeScript": [
      {
        title: "Generics Deep Dive",
        topics: [
          "Generic Functions",
          "Generic Interfaces",
          "Generic Classes",
          "Generic Constraints",
          "Generic Utilities",
        ],
      },
      {
        title: "Advanced Types",
        topics: [
          "Intersection Types",
          "Conditional Types",
          "Mapped Types",
          "Template Literal Types",
          "Recursive Types",
        ],
      },
      {
        title: "Utility Types",
        topics: [
          "Partial and Required",
          "Pick and Omit",
          "Record",
          "ReturnType",
          "Parameters",
        ],
      },
      {
        title: "Decorators",
        topics: [
          "Class Decorators",
          "Method Decorators",
          "Property Decorators",
          "Parameter Decorators",
          "Decorator Factories",
        ],
      },
      {
        title: "Modules and Namespaces",
        topics: [
          "ES Modules",
          "Module Resolution",
          "Namespaces",
          "Declaration Files",
          "Ambient Declarations",
        ],
      },
      {
        title: "TypeScript with React",
        topics: [
          "React Types",
          "Component Props",
          "Event Types",
          "Hooks Types",
          "Context Types",
        ],
      },
      {
        title: "Advanced Patterns",
        topics: [
          "Builder Pattern",
          "Factory Pattern",
          "Singleton",
          "Dependency Injection",
          "Type-Safe APIs",
        ],
      },
      {
        title: "TypeScript Tooling",
        topics: [
          "TSConfig Options",
          "Strict Mode",
          "Path Mapping",
          "Project References",
          "Build Optimization",
        ],
      },
    ],
    "PostgreSQL Fundamentals": [
      {
        title: "PostgreSQL Introduction",
        topics: [
          "What is PostgreSQL",
          "Installation",
          "pgAdmin",
          "SQL Basics",
          "Database Concepts",
        ],
      },
      {
        title: "Data Types in PostgreSQL",
        topics: [
          "Numeric Types",
          "Character Types",
          "Date/Time Types",
          "Boolean",
          "JSON Types",
        ],
      },
      {
        title: "Creating Tables",
        topics: [
          "CREATE TABLE",
          "Primary Keys",
          "Foreign Keys",
          "Constraints",
          "Data Integrity",
        ],
      },
      {
        title: "CRUD Operations",
        topics: [
          "INSERT Statements",
          "SELECT Queries",
          "UPDATE Records",
          "DELETE Records",
          "RETURNING Clause",
        ],
      },
      {
        title: "Querying Data",
        topics: [
          "WHERE Clause",
          "ORDER BY",
          "LIMIT and OFFSET",
          "DISTINCT",
          "Aggregate Functions",
        ],
      },
      {
        title: "Joins and Relationships",
        topics: [
          "INNER JOIN",
          "LEFT JOIN",
          "RIGHT JOIN",
          "FULL OUTER JOIN",
          "Self Joins",
        ],
      },
      {
        title: "Grouping and Aggregation",
        topics: [
          "GROUP BY",
          "HAVING Clause",
          "Aggregate Functions",
          "COUNT, SUM, AVG",
          "String Aggregation",
        ],
      },
      {
        title: "Indexes and Performance",
        topics: [
          "Index Basics",
          "B-Tree Indexes",
          "Creating Indexes",
          "Index Types",
          "Query Performance",
        ],
      },
    ],
    "Advanced PostgreSQL": [
      {
        title: "Advanced Queries",
        topics: [
          "Subqueries",
          "Common Table Expressions",
          "Window Functions",
          "Recursive Queries",
          "Complex Joins",
        ],
      },
      {
        title: "Query Optimization",
        topics: [
          "EXPLAIN ANALYZE",
          "Query Plans",
          "Index Strategies",
          "Query Tuning",
          "Statistics",
        ],
      },
      {
        title: "Transactions and Concurrency",
        topics: [
          "ACID Properties",
          "Transaction Isolation",
          "Locks",
          "Deadlocks",
          "Serialization",
        ],
      },
      {
        title: "Advanced Data Types",
        topics: ["Arrays", "JSON/JSONB", "hstore", "UUID", "Custom Types"],
      },
      {
        title: "Full-Text Search",
        topics: [
          "tsvector and tsquery",
          "Text Search Configuration",
          "Ranking",
          "Stemming",
          "Search Performance",
        ],
      },
      {
        title: "Stored Procedures and Functions",
        topics: [
          "PL/pgSQL",
          "Functions",
          "Triggers",
          "Procedures",
          "Return Types",
        ],
      },
      {
        title: "Database Administration",
        topics: [
          "User Management",
          "Roles and Permissions",
          "Backup and Restore",
          "Vacuuming",
          "Monitoring",
        ],
      },
      {
        title: "Scaling PostgreSQL",
        topics: [
          "Replication",
          "Partitioning",
          "Connection Pooling",
          "Read Replicas",
          "Performance Tuning",
        ],
      },
    ],
    "Next.js Fundamentals": [
      {
        title: "Next.js Introduction",
        topics: [
          "What is Next.js",
          "Why Next.js",
          "Installation",
          "Project Structure",
          "First Next App",
        ],
      },
      {
        title: "Pages and Routing",
        topics: [
          "File-based Routing",
          "Dynamic Routes",
          "Link Component",
          "useRouter Hook",
          "Route Parameters",
        ],
      },
      {
        title: "Data Fetching Basics",
        topics: [
          "getStaticProps",
          "getServerSideProps",
          "Client-side Fetching",
          "When to Use Each",
          "Data Flow",
        ],
      },
      {
        title: "API Routes",
        topics: [
          "Creating API Routes",
          "Request Handlers",
          "Dynamic API Routes",
          "API Middleware",
          "Response Methods",
        ],
      },
      {
        title: "Styling in Next.js",
        topics: [
          "CSS Modules",
          "Global Styles",
          "CSS-in-JS",
          "Tailwind Integration",
          "Sass Support",
        ],
      },
      {
        title: "Image Optimization",
        topics: [
          "next/image Component",
          "Image Formats",
          "Responsive Images",
          "Lazy Loading",
          "External Images",
        ],
      },
      {
        title: "Static Generation",
        topics: [
          "Static Site Generation",
          "getStaticPaths",
          "Incremental Static Regeneration",
          "Fallback Pages",
          "Build Output",
        ],
      },
      {
        title: "Environment and Config",
        topics: [
          "Environment Variables",
          "Next Config",
          "Runtime Config",
          "Custom Server",
          "Middleware",
        ],
      },
    ],
    "Advanced Next.js": [
      {
        title: "Server-Side Rendering",
        topics: [
          "SSR Deep Dive",
          "Hybrid Rendering",
          "Streaming SSR",
          "React Server Components",
          "Edge Runtime",
        ],
      },
      {
        title: "App Router (Next 13+)",
        topics: [
          "App Directory",
          "Layouts",
          "Loading UI",
          "Error Handling",
          "Route Groups",
        ],
      },
      {
        title: "Advanced Data Fetching",
        topics: [
          "Parallel Data Fetching",
          "Sequential Fetching",
          "Data Caching",
          "Revalidation Strategies",
          "Suspense",
        ],
      },
      {
        title: "Performance Optimization",
        topics: [
          "Code Splitting",
          "Bundle Analysis",
          "Lazy Loading",
          "Prefetching",
          "Core Web Vitals",
        ],
      },
      {
        title: "SEO and Metadata",
        topics: ["Meta Tags", "Open Graph", "JSON-LD", "Sitemap", "robots.txt"],
      },
      {
        title: "Authentication Patterns",
        topics: [
          "NextAuth.js",
          "Session Management",
          "Protected Routes",
          "API Authentication",
          "JWT",
        ],
      },
      {
        title: "Deployment and CI/CD",
        topics: [
          "Vercel Deployment",
          "Environment Setup",
          "Custom Deployment",
          "Preview Deployments",
          "Build Optimization",
        ],
      },
      {
        title: "Advanced Features",
        topics: [
          "Middleware",
          "Edge Functions",
          "Internationalization",
          "Font Optimization",
          "Analytics",
        ],
      },
    ],
    "React Native Basics": [
      {
        title: "React Native Introduction",
        topics: [
          "What is React Native",
          "Expo vs CLI",
          "Environment Setup",
          "First App",
          "Debugging Tools",
        ],
      },
      {
        title: "Core Components",
        topics: ["View", "Text", "Image", "ScrollView", "FlatList"],
      },
      {
        title: "Styling in React Native",
        topics: [
          "StyleSheet",
          "Flexbox Layout",
          "Dimensions",
          "Platform-Specific Styles",
          "Responsive Design",
        ],
      },
      {
        title: "User Input",
        topics: [
          "TextInput",
          "Buttons",
          "Touchable Components",
          "Keyboard",
          "Form Handling",
        ],
      },
      {
        title: "Navigation Basics",
        topics: [
          "React Navigation",
          "Stack Navigator",
          "Tab Navigator",
          "Drawer Navigator",
          "Navigation Props",
        ],
      },
      {
        title: "State Management",
        topics: [
          "useState",
          "useEffect",
          "Context API",
          "Async Storage",
          "State Patterns",
        ],
      },
      {
        title: "Working with APIs",
        topics: [
          "Fetch API",
          "Axios",
          "Loading States",
          "Error Handling",
          "Data Persistence",
        ],
      },
      {
        title: "Platform Features",
        topics: [
          "Camera",
          "Geolocation",
          "Permissions",
          "AsyncStorage",
          "Platform APIs",
        ],
      },
    ],
    "Advanced React Native": [
      {
        title: "Advanced Navigation",
        topics: [
          "Nested Navigators",
          "Deep Linking",
          "Navigation State",
          "Custom Transitions",
          "Navigation Optimization",
        ],
      },
      {
        title: "Performance Optimization",
        topics: [
          "List Optimization",
          "Memoization",
          "Image Optimization",
          "Bundle Size",
          "Memory Management",
        ],
      },
      {
        title: "Native Modules",
        topics: [
          "Bridging Native Code",
          "Android Modules",
          "iOS Modules",
          "Native UI Components",
          "Third-party Libraries",
        ],
      },
      {
        title: "Animation and Gestures",
        topics: [
          "Animated API",
          "React Native Reanimated",
          "Gesture Handler",
          "Transitions",
          "Complex Animations",
        ],
      },
      {
        title: "Advanced Styling",
        topics: [
          "Styled Components",
          "Theme Management",
          "Dark Mode",
          "Custom Fonts",
          "Vector Icons",
        ],
      },
      {
        title: "State Management Advanced",
        topics: [
          "Redux",
          "Redux Toolkit",
          "Redux Persist",
          "Zustand",
          "State Architecture",
        ],
      },
      {
        title: "Testing React Native",
        topics: [
          "Jest",
          "React Native Testing Library",
          "E2E Testing",
          "Detox",
          "Test Coverage",
        ],
      },
      {
        title: "Deployment",
        topics: [
          "Android Build",
          "iOS Build",
          "Code Push",
          "App Store Submission",
          "CI/CD Pipeline",
        ],
      },
    ],
    "Dart Fundamentals": [
      {
        title: "Dart Introduction",
        topics: [
          "What is Dart",
          "Installation",
          "Dart VM",
          "DartPad",
          "First Program",
        ],
      },
      {
        title: "Variables and Data Types",
        topics: [
          "var, final, const",
          "Primitive Types",
          "String Manipulation",
          "Numbers",
          "Booleans",
        ],
      },
      {
        title: "Operators and Control Flow",
        topics: [
          "Operators",
          "If-Else",
          "Switch Cases",
          "Loops",
          "Break and Continue",
        ],
      },
      {
        title: "Functions in Dart",
        topics: [
          "Function Declaration",
          "Arrow Functions",
          "Optional Parameters",
          "Named Parameters",
          "Anonymous Functions",
        ],
      },
      {
        title: "Collections",
        topics: ["Lists", "Sets", "Maps", "Collection Methods", "Iteration"],
      },
      {
        title: "Object-Oriented Dart",
        topics: [
          "Classes",
          "Constructors",
          "Properties",
          "Methods",
          "Inheritance",
        ],
      },
      {
        title: "Advanced OOP",
        topics: [
          "Abstract Classes",
          "Interfaces",
          "Mixins",
          "Generics",
          "Factory Constructors",
        ],
      },
      {
        title: "Asynchronous Programming",
        topics: [
          "Futures",
          "Async/Await",
          "Streams",
          "Error Handling",
          "Stream Controllers",
        ],
      },
    ],
    "Advanced Dart": [
      {
        title: "Advanced Async Programming",
        topics: [
          "Futures Deep Dive",
          "Async Error Handling",
          "Stream Transformations",
          "Broadcast Streams",
          "StreamSubscription",
        ],
      },
      {
        title: "Isolates and Concurrency",
        topics: [
          "What are Isolates",
          "Creating Isolates",
          "Communication Between Isolates",
          "Compute Function",
          "Parallel Processing",
        ],
      },
      {
        title: "Advanced Collections",
        topics: [
          "Iterable Deep Dive",
          "Custom Collections",
          "Collection Performance",
          "Lazy Evaluation",
          "Extension Methods",
        ],
      },
      {
        title: "Generics and Type System",
        topics: [
          "Generic Constraints",
          "Covariance and Contravariance",
          "Type Bounds",
          "Generic Functions",
          "Type Inference",
        ],
      },
      {
        title: "Mixins and Extensions",
        topics: [
          "Mixin Composition",
          "Mixin Constraints",
          "Extension Methods",
          "Extension Types",
          "Operator Overloading",
        ],
      },
      {
        title: "Meta-programming",
        topics: [
          "Reflection",
          "Mirrors API",
          "Code Generation",
          "Annotations",
          "Build Runner",
        ],
      },
      {
        title: "Memory Management",
        topics: [
          "Garbage Collection",
          "Memory Leaks",
          "Weak References",
          "Performance Profiling",
          "Optimization Techniques",
        ],
      },
      {
        title: "Architecture Patterns",
        topics: [
          "Clean Architecture",
          "Repository Pattern",
          "Dependency Injection",
          "SOLID Principles",
          "Design Patterns",
        ],
      },
    ],
    "Flutter Fundamentals": [
      {
        title: "Flutter Introduction",
        topics: [
          "What is Flutter",
          "Installation and Setup",
          "Project Structure",
          "Hot Reload",
          "First Flutter App",
        ],
      },
      {
        title: "Widgets and Layouts",
        topics: [
          "Stateless Widgets",
          "Stateful Widgets",
          "Container and Padding",
          "Row and Column",
          "Stack and Positioned",
        ],
      },
      {
        title: "Material Design Components",
        topics: ["Scaffold", "AppBar", "Buttons", "Cards", "Lists"],
      },
      {
        title: "Navigation and Routing",
        topics: [
          "Navigator",
          "Named Routes",
          "Passing Data",
          "Bottom Navigation",
          "Drawer Navigation",
        ],
      },
      {
        title: "State Management Basics",
        topics: [
          "setState",
          "InheritedWidget",
          "Provider Package",
          "State Lifting",
          "State Best Practices",
        ],
      },
      {
        title: "Forms and Input",
        topics: [
          "TextField",
          "Form Widget",
          "Validation",
          "Focus Nodes",
          "Keyboard Actions",
        ],
      },
      {
        title: "Networking and APIs",
        topics: [
          "HTTP Package",
          "Fetching Data",
          "JSON Parsing",
          "Error Handling",
          "Loading States",
        ],
      },
      {
        title: "Local Storage",
        topics: [
          "Shared Preferences",
          "File Storage",
          "SQLite Database",
          "Hive",
          "Data Persistence",
        ],
      },
    ],
    "Advanced Flutter": [
      {
        title: "Advanced State Management",
        topics: [
          "BLoC Pattern",
          "Riverpod",
          "GetX",
          "MobX",
          "State Comparison",
        ],
      },
      {
        title: "Advanced Animations",
        topics: [
          "AnimationController",
          "Tween Animations",
          "Hero Animations",
          "Custom Transitions",
          "Physics Simulations",
        ],
      },
      {
        title: "Custom Painting",
        topics: [
          "CustomPaint Widget",
          "Canvas API",
          "Path Drawing",
          "Custom Shapes",
          "Performance Optimization",
        ],
      },
      {
        title: "Platform Channels",
        topics: [
          "Method Channels",
          "Event Channels",
          "Native Integration",
          "iOS Platform Code",
          "Android Platform Code",
        ],
      },
      {
        title: "Advanced Layouts",
        topics: [
          "CustomMultiChildLayout",
          "Flow Widget",
          "Sliver Widgets",
          "CustomScrollView",
          "NestedScrollView",
        ],
      },
      {
        title: "Performance Optimization",
        topics: [
          "Widget Rebuild Optimization",
          "Image Caching",
          "Lazy Loading",
          "Memory Management",
          "Profiling Tools",
        ],
      },
      {
        title: "Testing Flutter Apps",
        topics: [
          "Unit Testing",
          "Widget Testing",
          "Integration Testing",
          "Golden Tests",
          "Mocking",
        ],
      },
      {
        title: "Deployment and CI/CD",
        topics: [
          "Build for Production",
          "Code Signing",
          "Play Store Deployment",
          "App Store Deployment",
          "Continuous Integration",
        ],
      },
    ],
    "Python Fundamentals": [
      {
        title: "Python Introduction",
        topics: [
          "What is Python",
          "Installation",
          "REPL",
          "IDEs and Editors",
          "First Python Program",
        ],
      },
      {
        title: "Variables and Data Types",
        topics: [
          "Variables",
          "Numbers",
          "Strings",
          "Booleans",
          "Type Conversion",
        ],
      },
      {
        title: "Operators and Expressions",
        topics: [
          "Arithmetic Operators",
          "Comparison Operators",
          "Logical Operators",
          "Bitwise Operators",
          "Operator Precedence",
        ],
      },
      {
        title: "Control Flow",
        topics: [
          "If-Elif-Else",
          "For Loops",
          "While Loops",
          "Break and Continue",
          "Pass Statement",
        ],
      },
      {
        title: "Functions",
        topics: [
          "Defining Functions",
          "Parameters and Arguments",
          "Return Values",
          "Lambda Functions",
          "Scope",
        ],
      },
      {
        title: "Data Structures",
        topics: [
          "Lists",
          "Tuples",
          "Dictionaries",
          "Sets",
          "List Comprehensions",
        ],
      },
      {
        title: "File Handling",
        topics: [
          "Reading Files",
          "Writing Files",
          "File Modes",
          "Context Managers",
          "CSV and JSON",
        ],
      },
      {
        title: "Object-Oriented Python",
        topics: [
          "Classes and Objects",
          "Attributes and Methods",
          "Inheritance",
          "Encapsulation",
          "Polymorphism",
        ],
      },
    ],
    "Advanced Python": [
      {
        title: "Advanced Data Structures",
        topics: [
          "Collections Module",
          "Namedtuples",
          "Deque",
          "Counter",
          "OrderedDict",
        ],
      },
      {
        title: "Decorators and Generators",
        topics: [
          "Function Decorators",
          "Class Decorators",
          "Generator Functions",
          "Yield Statement",
          "Iterators",
        ],
      },
      {
        title: "Context Managers",
        topics: [
          "With Statement",
          "Creating Context Managers",
          "__enter__ and __exit__",
          "Contextlib Module",
          "Best Practices",
        ],
      },
      {
        title: "Web Development with Flask",
        topics: [
          "Flask Basics",
          "Routing",
          "Templates",
          "Forms",
          "Database Integration",
        ],
      },
      {
        title: "RESTful APIs with FastAPI",
        topics: [
          "FastAPI Setup",
          "Path Parameters",
          "Query Parameters",
          "Request Body",
          "Response Models",
        ],
      },
      {
        title: "Data Processing with Pandas",
        topics: [
          "DataFrames",
          "Reading Data",
          "Data Cleaning",
          "Data Manipulation",
          "GroupBy Operations",
        ],
      },
      {
        title: "Web Scraping",
        topics: [
          "BeautifulSoup",
          "Requests Library",
          "Parsing HTML",
          "Data Extraction",
          "Selenium Basics",
        ],
      },
      {
        title: "Automation and Testing",
        topics: [
          "Unit Testing",
          "Pytest",
          "Mocking",
          "Test Coverage",
          "CI/CD Integration",
        ],
      },
    ],
  };

  // Project and assignment data for each course
  const courseProjects = {
    "HTML Fundamentals": {
      techStack: "HTML5, CSS3",
      projects: [
        {
          title: "Personal Portfolio Landing Page",
          description:
            "Create a responsive single-page portfolio with semantic HTML, showcasing your profile, skills, and contact form",
        },
        {
          title: "Restaurant Menu Website",
          description:
            "Build a multi-page restaurant website with menu tables, image gallery, and reservation form using semantic markup",
        },
        {
          title: "Blog Homepage Layout",
          description:
            "Design a blog homepage with article cards, sidebar navigation, and footer using proper HTML5 semantic elements",
        },
      ],
      assignments: [
        {
          title: "HTML Form Validation Project",
          description:
            "Create a comprehensive registration form with various input types, proper labels, and HTML5 validation attributes",
        },
        {
          title: "Accessible Web Page Audit",
          description:
            "Take an existing webpage and improve its accessibility by adding proper ARIA attributes, semantic tags, and alternative text",
        },
      ],
      capstone: {
        title: "Production-Ready Business Website",
        description:
          "Build a complete 5-page business website (Home, About, Services, Portfolio, Contact) with semantic HTML5, SEO optimization, meta tags, Open Graph tags, structured data, accessible forms, and responsive images. Deploy to GitHub Pages or Netlify.",
        techStack: "HTML5, CSS3, Semantic Markup, SEO Best Practices",
      },
    },
    "Advanced HTML": {
      techStack: "HTML5, ARIA, Web APIs, PWA",
      projects: [
        {
          title: "Accessible Dashboard Interface",
          description:
            "Create a complex dashboard with proper ARIA roles, keyboard navigation, and screen reader support using advanced semantic elements",
        },
        {
          title: "Progressive Web App Shell",
          description:
            "Build a PWA structure with service workers, web manifest, offline support, and installable features",
        },
        {
          title: "Interactive Form Wizard",
          description:
            "Develop a multi-step form with custom validation, progress indicator, and accessibility features using HTML5 APIs",
        },
      ],
      assignments: [
        {
          title: "WCAG Compliance Audit",
          description:
            "Perform a comprehensive WCAG 2.1 AA compliance audit on a website and document accessibility improvements with before/after comparisons",
        },
        {
          title: "HTML5 API Integration",
          description:
            "Build a demo application integrating Geolocation API, Web Storage, and File API with proper error handling",
        },
      ],
      capstone: {
        title: "Enterprise-Grade Accessible Web Application",
        description:
          "Develop a production-ready web application with complete WCAG 2.1 AAA compliance, PWA features, offline functionality, custom validation patterns, semantic microdata, and performance optimization. Include documentation and accessibility testing reports.",
        techStack: "HTML5, ARIA, Service Workers, Web Manifest, Schema.org",
      },
    },
    "CSS Essentials": {
      techStack: "CSS3, Flexbox, Responsive Design",
      projects: [
        {
          title: "Responsive Navigation Menu",
          description:
            "Create a mobile-friendly navigation with hamburger menu, dropdown items, and smooth transitions using CSS",
        },
        {
          title: "Product Card Grid Layout",
          description:
            "Design an e-commerce product grid with cards, hover effects, and responsive layout using Flexbox",
        },
        {
          title: "Landing Page with Hero Section",
          description:
            "Build a modern landing page with full-screen hero, gradient backgrounds, typography styling, and CTA buttons",
        },
      ],
      assignments: [
        {
          title: "CSS Selectors Challenge",
          description:
            "Complete a series of selector exercises targeting specific elements without modifying HTML, demonstrating mastery of complex selectors",
        },
        {
          title: "Responsive Image Gallery",
          description:
            "Create a photo gallery that adapts to different screen sizes using media queries and responsive images",
        },
      ],
      capstone: {
        title: "Production-Ready E-commerce Product Page",
        description:
          "Build a fully responsive e-commerce product page with image carousel, size selector, color variants, product reviews section, related products grid, and mobile-optimized layout. Use modern CSS techniques including custom properties, Flexbox, and mobile-first approach.",
        techStack:
          "CSS3, Flexbox, Media Queries, CSS Variables, Mobile-First Design",
      },
    },
    "Advanced CSS": {
      techStack: "CSS Grid, CSS Animations, Modern CSS",
      projects: [
        {
          title: "Magazine-Style Layout",
          description:
            "Create a complex magazine layout using CSS Grid with asymmetric columns, overlapping elements, and responsive breakpoints",
        },
        {
          title: "Animated Landing Page",
          description:
            "Build an engaging landing page with keyframe animations, transitions, transforms, and scroll-triggered effects",
        },
        {
          title: "Dark Mode Toggle System",
          description:
            "Implement a complete dark/light theme system using CSS variables, localStorage, and smooth transitions",
        },
      ],
      assignments: [
        {
          title: "CSS Grid Mastery Challenge",
          description:
            "Recreate 5 complex layouts from popular websites using only CSS Grid, demonstrating advanced grid techniques",
        },
        {
          title: "Animation Performance Optimization",
          description:
            "Create a performance report comparing different animation techniques and optimize animations for 60fps",
        },
      ],
      capstone: {
        title: "Production-Ready SaaS Dashboard",
        description:
          "Develop a complete SaaS dashboard with complex Grid layouts, data visualization cards, animated charts, dark/light theme switching, responsive sidebar navigation, and advanced CSS architecture. Implement BEM methodology, CSS variables for theming, and ensure cross-browser compatibility.",
        techStack:
          "CSS Grid, CSS Animations, CSS Variables, BEM, Responsive Design, Modern CSS Features",
      },
    },
    "JavaScript Basics": {
      techStack: "JavaScript ES6+, DOM API",
      projects: [
        {
          title: "Interactive Todo List",
          description:
            "Build a todo app with add, delete, edit, and filter functionality using vanilla JavaScript and DOM manipulation",
        },
        {
          title: "Calculator Application",
          description:
            "Create a functional calculator with basic operations, clear functionality, and keyboard support",
        },
        {
          title: "Dynamic Quiz App",
          description:
            "Develop a quiz application with multiple-choice questions, score tracking, and result display",
        },
      ],
      assignments: [
        {
          title: "Array Methods Practice",
          description:
            "Solve 20+ JavaScript challenges focusing on map, filter, reduce, and other array methods with real-world scenarios",
        },
        {
          title: "DOM Manipulation Challenge",
          description:
            "Build a dynamic webpage where all content is generated through JavaScript DOM manipulation without any static HTML",
        },
      ],
      capstone: {
        title: "Production-Ready Task Management Application",
        description:
          "Create a comprehensive task management app with local storage persistence, categories, priorities, due dates, search and filter functionality, drag-and-drop reordering, data export/import, and responsive design. Implement clean code architecture with separate modules for data management and UI.",
        techStack:
          "JavaScript ES6+, DOM API, Local Storage, Event Handling, Modular Architecture",
      },
    },
    "Advanced JavaScript": {
      techStack: "JavaScript ES6+, Async/Await, APIs",
      projects: [
        {
          title: "Weather App with API Integration",
          description:
            "Build a weather application fetching real-time data from OpenWeatherMap API with async/await and error handling",
        },
        {
          title: "Movie Search Application",
          description:
            "Create a movie search app using TMDb API with debouncing, caching, and advanced error handling patterns",
        },
        {
          title: "Image Gallery with Lazy Loading",
          description:
            "Develop an infinite scroll image gallery using Intersection Observer API and async data fetching",
        },
      ],
      assignments: [
        {
          title: "Async Programming Challenges",
          description:
            "Complete 15+ async challenges involving Promises, async/await, parallel requests, and error handling scenarios",
        },
        {
          title: "Design Patterns Implementation",
          description:
            "Implement 5 JavaScript design patterns (Singleton, Factory, Observer, Module, Revealing Module) with real use cases",
        },
      ],
      capstone: {
        title: "Production-Ready Social Media Dashboard",
        description:
          "Build a complete social media dashboard that aggregates data from multiple APIs (Twitter, GitHub, Weather). Features include real-time updates, data caching with IndexedDB, advanced error handling, retry logic, rate limiting, authentication flow, and performance optimization. Use async/await, Promises, and modern ES6+ features throughout.",
        techStack:
          "JavaScript ES6+, Async/Await, REST APIs, IndexedDB, Error Handling, Performance Optimization",
      },
    },
    "Node.js Fundamentals": {
      techStack: "Node.js, Express.js, MongoDB",
      projects: [
        {
          title: "RESTful Blog API",
          description:
            "Create a complete REST API for a blog with CRUD operations, routing, middleware, and MongoDB integration",
        },
        {
          title: "File Upload Service",
          description:
            "Build a file upload service with validation, storage management, and Express middleware",
        },
        {
          title: "Authentication System",
          description:
            "Develop a user authentication system with JWT tokens, password hashing, and protected routes",
        },
      ],
      assignments: [
        {
          title: "Express Middleware Chain",
          description:
            "Create a series of custom Express middleware for logging, authentication, validation, and error handling",
        },
        {
          title: "MongoDB CRUD Operations",
          description:
            "Build a Node.js script demonstrating all MongoDB CRUD operations with proper error handling and connection management",
        },
      ],
      capstone: {
        title: "Production-Ready E-commerce Backend API",
        description:
          "Develop a complete e-commerce backend with user authentication, product management, shopping cart, order processing, payment gateway integration (Stripe), email notifications, image uploads, search and filtering, pagination, rate limiting, and comprehensive API documentation. Deploy to AWS or Heroku with MongoDB Atlas.",
        techStack:
          "Node.js, Express.js, MongoDB, JWT, Stripe API, Multer, Nodemailer, AWS/Heroku",
      },
    },
    "Advanced Node.js": {
      techStack: "Node.js, Express.js, MongoDB, Redis, Socket.io",
      projects: [
        {
          title: "Real-time Chat Application",
          description:
            "Build a real-time chat app with Socket.io, multiple rooms, user presence, and message history persistence",
        },
        {
          title: "Microservices Architecture",
          description:
            "Create a microservices-based application with separate services for users, products, and orders communicating via REST",
        },
        {
          title: "Advanced API with Caching",
          description:
            "Develop an API with Redis caching, rate limiting, API versioning, and comprehensive testing",
        },
      ],
      assignments: [
        {
          title: "WebSocket Implementation",
          description:
            "Build a real-time notification system using WebSockets with reconnection logic and message queuing",
        },
        {
          title: "Performance Optimization Challenge",
          description:
            "Optimize a poorly performing Node.js application by implementing caching, clustering, and profiling techniques",
        },
      ],
      capstone: {
        title: "Production-Ready Social Network Backend",
        description:
          "Build a scalable social network backend with user profiles, friend connections, posts, comments, likes, real-time notifications (Socket.io), image/video uploads, newsfeed algorithm, search functionality, Redis caching, JWT authentication, role-based access control, comprehensive testing (Jest), API documentation (Swagger), and deployment with Docker and CI/CD pipeline.",
        techStack:
          "Node.js, Express.js, MongoDB, Redis, Socket.io, AWS S3, JWT, Docker, Jest, Swagger",
      },
    },
    "React Fundamentals": {
      techStack: "React, React Hooks, CSS Modules",
      projects: [
        {
          title: "Recipe Finder App",
          description:
            "Build a recipe search application with API integration, component composition, state management, and conditional rendering",
        },
        {
          title: "Expense Tracker",
          description:
            "Create an expense tracking app with forms, list rendering, filtering, and local storage integration",
        },
        {
          title: "GitHub User Search",
          description:
            "Develop a GitHub user search tool displaying user profiles, repositories, and statistics using React hooks",
        },
      ],
      assignments: [
        {
          title: "Component Library Creation",
          description:
            "Build a reusable component library with Button, Input, Card, and Modal components demonstrating props and composition",
        },
        {
          title: "Custom Hooks Development",
          description:
            "Create 5 custom hooks (useFetch, useLocalStorage, useDebounce, useToggle, useWindowSize) with proper documentation",
        },
      ],
      capstone: {
        title: "Production-Ready Task Management SaaS",
        description:
          "Build a complete task management application with user authentication, project workspaces, task boards (Kanban-style), drag-and-drop functionality, team collaboration, real-time updates, filters and search, data visualization dashboard, responsive design, dark mode, and REST API integration. Implement proper error boundaries and loading states.",
        techStack:
          "React, React Hooks, Context API, React Router, Axios, CSS Modules, Local Storage",
      },
    },
    "Advanced React": {
      techStack: "React, Redux Toolkit, React Router, Testing Library",
      projects: [
        {
          title: "E-commerce Store with Redux",
          description:
            "Build a complete e-commerce store with Redux state management, shopping cart, product filtering, and checkout flow",
        },
        {
          title: "Real-time Dashboard",
          description:
            "Create a real-time analytics dashboard with React Query, data visualization, WebSocket integration, and performance optimization",
        },
        {
          title: "Blog Platform with CMS",
          description:
            "Develop a blog platform with rich text editor, image uploads, authentication, and admin dashboard",
        },
      ],
      assignments: [
        {
          title: "React Performance Optimization",
          description:
            "Optimize a slow React application using memo, useMemo, useCallback, code splitting, and lazy loading techniques",
        },
        {
          title: "Testing React Components",
          description:
            "Write comprehensive tests for a React application covering components, hooks, and integration scenarios",
        },
      ],
      capstone: {
        title: "Production-Ready Video Streaming Platform",
        description:
          "Develop a complete Netflix-like video streaming platform with user authentication, video catalog, search and filtering, watchlist, video player with controls, user ratings and reviews, recommendation algorithm, responsive design, Redux state management, protected routes, comprehensive testing, and optimized performance. Integrate with video CDN and implement lazy loading.",
        techStack:
          "React, Redux Toolkit, React Router, React Testing Library, Axios, Video.js, Material-UI",
      },
    },
    "MongoDB Basics": {
      techStack: "MongoDB, MongoDB Compass, Node.js Driver",
      projects: [
        {
          title: "Library Management System",
          description:
            "Build a library database with books, authors, members collections, implementing CRUD operations and relationships",
        },
        {
          title: "Student Records Database",
          description:
            "Create a student records system with courses, enrollments, and grades using MongoDB with proper data modeling",
        },
        {
          title: "Inventory Management",
          description:
            "Develop an inventory tracking system with products, categories, suppliers, and stock management",
        },
      ],
      assignments: [
        {
          title: "MongoDB Query Challenges",
          description:
            "Solve 30+ MongoDB query challenges covering operators, aggregations, and complex query patterns",
        },
        {
          title: "Data Modeling Exercise",
          description:
            "Design MongoDB schemas for 5 different application types with justification for embedded vs referenced approaches",
        },
      ],
      capstone: {
        title: "Production-Ready Content Management System Database",
        description:
          "Design and implement a complete CMS database with users, roles, articles, categories, tags, comments, media assets, and audit logs. Include indexes for performance, aggregation pipelines for analytics, data validation rules, backup strategies, and comprehensive documentation. Build Node.js API to interact with the database.",
        techStack:
          "MongoDB, MongoDB Atlas, Node.js, Aggregation Framework, Indexing Strategies",
      },
    },
    "Advanced MongoDB": {
      techStack: "MongoDB, Aggregation Framework, Replication, Sharding",
      projects: [
        {
          title: "Analytics Dashboard Backend",
          description:
            "Build a complex analytics system with advanced aggregation pipelines, real-time data processing, and performance optimization",
        },
        {
          title: "Multi-tenant SaaS Database",
          description:
            "Design a multi-tenant database architecture with data isolation, sharding strategy, and tenant-specific indexes",
        },
        {
          title: "High-Performance API",
          description:
            "Create an API with optimized MongoDB queries, connection pooling, caching strategies, and monitoring",
        },
      ],
      assignments: [
        {
          title: "Aggregation Pipeline Mastery",
          description:
            "Build 10 complex aggregation pipelines for real-world scenarios including lookups, facets, and text search",
        },
        {
          title: "Database Performance Tuning",
          description:
            "Optimize a slow MongoDB database by analyzing explain plans, adding indexes, and improving query patterns",
        },
      ],
      capstone: {
        title: "Production-Ready E-commerce Platform Database",
        description:
          "Design and implement a scalable e-commerce database with products, users, orders, inventory, reviews, and real-time analytics. Implement replica sets for high availability, sharding for horizontal scaling, complex aggregations for reporting, full-text search, geospatial queries for store locator, transactions for order processing, and comprehensive monitoring. Deploy on MongoDB Atlas with security best practices.",
        techStack:
          "MongoDB Atlas, Replica Sets, Sharding, Aggregation Framework, Full-Text Search, Transactions",
      },
    },
    "TypeScript Fundamentals": {
      techStack: "TypeScript, Node.js, Express",
      projects: [
        {
          title: "Type-Safe Todo API",
          description:
            "Build a REST API with TypeScript, Express, and proper type definitions for requests, responses, and models",
        },
        {
          title: "Command-Line Task Manager",
          description:
            "Create a CLI tool using TypeScript with command parsing, file I/O, and type-safe data structures",
        },
        {
          title: "Form Validation Library",
          description:
            "Develop a reusable form validation library with TypeScript generics and type inference",
        },
      ],
      assignments: [
        {
          title: "TypeScript Type Challenges",
          description:
            "Complete 25+ TypeScript type challenges covering basic types, generics, utility types, and type inference",
        },
        {
          title: "JavaScript to TypeScript Migration",
          description:
            "Migrate an existing JavaScript project to TypeScript with proper type annotations and strict mode enabled",
        },
      ],
      capstone: {
        title: "Production-Ready Type-Safe CRM System",
        description:
          "Build a complete CRM system with TypeScript throughout the stack - Express backend with type-safe API routes, MongoDB with TypeScript schemas (using Mongoose), JWT authentication with typed payloads, comprehensive error handling, input validation with Zod, API documentation with type generation, and thorough testing. Implement strict TypeScript configuration and zero any types.",
        techStack:
          "TypeScript, Node.js, Express, MongoDB, Mongoose, Zod, JWT, Jest",
      },
    },
    "Advanced TypeScript": {
      techStack: "TypeScript, React, Node.js, Advanced Types",
      projects: [
        {
          title: "Type-Safe State Management",
          description:
            "Build a Redux-like state management library with full TypeScript support, type inference, and developer tools",
        },
        {
          title: "GraphQL API with TypeScript",
          description:
            "Create a type-safe GraphQL API with code generation, resolvers, and schema validation",
        },
        {
          title: "React Component Library",
          description:
            "Develop a fully typed React component library with generics, discriminated unions, and comprehensive type exports",
        },
      ],
      assignments: [
        {
          title: "Advanced Type Patterns",
          description:
            "Implement 10 advanced TypeScript patterns including mapped types, conditional types, and template literal types",
        },
        {
          title: "Type-Safe API Client",
          description:
            "Build a type-safe HTTP client with automatic type inference for API responses and request validation",
        },
      ],
      capstone: {
        title: "Production-Ready Full-Stack TypeScript Application",
        description:
          "Develop a complete project management platform with TypeScript on both frontend (React) and backend (Node.js). Features include type-safe API communication, shared types package, advanced generics for data structures, discriminated unions for state management, template literal types for routes, decorators for validation, comprehensive testing with type coverage, and automated CI/CD with type checking. Zero runtime type errors.",
        techStack:
          "TypeScript, React, Node.js, Express, MongoDB, GraphQL, Jest, Webpack",
      },
    },
    "PostgreSQL Fundamentals": {
      techStack: "PostgreSQL, pgAdmin, SQL",
      projects: [
        {
          title: "School Management Database",
          description:
            "Design and implement a school database with students, teachers, courses, enrollments, and grade tracking",
        },
        {
          title: "Hospital Management System",
          description:
            "Create a hospital database with patients, doctors, appointments, medical records, and billing",
        },
        {
          title: "E-learning Platform Database",
          description:
            "Build a database for an e-learning platform with users, courses, lessons, quizzes, and progress tracking",
        },
      ],
      assignments: [
        {
          title: "SQL Query Challenges",
          description:
            "Complete 40+ SQL query challenges covering joins, subqueries, aggregations, and window functions",
        },
        {
          title: "Database Normalization Exercise",
          description:
            "Normalize 5 denormalized database schemas to 3NF with explanation of each normalization step",
        },
      ],
      capstone: {
        title: "Production-Ready Banking System Database",
        description:
          "Design and implement a complete banking system database with accounts, transactions, customers, loans, and cards. Include complex queries for balance calculations, transaction history, fraud detection, interest calculations, and reporting. Implement triggers for audit trails, stored procedures for business logic, views for security, indexes for performance, and proper constraints. Include backup and recovery procedures.",
        techStack:
          "PostgreSQL, PL/pgSQL, Triggers, Stored Procedures, Views, Indexing, Transactions",
      },
    },
    "Advanced PostgreSQL": {
      techStack: "PostgreSQL, PL/pgSQL, Replication, Performance Tuning",
      projects: [
        {
          title: "Real-time Analytics System",
          description:
            "Build an analytics system with materialized views, complex CTEs, window functions, and query optimization",
        },
        {
          title: "Full-Text Search Engine",
          description:
            "Implement a full-text search system with tsvector, ranking, highlighting, and search analytics",
        },
        {
          title: "Time-Series Data Platform",
          description:
            "Create a time-series database with partitioning, efficient queries, and data retention policies",
        },
      ],
      assignments: [
        {
          title: "Query Optimization Challenge",
          description:
            "Optimize 10 slow queries using EXPLAIN ANALYZE, indexing strategies, and query rewriting",
        },
        {
          title: "Advanced PL/pgSQL Functions",
          description:
            "Write complex stored procedures for business logic including triggers, error handling, and transactions",
        },
      ],
      capstone: {
        title: "Production-Ready Multi-Tenant SaaS Database",
        description:
          "Design and implement a scalable multi-tenant SaaS database with tenant isolation, row-level security, partitioning strategy for massive data, read replicas, connection pooling (PgBouncer), full-text search, JSONB for flexible data, stored procedures for business logic, comprehensive monitoring, automated backups, and disaster recovery plan. Optimize for millions of records with sub-second query times.",
        techStack:
          "PostgreSQL, PL/pgSQL, Partitioning, Replication, PgBouncer, Full-Text Search, JSONB",
      },
    },
    "Next.js Fundamentals": {
      techStack: "Next.js, React, Tailwind CSS",
      projects: [
        {
          title: "Blog with Static Generation",
          description:
            "Build a blog platform using Next.js with SSG, markdown support, dynamic routes, and API routes",
        },
        {
          title: "Company Website with CMS",
          description:
            "Create a company website with headless CMS integration, image optimization, and SEO features",
        },
        {
          title: "Documentation Site",
          description:
            "Develop a documentation website with nested routes, search functionality, and dark mode",
        },
      ],
      assignments: [
        {
          title: "Data Fetching Patterns",
          description:
            "Implement all Next.js data fetching methods (SSG, SSR, ISR, CSR) and document when to use each",
        },
        {
          title: "API Routes Implementation",
          description:
            "Build a complete backend using Next.js API routes with database integration and authentication",
        },
      ],
      capstone: {
        title: "Production-Ready E-commerce Store",
        description:
          "Build a complete e-commerce store with Next.js featuring product catalog (SSG), dynamic product pages (ISR), shopping cart (CSR), checkout flow, payment integration (Stripe), order management, user authentication (NextAuth.js), admin dashboard, SEO optimization, image optimization, performance optimization (Core Web Vitals), and deployment to Vercel. Achieve 90+ Lighthouse scores.",
        techStack:
          "Next.js, React, Tailwind CSS, NextAuth.js, Stripe, MongoDB, Vercel",
      },
    },
    "Advanced Next.js": {
      techStack: "Next.js 13+, App Router, Server Components, TypeScript",
      projects: [
        {
          title: "Multi-language Blog Platform",
          description:
            "Build an internationalized blog with App Router, server components, and dynamic routing",
        },
        {
          title: "Real-time Dashboard",
          description:
            "Create a dashboard with streaming SSR, parallel data fetching, and Edge runtime API routes",
        },
        {
          title: "SaaS Application",
          description:
            "Develop a SaaS app with authentication, subscription management, and usage analytics using App Router",
        },
      ],
      assignments: [
        {
          title: "App Router Migration",
          description:
            "Migrate a Pages Router application to App Router, documenting all changes and performance improvements",
        },
        {
          title: "Edge Functions Implementation",
          description:
            "Build serverless functions using Edge Runtime for geolocation-based content and A/B testing",
        },
      ],
      capstone: {
        title: "Production-Ready Project Management Platform",
        description:
          "Build a complete project management SaaS with Next.js 13+ App Router, React Server Components for performance, TypeScript throughout, real-time collaboration features, team workspaces, task boards, file uploads (AWS S3), advanced filtering and search, user roles and permissions, subscription billing (Stripe), email notifications, responsive design, dark mode, comprehensive testing, and deployment with CI/CD. Optimize for LCP, FID, and CLS.",
        techStack:
          "Next.js 13+, TypeScript, Prisma, PostgreSQL, NextAuth.js, Stripe, AWS S3, Tailwind CSS, Vercel",
      },
    },
    "React Native Basics": {
      techStack: "React Native, Expo, React Navigation",
      projects: [
        {
          title: "Weather Mobile App",
          description:
            "Build a weather app with location services, API integration, and responsive layouts for iOS and Android",
        },
        {
          title: "Notes Taking App",
          description:
            "Create a notes app with local storage, categories, search functionality, and platform-specific styling",
        },
        {
          title: "Recipe App with Navigation",
          description:
            "Develop a recipe app with tab and stack navigation, image display, and ingredient lists",
        },
      ],
      assignments: [
        {
          title: "React Native Components Showcase",
          description:
            "Build an app demonstrating all core React Native components with examples and usage documentation",
        },
        {
          title: "Platform-Specific Features",
          description:
            "Implement platform-specific code for iOS and Android features like notifications and permissions",
        },
      ],
      capstone: {
        title: "Production-Ready Fitness Tracking App",
        description:
          "Build a complete fitness tracking mobile app with user authentication, workout tracking, exercise database, progress charts, calorie tracking, goal setting, reminder notifications, camera integration for progress photos, social features, offline support with AsyncStorage, responsive design for tablets, and deployment to both iOS App Store and Google Play Store.",
        techStack:
          "React Native, Expo, React Navigation, AsyncStorage, Firebase Auth, Chart.js, Camera API",
      },
    },
    "Advanced React Native": {
      techStack: "React Native, Redux, Native Modules, Animations",
      projects: [
        {
          title: "Social Media App",
          description:
            "Build a social media app with Redux, real-time updates, image uploads, animations, and native modules",
        },
        {
          title: "E-commerce Mobile App",
          description:
            "Create an e-commerce app with complex navigation, payment integration, push notifications, and performance optimization",
        },
        {
          title: "Messaging App with WebSocket",
          description:
            "Develop a real-time messaging app with Socket.io, message encryption, media sharing, and offline support",
        },
      ],
      assignments: [
        {
          title: "Native Module Development",
          description:
            "Create custom native modules for iOS and Android to access platform-specific features",
        },
        {
          title: "Animation Performance Optimization",
          description:
            "Build complex animations using Reanimated 2 with gesture handling and optimize for 60fps",
        },
      ],
      capstone: {
        title: "Production-Ready Ride-Sharing Application",
        description:
          "Build a complete ride-sharing app (like Uber) with driver and rider interfaces, real-time GPS tracking, map integration (Google Maps), ride matching algorithm, payment processing (Stripe), push notifications, ride history, ratings and reviews, Redux state management, WebSocket for real-time updates, background location tracking, deep linking, comprehensive testing, and deployment to app stores with CI/CD pipeline.",
        techStack:
          "React Native, Redux, Google Maps API, Socket.io, Firebase, Stripe, Reanimated, Native Modules",
      },
    },
    "Dart Fundamentals": {
      techStack: "Dart, Object-Oriented Programming",
      projects: [
        {
          title: "Banking System Simulator",
          description:
            "Build a console-based banking system with accounts, transactions, and OOP principles in Dart",
        },
        {
          title: "Library Management CLI",
          description:
            "Create a command-line library management system with books, members, and borrowing logic",
        },
        {
          title: "Student Grade Calculator",
          description:
            "Develop a grade calculation system with classes, inheritance, and data persistence",
        },
      ],
      assignments: [
        {
          title: "Dart OOP Challenges",
          description:
            "Complete 20+ object-oriented programming challenges covering classes, inheritance, mixins, and generics",
        },
        {
          title: "Async Programming Exercise",
          description:
            "Build applications using Futures, Streams, and async/await with proper error handling",
        },
      ],
      capstone: {
        title: "Production-Ready Task Management CLI Tool",
        description:
          "Build a comprehensive command-line task management tool with user authentication, task CRUD operations, categories, priorities, due dates, recurring tasks, search and filtering, data export/import (JSON), file-based persistence, colorful CLI interface, unit testing, and documentation. Implement clean architecture with separation of concerns.",
        techStack:
          "Dart, Object-Oriented Programming, File I/O, JSON Serialization, Unit Testing",
      },
    },
    "Advanced Dart": {
      techStack: "Dart, Async Programming, Isolates, Architecture",
      projects: [
        {
          title: "Concurrent Data Processor",
          description:
            "Build a multi-threaded data processing system using Dart isolates for parallel computation and efficient data handling",
        },
        {
          title: "Real-time Event System",
          description:
            "Create a real-time event handling system with Streams, StreamControllers, and broadcast streams for event-driven architecture",
        },
        {
          title: "REST API Client Library",
          description:
            "Develop a reusable HTTP client library with error handling, interceptors, caching, and retry logic",
        },
      ],
      assignments: [
        {
          title: "Stream Transformation Challenges",
          description:
            "Complete 15+ stream challenges covering stream transformations, error handling, and complex async patterns",
        },
        {
          title: "Architecture Pattern Implementation",
          description:
            "Implement clean architecture with dependency injection, repository pattern, and use cases in a Dart application",
        },
      ],
      capstone: {
        title: "Production-Ready Backend API Service",
        description:
          "Build a complete REST API backend service in Dart using Shelf framework with user authentication, database integration (PostgreSQL), middleware chain, request validation, comprehensive error handling, API documentation, unit and integration tests, Docker containerization, and CI/CD pipeline. Implement clean architecture with proper separation of concerns.",
        techStack:
          "Dart, Shelf Framework, PostgreSQL, JWT, Docker, Clean Architecture, Unit Testing",
      },
    },
    "Flutter Fundamentals": {
      techStack: "Flutter, Dart, Material Design",
      projects: [
        {
          title: "Weather Forecast App",
          description:
            "Build a weather application with API integration, location services, animated UI, and state management",
        },
        {
          title: "E-commerce Product Catalog",
          description:
            "Create a product browsing app with categories, search, filters, shopping cart, and detailed product views",
        },
        {
          title: "Social Media Feed",
          description:
            "Develop a scrollable feed app with posts, likes, comments, image loading, and pull-to-refresh",
        },
      ],
      assignments: [
        {
          title: "Widget Composition Challenge",
          description:
            "Build 10 complex UI layouts using Flutter widgets demonstrating composition, layouts, and responsiveness",
        },
        {
          title: "State Management Implementation",
          description:
            "Implement the same feature using Provider, Riverpod, and setState, comparing each approach",
        },
      ],
      capstone: {
        title: "Production-Ready Fitness Tracking App",
        description:
          "Build a comprehensive fitness app with user authentication (Firebase), workout plans, exercise tracking, progress charts, meal planning, calorie counter, push notifications, photo uploads, social features, offline support, animations, and responsive design for tablets. Deploy to both iOS App Store and Google Play Store with proper app icons, splash screens, and store listings.",
        techStack:
          "Flutter, Dart, Firebase Auth, Firestore, Cloud Storage, Provider, Charts, Push Notifications",
      },
    },
    "Advanced Flutter": {
      techStack: "Flutter, BLoC/Riverpod, Animations, Platform Channels",
      projects: [
        {
          title: "Custom Animation Library",
          description:
            "Create a reusable animation library with complex custom animations, physics-based animations, and gesture-based interactions",
        },
        {
          title: "Native Platform Integration",
          description:
            "Build an app accessing native features through platform channels (camera, sensors, Bluetooth) for both iOS and Android",
        },
        {
          title: "Real-time Chat Application",
          description:
            "Develop a chat app with WebSocket, typing indicators, read receipts, media sharing, and state management using BLoC",
        },
      ],
      assignments: [
        {
          title: "BLoC Pattern Mastery",
          description:
            "Implement complex state management scenarios using BLoC pattern with proper event handling and state transitions",
        },
        {
          title: "Performance Optimization Challenge",
          description:
            "Optimize a slow Flutter app by analyzing performance, reducing rebuilds, and implementing efficient rendering techniques",
        },
      ],
      capstone: {
        title: "Production-Ready E-commerce Marketplace",
        description:
          "Build a complete marketplace app with vendor management, product listings, advanced search with filters, shopping cart, payment integration (Stripe), order tracking, push notifications, in-app messaging, user reviews, wishlist, BLoC state management, custom animations, image optimization, offline caching, biometric authentication, deep linking, analytics, and comprehensive testing. Deploy to both app stores with CI/CD pipeline.",
        techStack:
          "Flutter, BLoC, Firebase, Stripe, WebSocket, Platform Channels, Hive, CI/CD, Analytics",
      },
    },
    "Python Fundamentals": {
      techStack: "Python 3, Standard Library",
      projects: [
        {
          title: "File Organizer Script",
          description:
            "Build a Python script that automatically organizes files by type, date, and custom rules with logging",
        },
        {
          title: "Budget Tracker CLI",
          description:
            "Create a command-line budget tracking application with expense categories, reports, and data visualization",
        },
        {
          title: "Web Scraper",
          description:
            "Develop a web scraping tool using BeautifulSoup to extract data from websites and save to CSV/JSON",
        },
      ],
      assignments: [
        {
          title: "Python Fundamentals Challenge",
          description:
            "Complete 30+ Python challenges covering data structures, functions, file handling, and object-oriented concepts",
        },
        {
          title: "Module Creation Exercise",
          description:
            "Create a reusable Python module/package with proper documentation, tests, and setup.py for distribution",
        },
      ],
      capstone: {
        title: "Production-Ready Inventory Management System",
        description:
          "Build a complete inventory management system with SQLite database, user authentication, product management, stock tracking, low-stock alerts, sales reporting, data import/export (CSV/Excel), barcode integration, GUI using Tkinter or PyQt, comprehensive error handling, logging, configuration management, and unit tests. Package as executable for distribution.",
        techStack:
          "Python 3, SQLite, Tkinter/PyQt, Pandas, Matplotlib, Unit Testing, Logging",
      },
    },
    "Advanced Python": {
      techStack: "Python, Flask/FastAPI, Pandas, APIs",
      projects: [
        {
          title: "RESTful API with FastAPI",
          description:
            "Build a complete REST API with FastAPI, database integration, authentication, validation, and auto-generated documentation",
        },
        {
          title: "Data Analysis Dashboard",
          description:
            "Create a data analysis tool with Pandas, data cleaning, statistical analysis, and visualizations using Plotly",
        },
        {
          title: "Automation Bot",
          description:
            "Develop an automation bot for web scraping, email automation, report generation, and scheduled tasks",
        },
      ],
      assignments: [
        {
          title: "API Development Challenge",
          description:
            "Build and document a complete API with endpoints, authentication, rate limiting, and comprehensive testing",
        },
        {
          title: "Data Processing Pipeline",
          description:
            "Create a data processing pipeline with ETL operations, data validation, transformation, and storage using Pandas",
        },
      ],
      capstone: {
        title: "Production-Ready Data Analytics Platform",
        description:
          "Build a complete data analytics SaaS platform with FastAPI backend, user authentication and authorization, data upload/import, ETL pipeline, data cleaning and transformation, statistical analysis, machine learning predictions, interactive dashboards with Plotly/Dash, scheduled reports, API for programmatic access, PostgreSQL database, Redis caching, Celery for background tasks, Docker deployment, comprehensive logging, monitoring, and CI/CD pipeline.",
        techStack:
          "Python, FastAPI, Pandas, PostgreSQL, Redis, Celery, Plotly, Dash, Docker, Scikit-learn",
      },
    },
  };

  const chapterData =
    courseChapters[courseId] || courseChapters["JavaScript Basics"];
  const projectData =
    courseProjects[courseId] || courseProjects["JavaScript Basics"];

  // Determine topic key for video IDs
  let topicKey = "JavaScript";
  if (courseId.includes("HTML")) topicKey = "HTML";
  else if (courseId.includes("CSS")) topicKey = "CSS";
  else if (courseId.includes("JavaScript")) topicKey = "JavaScript";
  else if (courseId.includes("Node")) topicKey = "Node";
  else if (courseId.includes("React Native")) topicKey = "ReactNative";
  else if (courseId.includes("React")) topicKey = "React";
  else if (courseId.includes("MongoDB")) topicKey = "MongoDB";
  else if (courseId.includes("TypeScript")) topicKey = "TypeScript";
  else if (courseId.includes("PostgreSQL")) topicKey = "PostgreSQL";
  else if (courseId.includes("Next")) topicKey = "Next";
  else if (courseId.includes("Dart")) topicKey = "Dart";
  else if (courseId.includes("Flutter")) topicKey = "Flutter";
  else if (courseId.includes("Python")) topicKey = "Python";

  // Convert chapters to course content with video IDs
  const chapters = chapterData.map((chapter, index) => {
    const lectures = chapter.topics.map((topic, lectureIndex) => ({
      lectureTitle: topic,
      lectureDuration: 10 + Math.floor(Math.random() * 20), // 10-30 minutes
      videoId: getVideoIdForLecture(topicKey, index, lectureIndex),
      isPreviewFree: lectureIndex === 0, // First lecture of each chapter is free
    }));

    return {
      chapterTitle: `Chapter ${index + 1}: ${chapter.title}`,
      chapterContent: lectures,
    };
  });

  // Add Hands-on Projects chapter
  const projectsChapter = {
    chapterTitle: `Chapter ${chapters.length + 1}: Hands-on Projects (${projectData.techStack})`,
    chapterContent: projectData.projects.map((project, index) => ({
      lectureTitle: `Project ${index + 1}: ${project.title}`,
      lectureDuration: 45 + Math.floor(Math.random() * 45), // 45-90 minutes
      videoId: getVideoIdForProject(topicKey, index),
    })),
  };

  // Add Assignments chapter
  const assignmentsChapter = {
    chapterTitle: `Chapter ${chapters.length + 2}: Course Assignments`,
    chapterContent: projectData.assignments.map((assignment, index) => ({
      lectureTitle: `Assignment ${index + 1}: ${assignment.title}`,
      lectureDuration: 30 + Math.floor(Math.random() * 30), // 30-60 minutes
      videoId: getVideoIdForProject(topicKey, index + 3), // Use project videos for assignments
    })),
  };

  // Add Capstone Project chapter
  const capstoneChapter = {
    chapterTitle: `Chapter ${chapters.length + 3}: Capstone Project - ${projectData.capstone.title}`,
    chapterContent: [
      {
        lectureTitle: "Project Overview and Requirements",
        lectureDuration: 20,
        videoId: getVideoIdForProject(topicKey, 0),
      },
      {
        lectureTitle: "Architecture and Planning",
        lectureDuration: 30,
        videoId: getVideoIdForProject(topicKey, 1),
      },
      {
        lectureTitle: "Setting Up Development Environment",
        lectureDuration: 25,
        videoId: getVideoIdForProject(topicKey, 2),
      },
      {
        lectureTitle: "Building Core Features",
        lectureDuration: 120,
        videoId: getVideoIdForProject(topicKey, 3),
      },
      {
        lectureTitle: "Testing and Debugging",
        lectureDuration: 45,
        videoId: getVideoIdForProject(topicKey, 4),
      },
      {
        lectureTitle: "Deployment and Production Setup",
        lectureDuration: 40,
        videoId: getVideoIdForProject(topicKey, 0),
      },
      {
        lectureTitle: "Final Review and Best Practices",
        lectureDuration: 30,
        videoId: getVideoIdForProject(topicKey, 1),
      },
    ],
  };

  return [...chapters, projectsChapter, assignmentsChapter, capstoneChapter];
};

export const courses = [
  {
    _id: "605c72efb3f1c2b1f8e4e1a1",
    courseThumbnail: course_1_thumbnail,
    courseTitle: "HTML Fundamentals: Build the Web from Scratch",
    courseDescription:
      "HTML is the foundation of the web, and this course is designed to give you a strong, practical understanding of how websites are built from the ground up. You will begin by learning what HTML is, how browsers interpret HTML documents, and how web pages are structured internally. Instead of treating HTML as a list of tags to memorize, this course focuses on understanding the purpose and role of each element in real-world development You will learn essential concepts such as headings, paragraphs, links, images, lists, tables, and forms, along with proper document structure. Special emphasis is placed on semantic HTML, which is crucial for accessibility, search engine optimization, and maintainable code. You will also learn how correct HTML structure improves collaboration with CSS and JavaScript later in the stack. By the end of this course, you will be able to build clean, readable, and accessible web pages from scratch. This course serves as the perfect starting point for anyone who wants to move confidently into CSS, JavaScript, and modern frontend frameworks while understanding what is truly happening under the hood",
    educator: "Amit Verma",
    coursePrice: 9.99,
    discount: 0,
    courseRatings: generateRatings(128),
    courseContent: generateCourseContent("HTML Fundamentals"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1a2",
    courseThumbnail: course_2_thumbnail,
    courseTitle: "Advanced HTML: Semantic & Accessible Web Pages",
    courseDescription:
      "This course takes your HTML knowledge beyond the basics and focuses on writing professional, production-ready markup. You will learn how modern HTML is used in real applications, with a strong emphasis on semantics, accessibility, and best practices followed by experienced developers.The course dives deep into semantic elements such as header, nav, section, article, footer, and main, explaining how and why they should be used correctly. You will understand how semantic HTML improves screen reader support, search engine ranking, and long-term maintainability of codebases. Accessibility concepts such as ARIA roles, form labeling, keyboard navigation, and proper document hierarchy are also covered in detail.In addition, you will learn how HTML integrates with CSS and JavaScript in larger applications, how to structure complex layouts correctly, and how to avoid common mistakes that lead to inaccessible or poorly structured pages. By the end of this course, you will be able to write HTML that meets real-world standards and is suitable for professional projects, teams, and production environments",
    educator: "Rohan Mehta",
    coursePrice: 9.99,
    discount: 0,
    courseRatings: generateRatings(95),
    courseContent: generateCourseContent("Advanced HTML"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1a3",
    courseThumbnail: course_3_thumbnail,
    courseTitle: "CSS Essentials: Styling Modern Websites",
    courseDescription:
      "Transform plain HTML into stunning websites! Learn CSS selectors, the box model, colors, typography, backgrounds, and basic layouts. Start creating beautiful web designs from day one.",
    educator: "Neha Sharma",
    coursePrice: 10.99,
    discount: 0,
    courseRatings: generateRatings(142),
    courseContent: generateCourseContent("CSS Essentials"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1a4",
    courseThumbnail: course_4_thumbnail,
    courseTitle: "Advanced CSS: Layouts, Animations & Responsiveness",
    courseDescription:
      "This course is designed to elevate your CSS skills to a professional level. You will learn advanced layout techniques using CSS Grid and advanced Flexbox patterns to build complex, responsive interfaces. The course explains not just how layouts work, but why certain approaches are preferred in real-world applications. You will explore transitions and animations to create smooth, interactive user experiences without relying on JavaScript for every visual effect. Media queries, responsive units, and mobile-first design strategies are covered in depth, helping you design interfaces that work seamlessly across devices. The course also focuses on performance, scalability, and maintainability of CSS, including how to structure styles in larger projects and avoid common pitfalls like overly specific selectors and layout hacks. By the end of this course, you will be capable of building polished, responsive, and production-ready UIs that meet modern design standards.",
    educator: "Kunal Kapoor",
    coursePrice: 10.99,
    discount: 10,
    courseRatings: generateRatings(108),
    courseContent: generateCourseContent("Advanced CSS"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1a5",
    courseThumbnail: course_5_thumbnail,
    courseTitle: "JavaScript Basics: Programming for the Web",
    courseDescription:
      "JavaScript is the language that brings the web to life, and this course introduces you to programming concepts in a clear and practical way. You will begin by understanding how JavaScript works inside the browser and how it interacts with HTML and CSS to create dynamic behavior. The course is designed for learners who want to build a solid logic foundation rather than just copy code. You will learn core concepts such as variables, data types, operators, conditions, loops, functions, and basic problem-solving techniques. The course also introduces arrays and objects, helping you understand how real data is structured and manipulated in applications. You will practice working with the DOM to handle user interactions such as clicks, inputs, and form submissions. By the end of this course, you will be able to write simple yet meaningful JavaScript programs, debug common issues, and understand how frontend logic works in real websites. This course prepares you to move confidently into advanced JavaScript, frameworks like React, and backend technologies such as Node.js.",
    educator: "Priya Singh",
    coursePrice: 11.99,
    discount: 10,
    courseRatings: generateRatings(237),
    courseContent: generateCourseContent("JavaScript Basics"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1a6",
    courseThumbnail: course_6_thumbnail,
    courseTitle: "Advanced JavaScript: Async, ES6+ & Patterns",
    courseDescription:
      "This course is designed to take your JavaScript skills beyond the basics and into real-world development scenarios. You will explore modern JavaScript features introduced in ES6 and later versions, including arrow functions, destructuring, spread operators, modules, and classes. The goal is to help you write cleaner, more expressive, and more maintainable code. A major focus of this course is asynchronous programming. You will learn how JavaScript handles async operations using callbacks, promises, and async/await. Real-world examples such as API calls, timers, and event-based logic will help you understand how asynchronous code behaves in production applications. The course also introduces common JavaScript patterns and best practices used in large codebases. You will learn how to structure logic, avoid common pitfalls, and think like an experienced JavaScript developer. By the end of this course, you will be comfortable writing scalable JavaScript code and ready to work with modern frontend frameworks and backend environments.",
    educator: "Arjun Malhotra",
    coursePrice: 12.99,
    discount: 15,
    courseRatings: generateRatings(189),
    courseContent: generateCourseContent("Advanced JavaScript"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1a7",
    courseThumbnail: course_7_thumbnail,
    courseTitle: "Node.js Fundamentals: Backend with JavaScript",
    courseDescription:
      "Node.js allows developers to use JavaScript beyond the browser, and this course introduces you to backend development using Node.js. You will start by understanding what Node.js is, how it works internally, and why it is widely used for building fast and scalable server-side applications. You will learn about the Node.js runtime, modules, file system operations, and how to handle asynchronous tasks efficiently. The course covers building basic servers, handling requests and responses, and creating RESTful APIs. You will also learn how Node.js manages concurrency and why it is well-suited for modern web applications. By the end of this course, you will be able to build basic backend services, understand how frontend applications communicate with servers, and work comfortably in a full-stack environment. This course lays the foundation for advanced backend topics such as authentication, databases, and performance optimization.",
    educator: "Siddharth Rao",
    coursePrice: 12.99,
    discount: 15,
    courseRatings: generateRatings(156),
    courseContent: generateCourseContent("Node.js Fundamentals"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1a8",
    courseThumbnail: course_8_thumbnail,
    courseTitle: "Advanced Node.js: APIs, Auth & Performance",
    courseDescription:
      "This course focuses on building production-ready backend applications using Node.js. You will learn how to design robust APIs, handle authentication and authorization, and secure your applications against common vulnerabilities. Real-world backend concerns such as request validation, error handling, and API versioning are covered in detail. The course dives into authentication mechanisms, including token-based authentication and role-based access control. You will understand how to manage user sessions securely and integrate backend services with frontend applications. Performance optimization is another key focus, where you will learn techniques to handle high traffic, optimize database access, and improve response times. By the end of this course, you will be capable of building scalable, secure, and maintainable Node.js backends suitable for real-world applications. This course prepares you for working on production systems, freelancing projects, and full-stack product development.",
    educator: "Vikram Patel",
    coursePrice: 13.99,
    discount: 20,
    courseRatings: generateRatings(124),
    courseContent: generateCourseContent("Advanced Node.js"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1a9",
    courseThumbnail: course_9_thumbnail,
    courseTitle: "React Fundamentals: Build Interactive UIs",
    courseDescription:
      "React is one of the most widely used frontend libraries for building modern user interfaces, and this course introduces you to React in a practical, structured way. You will start by understanding why React exists and how component-based architecture simplifies UI development compared to traditional approaches. The course focuses on building strong conceptual clarity rather than just writing JSX. You will learn core React concepts such as components, props, state, and events, along with how React updates the UI efficiently using its virtual DOM. Hooks like useState and useEffect are introduced gradually so you understand not only how they work, but when and why to use them. You will also learn how to structure a React project properly and break interfaces into reusable components. By the end of this course, you will be able to build interactive, dynamic user interfaces and understand React code written by professionals. This course prepares you for advanced React patterns, performance optimization, and real-world frontend development in production applications.",
    educator: "Ananya Roy",
    coursePrice: 11.99,
    discount: 0,
    courseRatings: generateRatings(312),
    courseContent: generateCourseContent("React Fundamentals"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b0",
    courseThumbnail: course_10_thumbnail,
    courseTitle: "Advanced React: Hooks, Context & Performance",
    courseDescription:
      "This course takes your React skills to a professional level by focusing on advanced concepts used in large-scale applications. You will dive deeper into React hooks, learning how to manage complex state and side effects cleanly. The Context API is covered in detail, helping you understand global state management without unnecessary prop drilling. You will learn how React renders components, how to prevent unnecessary re-renders, and how to optimize performance using memoization techniques. The course also introduces patterns for handling forms, reusable logic through custom hooks, and organizing React code in scalable applications. By the end of this course, you will be able to design maintainable React architectures, write cleaner and more efficient code, and confidently work on production-level React applications. This course is ideal for developers aiming to move beyond basic tutorials and build real-world frontend systems.",
    educator: "Rahul Khanna",
    coursePrice: 14.99,
    discount: 20,
    courseRatings: generateRatings(267),
    courseContent: generateCourseContent("Advanced React"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b1",
    courseThumbnail: course_11_thumbnail,
    courseTitle: "MongoDB Basics: NoSQL Database Essentials",
    courseDescription:
      "This course introduces MongoDB, a popular NoSQL database used in modern web applications. You will learn how MongoDB stores data using documents and collections, and how this approach differs from traditional relational databases. The course focuses on understanding data modeling rather than memorizing commands. You will learn essential MongoDB concepts including CRUD operations, querying data, indexing, and basic schema design. Real-world examples help you understand how backend applications store and retrieve data efficiently. The course also explains when NoSQL databases are a better fit than relational databases. By the end of this course, you will be able to design simple MongoDB schemas, perform database operations confidently, and integrate MongoDB into backend applications. This course provides a strong database foundation for full-stack development using Node.js and React.",
    educator: "Sneha Iyer",
    coursePrice: 12.99,
    discount: 15,
    courseRatings: generateRatings(145),
    courseContent: generateCourseContent("MongoDB Basics"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b2",
    courseThumbnail: course_12_thumbnail,
    courseTitle: "Advanced MongoDB: Schema Design & Aggregations",
    courseDescription:
      "This course builds on MongoDB fundamentals and focuses on advanced database design and performance techniques. You will learn how to design efficient schemas for large-scale applications, balancing flexibility and performance. The course explains common schema patterns used in real-world systems. A major focus is MongoDB’s aggregation framework, which allows complex data transformations and analytics directly in the database. You will learn how to write aggregation pipelines, optimize queries, and use indexes effectively. Performance considerations such as query optimization and scalability are explained in detail. By the end of this course, you will be capable of designing scalable MongoDB-backed applications and handling complex data requirements. This course prepares you to work with real production databases and backend-heavy systems confidently.",
    educator: "Manish Gupta",
    coursePrice: 14.99,
    discount: 20,
    courseRatings: generateRatings(98),
    courseContent: generateCourseContent("Advanced MongoDB"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b3",
    courseThumbnail: course_13_thumbnail,
    courseTitle: "TypeScript Fundamentals for JavaScript Developers",
    courseDescription:
      "TypeScript adds a powerful type system on top of JavaScript, helping developers write safer, more predictable, and more scalable code. This course introduces TypeScript from the perspective of a JavaScript developer who wants to improve code quality without losing flexibility. You will begin by understanding what TypeScript is, why it exists, and how it enhances the JavaScript development experience. The course covers core TypeScript concepts such as static typing, type inference, interfaces, type aliases, enums, and function typing. You will learn how TypeScript catches bugs early during development and improves collaboration in larger codebases. Practical examples will show how TypeScript integrates seamlessly with modern frameworks like React and Node.js. By the end of this course, you will be able to confidently convert JavaScript projects into TypeScript, write strongly typed code, and understand TypeScript errors and compiler messages. This course lays a solid foundation for building large-scale frontend and backend applications with better reliability and maintainability.",
    educator: "Ayesha Khan",
    coursePrice: 10.99,
    discount: 10,
    courseRatings: generateRatings(201),
    courseContent: generateCourseContent("TypeScript Fundamentals"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b4",
    courseThumbnail: course_14_thumbnail,
    courseTitle: "Advanced TypeScript: Types, Generics & Tooling",
    courseDescription:
      "This course takes your TypeScript knowledge beyond the basics and focuses on advanced features used in professional projects. You will dive deep into advanced type system concepts such as generics, utility types, conditional types, and mapped types. These features allow you to express complex logic safely and reuse code effectively. You will learn how to design flexible APIs using generics and how to model real-world data accurately with advanced typing techniques. The course also covers TypeScript tooling, configuration options, and how to optimize the developer experience using strict mode and compiler settings. Common pitfalls and best practices for large TypeScript codebases are explained clearly. By the end of this course, you will be able to write highly expressive and maintainable TypeScript code, understand complex type definitions, and work confidently in large teams. This course prepares you for advanced frontend and backend development where TypeScript is a core requirement.",
    educator: "Nikhil Bansal",
    coursePrice: 13.99,
    discount: 25,
    courseRatings: generateRatings(167),
    courseContent: generateCourseContent("Advanced TypeScript"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b5",
    courseThumbnail: course_15_thumbnail,
    courseTitle: "PostgreSQL Fundamentals: Relational Databases",
    courseDescription:
      "PostgreSQL is a powerful relational database widely used in production systems, and this course introduces you to relational database concepts using PostgreSQL. You will begin by understanding how relational databases store and organize data using tables, rows, and columns, and how relationships between tables are formed. The course covers essential SQL concepts such as creating tables, inserting data, querying records, filtering results, sorting, and joining tables. You will also learn about primary keys, foreign keys, constraints, and basic normalization principles. Practical examples help you understand how backend applications interact with relational databases. By the end of this course, you will be able to design simple relational schemas, write SQL queries confidently, and understand how PostgreSQL fits into modern web applications. This course provides a strong database foundation for backend and full-stack development.",
    educator: "Pooja Kulkarni",
    coursePrice: 11.99,
    discount: 15,
    courseRatings: generateRatings(113),
    courseContent: generateCourseContent("PostgreSQL Fundamentals"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b6",
    courseThumbnail: course_16_thumbnail,
    courseTitle: "Advanced PostgreSQL: Queries & Optimization",
    courseDescription:
      "This course focuses on advanced PostgreSQL features and performance optimization techniques used in real-world applications. You will learn how to write complex SQL queries, optimize joins, and use indexing effectively to improve query performance. The course explains how PostgreSQL executes queries and how to analyze query plans. You will also explore advanced concepts such as transactions, isolation levels, locking, and concurrency control. These topics are essential for building reliable systems that handle multiple users and high traffic. The course includes practical strategies for designing scalable schemas and avoiding common performance bottlenecks. By the end of this course, you will be able to optimize database performance, troubleshoot slow queries, and design robust PostgreSQL-backed systems. This course prepares you for working with production databases in professional environments.",
    educator: "Aditya Joshi",
    coursePrice: 14.99,
    discount: 25,
    courseRatings: generateRatings(87),
    courseContent: generateCourseContent("Advanced PostgreSQL"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b7",
    courseThumbnail: course_17_thumbnail,
    courseTitle: "Next.js Fundamentals: React Production Framework",
    courseDescription:
      "Next.js is a production-grade framework built on top of React, and this course introduces you to building scalable, real-world applications using it. You will start by understanding why Next.js exists and how it improves upon traditional React setups through features like file-based routing, server-side rendering, and built-in optimizations. The course covers core Next.js concepts such as pages, layouts, routing, data fetching strategies, and API routes. You will learn how server-side rendering and static generation work, and when to use each approach. Emphasis is placed on building applications that are fast, SEO-friendly, and easy to maintain. By the end of this course, you will be able to build complete Next.js applications suitable for production deployment. You will understand how frontend and backend logic can coexist in a single framework, preparing you for advanced Next.js features and real-world product development.",
    educator: "Mohit Agarwal",
    coursePrice: 13.99,
    discount: 20,
    courseRatings: generateRatings(224),
    courseContent: generateCourseContent("Next.js Fundamentals"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b8",
    courseThumbnail: course_18_thumbnail,
    courseTitle: "Advanced Next.js: SSR, SEO & Performance",
    courseDescription:
      "This course takes your Next.js skills to an advanced level by focusing on performance, scalability, and SEO optimization. You will explore advanced rendering strategies, including incremental static regeneration and hybrid rendering models used in large applications. You will learn how to optimize application performance through code splitting, image optimization, caching strategies, and efficient data fetching. SEO considerations such as metadata management, dynamic routing, and server-rendered content are explained in depth. The course also covers deployment best practices and environment configuration. By the end of this course, you will be able to build highly optimized, SEO-friendly Next.js applications and confidently make architectural decisions for production systems. This course prepares you to work on real-world products where performance and scalability are critical.",
    educator: "Harshita Jain",
    coursePrice: 15.99,
    discount: 30,
    courseRatings: generateRatings(178),
    courseContent: generateCourseContent("Advanced Next.js"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1b9",
    courseThumbnail: course_19_thumbnail,
    courseTitle: "React Native Basics: Mobile Apps with React",
    courseDescription:
      "React Native allows developers to build mobile applications using JavaScript and React, and this course introduces you to mobile development in a practical and accessible way. You will begin by understanding how React Native differs from web development and how it renders native components. The course covers essential topics such as core components, styling, layouts, navigation, and handling user interactions. You will learn how to manage state in mobile applications and connect frontend logic to backend services. The focus is on building real, usable mobile interfaces rather than simple demos. By the end of this course, you will be able to build basic cross-platform mobile applications using React Native. This course provides a strong foundation for advanced mobile development and prepares you to deploy applications for real users.",
    educator: "Saurabh Mishra",
    coursePrice: 12.99,
    discount: 15,
    courseRatings: generateRatings(195),
    courseContent: generateCourseContent("React Native Basics"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1c0",
    courseThumbnail: course_20_thumbnail,
    courseTitle: "Advanced React Native: Performance & Deployment",
    courseDescription:
      "This course focuses on building high-quality, production-ready mobile applications with React Native. You will learn advanced techniques for managing performance, handling large lists, optimizing animations, and reducing unnecessary re-renders. The course also covers native integrations, platform-specific behavior, and common challenges in mobile development. You will understand how to debug issues effectively and prepare applications for deployment on Android and iOS. Real-world considerations such as app size, responsiveness, and user experience are emphasized throughout. By the end of this course, you will be capable of building and deploying robust React Native applications that meet professional quality standards. This course is ideal for developers aiming to work on real mobile products.",
    educator: "Isha Malhotra",
    coursePrice: 14.99,
    discount: 25,
    courseRatings: generateRatings(142),
    courseContent: generateCourseContent("Advanced React Native"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1c1",
    courseThumbnail: course_21_thumbnail,
    courseTitle: "Dart Fundamentals for App Development",
    courseDescription:
      "Dart is a modern programming language designed for building fast, scalable applications, and this course introduces you to Dart from the ground up. You will begin by learning Dart’s syntax, type system, and object-oriented programming features in a clear and structured way. The course covers variables, functions, classes, collections, and asynchronous programming fundamentals. You will learn how Dart handles async operations and why it is well-suited for UI-driven applications. Practical examples help you understand how Dart code is structured in real projects. By the end of this course, you will be comfortable writing Dart programs and understanding Dart-based codebases. This course provides the foundation needed for Flutter development and other Dart-powered applications.",
    educator: "Rahul Nair",
    coursePrice: 10.99,
    discount: 10,
    courseRatings: generateRatings(76),
    courseContent: generateCourseContent("Dart Fundamentals"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1c2",
    courseThumbnail: course_22_thumbnail,
    courseTitle: "Advanced Dart: Async, Streams & Architecture",
    courseDescription:
      "This course builds on Dart fundamentals and focuses on advanced language features and architectural patterns. You will dive deeper into asynchronous programming using futures, streams, and isolates, learning how Dart handles concurrency efficiently. You will also learn how to structure large Dart applications using clean architecture principles. Topics such as state management patterns, error handling, and code organization are explained in detail. The course emphasizes writing maintainable, scalable Dart code suitable for long-term projects. By the end of this course, you will be able to design complex Dart applications, understand advanced async behavior, and prepare for large-scale Flutter and backend development using DartMaster advanced Dart programming! Learn async/await, Futures, Streams, isolates, mixins, extensions, and architectural patterns for building scalable Flutter applications.",
    educator: "Mehul Shah",
    coursePrice: 12.99,
    discount: 20,
    courseRatings: generateRatings(64),
    courseContent: generateCourseContent("Advanced Dart"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1c3",
    courseThumbnail: course_23_thumbnail,
    courseTitle: "Flutter Fundamentals: Build Cross-Platform Apps",
    courseDescription:
      "Create beautiful cross-platform apps with Flutter! Learn widgets, layouts, navigation, state management basics, and build stunning iOS and Android apps from a single codebase.",
    educator: "Ritika Arora",
    coursePrice: 13.99,
    discount: 15,
    courseRatings: generateRatings(289),
    courseContent: generateCourseContent("Flutter Fundamentals"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1c4",
    courseThumbnail: course_24_thumbnail,
    courseTitle: "Advanced Flutter: Animations & State Management",
    courseDescription:
      "Build professional Flutter apps! Master complex animations, advanced state management with BLoC/Riverpod, custom painters, platform channels, and production deployment.",
    educator: "Karthik Subramanian",
    coursePrice: 15.99,
    discount: 25,
    courseRatings: generateRatings(214),
    courseContent: generateCourseContent("Advanced Flutter"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1c5",
    courseThumbnail: course_25_thumbnail,
    courseTitle: "Python Fundamentals: Programming Made Easy",
    courseDescription:
      "Start coding with Python! Learn syntax, data types, control flow, functions, file handling, and object-oriented programming. Perfect for beginners entering the world of programming.",
    educator: "Divya Choudhary",
    coursePrice: 11.99,
    discount: 10,
    courseRatings: generateRatings(356),
    courseContent: generateCourseContent("Python Fundamentals"),
  },
  {
    _id: "605c72efb3f1c2b1f8e4e1c6",
    courseThumbnail: course_26_thumbnail,
    courseTitle: "Advanced Python: Automation, APIs & Data Handling",
    courseDescription:
      "Unlock Python's full potential! Learn web scraping, API development with Flask/FastAPI, data processing with Pandas, automation scripts, and working with databases.",
    educator: "Ravi Prakash",
    coursePrice: 14.99,
    discount: 20,
    courseRatings: generateRatings(298),
    courseContent: generateCourseContent("Advanced Python"),
  },
];

export const assets = {
  logo,
  search_icon,
  sketch,
  microsoft_logo,
  walmart_logo,
  accenture_logo,
  adobe_logo,
  paypal_logo,
  google_logo,
  amazon_logo,
  apple_logo,
  ibm_logo,
  oracle_logo,
  intel_logo,
  netflix_logo,
  samsung_logo,
  cisco_logo,
  meta_logo,
  tesla_logo,
  course_1_thumbnail,
  course_2_thumbnail,
  course_3_thumbnail,
  course_4_thumbnail,
  course_5_thumbnail,
  course_6_thumbnail,
  course_7_thumbnail,
  course_8_thumbnail,
  course_9_thumbnail,
  course_10_thumbnail,
  course_11_thumbnail,
  course_12_thumbnail,
  course_13_thumbnail,
  course_14_thumbnail,
  course_15_thumbnail,
  course_16_thumbnail,
  course_17_thumbnail,
  course_18_thumbnail,
  course_19_thumbnail,
  course_20_thumbnail,
  course_21_thumbnail,
  course_22_thumbnail,
  course_23_thumbnail,
  course_24_thumbnail,
  course_25_thumbnail,
  course_26_thumbnail,
  star,
  star_blank,
  profile_img_1,
  profile_img_2,
  profile_img_3,
  arrow_icon,
  dropdown_icon,
  cross_icon,
  upload_area,
  logo_dark,
  down_arrow_icon,
  time_left_clock_icon,
  time_clock_icon,
  user_icon,
  home_icon,
  add_icon,
  my_course_icon,
  person_tick_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  course_4,
  file_upload_icon,
  appointments_icon,
  earning_icon,
  patients_icon,
  profile_img,
  profile_img2,
  profile_img3,
  play_icon,
  blue_tick_icon,
  lesson_icon,
  courses,
};

export const dummyEducatorData = {
  _id: "675ac1512100b91a6d9b8b24",
  name: "GreatStack",
  email: "user.greatstack@gmail.com",
  imageUrl:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yclFkaDBOMmFqWnBoTTRBOXZUanZxVlo0aXYifQ",
  createdAt: "2024-12-12T10:56:17.930Z",
  updatedAt: "2024-12-12T10:56:17.930Z",
  __v: 0,
};

export const dummyTestimonial = [
  {
    name: "Sarah Martinez",
    role: "Senior Product Designer @ Microsoft",
    image: assets.profile_img_1,
    rating: 5,
    feedback:
      "Skillion transformed my career trajectory. The UI/UX courses provided practical, real-world projects that built my portfolio. Within three months of completing the track, I landed my dream role at Microsoft. The instructors are industry veterans who share insights you won't find anywhere else.",
    achievement: "Career transition in 3 months"
  },
  {
    name: "Michael Chen",
    role: "Full Stack Engineer @ Meta",
    image: assets.profile_img_2,
    rating: 5,
    feedback:
      "The Full Stack Development track is phenomenal. Unlike other platforms with surface-level content, Skillion dives deep into production-grade practices. The hands-on projects mirror actual industry workflows. I applied these learnings immediately in my interviews and received multiple offers.",
    achievement: "Promoted to Senior Engineer"
  },
  {
    name: "Emily Rodriguez",
    role: "Lead Data Scientist @ Apple",
    image: assets.profile_img_3,
    rating: 5,
    feedback:
      "Best investment in my professional development. The Machine Learning specialization covers cutting-edge techniques with practical implementations. The capstone project alone impressed my hiring manager. Skillion doesn't just teach concepts—it builds problem-solving skills.",
    achievement: "150% salary increase"
  },
  {
    name: "James Wilson",
    role: "DevOps Engineer @ Amazon",
    image: assets.profile_img_1,
    rating: 5,
    feedback:
      "The Cloud Architecture courses are industry-leading. Every lesson includes hands-on labs with AWS, Azure, and GCP. The certification prep materials are comprehensive and up-to-date. I passed my AWS Solutions Architect exam on the first attempt thanks to this platform.",
    achievement: "3 Cloud Certifications achieved"
  },
  {
    name: "Priya Sharma",
    role: "Blockchain Developer @ Coinbase",
    image: assets.profile_img_2,
    rating: 5,
    feedback:
      "Skillion's Web3 curriculum is unmatched. The instructors are actual blockchain engineers building production systems. The smart contract development track taught me Solidity, security best practices, and DeFi protocols. This platform gave me the confidence to transition into Web3.",
    achievement: "Transitioned to Web3 successfully"
  },
  {
    name: "David Thompson",
    role: "Mobile Lead @ Spotify",
    image: assets.profile_img_3,
    rating: 5,
    feedback:
      "The React Native and Flutter courses are exceptional. Real-world performance optimization techniques, state management patterns, and deployment strategies—all taught by developers shipping apps to millions of users. The community support is outstanding too.",
    achievement: "Built 2 apps with 100K+ downloads"
  },
];

export const dummyDashboardData = {
  totalEarnings: 245,
  enrolledStudentsData: [
    {
      courseTitle: "HTML Fundamentals: Build the Web from Scratch",
      date: "22 Aug, 2024",
      student: {
        _id: "user_1",
        name: "Amit Verma",
        imageUrl: profile_img_1,
      },
    },
    {
      courseTitle: "Advanced HTML: Semantic & Accessible Web Pages",
      date: "22 Aug, 2024",
      student: {
        _id: "user_2",
        name: "Rohan Mehta",
        imageUrl: profile_img_2,
      },
    },
    {
      courseTitle: "CSS Essentials: Styling Modern Websites",
      date: "25 Sep, 2024",
      student: {
        _id: "user_3",
        name: "Neha Sharma",
        imageUrl: profile_img_3,
      },
    },
    {
      courseTitle: "Advanced CSS: Layouts, Animations & Responsiveness",
      date: "16 Oct, 2024",
      student: {
        _id: "user_4",
        name: "Kunal Kapoor",
        imageUrl: profile_img_1,
      },
    },
    {
      courseTitle: "JavaScript Basics: Programming for the Web",
      date: "22 Aug, 2024",
      student: {
        _id: "user_5",
        name: "Priya Singh",
        imageUrl: profile_img_2,
      },
    },
    {
      courseTitle: "Advanced JavaScript: Async, ES6+ & Patterns",
      date: "25 Sep, 2024",
      student: {
        _id: "user_6",
        name: "Arjun Malhotra",
        imageUrl: profile_img_3,
      },
    },
    {
      courseTitle: "Node.js Fundamentals: Backend with JavaScript",
      date: "16 Oct, 2024",
      student: {
        _id: "user_7",
        name: "Siddharth Rao",
        imageUrl: profile_img_1,
      },
    },
  ],
  totalCourses: 8,
};

export const dummyStudentEnrolled = [
  {
    student: {
      _id: "user_1",
      name: "Richard Sanford",
      imageUrl: profile_img_1,
    },
    courseTitle: "HTML Fundamentals: Build the Web from Scratch",
    purchaseDate: "2024-08-22T10:30:00.000Z",
  },
  {
    student: {
      _id: "user_2",
      name: "Enrique Murphy",
      imageUrl: profile_img_2,
    },
    courseTitle: "Advanced HTML: Semantic & Accessible Web Pages",
    purchaseDate: "2024-08-22T14:20:00.000Z",
  },
  {
    student: {
      _id: "user_3",
      name: "Alison Powell",
      imageUrl: profile_img_3,
    },
    courseTitle: "CSS Essentials: Styling Modern Websites",
    purchaseDate: "2024-09-25T09:15:00.000Z",
  },
  {
    student: {
      _id: "user_4",
      name: "Michael Chen",
      imageUrl: profile_img_1,
    },
    courseTitle: "Advanced CSS: Layouts, Animations & Responsiveness",
    purchaseDate: "2024-10-16T11:45:00.000Z",
  },
  {
    student: {
      _id: "user_5",
      name: "Sarah Johnson",
      imageUrl: profile_img_2,
    },
    courseTitle: "JavaScript Basics: Programming for the Web",
    purchaseDate: "2024-08-22T16:00:00.000Z",
  },
  {
    student: {
      _id: "user_6",
      name: "David Martinez",
      imageUrl: profile_img_3,
    },
    courseTitle: "Advanced JavaScript: Async, ES6+ & Patterns",
    purchaseDate: "2024-09-25T13:30:00.000Z",
  },
  {
    student: {
      _id: "user_7",
      name: "Emma Williams",
      imageUrl: profile_img_1,
    },
    courseTitle: "Node.js Fundamentals: Backend with JavaScript",
    purchaseDate: "2024-10-16T08:20:00.000Z",
  },
  {
    student: {
      _id: "user_8",
      name: "James Brown",
      imageUrl: profile_img_2,
    },
    courseTitle: "React Fundamentals: Build Interactive UIs",
    purchaseDate: "2024-11-05T15:10:00.000Z",
  },
  {
    student: {
      _id: "user_9",
      name: "Olivia Davis",
      imageUrl: profile_img_3,
    },
    courseTitle: "Advanced React: Hooks, Context & Performance",
    purchaseDate: "2024-11-12T10:45:00.000Z",
  },
  {
    student: {
      _id: "user_10",
      name: "William Garcia",
      imageUrl: profile_img_1,
    },
    courseTitle: "MongoDB Basics: NoSQL Database Essentials",
    purchaseDate: "2024-12-01T12:30:00.000Z",
  },
];

// Dummy enrollment data for MyEnrollments page
export const dummyEnrollments = [
  {
    courseId: "605c72efb3f1c2b1f8e4e1a5", // JavaScript Basics
    completedLectures: 20, // Partially completed
    enrolledDate: "2024-12-01T10:00:00.000Z",
  },
  {
    courseId: "605c72efb3f1c2b1f8e4e1c6", // Advanced Python
    completedLectures: 0, // Not started
    enrolledDate: "2024-12-10T15:30:00.000Z",
  },
  {
    courseId: "605c72efb3f1c2b1f8e4e1a6", // Advanced JavaScript
    completedLectures: 45, // Completed (45/45)
    enrolledDate: "2024-11-20T09:00:00.000Z",
  },
  {
    courseId: "605c72efb3f1c2b1f8e4e1b7", // Next.js Fundamentals
    completedLectures: 50, // Completed (50/50)
    enrolledDate: "2024-10-15T12:00:00.000Z",
  },
  {
    courseId: "605c72efb3f1c2b1f8e4e1c3", // Flutter Fundamentals
    completedLectures: 15, // Partially completed
    enrolledDate: "2024-12-05T08:00:00.000Z",
  },
  {
    courseId: "605c72efb3f1c2b1f8e4e1b4", // Advanced TypeScript
    completedLectures: 35, // Partially completed (35/40)
    enrolledDate: "2024-11-28T14:00:00.000Z",
  },
];

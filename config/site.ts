export const siteConfig = {
  business: {
    name: "Checkmat Brentwood",
    tagline: "Brazilian Jiu-Jitsu in Brentwood, CA",
    address: "640 Harvest Park Drive, Brentwood, CA 94513",
    phone: "+1 (925) 338-0614",
    phoneRaw: "+19253380614",
    email: "info@checkmatbrentwood.com",
    timezone: "America/Los_Angeles",
    googleMapsUrl: "https://www.google.com/maps/place/640+Harvest+Park+Dr,+Brentwood,+CA+94513",
    googleReviewUrl: "https://g.page/r/CbxpQhqkqcjPEAE/review",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.2!2d-121.7157!3d37.9318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808563b1e2f4b0c7%3A0xcfc8a99a1a426099!2s640%20Harvest%20Park%20Dr%2C%20Brentwood%2C%20CA%2094513!5e0!3m2!1sen!2sus!4v1700000000000",
    coordinates: { lat: 37.93, lng: -121.69 },
    hours: [
      { day: "Monday", open: "5:30 AM", close: "9:00 PM" },
      { day: "Tuesday", open: "5:30 AM", close: "9:00 PM" },
      { day: "Wednesday", open: "5:30 AM", close: "9:00 PM" },
      { day: "Thursday", open: "5:30 AM", close: "9:00 PM" },
      { day: "Friday", open: "5:30 AM", close: "9:00 PM" },
      { day: "Saturday", open: "8:00 AM", close: "1:00 PM" },
      { day: "Sunday", open: "Closed", close: "" },
    ],
    socialLinks: {
      instagram: "",
      facebook: "",
      youtube: "",
    },
  },
  brand: {
    primaryColor: "#C8102E",
    secondaryColor: "#000000",
    accentColor: "#FFFFFF",
    logoPath: "/images/logo.png",
  },
  cal: {
    username: "fernando-fujie",
    eventSlug: "free-trial-class",
    classes: [
      {
        slug: "toddler-and-me",
        label: "Toddler & Me",
        ageRange: "Ages 2–4",
        description: "30 min · Tue 2:30 PM",
        durationMin: 30,
        slots: [
          { day: "Tuesday", time: "2:30 PM" },
        ],
      },
      {
        slug: "little-champions",
        label: "Little Champions",
        ageRange: "Ages 4–7",
        description: "45 min · Mon/Tue/Wed/Thu 5:30 PM",
        durationMin: 45,
        slots: [
          { day: "Monday", time: "5:30 PM" },
          { day: "Tuesday", time: "5:30 PM" },
          { day: "Wednesday", time: "5:30 PM" },
          { day: "Thursday", time: "5:30 PM" },
        ],
      },
      {
        slug: "wrestling-kids",
        label: "Wrestling Kids",
        ageRange: "Ages 8–12",
        description: "60 min · Mon/Wed 5:00 PM",
        durationMin: 60,
        slots: [
          { day: "Monday", time: "5:00 PM" },
          { day: "Wednesday", time: "5:00 PM" },
        ],
      },
      {
        slug: "muay-thai-kids",
        label: "Muay Thai Kids",
        ageRange: "Ages 8–12",
        description: "60 min · Tue/Thu 5:10 PM",
        durationMin: 60,
        slots: [
          { day: "Tuesday", time: "5:10 PM" },
          { day: "Thursday", time: "5:10 PM" },
        ],
      },
      {
        slug: "mma-no-gi-kids",
        label: "MMA – No Gi Kids",
        ageRange: "Ages 8–12",
        description: "30 min · Fri 5:30 PM",
        durationMin: 30,
        slots: [
          { day: "Friday", time: "5:30 PM" },
        ],
      },
      {
        slug: "legacy",
        label: "Legacy Kids",
        ageRange: "Ages 8–12",
        description: "45 min · Tue/Thu 6:15 PM",
        durationMin: 45,
        slots: [
          { day: "Tuesday", time: "6:15 PM" },
          { day: "Thursday", time: "6:15 PM" },
        ],
      },
      {
        slug: "elite-competition",
        label: "Elite Competition",
        ageRange: "Ages 8–12",
        description: "45 min · Mon/Wed 6:15 PM · Tue/Thu 7:00 PM",
        durationMin: 45,
        slots: [
          { day: "Monday", time: "6:15 PM" },
          { day: "Tuesday", time: "7:00 PM" },
          { day: "Wednesday", time: "6:15 PM" },
          { day: "Thursday", time: "7:00 PM" },
        ],
      },
      {
        slug: "muay-thai",
        label: "Muay Thai",
        ageRange: "Ages 13+",
        description: "60 min · Mon/Tue/Thu 6:00 PM",
        durationMin: 60,
        slots: [
          { day: "Monday", time: "6:00 PM" },
          { day: "Tuesday", time: "6:00 PM" },
          { day: "Thursday", time: "6:00 PM" },
        ],
      },
      {
        slug: "womens-class",
        label: "Women's Class",
        ageRange: "Ages 13+",
        description: "60 min · Sat 9:30 AM",
        durationMin: 60,
        slots: [
          { day: "Saturday", time: "9:30 AM" },
        ],
      },
      {
        slug: "bjj-fundamentals",
        label: "BJJ Fundamentals",
        ageRange: "Ages 13+",
        description: "45 min · Mon–Thu 7:00 PM",
        durationMin: 45,
        slots: [
          { day: "Monday", time: "7:00 PM" },
          { day: "Tuesday", time: "7:00 PM" },
          { day: "Wednesday", time: "7:00 PM" },
          { day: "Thursday", time: "7:00 PM" },
        ],
      },
      {
        slug: "no-gi",
        label: "No Gi",
        ageRange: "Ages 13+",
        description: "60 min · Tue 7:45 PM · Fri 6:30 PM",
        durationMin: 60,
        slots: [
          { day: "Tuesday", time: "7:45 PM" },
          { day: "Friday", time: "6:30 PM" },
        ],
      },
      {
        slug: "bjj-all-levels",
        label: "BJJ – All Levels",
        ageRange: "Ages 13+",
        description: "60 min · Mon/Wed/Thu 7:45 PM",
        durationMin: 60,
        slots: [
          { day: "Monday", time: "7:45 PM" },
          { day: "Wednesday", time: "7:45 PM" },
          { day: "Thursday", time: "7:45 PM" },
        ],
      },
      {
        slug: "all-levels-specific-training",
        label: "All Levels Specific Training",
        ageRange: "Ages 13+",
        description: "60 min · Fri 10:30 AM",
        durationMin: 60,
        slots: [
          { day: "Friday", time: "10:30 AM" },
        ],
      },
      {
        slug: "drills-and-rolls",
        label: "Drills & Rolls",
        ageRange: "Ages 13+",
        description: "60 min · Fri 10:30 AM · Fri 6:30 PM",
        durationMin: 60,
        slots: [
          { day: "Friday", time: "10:30 AM" },
          { day: "Friday", time: "6:30 PM" },
        ],
      },
    ],
  },
  coaches: [
    {
      name: "Coach Thiago Gaia",
      belt: "3rd-Degree Black Belt",
      photo: "/images/coach-1.jpg",
      bio: "Coach Thiago Gaia is a 3rd-degree Brazilian Jiu-Jitsu black belt, a professional MMA fighter, and one of the most respected instructors in the region. With over 20 years of experience in the martial arts, Thiago brings world-class knowledge, elite-level technique, and an unmatched passion for teaching to every class he leads. Born in Ilhabela, Brazil, he began training at age 10 and earned his black belt under Checkmat, awarded by Marco Barbosa on December 7, 2012. As a professional MMA fighter, Coach Thiago holds an impressive 8-1 record — all eight victories by submission — and has coached and cornered multiple UFC fighters.",
    },
  ],
  schedule: {
    adults: [
      { day: "Monday", times: ["6:00 AM", "12:00 PM", "6:30 PM"] },
      { day: "Tuesday", times: ["6:00 AM", "7:00 PM"] },
      { day: "Wednesday", times: ["6:00 AM", "12:00 PM", "6:30 PM"] },
      { day: "Thursday", times: ["6:00 AM", "7:00 PM"] },
      { day: "Friday", times: ["6:00 AM", "12:00 PM", "6:30 PM"] },
      { day: "Saturday", times: ["9:00 AM", "10:15 AM"] },
      { day: "Sunday", times: ["10:00 AM"] },
    ],
    kids: [
      { day: "Monday", times: ["4:30 PM", "5:30 PM"] },
      { day: "Tuesday", times: ["4:30 PM", "5:30 PM"] },
      { day: "Wednesday", times: ["4:30 PM", "5:30 PM"] },
      { day: "Thursday", times: ["4:30 PM", "5:30 PM"] },
      { day: "Friday", times: ["4:30 PM"] },
      { day: "Saturday", times: ["9:00 AM"] },
    ],
    openMat: [
      { day: "Saturday", times: ["11:30 AM"] },
      { day: "Sunday", times: ["10:00 AM"] },
    ],
  },
  testimonials: [
    {
      name: "Marvin Mac",
      photo: "https://ui-avatars.com/api/?name=Marvin+Mac&background=C8102E&color=fff&size=160&bold=true",
      text: "My daughter has been attending here for almost a year and have nothing but positive experiences with everyone. Every teacher has been extremely helpful and the coach is awesome! Can't wait for another year of growth and experience for my daughter.",
      role: "Kids Program Parent",
      rating: 5,
    },
    {
      name: "Troy Rowe",
      photo: "https://ui-avatars.com/api/?name=Troy+Rowe&background=111111&color=fff&size=160&bold=true",
      text: "Great school with very professional and polite people running it. Your kids will be in great hands at a school that will prepare them for life both physically and mentally. For adults the training programs are filled with adults that are kind and will embrace you as a teammate on day one.",
      role: "Adult BJJ Student",
      rating: 5,
    },
    {
      name: "Nicole McBain",
      photo: "https://ui-avatars.com/api/?name=Nicole+McBain&background=C8102E&color=fff&size=160&bold=true",
      text: "We absolutely love Checkmat Brentwood! The staff is incredibly kind, welcoming, and highly experienced. They create such a positive and supportive environment. You can really tell they care about each student, their growth and confidence. We have our 9yr old daughter signed up now and she has shown tremendous growth; she loves all the staff and made lots of new friends. Highly recommend to anyone looking!!",
      role: "Kids Program Parent",
      rating: 5,
    },
    {
      name: "Michael W. Cantin",
      photo: "https://ui-avatars.com/api/?name=Michael+Cantin&background=111111&color=fff&size=160&bold=true",
      text: "My son loves going here. The coaches are great and do an amazing job sharing their knowledge. More importantly they do it with respect and patience.",
      role: "Kids Program Parent",
      rating: 5,
    },
  ],
  faq: [
    {
      q: "What should I wear to my first class?",
      a: "Just bring comfortable workout clothes — shorts and a t-shirt work great. We'll provide a clean gi for your free trial.",
    },
    {
      q: "Do I need any experience?",
      a: "Absolutely not. Our trial class is designed for complete beginners. Our coaches will guide you through every step.",
    },
    {
      q: "How long is the trial class?",
      a: "About 60 minutes — including warm-up, technique, and light drilling. No sparring on day one.",
    },
    {
      q: "Is there a cost?",
      a: "Your first class is 100% free. No card required, no obligation.",
    },
    {
      q: "What age groups do you teach?",
      a: "Kids (ages 4–12), Teens (13–17), and Adults (18+). We have separate programs tailored for each group.",
    },
    {
      q: "Is BJJ safe for beginners?",
      a: "Yes. We take safety seriously at every level. Trial classes focus on technique and controlled drilling — no hard sparring until you're ready.",
    },
    {
      q: "What if I can't make my booked time?",
      a: "No problem — you'll receive a confirmation email with a link to reschedule. Or call us at +1 (925) 338-0614.",
    },
  ],
  meta: {
    pixelId: "989893566459320",
  },
  webhook: {
    leadEndpoint: "https://rollcall-backend-production.up.railway.app/api/lead",
  },
  seo: {
    title: "Free Trial BJJ Class — Checkmat Brentwood",
    description:
      "Book your free Brazilian Jiu-Jitsu trial class at Checkmat Brentwood. No experience needed. Adults and kids programs. Located at 640 Harvest Park Drive, Brentwood, CA.",
    ogImage: "/images/og-image.jpg",
    twitterHandle: "@checkmatbrentwood",
  },
}

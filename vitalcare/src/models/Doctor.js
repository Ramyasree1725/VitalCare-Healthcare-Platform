/**
 * Doctor model and directory service
 */
const doctors = [
  {
    "id": "doc-1000",
    "firstName": "Sarah",
    "lastName": "Mitchell",
    "fullName": "Dr. Sarah Mitchell",
    "specialty": "Cardiology",
    "city": "New York",
    "yearsExperience": 5,
    "rating": 4.0,
    "patientsServed": 300,
    "email": "sarah.mitchell@vitalcare.health",
    "phone": "+1-555-2000",
    "bio": "Dr. Sarah Mitchell is a board-certified Cardiology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1001",
    "firstName": "James",
    "lastName": "Patel",
    "fullName": "Dr. James Patel",
    "specialty": "Pediatrics",
    "city": "Los Angeles",
    "yearsExperience": 6,
    "rating": 4.1,
    "patientsServed": 317,
    "email": "james.patel@vitalcare.health",
    "phone": "+1-555-2001",
    "bio": "Dr. James Patel is a board-certified Pediatrics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1002",
    "firstName": "Emily",
    "lastName": "Hassan",
    "fullName": "Dr. Emily Hassan",
    "specialty": "Orthopedics",
    "city": "Chicago",
    "yearsExperience": 7,
    "rating": 4.2,
    "patientsServed": 334,
    "email": "emily.hassan@vitalcare.health",
    "phone": "+1-555-2002",
    "bio": "Dr. Emily Hassan is a board-certified Orthopedics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1003",
    "firstName": "Raj",
    "lastName": "Wilson",
    "fullName": "Dr. Raj Wilson",
    "specialty": "Neurology",
    "city": "Houston",
    "yearsExperience": 8,
    "rating": 4.3,
    "patientsServed": 351,
    "email": "raj.wilson@vitalcare.health",
    "phone": "+1-555-2003",
    "bio": "Dr. Raj Wilson is a board-certified Neurology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1004",
    "firstName": "Maria",
    "lastName": "Berg",
    "fullName": "Dr. Maria Berg",
    "specialty": "Dermatology",
    "city": "Phoenix",
    "yearsExperience": 9,
    "rating": 4.4,
    "patientsServed": 368,
    "email": "maria.berg@vitalcare.health",
    "phone": "+1-555-2004",
    "bio": "Dr. Maria Berg is a board-certified Dermatology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1005",
    "firstName": "David",
    "lastName": "Brooks",
    "fullName": "Dr. David Brooks",
    "specialty": "Oncology",
    "city": "Philadelphia",
    "yearsExperience": 10,
    "rating": 4.5,
    "patientsServed": 385,
    "email": "david.brooks@vitalcare.health",
    "phone": "+1-555-2005",
    "bio": "Dr. David Brooks is a board-certified Oncology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1006",
    "firstName": "Aisha",
    "lastName": "Khan",
    "fullName": "Dr. Aisha Khan",
    "specialty": "Gastroenterology",
    "city": "San Antonio",
    "yearsExperience": 11,
    "rating": 4.6,
    "patientsServed": 402,
    "email": "aisha.khan@vitalcare.health",
    "phone": "+1-555-2006",
    "bio": "Dr. Aisha Khan is a board-certified Gastroenterology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1007",
    "firstName": "Michael",
    "lastName": "Okonkwo",
    "fullName": "Dr. Michael Okonkwo",
    "specialty": "Endocrinology",
    "city": "San Diego",
    "yearsExperience": 12,
    "rating": 4.7,
    "patientsServed": 419,
    "email": "michael.okonkwo@vitalcare.health",
    "phone": "+1-555-2007",
    "bio": "Dr. Michael Okonkwo is a board-certified Endocrinology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1008",
    "firstName": "Priya",
    "lastName": "Garcia",
    "fullName": "Dr. Priya Garcia",
    "specialty": "Pulmonology",
    "city": "Dallas",
    "yearsExperience": 13,
    "rating": 4.8,
    "patientsServed": 436,
    "email": "priya.garcia@vitalcare.health",
    "phone": "+1-555-2008",
    "bio": "Dr. Priya Garcia is a board-certified Pulmonology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1009",
    "firstName": "Robert",
    "lastName": "Torres",
    "fullName": "Dr. Robert Torres",
    "specialty": "Family Medicine",
    "city": "Austin",
    "yearsExperience": 14,
    "rating": 4.9,
    "patientsServed": 453,
    "email": "robert.torres@vitalcare.health",
    "phone": "+1-555-2009",
    "bio": "Dr. Robert Torres is a board-certified Family Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1010",
    "firstName": "Linda",
    "lastName": "Nguyen",
    "fullName": "Dr. Linda Nguyen",
    "specialty": "Internal Medicine",
    "city": "Seattle",
    "yearsExperience": 15,
    "rating": 4.0,
    "patientsServed": 470,
    "email": "linda.nguyen@vitalcare.health",
    "phone": "+1-555-2010",
    "bio": "Dr. Linda Nguyen is a board-certified Internal Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1011",
    "firstName": "Carlos",
    "lastName": "Anderson",
    "fullName": "Dr. Carlos Anderson",
    "specialty": "Psychiatry",
    "city": "Boston",
    "yearsExperience": 16,
    "rating": 4.1,
    "patientsServed": 487,
    "email": "carlos.anderson@vitalcare.health",
    "phone": "+1-555-2011",
    "bio": "Dr. Carlos Anderson is a board-certified Psychiatry specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1012",
    "firstName": "Anna",
    "lastName": "Martinez",
    "fullName": "Dr. Anna Martinez",
    "specialty": "Ophthalmology",
    "city": "Denver",
    "yearsExperience": 17,
    "rating": 4.2,
    "patientsServed": 504,
    "email": "anna.martinez@vitalcare.health",
    "phone": "+1-555-2012",
    "bio": "Dr. Anna Martinez is a board-certified Ophthalmology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1013",
    "firstName": "Thomas",
    "lastName": "Wright",
    "fullName": "Dr. Thomas Wright",
    "specialty": "ENT",
    "city": "Miami",
    "yearsExperience": 18,
    "rating": 4.3,
    "patientsServed": 521,
    "email": "thomas.wright@vitalcare.health",
    "phone": "+1-555-2013",
    "bio": "Dr. Thomas Wright is a board-certified ENT specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1014",
    "firstName": "Fatima",
    "lastName": "Chen",
    "fullName": "Dr. Fatima Chen",
    "specialty": "Urology",
    "city": "Atlanta",
    "yearsExperience": 19,
    "rating": 4.4,
    "patientsServed": 538,
    "email": "fatima.chen@vitalcare.health",
    "phone": "+1-555-2014",
    "bio": "Dr. Fatima Chen is a board-certified Urology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1015",
    "firstName": "Daniel",
    "lastName": "Kim",
    "fullName": "Dr. Daniel Kim",
    "specialty": "Cardiology",
    "city": "New York",
    "yearsExperience": 20,
    "rating": 4.5,
    "patientsServed": 555,
    "email": "daniel.kim@vitalcare.health",
    "phone": "+1-555-2015",
    "bio": "Dr. Daniel Kim is a board-certified Cardiology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1016",
    "firstName": "Sophia",
    "lastName": "Sharma",
    "fullName": "Dr. Sophia Sharma",
    "specialty": "Pediatrics",
    "city": "Los Angeles",
    "yearsExperience": 21,
    "rating": 4.6,
    "patientsServed": 572,
    "email": "sophia.sharma@vitalcare.health",
    "phone": "+1-555-2016",
    "bio": "Dr. Sophia Sharma is a board-certified Pediatrics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1017",
    "firstName": "Kevin",
    "lastName": "Rodriguez",
    "fullName": "Dr. Kevin Rodriguez",
    "specialty": "Orthopedics",
    "city": "Chicago",
    "yearsExperience": 22,
    "rating": 4.7,
    "patientsServed": 589,
    "email": "kevin.rodriguez@vitalcare.health",
    "phone": "+1-555-2017",
    "bio": "Dr. Kevin Rodriguez is a board-certified Orthopedics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1018",
    "firstName": "Nadia",
    "lastName": "Ali",
    "fullName": "Dr. Nadia Ali",
    "specialty": "Neurology",
    "city": "Houston",
    "yearsExperience": 23,
    "rating": 4.8,
    "patientsServed": 606,
    "email": "nadia.ali@vitalcare.health",
    "phone": "+1-555-2018",
    "bio": "Dr. Nadia Ali is a board-certified Neurology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1019",
    "firstName": "Christopher",
    "lastName": "Lee",
    "fullName": "Dr. Christopher Lee",
    "specialty": "Dermatology",
    "city": "Phoenix",
    "yearsExperience": 24,
    "rating": 4.9,
    "patientsServed": 623,
    "email": "christopher.lee@vitalcare.health",
    "phone": "+1-555-2019",
    "bio": "Dr. Christopher Lee is a board-certified Dermatology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1020",
    "firstName": "Sarah",
    "lastName": "Mitchell",
    "fullName": "Dr. Sarah Mitchell",
    "specialty": "Oncology",
    "city": "Philadelphia",
    "yearsExperience": 25,
    "rating": 4.0,
    "patientsServed": 640,
    "email": "sarah.mitchell@vitalcare.health",
    "phone": "+1-555-2020",
    "bio": "Dr. Sarah Mitchell is a board-certified Oncology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1021",
    "firstName": "James",
    "lastName": "Patel",
    "fullName": "Dr. James Patel",
    "specialty": "Gastroenterology",
    "city": "San Antonio",
    "yearsExperience": 26,
    "rating": 4.1,
    "patientsServed": 657,
    "email": "james.patel@vitalcare.health",
    "phone": "+1-555-2021",
    "bio": "Dr. James Patel is a board-certified Gastroenterology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1022",
    "firstName": "Emily",
    "lastName": "Hassan",
    "fullName": "Dr. Emily Hassan",
    "specialty": "Endocrinology",
    "city": "San Diego",
    "yearsExperience": 27,
    "rating": 4.2,
    "patientsServed": 674,
    "email": "emily.hassan@vitalcare.health",
    "phone": "+1-555-2022",
    "bio": "Dr. Emily Hassan is a board-certified Endocrinology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1023",
    "firstName": "Raj",
    "lastName": "Wilson",
    "fullName": "Dr. Raj Wilson",
    "specialty": "Pulmonology",
    "city": "Dallas",
    "yearsExperience": 28,
    "rating": 4.3,
    "patientsServed": 691,
    "email": "raj.wilson@vitalcare.health",
    "phone": "+1-555-2023",
    "bio": "Dr. Raj Wilson is a board-certified Pulmonology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1024",
    "firstName": "Maria",
    "lastName": "Berg",
    "fullName": "Dr. Maria Berg",
    "specialty": "Family Medicine",
    "city": "Austin",
    "yearsExperience": 29,
    "rating": 4.4,
    "patientsServed": 708,
    "email": "maria.berg@vitalcare.health",
    "phone": "+1-555-2024",
    "bio": "Dr. Maria Berg is a board-certified Family Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1025",
    "firstName": "David",
    "lastName": "Brooks",
    "fullName": "Dr. David Brooks",
    "specialty": "Internal Medicine",
    "city": "Seattle",
    "yearsExperience": 5,
    "rating": 4.5,
    "patientsServed": 725,
    "email": "david.brooks@vitalcare.health",
    "phone": "+1-555-2025",
    "bio": "Dr. David Brooks is a board-certified Internal Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1026",
    "firstName": "Aisha",
    "lastName": "Khan",
    "fullName": "Dr. Aisha Khan",
    "specialty": "Psychiatry",
    "city": "Boston",
    "yearsExperience": 6,
    "rating": 4.6,
    "patientsServed": 742,
    "email": "aisha.khan@vitalcare.health",
    "phone": "+1-555-2026",
    "bio": "Dr. Aisha Khan is a board-certified Psychiatry specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1027",
    "firstName": "Michael",
    "lastName": "Okonkwo",
    "fullName": "Dr. Michael Okonkwo",
    "specialty": "Ophthalmology",
    "city": "Denver",
    "yearsExperience": 7,
    "rating": 4.7,
    "patientsServed": 759,
    "email": "michael.okonkwo@vitalcare.health",
    "phone": "+1-555-2027",
    "bio": "Dr. Michael Okonkwo is a board-certified Ophthalmology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1028",
    "firstName": "Priya",
    "lastName": "Garcia",
    "fullName": "Dr. Priya Garcia",
    "specialty": "ENT",
    "city": "Miami",
    "yearsExperience": 8,
    "rating": 4.8,
    "patientsServed": 776,
    "email": "priya.garcia@vitalcare.health",
    "phone": "+1-555-2028",
    "bio": "Dr. Priya Garcia is a board-certified ENT specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1029",
    "firstName": "Robert",
    "lastName": "Torres",
    "fullName": "Dr. Robert Torres",
    "specialty": "Urology",
    "city": "Atlanta",
    "yearsExperience": 9,
    "rating": 4.9,
    "patientsServed": 793,
    "email": "robert.torres@vitalcare.health",
    "phone": "+1-555-2029",
    "bio": "Dr. Robert Torres is a board-certified Urology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1030",
    "firstName": "Linda",
    "lastName": "Nguyen",
    "fullName": "Dr. Linda Nguyen",
    "specialty": "Cardiology",
    "city": "New York",
    "yearsExperience": 10,
    "rating": 4.0,
    "patientsServed": 810,
    "email": "linda.nguyen@vitalcare.health",
    "phone": "+1-555-2030",
    "bio": "Dr. Linda Nguyen is a board-certified Cardiology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1031",
    "firstName": "Carlos",
    "lastName": "Anderson",
    "fullName": "Dr. Carlos Anderson",
    "specialty": "Pediatrics",
    "city": "Los Angeles",
    "yearsExperience": 11,
    "rating": 4.1,
    "patientsServed": 827,
    "email": "carlos.anderson@vitalcare.health",
    "phone": "+1-555-2031",
    "bio": "Dr. Carlos Anderson is a board-certified Pediatrics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1032",
    "firstName": "Anna",
    "lastName": "Martinez",
    "fullName": "Dr. Anna Martinez",
    "specialty": "Orthopedics",
    "city": "Chicago",
    "yearsExperience": 12,
    "rating": 4.2,
    "patientsServed": 844,
    "email": "anna.martinez@vitalcare.health",
    "phone": "+1-555-2032",
    "bio": "Dr. Anna Martinez is a board-certified Orthopedics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1033",
    "firstName": "Thomas",
    "lastName": "Wright",
    "fullName": "Dr. Thomas Wright",
    "specialty": "Neurology",
    "city": "Houston",
    "yearsExperience": 13,
    "rating": 4.3,
    "patientsServed": 861,
    "email": "thomas.wright@vitalcare.health",
    "phone": "+1-555-2033",
    "bio": "Dr. Thomas Wright is a board-certified Neurology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1034",
    "firstName": "Fatima",
    "lastName": "Chen",
    "fullName": "Dr. Fatima Chen",
    "specialty": "Dermatology",
    "city": "Phoenix",
    "yearsExperience": 14,
    "rating": 4.4,
    "patientsServed": 878,
    "email": "fatima.chen@vitalcare.health",
    "phone": "+1-555-2034",
    "bio": "Dr. Fatima Chen is a board-certified Dermatology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1035",
    "firstName": "Daniel",
    "lastName": "Kim",
    "fullName": "Dr. Daniel Kim",
    "specialty": "Oncology",
    "city": "Philadelphia",
    "yearsExperience": 15,
    "rating": 4.5,
    "patientsServed": 895,
    "email": "daniel.kim@vitalcare.health",
    "phone": "+1-555-2035",
    "bio": "Dr. Daniel Kim is a board-certified Oncology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1036",
    "firstName": "Sophia",
    "lastName": "Sharma",
    "fullName": "Dr. Sophia Sharma",
    "specialty": "Gastroenterology",
    "city": "San Antonio",
    "yearsExperience": 16,
    "rating": 4.6,
    "patientsServed": 912,
    "email": "sophia.sharma@vitalcare.health",
    "phone": "+1-555-2036",
    "bio": "Dr. Sophia Sharma is a board-certified Gastroenterology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1037",
    "firstName": "Kevin",
    "lastName": "Rodriguez",
    "fullName": "Dr. Kevin Rodriguez",
    "specialty": "Endocrinology",
    "city": "San Diego",
    "yearsExperience": 17,
    "rating": 4.7,
    "patientsServed": 929,
    "email": "kevin.rodriguez@vitalcare.health",
    "phone": "+1-555-2037",
    "bio": "Dr. Kevin Rodriguez is a board-certified Endocrinology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1038",
    "firstName": "Nadia",
    "lastName": "Ali",
    "fullName": "Dr. Nadia Ali",
    "specialty": "Pulmonology",
    "city": "Dallas",
    "yearsExperience": 18,
    "rating": 4.8,
    "patientsServed": 946,
    "email": "nadia.ali@vitalcare.health",
    "phone": "+1-555-2038",
    "bio": "Dr. Nadia Ali is a board-certified Pulmonology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1039",
    "firstName": "Christopher",
    "lastName": "Lee",
    "fullName": "Dr. Christopher Lee",
    "specialty": "Family Medicine",
    "city": "Austin",
    "yearsExperience": 19,
    "rating": 4.9,
    "patientsServed": 963,
    "email": "christopher.lee@vitalcare.health",
    "phone": "+1-555-2039",
    "bio": "Dr. Christopher Lee is a board-certified Family Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1040",
    "firstName": "Sarah",
    "lastName": "Mitchell",
    "fullName": "Dr. Sarah Mitchell",
    "specialty": "Internal Medicine",
    "city": "Seattle",
    "yearsExperience": 20,
    "rating": 4.0,
    "patientsServed": 980,
    "email": "sarah.mitchell@vitalcare.health",
    "phone": "+1-555-2040",
    "bio": "Dr. Sarah Mitchell is a board-certified Internal Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1041",
    "firstName": "James",
    "lastName": "Patel",
    "fullName": "Dr. James Patel",
    "specialty": "Psychiatry",
    "city": "Boston",
    "yearsExperience": 21,
    "rating": 4.1,
    "patientsServed": 997,
    "email": "james.patel@vitalcare.health",
    "phone": "+1-555-2041",
    "bio": "Dr. James Patel is a board-certified Psychiatry specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1042",
    "firstName": "Emily",
    "lastName": "Hassan",
    "fullName": "Dr. Emily Hassan",
    "specialty": "Ophthalmology",
    "city": "Denver",
    "yearsExperience": 22,
    "rating": 4.2,
    "patientsServed": 1014,
    "email": "emily.hassan@vitalcare.health",
    "phone": "+1-555-2042",
    "bio": "Dr. Emily Hassan is a board-certified Ophthalmology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1043",
    "firstName": "Raj",
    "lastName": "Wilson",
    "fullName": "Dr. Raj Wilson",
    "specialty": "ENT",
    "city": "Miami",
    "yearsExperience": 23,
    "rating": 4.3,
    "patientsServed": 1031,
    "email": "raj.wilson@vitalcare.health",
    "phone": "+1-555-2043",
    "bio": "Dr. Raj Wilson is a board-certified ENT specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1044",
    "firstName": "Maria",
    "lastName": "Berg",
    "fullName": "Dr. Maria Berg",
    "specialty": "Urology",
    "city": "Atlanta",
    "yearsExperience": 24,
    "rating": 4.4,
    "patientsServed": 1048,
    "email": "maria.berg@vitalcare.health",
    "phone": "+1-555-2044",
    "bio": "Dr. Maria Berg is a board-certified Urology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1045",
    "firstName": "David",
    "lastName": "Brooks",
    "fullName": "Dr. David Brooks",
    "specialty": "Cardiology",
    "city": "New York",
    "yearsExperience": 25,
    "rating": 4.5,
    "patientsServed": 1065,
    "email": "david.brooks@vitalcare.health",
    "phone": "+1-555-2045",
    "bio": "Dr. David Brooks is a board-certified Cardiology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1046",
    "firstName": "Aisha",
    "lastName": "Khan",
    "fullName": "Dr. Aisha Khan",
    "specialty": "Pediatrics",
    "city": "Los Angeles",
    "yearsExperience": 26,
    "rating": 4.6,
    "patientsServed": 1082,
    "email": "aisha.khan@vitalcare.health",
    "phone": "+1-555-2046",
    "bio": "Dr. Aisha Khan is a board-certified Pediatrics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1047",
    "firstName": "Michael",
    "lastName": "Okonkwo",
    "fullName": "Dr. Michael Okonkwo",
    "specialty": "Orthopedics",
    "city": "Chicago",
    "yearsExperience": 27,
    "rating": 4.7,
    "patientsServed": 1099,
    "email": "michael.okonkwo@vitalcare.health",
    "phone": "+1-555-2047",
    "bio": "Dr. Michael Okonkwo is a board-certified Orthopedics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1048",
    "firstName": "Priya",
    "lastName": "Garcia",
    "fullName": "Dr. Priya Garcia",
    "specialty": "Neurology",
    "city": "Houston",
    "yearsExperience": 28,
    "rating": 4.8,
    "patientsServed": 1116,
    "email": "priya.garcia@vitalcare.health",
    "phone": "+1-555-2048",
    "bio": "Dr. Priya Garcia is a board-certified Neurology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1049",
    "firstName": "Robert",
    "lastName": "Torres",
    "fullName": "Dr. Robert Torres",
    "specialty": "Dermatology",
    "city": "Phoenix",
    "yearsExperience": 29,
    "rating": 4.9,
    "patientsServed": 1133,
    "email": "robert.torres@vitalcare.health",
    "phone": "+1-555-2049",
    "bio": "Dr. Robert Torres is a board-certified Dermatology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1050",
    "firstName": "Linda",
    "lastName": "Nguyen",
    "fullName": "Dr. Linda Nguyen",
    "specialty": "Oncology",
    "city": "Philadelphia",
    "yearsExperience": 5,
    "rating": 4.0,
    "patientsServed": 1150,
    "email": "linda.nguyen@vitalcare.health",
    "phone": "+1-555-2050",
    "bio": "Dr. Linda Nguyen is a board-certified Oncology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1051",
    "firstName": "Carlos",
    "lastName": "Anderson",
    "fullName": "Dr. Carlos Anderson",
    "specialty": "Gastroenterology",
    "city": "San Antonio",
    "yearsExperience": 6,
    "rating": 4.1,
    "patientsServed": 1167,
    "email": "carlos.anderson@vitalcare.health",
    "phone": "+1-555-2051",
    "bio": "Dr. Carlos Anderson is a board-certified Gastroenterology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1052",
    "firstName": "Anna",
    "lastName": "Martinez",
    "fullName": "Dr. Anna Martinez",
    "specialty": "Endocrinology",
    "city": "San Diego",
    "yearsExperience": 7,
    "rating": 4.2,
    "patientsServed": 1184,
    "email": "anna.martinez@vitalcare.health",
    "phone": "+1-555-2052",
    "bio": "Dr. Anna Martinez is a board-certified Endocrinology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1053",
    "firstName": "Thomas",
    "lastName": "Wright",
    "fullName": "Dr. Thomas Wright",
    "specialty": "Pulmonology",
    "city": "Dallas",
    "yearsExperience": 8,
    "rating": 4.3,
    "patientsServed": 1201,
    "email": "thomas.wright@vitalcare.health",
    "phone": "+1-555-2053",
    "bio": "Dr. Thomas Wright is a board-certified Pulmonology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1054",
    "firstName": "Fatima",
    "lastName": "Chen",
    "fullName": "Dr. Fatima Chen",
    "specialty": "Family Medicine",
    "city": "Austin",
    "yearsExperience": 9,
    "rating": 4.4,
    "patientsServed": 1218,
    "email": "fatima.chen@vitalcare.health",
    "phone": "+1-555-2054",
    "bio": "Dr. Fatima Chen is a board-certified Family Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1055",
    "firstName": "Daniel",
    "lastName": "Kim",
    "fullName": "Dr. Daniel Kim",
    "specialty": "Internal Medicine",
    "city": "Seattle",
    "yearsExperience": 10,
    "rating": 4.5,
    "patientsServed": 1235,
    "email": "daniel.kim@vitalcare.health",
    "phone": "+1-555-2055",
    "bio": "Dr. Daniel Kim is a board-certified Internal Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1056",
    "firstName": "Sophia",
    "lastName": "Sharma",
    "fullName": "Dr. Sophia Sharma",
    "specialty": "Psychiatry",
    "city": "Boston",
    "yearsExperience": 11,
    "rating": 4.6,
    "patientsServed": 1252,
    "email": "sophia.sharma@vitalcare.health",
    "phone": "+1-555-2056",
    "bio": "Dr. Sophia Sharma is a board-certified Psychiatry specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1057",
    "firstName": "Kevin",
    "lastName": "Rodriguez",
    "fullName": "Dr. Kevin Rodriguez",
    "specialty": "Ophthalmology",
    "city": "Denver",
    "yearsExperience": 12,
    "rating": 4.7,
    "patientsServed": 1269,
    "email": "kevin.rodriguez@vitalcare.health",
    "phone": "+1-555-2057",
    "bio": "Dr. Kevin Rodriguez is a board-certified Ophthalmology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1058",
    "firstName": "Nadia",
    "lastName": "Ali",
    "fullName": "Dr. Nadia Ali",
    "specialty": "ENT",
    "city": "Miami",
    "yearsExperience": 13,
    "rating": 4.8,
    "patientsServed": 1286,
    "email": "nadia.ali@vitalcare.health",
    "phone": "+1-555-2058",
    "bio": "Dr. Nadia Ali is a board-certified ENT specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1059",
    "firstName": "Christopher",
    "lastName": "Lee",
    "fullName": "Dr. Christopher Lee",
    "specialty": "Urology",
    "city": "Atlanta",
    "yearsExperience": 14,
    "rating": 4.9,
    "patientsServed": 1303,
    "email": "christopher.lee@vitalcare.health",
    "phone": "+1-555-2059",
    "bio": "Dr. Christopher Lee is a board-certified Urology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1060",
    "firstName": "Sarah",
    "lastName": "Mitchell",
    "fullName": "Dr. Sarah Mitchell",
    "specialty": "Cardiology",
    "city": "New York",
    "yearsExperience": 15,
    "rating": 4.0,
    "patientsServed": 1320,
    "email": "sarah.mitchell@vitalcare.health",
    "phone": "+1-555-2060",
    "bio": "Dr. Sarah Mitchell is a board-certified Cardiology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1061",
    "firstName": "James",
    "lastName": "Patel",
    "fullName": "Dr. James Patel",
    "specialty": "Pediatrics",
    "city": "Los Angeles",
    "yearsExperience": 16,
    "rating": 4.1,
    "patientsServed": 1337,
    "email": "james.patel@vitalcare.health",
    "phone": "+1-555-2061",
    "bio": "Dr. James Patel is a board-certified Pediatrics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1062",
    "firstName": "Emily",
    "lastName": "Hassan",
    "fullName": "Dr. Emily Hassan",
    "specialty": "Orthopedics",
    "city": "Chicago",
    "yearsExperience": 17,
    "rating": 4.2,
    "patientsServed": 1354,
    "email": "emily.hassan@vitalcare.health",
    "phone": "+1-555-2062",
    "bio": "Dr. Emily Hassan is a board-certified Orthopedics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1063",
    "firstName": "Raj",
    "lastName": "Wilson",
    "fullName": "Dr. Raj Wilson",
    "specialty": "Neurology",
    "city": "Houston",
    "yearsExperience": 18,
    "rating": 4.3,
    "patientsServed": 1371,
    "email": "raj.wilson@vitalcare.health",
    "phone": "+1-555-2063",
    "bio": "Dr. Raj Wilson is a board-certified Neurology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1064",
    "firstName": "Maria",
    "lastName": "Berg",
    "fullName": "Dr. Maria Berg",
    "specialty": "Dermatology",
    "city": "Phoenix",
    "yearsExperience": 19,
    "rating": 4.4,
    "patientsServed": 1388,
    "email": "maria.berg@vitalcare.health",
    "phone": "+1-555-2064",
    "bio": "Dr. Maria Berg is a board-certified Dermatology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1065",
    "firstName": "David",
    "lastName": "Brooks",
    "fullName": "Dr. David Brooks",
    "specialty": "Oncology",
    "city": "Philadelphia",
    "yearsExperience": 20,
    "rating": 4.5,
    "patientsServed": 1405,
    "email": "david.brooks@vitalcare.health",
    "phone": "+1-555-2065",
    "bio": "Dr. David Brooks is a board-certified Oncology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1066",
    "firstName": "Aisha",
    "lastName": "Khan",
    "fullName": "Dr. Aisha Khan",
    "specialty": "Gastroenterology",
    "city": "San Antonio",
    "yearsExperience": 21,
    "rating": 4.6,
    "patientsServed": 1422,
    "email": "aisha.khan@vitalcare.health",
    "phone": "+1-555-2066",
    "bio": "Dr. Aisha Khan is a board-certified Gastroenterology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1067",
    "firstName": "Michael",
    "lastName": "Okonkwo",
    "fullName": "Dr. Michael Okonkwo",
    "specialty": "Endocrinology",
    "city": "San Diego",
    "yearsExperience": 22,
    "rating": 4.7,
    "patientsServed": 1439,
    "email": "michael.okonkwo@vitalcare.health",
    "phone": "+1-555-2067",
    "bio": "Dr. Michael Okonkwo is a board-certified Endocrinology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1068",
    "firstName": "Priya",
    "lastName": "Garcia",
    "fullName": "Dr. Priya Garcia",
    "specialty": "Pulmonology",
    "city": "Dallas",
    "yearsExperience": 23,
    "rating": 4.8,
    "patientsServed": 1456,
    "email": "priya.garcia@vitalcare.health",
    "phone": "+1-555-2068",
    "bio": "Dr. Priya Garcia is a board-certified Pulmonology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1069",
    "firstName": "Robert",
    "lastName": "Torres",
    "fullName": "Dr. Robert Torres",
    "specialty": "Family Medicine",
    "city": "Austin",
    "yearsExperience": 24,
    "rating": 4.9,
    "patientsServed": 1473,
    "email": "robert.torres@vitalcare.health",
    "phone": "+1-555-2069",
    "bio": "Dr. Robert Torres is a board-certified Family Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1070",
    "firstName": "Linda",
    "lastName": "Nguyen",
    "fullName": "Dr. Linda Nguyen",
    "specialty": "Internal Medicine",
    "city": "Seattle",
    "yearsExperience": 25,
    "rating": 4.0,
    "patientsServed": 1490,
    "email": "linda.nguyen@vitalcare.health",
    "phone": "+1-555-2070",
    "bio": "Dr. Linda Nguyen is a board-certified Internal Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1071",
    "firstName": "Carlos",
    "lastName": "Anderson",
    "fullName": "Dr. Carlos Anderson",
    "specialty": "Psychiatry",
    "city": "Boston",
    "yearsExperience": 26,
    "rating": 4.1,
    "patientsServed": 1507,
    "email": "carlos.anderson@vitalcare.health",
    "phone": "+1-555-2071",
    "bio": "Dr. Carlos Anderson is a board-certified Psychiatry specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1072",
    "firstName": "Anna",
    "lastName": "Martinez",
    "fullName": "Dr. Anna Martinez",
    "specialty": "Ophthalmology",
    "city": "Denver",
    "yearsExperience": 27,
    "rating": 4.2,
    "patientsServed": 1524,
    "email": "anna.martinez@vitalcare.health",
    "phone": "+1-555-2072",
    "bio": "Dr. Anna Martinez is a board-certified Ophthalmology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1073",
    "firstName": "Thomas",
    "lastName": "Wright",
    "fullName": "Dr. Thomas Wright",
    "specialty": "ENT",
    "city": "Miami",
    "yearsExperience": 28,
    "rating": 4.3,
    "patientsServed": 1541,
    "email": "thomas.wright@vitalcare.health",
    "phone": "+1-555-2073",
    "bio": "Dr. Thomas Wright is a board-certified ENT specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1074",
    "firstName": "Fatima",
    "lastName": "Chen",
    "fullName": "Dr. Fatima Chen",
    "specialty": "Urology",
    "city": "Atlanta",
    "yearsExperience": 29,
    "rating": 4.4,
    "patientsServed": 1558,
    "email": "fatima.chen@vitalcare.health",
    "phone": "+1-555-2074",
    "bio": "Dr. Fatima Chen is a board-certified Urology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1075",
    "firstName": "Daniel",
    "lastName": "Kim",
    "fullName": "Dr. Daniel Kim",
    "specialty": "Cardiology",
    "city": "New York",
    "yearsExperience": 5,
    "rating": 4.5,
    "patientsServed": 1575,
    "email": "daniel.kim@vitalcare.health",
    "phone": "+1-555-2075",
    "bio": "Dr. Daniel Kim is a board-certified Cardiology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1076",
    "firstName": "Sophia",
    "lastName": "Sharma",
    "fullName": "Dr. Sophia Sharma",
    "specialty": "Pediatrics",
    "city": "Los Angeles",
    "yearsExperience": 6,
    "rating": 4.6,
    "patientsServed": 1592,
    "email": "sophia.sharma@vitalcare.health",
    "phone": "+1-555-2076",
    "bio": "Dr. Sophia Sharma is a board-certified Pediatrics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1077",
    "firstName": "Kevin",
    "lastName": "Rodriguez",
    "fullName": "Dr. Kevin Rodriguez",
    "specialty": "Orthopedics",
    "city": "Chicago",
    "yearsExperience": 7,
    "rating": 4.7,
    "patientsServed": 1609,
    "email": "kevin.rodriguez@vitalcare.health",
    "phone": "+1-555-2077",
    "bio": "Dr. Kevin Rodriguez is a board-certified Orthopedics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1078",
    "firstName": "Nadia",
    "lastName": "Ali",
    "fullName": "Dr. Nadia Ali",
    "specialty": "Neurology",
    "city": "Houston",
    "yearsExperience": 8,
    "rating": 4.8,
    "patientsServed": 1626,
    "email": "nadia.ali@vitalcare.health",
    "phone": "+1-555-2078",
    "bio": "Dr. Nadia Ali is a board-certified Neurology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1079",
    "firstName": "Christopher",
    "lastName": "Lee",
    "fullName": "Dr. Christopher Lee",
    "specialty": "Dermatology",
    "city": "Phoenix",
    "yearsExperience": 9,
    "rating": 4.9,
    "patientsServed": 1643,
    "email": "christopher.lee@vitalcare.health",
    "phone": "+1-555-2079",
    "bio": "Dr. Christopher Lee is a board-certified Dermatology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1080",
    "firstName": "Sarah",
    "lastName": "Mitchell",
    "fullName": "Dr. Sarah Mitchell",
    "specialty": "Oncology",
    "city": "Philadelphia",
    "yearsExperience": 10,
    "rating": 4.0,
    "patientsServed": 1660,
    "email": "sarah.mitchell@vitalcare.health",
    "phone": "+1-555-2080",
    "bio": "Dr. Sarah Mitchell is a board-certified Oncology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1081",
    "firstName": "James",
    "lastName": "Patel",
    "fullName": "Dr. James Patel",
    "specialty": "Gastroenterology",
    "city": "San Antonio",
    "yearsExperience": 11,
    "rating": 4.1,
    "patientsServed": 1677,
    "email": "james.patel@vitalcare.health",
    "phone": "+1-555-2081",
    "bio": "Dr. James Patel is a board-certified Gastroenterology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1082",
    "firstName": "Emily",
    "lastName": "Hassan",
    "fullName": "Dr. Emily Hassan",
    "specialty": "Endocrinology",
    "city": "San Diego",
    "yearsExperience": 12,
    "rating": 4.2,
    "patientsServed": 1694,
    "email": "emily.hassan@vitalcare.health",
    "phone": "+1-555-2082",
    "bio": "Dr. Emily Hassan is a board-certified Endocrinology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1083",
    "firstName": "Raj",
    "lastName": "Wilson",
    "fullName": "Dr. Raj Wilson",
    "specialty": "Pulmonology",
    "city": "Dallas",
    "yearsExperience": 13,
    "rating": 4.3,
    "patientsServed": 1711,
    "email": "raj.wilson@vitalcare.health",
    "phone": "+1-555-2083",
    "bio": "Dr. Raj Wilson is a board-certified Pulmonology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1084",
    "firstName": "Maria",
    "lastName": "Berg",
    "fullName": "Dr. Maria Berg",
    "specialty": "Family Medicine",
    "city": "Austin",
    "yearsExperience": 14,
    "rating": 4.4,
    "patientsServed": 1728,
    "email": "maria.berg@vitalcare.health",
    "phone": "+1-555-2084",
    "bio": "Dr. Maria Berg is a board-certified Family Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1085",
    "firstName": "David",
    "lastName": "Brooks",
    "fullName": "Dr. David Brooks",
    "specialty": "Internal Medicine",
    "city": "Seattle",
    "yearsExperience": 15,
    "rating": 4.5,
    "patientsServed": 1745,
    "email": "david.brooks@vitalcare.health",
    "phone": "+1-555-2085",
    "bio": "Dr. David Brooks is a board-certified Internal Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1086",
    "firstName": "Aisha",
    "lastName": "Khan",
    "fullName": "Dr. Aisha Khan",
    "specialty": "Psychiatry",
    "city": "Boston",
    "yearsExperience": 16,
    "rating": 4.6,
    "patientsServed": 1762,
    "email": "aisha.khan@vitalcare.health",
    "phone": "+1-555-2086",
    "bio": "Dr. Aisha Khan is a board-certified Psychiatry specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1087",
    "firstName": "Michael",
    "lastName": "Okonkwo",
    "fullName": "Dr. Michael Okonkwo",
    "specialty": "Ophthalmology",
    "city": "Denver",
    "yearsExperience": 17,
    "rating": 4.7,
    "patientsServed": 1779,
    "email": "michael.okonkwo@vitalcare.health",
    "phone": "+1-555-2087",
    "bio": "Dr. Michael Okonkwo is a board-certified Ophthalmology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1088",
    "firstName": "Priya",
    "lastName": "Garcia",
    "fullName": "Dr. Priya Garcia",
    "specialty": "ENT",
    "city": "Miami",
    "yearsExperience": 18,
    "rating": 4.8,
    "patientsServed": 1796,
    "email": "priya.garcia@vitalcare.health",
    "phone": "+1-555-2088",
    "bio": "Dr. Priya Garcia is a board-certified ENT specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1089",
    "firstName": "Robert",
    "lastName": "Torres",
    "fullName": "Dr. Robert Torres",
    "specialty": "Urology",
    "city": "Atlanta",
    "yearsExperience": 19,
    "rating": 4.9,
    "patientsServed": 1813,
    "email": "robert.torres@vitalcare.health",
    "phone": "+1-555-2089",
    "bio": "Dr. Robert Torres is a board-certified Urology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1090",
    "firstName": "Linda",
    "lastName": "Nguyen",
    "fullName": "Dr. Linda Nguyen",
    "specialty": "Cardiology",
    "city": "New York",
    "yearsExperience": 20,
    "rating": 4.0,
    "patientsServed": 1830,
    "email": "linda.nguyen@vitalcare.health",
    "phone": "+1-555-2090",
    "bio": "Dr. Linda Nguyen is a board-certified Cardiology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1091",
    "firstName": "Carlos",
    "lastName": "Anderson",
    "fullName": "Dr. Carlos Anderson",
    "specialty": "Pediatrics",
    "city": "Los Angeles",
    "yearsExperience": 21,
    "rating": 4.1,
    "patientsServed": 1847,
    "email": "carlos.anderson@vitalcare.health",
    "phone": "+1-555-2091",
    "bio": "Dr. Carlos Anderson is a board-certified Pediatrics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1092",
    "firstName": "Anna",
    "lastName": "Martinez",
    "fullName": "Dr. Anna Martinez",
    "specialty": "Orthopedics",
    "city": "Chicago",
    "yearsExperience": 22,
    "rating": 4.2,
    "patientsServed": 1864,
    "email": "anna.martinez@vitalcare.health",
    "phone": "+1-555-2092",
    "bio": "Dr. Anna Martinez is a board-certified Orthopedics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1093",
    "firstName": "Thomas",
    "lastName": "Wright",
    "fullName": "Dr. Thomas Wright",
    "specialty": "Neurology",
    "city": "Houston",
    "yearsExperience": 23,
    "rating": 4.3,
    "patientsServed": 1881,
    "email": "thomas.wright@vitalcare.health",
    "phone": "+1-555-2093",
    "bio": "Dr. Thomas Wright is a board-certified Neurology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1094",
    "firstName": "Fatima",
    "lastName": "Chen",
    "fullName": "Dr. Fatima Chen",
    "specialty": "Dermatology",
    "city": "Phoenix",
    "yearsExperience": 24,
    "rating": 4.4,
    "patientsServed": 1898,
    "email": "fatima.chen@vitalcare.health",
    "phone": "+1-555-2094",
    "bio": "Dr. Fatima Chen is a board-certified Dermatology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1095",
    "firstName": "Daniel",
    "lastName": "Kim",
    "fullName": "Dr. Daniel Kim",
    "specialty": "Oncology",
    "city": "Philadelphia",
    "yearsExperience": 25,
    "rating": 4.5,
    "patientsServed": 1915,
    "email": "daniel.kim@vitalcare.health",
    "phone": "+1-555-2095",
    "bio": "Dr. Daniel Kim is a board-certified Oncology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1096",
    "firstName": "Sophia",
    "lastName": "Sharma",
    "fullName": "Dr. Sophia Sharma",
    "specialty": "Gastroenterology",
    "city": "San Antonio",
    "yearsExperience": 26,
    "rating": 4.6,
    "patientsServed": 1932,
    "email": "sophia.sharma@vitalcare.health",
    "phone": "+1-555-2096",
    "bio": "Dr. Sophia Sharma is a board-certified Gastroenterology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1097",
    "firstName": "Kevin",
    "lastName": "Rodriguez",
    "fullName": "Dr. Kevin Rodriguez",
    "specialty": "Endocrinology",
    "city": "San Diego",
    "yearsExperience": 27,
    "rating": 4.7,
    "patientsServed": 1949,
    "email": "kevin.rodriguez@vitalcare.health",
    "phone": "+1-555-2097",
    "bio": "Dr. Kevin Rodriguez is a board-certified Endocrinology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1098",
    "firstName": "Nadia",
    "lastName": "Ali",
    "fullName": "Dr. Nadia Ali",
    "specialty": "Pulmonology",
    "city": "Dallas",
    "yearsExperience": 28,
    "rating": 4.8,
    "patientsServed": 1966,
    "email": "nadia.ali@vitalcare.health",
    "phone": "+1-555-2098",
    "bio": "Dr. Nadia Ali is a board-certified Pulmonology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1099",
    "firstName": "Christopher",
    "lastName": "Lee",
    "fullName": "Dr. Christopher Lee",
    "specialty": "Family Medicine",
    "city": "Austin",
    "yearsExperience": 29,
    "rating": 4.9,
    "patientsServed": 1983,
    "email": "christopher.lee@vitalcare.health",
    "phone": "+1-555-2099",
    "bio": "Dr. Christopher Lee is a board-certified Family Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1100",
    "firstName": "Sarah",
    "lastName": "Mitchell",
    "fullName": "Dr. Sarah Mitchell",
    "specialty": "Internal Medicine",
    "city": "Seattle",
    "yearsExperience": 5,
    "rating": 4.0,
    "patientsServed": 2000,
    "email": "sarah.mitchell@vitalcare.health",
    "phone": "+1-555-2100",
    "bio": "Dr. Sarah Mitchell is a board-certified Internal Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1101",
    "firstName": "James",
    "lastName": "Patel",
    "fullName": "Dr. James Patel",
    "specialty": "Psychiatry",
    "city": "Boston",
    "yearsExperience": 6,
    "rating": 4.1,
    "patientsServed": 2017,
    "email": "james.patel@vitalcare.health",
    "phone": "+1-555-2101",
    "bio": "Dr. James Patel is a board-certified Psychiatry specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1102",
    "firstName": "Emily",
    "lastName": "Hassan",
    "fullName": "Dr. Emily Hassan",
    "specialty": "Ophthalmology",
    "city": "Denver",
    "yearsExperience": 7,
    "rating": 4.2,
    "patientsServed": 2034,
    "email": "emily.hassan@vitalcare.health",
    "phone": "+1-555-2102",
    "bio": "Dr. Emily Hassan is a board-certified Ophthalmology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1103",
    "firstName": "Raj",
    "lastName": "Wilson",
    "fullName": "Dr. Raj Wilson",
    "specialty": "ENT",
    "city": "Miami",
    "yearsExperience": 8,
    "rating": 4.3,
    "patientsServed": 2051,
    "email": "raj.wilson@vitalcare.health",
    "phone": "+1-555-2103",
    "bio": "Dr. Raj Wilson is a board-certified ENT specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1104",
    "firstName": "Maria",
    "lastName": "Berg",
    "fullName": "Dr. Maria Berg",
    "specialty": "Urology",
    "city": "Atlanta",
    "yearsExperience": 9,
    "rating": 4.4,
    "patientsServed": 2068,
    "email": "maria.berg@vitalcare.health",
    "phone": "+1-555-2104",
    "bio": "Dr. Maria Berg is a board-certified Urology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1105",
    "firstName": "David",
    "lastName": "Brooks",
    "fullName": "Dr. David Brooks",
    "specialty": "Cardiology",
    "city": "New York",
    "yearsExperience": 10,
    "rating": 4.5,
    "patientsServed": 2085,
    "email": "david.brooks@vitalcare.health",
    "phone": "+1-555-2105",
    "bio": "Dr. David Brooks is a board-certified Cardiology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1106",
    "firstName": "Aisha",
    "lastName": "Khan",
    "fullName": "Dr. Aisha Khan",
    "specialty": "Pediatrics",
    "city": "Los Angeles",
    "yearsExperience": 11,
    "rating": 4.6,
    "patientsServed": 2102,
    "email": "aisha.khan@vitalcare.health",
    "phone": "+1-555-2106",
    "bio": "Dr. Aisha Khan is a board-certified Pediatrics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1107",
    "firstName": "Michael",
    "lastName": "Okonkwo",
    "fullName": "Dr. Michael Okonkwo",
    "specialty": "Orthopedics",
    "city": "Chicago",
    "yearsExperience": 12,
    "rating": 4.7,
    "patientsServed": 2119,
    "email": "michael.okonkwo@vitalcare.health",
    "phone": "+1-555-2107",
    "bio": "Dr. Michael Okonkwo is a board-certified Orthopedics specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1108",
    "firstName": "Priya",
    "lastName": "Garcia",
    "fullName": "Dr. Priya Garcia",
    "specialty": "Neurology",
    "city": "Houston",
    "yearsExperience": 13,
    "rating": 4.8,
    "patientsServed": 2136,
    "email": "priya.garcia@vitalcare.health",
    "phone": "+1-555-2108",
    "bio": "Dr. Priya Garcia is a board-certified Neurology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1109",
    "firstName": "Robert",
    "lastName": "Torres",
    "fullName": "Dr. Robert Torres",
    "specialty": "Dermatology",
    "city": "Phoenix",
    "yearsExperience": 14,
    "rating": 4.9,
    "patientsServed": 2153,
    "email": "robert.torres@vitalcare.health",
    "phone": "+1-555-2109",
    "bio": "Dr. Robert Torres is a board-certified Dermatology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1110",
    "firstName": "Linda",
    "lastName": "Nguyen",
    "fullName": "Dr. Linda Nguyen",
    "specialty": "Oncology",
    "city": "Philadelphia",
    "yearsExperience": 15,
    "rating": 4.0,
    "patientsServed": 2170,
    "email": "linda.nguyen@vitalcare.health",
    "phone": "+1-555-2110",
    "bio": "Dr. Linda Nguyen is a board-certified Oncology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1111",
    "firstName": "Carlos",
    "lastName": "Anderson",
    "fullName": "Dr. Carlos Anderson",
    "specialty": "Gastroenterology",
    "city": "San Antonio",
    "yearsExperience": 16,
    "rating": 4.1,
    "patientsServed": 2187,
    "email": "carlos.anderson@vitalcare.health",
    "phone": "+1-555-2111",
    "bio": "Dr. Carlos Anderson is a board-certified Gastroenterology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1112",
    "firstName": "Anna",
    "lastName": "Martinez",
    "fullName": "Dr. Anna Martinez",
    "specialty": "Endocrinology",
    "city": "San Diego",
    "yearsExperience": 17,
    "rating": 4.2,
    "patientsServed": 2204,
    "email": "anna.martinez@vitalcare.health",
    "phone": "+1-555-2112",
    "bio": "Dr. Anna Martinez is a board-certified Endocrinology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1113",
    "firstName": "Thomas",
    "lastName": "Wright",
    "fullName": "Dr. Thomas Wright",
    "specialty": "Pulmonology",
    "city": "Dallas",
    "yearsExperience": 18,
    "rating": 4.3,
    "patientsServed": 2221,
    "email": "thomas.wright@vitalcare.health",
    "phone": "+1-555-2113",
    "bio": "Dr. Thomas Wright is a board-certified Pulmonology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1114",
    "firstName": "Fatima",
    "lastName": "Chen",
    "fullName": "Dr. Fatima Chen",
    "specialty": "Family Medicine",
    "city": "Austin",
    "yearsExperience": 19,
    "rating": 4.4,
    "patientsServed": 2238,
    "email": "fatima.chen@vitalcare.health",
    "phone": "+1-555-2114",
    "bio": "Dr. Fatima Chen is a board-certified Family Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1115",
    "firstName": "Daniel",
    "lastName": "Kim",
    "fullName": "Dr. Daniel Kim",
    "specialty": "Internal Medicine",
    "city": "Seattle",
    "yearsExperience": 20,
    "rating": 4.5,
    "patientsServed": 2255,
    "email": "daniel.kim@vitalcare.health",
    "phone": "+1-555-2115",
    "bio": "Dr. Daniel Kim is a board-certified Internal Medicine specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Hindi"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1116",
    "firstName": "Sophia",
    "lastName": "Sharma",
    "fullName": "Dr. Sophia Sharma",
    "specialty": "Psychiatry",
    "city": "Boston",
    "yearsExperience": 21,
    "rating": 4.6,
    "patientsServed": 2272,
    "email": "sophia.sharma@vitalcare.health",
    "phone": "+1-555-2116",
    "bio": "Dr. Sophia Sharma is a board-certified Psychiatry specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": false,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1117",
    "firstName": "Kevin",
    "lastName": "Rodriguez",
    "fullName": "Dr. Kevin Rodriguez",
    "specialty": "Ophthalmology",
    "city": "Denver",
    "yearsExperience": 22,
    "rating": 4.7,
    "patientsServed": 2289,
    "email": "kevin.rodriguez@vitalcare.health",
    "phone": "+1-555-2117",
    "bio": "Dr. Kevin Rodriguez is a board-certified Ophthalmology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English",
      "Spanish"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": false
  },
  {
    "id": "doc-1118",
    "firstName": "Nadia",
    "lastName": "Ali",
    "fullName": "Dr. Nadia Ali",
    "specialty": "ENT",
    "city": "Miami",
    "yearsExperience": 23,
    "rating": 4.8,
    "patientsServed": 2306,
    "email": "nadia.ali@vitalcare.health",
    "phone": "+1-555-2118",
    "bio": "Dr. Nadia Ali is a board-certified ENT specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  },
  {
    "id": "doc-1119",
    "firstName": "Christopher",
    "lastName": "Lee",
    "fullName": "Dr. Christopher Lee",
    "specialty": "Urology",
    "city": "Atlanta",
    "yearsExperience": 24,
    "rating": 4.9,
    "patientsServed": 2323,
    "email": "christopher.lee@vitalcare.health",
    "phone": "+1-555-2119",
    "bio": "Dr. Christopher Lee is a board-certified Urology specialist with extensive clinical experience. Known for patient-centered care and clear communication.",
    "available": true,
    "languages": [
      "English"
    ],
    "education": "MD, Board Certified",
    "acceptingNewPatients": true
  }
];

const DoctorStore = {
  list(filters = {}) {
    let result = [...doctors];
    if (filters.specialty) {
      const s = filters.specialty.toLowerCase();
      result = result.filter(d => d.specialty.toLowerCase().includes(s));
    }
    if (filters.city) {
      const c = filters.city.toLowerCase();
      result = result.filter(d => d.city.toLowerCase().includes(c));
    }
    if (filters.name) {
      const n = filters.name.toLowerCase();
      result = result.filter(d => d.fullName.toLowerCase().includes(n));
    }
    if (filters.available === "true" || filters.available === true) {
      result = result.filter(d => d.available);
    }
    if (filters.acceptingNewPatients === "true" || filters.acceptingNewPatients === true) {
      result = result.filter(d => d.acceptingNewPatients);
    }
    const page = parseInt(filters.page, 10) || 1;
    const limit = Math.min(50, parseInt(filters.limit, 10) || 20);
    const start = (page - 1) * limit;
    return {
      data: result.slice(start, start + limit),
      total: result.length,
      page,
      limit,
      totalPages: Math.ceil(result.length / limit)
    };
  },

  findById(id) {
    return doctors.find(d => d.id === id) || null;
  },

  getSpecialties() {
    return [...new Set(doctors.map(d => d.specialty))].sort();
  },

  getCities() {
    return [...new Set(doctors.map(d => d.city))].sort();
  },

  getStats() {
    return {
      totalDoctors: doctors.length,
      bySpecialty: doctors.reduce((acc, d) => {
        acc[d.specialty] = (acc[d.specialty] || 0) + 1;
        return acc;
      }, {}),
      averageRating: (doctors.reduce((s, d) => s + d.rating, 0) / doctors.length).toFixed(2),
      acceptingNew: doctors.filter(d => d.acceptingNewPatients).length
    };
  }
};

module.exports = { DoctorStore, doctors };

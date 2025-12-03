import { Student } from "./types";

// REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
export const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const ALLOWED_EMAIL = "hongjinwoo@simin.hs.kr";

// Helper to create student objects
const createStudent = (number: string, name: string, hasSampleData = false): Student => ({
  id: `s${number}`,
  name,
  studentNumber: number,
  records: hasSampleData ? [
    {
      id: `r-${number}-1`,
      date: "2025-03-04",
      content: "수업 시간에 교사의 질문에 경청하며, 핵심을 파악하여 논리적으로 대답하는 모습이 인상적임. 학습에 대한 열의가 높고 과제 수행 능력이 우수함."
    },
    {
      id: `r-${number}-2`,
      date: "2025-03-10",
      content: "학급 회의 시 친구들의 의견을 존중하며 자신의 의견을 조리 있게 개진함. 공동체 문제 해결을 위해 적극적으로 아이디어를 제시하는 태도를 보임."
    },
    {
      id: `r-${number}-3`,
      date: "2025-03-20",
      content: "쉬는 시간에 어려워하는 친구에게 수학 문제를 친절하게 설명해주는 등 배려심이 깊고 교우 관계가 원만함."
    }
  ] : []
});

export const MOCK_STUDENTS: Student[] = [
  // 11반
  createStudent("1101", "강지현", true), // Sample data included for testing
  createStudent("1102", "강형민"),
  createStudent("1103", "고대현"),
  createStudent("1104", "고연우"),
  createStudent("1107", "김민규"),
  createStudent("1108", "김민성"),
  createStudent("1109", "김부관"),
  createStudent("1110", "김은찬"),
  createStudent("1112", "류도검"),
  createStudent("1113", "박세환"),
  createStudent("1114", "박시현"),
  createStudent("1115", "백인우"),
  createStudent("1116", "변성재"),
  createStudent("1117", "변준섭"),
  createStudent("1118", "서진검"),
  createStudent("1119", "서형준"),
  createStudent("1121", "안상윤"),
  createStudent("1124", "오시우"),
  createStudent("1126", "이준우"),
  createStudent("1127", "전민관"),

  // 16반
  createStudent("1601", "강동윤"),
  createStudent("1602", "강민기"),
  createStudent("1603", "김민수"),
  createStudent("1605", "김정헌"),
  createStudent("1606", "도효상"),
  createStudent("1607", "박주안"),
  createStudent("1610", "배지한"),
  createStudent("1611", "배호준"),
  createStudent("1613", "안정훈"),
  createStudent("1614", "양민서"),
  createStudent("1615", "이성호"),
  createStudent("1616", "이준협"),
  createStudent("1617", "이태"),
  createStudent("1618", "임진서"),
  createStudent("1619", "장정훈"),
  createStudent("1620", "정찬우"),
  createStudent("1621", "조우진"),
  createStudent("1622", "차호연"),
  createStudent("1623", "채진현"),
  createStudent("1624", "최강민"),
  createStudent("1625", "최시영"),
  createStudent("1626", "최재원"),
  createStudent("1627", "하건우"),
  createStudent("1628", "강정빈")
];
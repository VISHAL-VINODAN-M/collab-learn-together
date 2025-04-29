
import { Subject, Material, StudySession } from "../types";

export const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Java Programming",
    description: "Learn the fundamentals of Java programming language, from basic syntax to advanced concepts like multithreading and collections.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Programming",
    difficulty: "intermediate",
    enrolledCount: 1245
  },
  {
    id: "2",
    name: "Web Development",
    description: "Master HTML, CSS, JavaScript and popular frameworks to build responsive and interactive websites.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Programming",
    difficulty: "beginner",
    enrolledCount: 1589
  },
  {
    id: "3",
    name: "Data Structures",
    description: "Understand fundamental data structures like arrays, linked lists, trees, and graphs along with their implementations.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Computer Science",
    difficulty: "advanced",
    enrolledCount: 987
  },
  {
    id: "4",
    name: "Machine Learning",
    description: "Explore the principles behind machine learning algorithms and their applications in solving real-world problems.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Data Science",
    difficulty: "advanced",
    enrolledCount: 756
  },
  {
    id: "5",
    name: "Mobile App Development",
    description: "Learn to build native mobile applications for iOS and Android platforms using modern frameworks.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Programming",
    difficulty: "intermediate",
    enrolledCount: 1023
  },
  {
    id: "6",
    name: "Database Systems",
    description: "Master relational database concepts, SQL, and database management systems like MySQL and PostgreSQL.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Computer Science",
    difficulty: "intermediate",
    enrolledCount: 842
  }
];

export const mockMaterials: { [key: string]: Material[] } = {
  "1": [
    {
      id: "101",
      subjectId: "1",
      title: "Introduction to Java",
      description: "Basic concepts of Java programming language",
      type: "article",
      contentUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      createdAt: new Date("2023-01-15")
    },
    {
      id: "102",
      subjectId: "1",
      title: "Object-Oriented Programming in Java",
      description: "Learn about classes, objects, inheritance, polymorphism, and more",
      type: "video",
      contentUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      createdAt: new Date("2023-01-18")
    },
    {
      id: "103",
      subjectId: "1",
      title: "Java Collections Framework",
      description: "Explore Lists, Sets, Maps, and other collection types",
      type: "article",
      contentUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      createdAt: new Date("2023-01-22")
    }
  ],
  "2": [
    {
      id: "201",
      subjectId: "2",
      title: "HTML & CSS Fundamentals",
      description: "Core concepts of web markup and styling",
      type: "article",
      contentUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      createdAt: new Date("2023-02-05")
    },
    {
      id: "202",
      subjectId: "2",
      title: "JavaScript Essentials",
      description: "Learn the basics of JavaScript programming",
      type: "video",
      contentUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      createdAt: new Date("2023-02-10")
    }
  ],
  "3": [
    {
      id: "301",
      subjectId: "3",
      title: "Arrays and Linked Lists",
      description: "Understanding fundamental data structures",
      type: "article",
      contentUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      createdAt: new Date("2023-03-01")
    },
    {
      id: "302",
      subjectId: "3",
      title: "Trees and Graphs",
      description: "Advanced data structures for complex problems",
      type: "video",
      contentUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      createdAt: new Date("2023-03-08")
    }
  ]
};

export const mockStudySessions: StudySession[] = [
  {
    id: "1001",
    title: "Java Basics Study Group",
    subjectId: "1",
    hostId: "user1",
    status: "active",
    startTime: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
    maxParticipants: 10,
    currentParticipants: 3,
    channelId: "java-basics-101"
  },
  {
    id: "1002",
    title: "Web Development Workshop",
    subjectId: "2",
    hostId: "user2",
    status: "scheduled",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    maxParticipants: 15,
    currentParticipants: 8,
    channelId: "webdev-workshop-202"
  },
  {
    id: "1003",
    title: "Data Structures Problem Solving",
    subjectId: "3",
    hostId: "user3",
    status: "active",
    startTime: new Date(Date.now() - 1000 * 60 * 30), // Started 30 mins ago
    maxParticipants: 8,
    currentParticipants: 6,
    channelId: "ds-problems-303"
  }
];

export const getSubjects = (): Promise<Subject[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSubjects);
    }, 500);
  });
};

export const getSubject = (id: string): Promise<Subject | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const subject = mockSubjects.find(s => s.id === id);
      resolve(subject);
    }, 300);
  });
};

export const getMaterials = (subjectId: string): Promise<Material[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMaterials[subjectId] || []);
    }, 400);
  });
};

export const getStudySessions = (): Promise<StudySession[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStudySessions);
    }, 500);
  });
};

export const getStudySession = (id: string): Promise<StudySession | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const session = mockStudySessions.find(s => s.id === id);
      resolve(session);
    }, 300);
  });
};

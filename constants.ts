import { BlogPost, ProfileData, Certificate, Skill } from './types';

export const PROFILE: ProfileData = {
  name: "Phùng Trọng Hưng",
  avatar: "/avatar.jpg",
  role: {
    vi: "Kỹ sư AI",
    en: "AI Engineer"
  },
  bio: {
    vi: "Đam mê nghiên cứu và phát triển các hệ thống deep learning cho ứng dụng thực tế. Tập trung vào tối ưu hóa hiệu suất mô hình và triển khai các giải pháp AI hiệu quả, thân thiện với người dùng mang lại giá trị thực sự.",
    en: "Passionate about research and development of deep learning systems for real-world applications. Focus on optimizing model performance and deploying efficient, user-friendly AI solutions that deliver real value."
  },
  socials: [
    { platform: "GitHub", url: "https://github.com/Thung0808", icon: "github" },
    { platform: "Email", url: "mailto:phungtronghung0808@gmail.com", icon: "email" },
    { platform: "Phone", url: "tel:0398655377", icon: "phone" }
  ]
};

export const SKILLS: Skill[] = [
  { name: "Python", level: 95 },
  { name: "TensorFlow", level: 90 },
  { name: "PyTorch", level: 90 },
  { name: "OpenCV", level: 85 },
  { name: "YOLO", level: 85 },
  { name: "Transformers", level: 80 },
  { name: "Scikit-learn", level: 85 },
  { name: "MediaPipe", level: 80 },
  { name: "XGBoost/LightGBM", level: 75 },
  { name: "Java", level: 70 },
  { name: "C/C++", level: 70 },
  { name: "C#", level: 65 }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: { vi: "Chứng chỉ Kỹ năng Giao tiếp và Làm việc Nhóm", en: "Certificate in Communication and Teamwork Skills" },
    issuer: "HUTECH",
    date: "06/2025",
    image: "/cert-communication.jpg"
  },
  {
    id: 2,
    title: { vi: "Chứng chỉ Tiếng Anh Trình độ B1", en: "English Level B1 Certificate" },
    issuer: "Language Center",
    date: "12/2024",
    image: "/cert-english-b1.jpg"
  },
  {
    id: 3,
    title: { vi: "Networking Basics - Cisco Networking Academy", en: "Networking Basics - Cisco Networking Academy" },
    issuer: "Cisco Networking Academy",
    date: "11/2025",
    image: "/screenshot-networking-basics.png"
  },
  {
    id: 4,
    title: { vi: "JavaScript Essentials 2 - Cisco Networking Academy", en: "JavaScript Essentials 2 - Cisco Networking Academy" },
    issuer: "Cisco Networking Academy & JS Institute",
    date: "11/2025",
    image: "/screenshot-javascript-essentials.png"
  },
  {
    id: 5,
    title: { vi: "Java Essentials 1 - Cisco Networking Academy", en: "Java Essentials 1 - Cisco Networking Academy" },
    issuer: "Cisco Networking Academy",
    date: "12/2025",
    image: "/screenshot-java-essentials.png"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "ecg-heart-disease-detection",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Deep Learning", "Healthcare", "Research"],
    codeLanguage: "python",
    codeSnippet: `import tensorflow as tf
from tensorflow.keras import layers

# Build ECG classification model
model = tf.keras.Sequential([
    layers.Conv2D(32, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dense(5, activation='softmax')
])`,
    vi: {
      title: "Phát hiện Bệnh Tim từ Ảnh ECG bằng Deep Learning",
      excerpt: "Nghiên cứu và phát triển mô hình deep learning độ chính xác cao cho nhận dạng ảnh ECG.",
      content: "Dự án nghiên cứu tại lab từ tháng 3/2025. Tôi đã phát triển mô hình deep learning có khả năng phát hiện bệnh tim từ hình ảnh điện tâm đồ (ECG) với độ chính xác cao. Dự án tích hợp nhiều mô hình và bộ dữ liệu khác nhau để cải thiện hiệu suất. Áp dụng kỹ thuật Explainable AI (XAI) để giải thích hành vi của mô hình, giúp bác sĩ hiểu rõ cơ sở quyết định của AI.",
      date: "03/2025",
      readTime: "10 phút đọc"
    },
    en: {
      title: "Heart Disease Detection from ECG Images using Deep Learning",
      excerpt: "Research and develop high-accuracy deep learning model for ECG image recognition.",
      content: "Research project at lab since March 2025. I developed a deep learning model capable of detecting heart disease from electrocardiogram (ECG) images with high accuracy. The project integrates multiple models and datasets to improve performance. Applied Explainable AI (XAI) techniques to interpret model behavior, helping doctors understand the basis of AI decisions.",
      date: "03/2025",
      readTime: "10 min read"
    }
  },
  {
    id: 2,
    slug: "motion-tracking-rehabilitation",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Computer Vision", "MediaPipe", "Healthcare"],
    codeLanguage: "python",
    codeSnippet: `import cv2
import mediapipe as mp

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Track human motion for rehabilitation
def track_motion(frame):
    results = pose.process(frame)
    if results.pose_landmarks:
        # Process landmarks for game
        analyze_movement(results.pose_landmarks)`,
    vi: {
      title: "Theo dõi Chuyển động Con người cho Trò chơi Phục hồi Chức năng",
      excerpt: "Xây dựng ứng dụng Computer Vision tích hợp trò chơi hỗ trợ phục hồi chức năng vận động.",
      content: "Dự án từ tháng 9-10/2024. Phát triển ứng dụng sử dụng Computer Vision để theo dõi chuyển động con người, tích hợp với các trò chơi phục hồi chức năng. Hệ thống được thiết kế phù hợp cho cả trẻ em và người cao tuổi. Triển khai mô hình theo dõi chuyển động chính xác sử dụng MediaPipe và OpenCV.",
      date: "09/2024",
      readTime: "8 phút đọc"
    },
    en: {
      title: "Human Motion Tracking for Rehabilitation Games",
      excerpt: "Build Computer Vision application integrated with games to assist motor function recovery.",
      content: "Project from September-October 2024. Developed an application using Computer Vision to track human motion, integrated with rehabilitation games. The system is designed suitable for both children and the elderly. Implemented accurate motion tracking model using MediaPipe and OpenCV.",
      date: "09/2024",
      readTime: "8 min read"
    }
  },
  {
    id: 3,
    slug: "facial-recognition-hospital",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Face Recognition", "Computer Vision", "System"],
    codeLanguage: "python",
    codeSnippet: `import cv2
import face_recognition

# Hospital attendance system
def recognize_doctor(frame):
    face_locations = face_recognition.face_locations(frame)
    face_encodings = face_recognition.face_encodings(frame, face_locations)
    
    for encoding in face_encodings:
        matches = face_recognition.compare_faces(known_faces, encoding)
        if True in matches:
            mark_attendance(doctor_id)`,
    vi: {
      title: "Hệ thống Nhận diện Khuôn mặt cho Quản lý Bệnh viện",
      excerpt: "Áp dụng nhận diện khuôn mặt để chấm công bác sĩ tự động tại bệnh viện.",
      content: "Dự án từ tháng 9-10/2024. Phát triển hệ thống nhận diện khuôn mặt tự động cho việc chấm công bác sĩ tại bệnh viện. Hệ thống giúp tự động hóa quy trình chấm công và giảm thiểu sai sót thủ công. Sử dụng các thuật toán deep learning hiện đại để đảm bảo độ chính xác cao trong môi trường thực tế.",
      date: "09/2024",
      readTime: "7 phút đọc"
    },
    en: {
      title: "Facial Recognition System for Hospital Management",
      excerpt: "Applied facial recognition for automatic doctor attendance check-in at hospital.",
      content: "Project from September-October 2024. Developed an automatic facial recognition system for doctor attendance at hospital. The system helps automate attendance processes and minimize manual errors. Used modern deep learning algorithms to ensure high accuracy in real-world environment.",
      date: "09/2024",
      readTime: "7 min read"
    }
  },
  {
    id: 4,
    slug: "python-for-ai",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "AI", "Basics"],
    codeLanguage: "python",
    codeSnippet: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Load and visualize data
data = pd.read_csv('dataset.csv')
plt.plot(data['x'], data['y'])
plt.show()`,
    vi: {
      title: "Python cho AI: Bắt đầu với NumPy và Pandas",
      excerpt: "Làm quen với các thư viện cơ bản cho xử lý dữ liệu trong Machine Learning.",
      content: "Python là ngôn ngữ chính cho AI và Machine Learning. NumPy cung cấp các công cụ tính toán số học hiệu quả, Pandas giúp xử lý và phân tích dữ liệu dạng bảng. Bài viết này giới thiệu các thao tác cơ bản và quan trọng nhất khi làm việc với dữ liệu.",
      date: "08/2024",
      readTime: "6 phút đọc"
    },
    en: {
      title: "Python for AI: Getting Started with NumPy and Pandas",
      excerpt: "Get familiar with basic libraries for data processing in Machine Learning.",
      content: "Python is the primary language for AI and Machine Learning. NumPy provides efficient numerical computing tools, Pandas helps process and analyze tabular data. This article introduces the most basic and important operations when working with data.",
      date: "08/2024",
      readTime: "6 min read"
    }
  },
  {
    id: 5,
    slug: "tensorflow-pytorch-comparison",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["TensorFlow", "PyTorch", "Deep Learning"],
    codeLanguage: "python",
    codeSnippet: `# TensorFlow
import tensorflow as tf
model_tf = tf.keras.Sequential([...])

# PyTorch
import torch.nn as nn
class ModelPT(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(...)`,
    vi: {
      title: "TensorFlow vs PyTorch: Chọn Framework nào?",
      excerpt: "So sánh hai framework deep learning phổ biến nhất hiện nay.",
      content: "TensorFlow và PyTorch đều là những framework mạnh mẽ cho deep learning. TensorFlow có hệ sinh thái lớn và phù hợp cho production, PyTorch linh hoạt hơn cho nghiên cứu. Bài viết phân tích ưu nhược điểm của từng framework để bạn chọn công cụ phù hợp.",
      date: "07/2024",
      readTime: "8 phút đọc"
    },
    en: {
      title: "TensorFlow vs PyTorch: Which Framework to Choose?",
      excerpt: "Compare the two most popular deep learning frameworks today.",
      content: "TensorFlow and PyTorch are both powerful frameworks for deep learning. TensorFlow has a large ecosystem and is suitable for production, PyTorch is more flexible for research. The article analyzes the pros and cons of each framework to help you choose the right tool.",
      date: "07/2024",
      readTime: "8 min read"
    }
  },
  {
    id: 6,
    slug: "yolo-object-detection",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["YOLO", "Computer Vision", "Object Detection"],
    codeLanguage: "python",
    codeSnippet: `from ultralytics import YOLO

# Load YOLO model
model = YOLO('yolov8n.pt')

# Detect objects
results = model('image.jpg')
for r in results:
    boxes = r.boxes
    print(f'Detected {len(boxes)} objects')`,
    vi: {
      title: "Phát hiện Đối tượng với YOLO",
      excerpt: "Tìm hiểu về thuật toán YOLO - một trong những model phát hiện đối tượng nhanh nhất.",
      content: "YOLO (You Only Look Once) là thuật toán real-time object detection phổ biến. Khác với các phương pháp truyền thống, YOLO dự đoán bounding boxes và class probabilities trong một lần forward pass duy nhất, giúp tốc độ xử lý cực nhanh.",
      date: "06/2024",
      readTime: "9 phút đọc"
    },
    en: {
      title: "Object Detection with YOLO",
      excerpt: "Learn about YOLO algorithm - one of the fastest object detection models.",
      content: "YOLO (You Only Look Once) is a popular real-time object detection algorithm. Unlike traditional methods, YOLO predicts bounding boxes and class probabilities in a single forward pass, enabling extremely fast processing speed.",
      date: "06/2024",
      readTime: "9 min read"
    }
  },
  {
    id: 7,
    slug: "transformers-huggingface",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Transformers", "NLP", "HuggingFace"],
    codeLanguage: "python",
    codeSnippet: `from transformers import AutoTokenizer, AutoModel

# Load pre-trained model
tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
model = AutoModel.from_pretrained('bert-base-uncased')

# Tokenize and encode
inputs = tokenizer("Hello AI!", return_tensors='pt')
outputs = model(**inputs)`,
    vi: {
      title: "Transformers và HuggingFace: NLP hiện đại",
      excerpt: "Khám phá thư viện Transformers và cách sử dụng các mô hình pre-trained.",
      content: "Transformers đã cách mạng hóa NLP. HuggingFace cung cấp hàng nghìn mô hình pre-trained như BERT, GPT, T5 sẵn sàng sử dụng. Bài viết này hướng dẫn cách fine-tune các mô hình này cho bài toán cụ thể của bạn.",
      date: "05/2024",
      readTime: "10 phút đọc"
    },
    en: {
      title: "Transformers and HuggingFace: Modern NLP",
      excerpt: "Explore the Transformers library and how to use pre-trained models.",
      content: "Transformers have revolutionized NLP. HuggingFace provides thousands of pre-trained models like BERT, GPT, T5 ready to use. This article guides you on how to fine-tune these models for your specific tasks.",
      date: "05/2024",
      readTime: "10 min read"
    }
  },
  {
    id: 8,
    slug: "machine-learning-workflow",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Machine Learning", "Workflow", "Best Practices"],
    codeLanguage: "python",
    codeSnippet: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# ML Workflow
X_train, X_test, y_train, y_test = train_test_split(X, y)
model = RandomForestClassifier()
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)`,
    vi: {
      title: "Quy trình Machine Learning từ A-Z",
      excerpt: "Hướng dẫn đầy đủ về quy trình phát triển mô hình ML trong thực tế.",
      content: "Một dự án ML thành công cần quy trình chặt chẽ: Thu thập dữ liệu, làm sạch dữ liệu, feature engineering, training, validation, và deployment. Bài viết này chia sẻ best practices và các lỗi thường gặp cần tránh.",
      date: "04/2024",
      readTime: "12 phút đọc"
    },
    en: {
      title: "Machine Learning Workflow from A-Z",
      excerpt: "Complete guide on ML model development process in practice.",
      content: "A successful ML project requires a rigorous workflow: Data collection, data cleaning, feature engineering, training, validation, and deployment. This article shares best practices and common mistakes to avoid.",
      date: "04/2024",
      readTime: "12 min read"
    }
  },
  {
    id: 9,
    slug: "explainable-ai-xai",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["XAI", "Interpretability", "Research"],
    codeLanguage: "python",
    codeSnippet: `import shap

# Explain model predictions
explainer = shap.Explainer(model)
shap_values = explainer(X_test)

# Visualize feature importance
shap.plots.waterfall(shap_values[0])`,
    vi: {
      title: "Explainable AI (XAI): Giải thích Mô hình AI",
      excerpt: "Tại sao AI đưa ra quyết định đó? Khám phá các kỹ thuật giải thích mô hình.",
      content: "Trong y tế và các lĩnh vực quan trọng, việc hiểu tại sao AI đưa ra dự đoán là cực kỳ quan trọng. XAI sử dụng các kỹ thuật như SHAP, LIME, Grad-CAM để visualize và giải thích quyết định của model, tăng độ tin cậy khi triển khai.",
      date: "03/2024",
      readTime: "11 phút đọc"
    },
    en: {
      title: "Explainable AI (XAI): Interpreting AI Models",
      excerpt: "Why did the AI make that decision? Explore model interpretation techniques.",
      content: "In healthcare and critical fields, understanding why AI makes predictions is extremely important. XAI uses techniques like SHAP, LIME, Grad-CAM to visualize and explain model decisions, increasing trust when deploying.",
      date: "03/2024",
      readTime: "11 min read"
    }
  },
  {
    id: 10,
    slug: "java-collections-framework",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Java", "Collections", "Data Structures"],
    codeLanguage: "java",
    codeSnippet: `import java.util.*;

// Collections Framework
List<String> list = new ArrayList<>();
Set<Integer> set = new HashSet<>();
Map<String, Integer> map = new HashMap<>();

list.add("Java");
set.add(100);
map.put("score", 95);`,
    vi: {
      title: "Java Collections Framework: Quản lý Dữ liệu Hiệu quả",
      excerpt: "Tìm hiểu về List, Set, Map và cách sử dụng Collections trong Java.",
      content: "Java Collections Framework cung cấp các cấu trúc dữ liệu mạnh mẽ để quản lý nhóm đối tượng. ArrayList cho truy cập nhanh, LinkedList cho insert/delete, HashSet cho tính duy nhất, HashMap cho key-value pairs. Hiểu rõ từng loại giúp tối ưu performance.",
      date: "02/2024",
      readTime: "8 phút đọc"
    },
    en: {
      title: "Java Collections Framework: Efficient Data Management",
      excerpt: "Learn about List, Set, Map and how to use Collections in Java.",
      content: "Java Collections Framework provides powerful data structures for managing groups of objects. ArrayList for fast access, LinkedList for insert/delete, HashSet for uniqueness, HashMap for key-value pairs. Understanding each type optimizes performance.",
      date: "02/2024",
      readTime: "8 min read"
    }
  },
  {
    id: 11,
    slug: "java-exception-handling",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Java", "Exception", "Error Handling"],
    codeLanguage: "java",
    codeSnippet: `try {
    int result = divide(10, 0);
} catch (ArithmeticException e) {
    System.err.println("Error: " + e.getMessage());
} finally {
    System.out.println("Cleanup resources");
}`,
    vi: {
      title: "Xử lý Ngoại lệ trong Java: Try-Catch-Finally",
      excerpt: "Học cách xử lý lỗi một cách chuyên nghiệp với Exception Handling.",
      content: "Exception handling giúp chương trình xử lý lỗi một cách graceful thay vì crash. Try-catch bắt lỗi, finally đảm bảo cleanup resources. Checked exceptions buộc phải handle, unchecked exceptions có thể bỏ qua. Custom exceptions cho business logic riêng.",
      date: "01/2024",
      readTime: "7 phút đọc"
    },
    en: {
      title: "Exception Handling in Java: Try-Catch-Finally",
      excerpt: "Learn to handle errors professionally with Exception Handling.",
      content: "Exception handling helps programs handle errors gracefully instead of crashing. Try-catch catches errors, finally ensures cleanup resources. Checked exceptions must be handled, unchecked exceptions can be ignored. Custom exceptions for specific business logic.",
      date: "01/2024",
      readTime: "7 min read"
    }
  },
  {
    id: 12,
    slug: "java-streams-api",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Java", "Streams", "Functional Programming"],
    codeLanguage: "java",
    codeSnippet: `List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

int sum = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .reduce(0, Integer::sum);
    
System.out.println("Sum: " + sum);`,
    vi: {
      title: "Java Streams API: Xử lý Dữ liệu Hiện đại",
      excerpt: "Functional programming với Streams để xử lý collections một cách elegant.",
      content: "Java 8 Streams API mang functional programming vào Java. Filter, map, reduce cho phép xử lý dữ liệu declarative. Parallel streams tận dụng multi-core CPU. Collectors giúp tổng hợp kết quả. Code ngắn gọn, dễ đọc hơn traditional loops.",
      date: "12/2023",
      readTime: "9 phút đọc"
    },
    en: {
      title: "Java Streams API: Modern Data Processing",
      excerpt: "Functional programming with Streams for elegant collection processing.",
      content: "Java 8 Streams API brings functional programming to Java. Filter, map, reduce allow declarative data processing. Parallel streams leverage multi-core CPUs. Collectors aggregate results. Code is shorter and more readable than traditional loops.",
      date: "12/2023",
      readTime: "9 min read"
    }
  },
  {
    id: 13,
    slug: "javascript-closures",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["JavaScript", "Closures", "Advanced"],
    codeLanguage: "javascript",
    codeSnippet: `function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
counter.increment(); // 1`,
    vi: {
      title: "JavaScript Closures: Bí mật của Lexical Scope",
      excerpt: "Hiểu về closures - một trong những khái niệm quan trọng nhất của JavaScript.",
      content: "Closures cho phép hàm truy cập biến từ outer scope ngay cả khi outer function đã return. Ứng dụng: data privacy, factory functions, callbacks. Closures là nền tảng của nhiều design patterns trong JavaScript như Module pattern, currying.",
      date: "11/2023",
      readTime: "8 phút đọc"
    },
    en: {
      title: "JavaScript Closures: The Secret of Lexical Scope",
      excerpt: "Understanding closures - one of JavaScript's most important concepts.",
      content: "Closures allow functions to access variables from outer scope even after outer function returns. Applications: data privacy, factory functions, callbacks. Closures are foundation for many JavaScript design patterns like Module pattern, currying.",
      date: "11/2023",
      readTime: "8 min read"
    }
  },
  {
    id: 14,
    slug: "javascript-prototypes",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["JavaScript", "Prototypes", "OOP"],
    codeLanguage: "javascript",
    codeSnippet: `function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    return \`Hello, I'm \${this.name}\`;
};

const john = new Person("John", 30);
console.log(john.greet());`,
    vi: {
      title: "JavaScript Prototypes: Kế thừa trong JS",
      excerpt: "Prototypal inheritance - cách JavaScript thực hiện OOP khác biệt.",
      content: "JavaScript sử dụng prototypes thay vì classical inheritance. Mỗi object có __proto__ trỏ đến prototype. Prototype chain cho phép kế thừa methods. ES6 classes chỉ là syntactic sugar cho prototypes. Hiểu prototypes giúp debug và tối ưu memory.",
      date: "10/2023",
      readTime: "9 phút đọc"
    },
    en: {
      title: "JavaScript Prototypes: Inheritance in JS",
      excerpt: "Prototypal inheritance - JavaScript's unique approach to OOP.",
      content: "JavaScript uses prototypes instead of classical inheritance. Each object has __proto__ pointing to prototype. Prototype chain enables method inheritance. ES6 classes are just syntactic sugar for prototypes. Understanding prototypes helps debugging and memory optimization.",
      date: "10/2023",
      readTime: "9 min read"
    }
  },
  {
    id: 15,
    slug: "java-multithreading",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Java", "Multithreading", "Concurrency"],
    codeLanguage: "java",
    codeSnippet: `class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running: " + 
            Thread.currentThread().getName());
    }
}

MyThread t1 = new MyThread();
t1.start();`,
    vi: {
      title: "Java Multithreading: Lập trình Đa luồng",
      excerpt: "Tận dụng sức mạnh của CPU đa nhân với multithreading trong Java.",
      content: "Multithreading cho phép thực thi nhiều tasks đồng thời. Thread class và Runnable interface để tạo threads. Synchronized keyword tránh race conditions. ExecutorService quản lý thread pools hiệu quả. CompletableFuture cho async programming hiện đại.",
      date: "09/2023",
      readTime: "10 phút đọc"
    },
    en: {
      title: "Java Multithreading: Concurrent Programming",
      excerpt: "Leverage multi-core CPU power with multithreading in Java.",
      content: "Multithreading enables concurrent execution of multiple tasks. Thread class and Runnable interface create threads. Synchronized keyword prevents race conditions. ExecutorService manages thread pools efficiently. CompletableFuture for modern async programming.",
      date: "09/2023",
      readTime: "10 min read"
    }
  },
  {
    id: 16,
    slug: "javascript-event-loop",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["JavaScript", "Event Loop", "Async"],
    codeLanguage: "javascript",
    codeSnippet: `console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

Promise.resolve().then(() => {
    console.log('3');
});

console.log('4');
// Output: 1, 4, 3, 2`,
    vi: {
      title: "JavaScript Event Loop: Bí mật của Async",
      excerpt: "Hiểu cách JavaScript xử lý async code với Event Loop và Task Queue.",
      content: "Event Loop là trái tim của JavaScript async. Call Stack thực thi code, Web APIs xử lý async operations, Task Queue và Microtask Queue chờ execution. Promises có priority cao hơn setTimeout. Hiểu Event Loop giúp tránh blocking và tối ưu performance.",
      date: "08/2023",
      readTime: "10 phút đọc"
    },
    en: {
      title: "JavaScript Event Loop: The Secret of Async",
      excerpt: "Understand how JavaScript handles async code with Event Loop and Task Queue.",
      content: "Event Loop is the heart of JavaScript async. Call Stack executes code, Web APIs handle async operations, Task Queue and Microtask Queue await execution. Promises have higher priority than setTimeout. Understanding Event Loop prevents blocking and optimizes performance.",
      date: "08/2023",
      readTime: "10 min read"
    }
  },
  {
    id: 17,
    slug: "java-lambda-expressions",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Java", "Lambda", "Functional"],
    codeLanguage: "java",
    codeSnippet: `// Traditional way
Runnable r1 = new Runnable() {
    public void run() {
        System.out.println("Hello");
    }
};

// Lambda way
Runnable r2 = () -> System.out.println("Hello");`,
    vi: {
      title: "Java Lambda Expressions: Code Ngắn gọn Hơn",
      excerpt: "Functional programming với lambda expressions trong Java 8+.",
      content: "Lambda expressions mang functional programming vào Java. Syntax ngắn gọn thay thế anonymous classes. Functional interfaces (@FunctionalInterface) có duy nhất một abstract method. Method references (::) cho code còn clean hơn. Lambdas hoạt động tốt với Streams API.",
      date: "07/2023",
      readTime: "7 phút đọc"
    },
    en: {
      title: "Java Lambda Expressions: Cleaner Code",
      excerpt: "Functional programming with lambda expressions in Java 8+.",
      content: "Lambda expressions bring functional programming to Java. Concise syntax replaces anonymous classes. Functional interfaces (@FunctionalInterface) have single abstract method. Method references (::) make code even cleaner. Lambdas work great with Streams API.",
      date: "07/2023",
      readTime: "7 min read"
    }
  },
  {
    id: 18,
    slug: "javascript-modules",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["JavaScript", "Modules", "ES6"],
    codeLanguage: "javascript",
    codeSnippet: `// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// app.js
import { add, multiply } from './math.js';
import * as math from './math.js';

console.log(add(2, 3)); // 5`,
    vi: {
      title: "JavaScript Modules: Tổ chức Code Chuyên nghiệp",
      excerpt: "ES6 Modules với import/export để quản lý code base lớn.",
      content: "Modules giúp tách code thành các files độc lập, tránh global scope pollution. Named exports cho nhiều exports, default export cho main export. Dynamic imports (import()) cho code splitting. Tree shaking loại bỏ unused code. Modules là chuẩn cho modern JavaScript projects.",
      date: "06/2023",
      readTime: "8 phút đọc"
    },
    en: {
      title: "JavaScript Modules: Professional Code Organization",
      excerpt: "ES6 Modules with import/export for managing large codebases.",
      content: "Modules split code into independent files, avoiding global scope pollution. Named exports for multiple exports, default export for main export. Dynamic imports (import()) for code splitting. Tree shaking removes unused code. Modules are standard for modern JavaScript projects.",
      date: "06/2023",
      readTime: "8 min read"
    }
  }
];
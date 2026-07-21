// Company-specific knowledge base for RAG (Retrieval-Augmented Generation)

export const COMPANY_KNOWLEDGE_BASE = [
  // GOOGLE KNOWLEDGE BASE
  {
    id: "google-overview-01",
    company: "Google",
    category: "Interview Process & Culture",
    title: "Google Technical Interview Structure & Googlyness Rubric",
    content: `Google's hiring bar focuses on 4 core attributes: General Cognitive Ability (GCA), Role-Related Knowledge (RRK), Leadership, and Googlyness (culture fit, intellectual humility, ambiguity tolerance, teamwork).
The interview process typically consists of:
1. Online Assessment (OA) / Recruiter Phone Screen: 1-2 coding problems focusing on Data Structures & Algorithms (Arrays, Graphs, Dynamic Programming).
2. Technical Rounds (3-4 rounds): 45-minute coding interviews where candidates solve complex algorithmic problems on a whiteboard or Google Docs equivalent (CoderPad). Focus is on clean code, edge cases, space-time complexity analysis (Big-O), and clear verbal thought process.
3. System Design Round (for L4/L5+ candidates): 45-minute architectural round evaluating scalability, latency, distributed storage, load balancing, caching (Redis/Memcached), sharding, and database choices (Spanner vs Bigtable vs PostgreSQL).
4. Behavioral & Googlyness: Questions framed around ambiguity, handling disagreement with senior engineers, cross-functional collaboration, and ethical decision-making.`
  },
  {
    id: "google-questions-02",
    company: "Google",
    category: "Coding & System Design Questions",
    title: "Top Google Interview Questions & Model Answers",
    content: `Q1: How to find the median of a streaming data source?
Answer: Use two heaps - a Max-Heap for the lower half of numbers and a Min-Heap for the upper half. Balance the size difference of heaps to <= 1. Insertion takes O(log N) and median lookup takes O(1).

Q2: Design Google Search Autocomplete / Typeahead Suggestion System.
Answer: Key components: Trie data structure stored in memory, Trie service for real-time lookups, Aggregation service to process search logs using MapReduce/Kafka, Redis cache storing top 5 queries for each prefix, and a Trie DB for persistence. Latency target < 100ms.

Q3: Explain how Google Spanner handles global consistency across distributed data centers.
Answer: Google Spanner uses TrueTime API which relies on atomic clocks and GPS receivers to bound clock drift (typically < 7ms). It implements Multi-Version Concurrency Control (MVCC) and Paxos consensus groups to provide external consistency without central locks.`
  },

  // AMAZON KNOWLEDGE BASE
  {
    id: "amazon-overview-01",
    company: "Amazon",
    category: "Leadership Principles & Interview Format",
    title: "Amazon 16 Leadership Principles & Bar Raiser Process",
    content: `Amazon interviews are uniquely heavily weighted by their 16 Leadership Principles (LPs). Every single technical or manager round includes 2-3 behavioral STAR method questions aligned with specific LPs.
Top Key LPs evaluated:
- Customer Obsession: Starting with the customer and working backwards.
- Ownership: Thinking long term, never saying "that's not my job".
- Invent and Simplify: Finding simple solutions to complex problems.
- Bias for Action: Speed matters in business; calculated risk taking.
- Deep Dive: Staying connected to details, auditing metrics.
- Deliver Results: Overcoming obstacles to deliver key outcomes.
- Have Backbone; Disagree and Commit: Challenging decisions respectfully, then fully committing.

Bar Raiser Role: An objective third-party interviewer outside the hiring team who evaluates if the candidate raises the performance bar of current employees.`
  },
  {
    id: "amazon-questions-02",
    company: "Amazon",
    category: "STAR Behavioral & System Design",
    title: "Amazon STAR Method Guide & System Architecture Q&As",
    content: `STAR Response Template:
- Situation: Context of the challenge (10-15% of response).
- Task: Your specific responsibility and objective (10-15%).
- Action: Detailed steps YOU took, technology choices, obstacles overcome (50-60%).
- Result: Quantifiable outcome with metrics (revenue, % latency decrease, time saved) (15-20%).

Top Amazon System Design Question: Design Amazon Video / Prime Streaming Platform.
Answer: CDN (CloudFront) edge caching for video playback, Adaptive Bitrate Streaming (HLS/DASH), Microservices architecture using AWS Lambda/ECS, DynamoDB for user watch history, S3 for raw/processed video chunks, SQS/SNS for asynchronous notification and transcoder job pipeline.`
  },

  // MICROSOFT KNOWLEDGE BASE
  {
    id: "microsoft-overview-01",
    company: "Microsoft",
    category: "Growth Mindset & Technical Standards",
    title: "Microsoft Interview Process & Engineering Culture",
    content: `Microsoft prioritizes Growth Mindset, collaboration, clarity of thought, and solid object-oriented software engineering principles.
Interview Process:
1. Codility / Online Technical Screening (1-2 coding problems, 60 mins).
2. Final Loop (4 rounds):
   - 2 Technical Data Structures & Algorithms rounds (Trees, Graphs, Recursion, Bit Manipulation).
   - 1 Low-Level Design (LLD) / High-Level Design (HLD) round (e.g. Design Parking Lot, Design Azure Blob Storage, Design Elevators).
   - 1 AA (Asappropriate / Hiring Manager) round focusing on cultural fit, past projects, conflict resolution, and architectural decisions.

Key Microsoft Competencies: Customer orientation, adaptability, technical excellence, drive for results, collaboration across Azure/Windows/M365 product suites.`
  },
  {
    id: "microsoft-questions-02",
    company: "Microsoft",
    category: "System Design & LLD Questions",
    title: "Microsoft Technical Questions & Model Solutions",
    content: `Q1: Design an In-Memory File System (like Azure File Storage core).
Answer: Use a Directory and File class extending a common Node interface. Directory contains a Hash Map of name -> Node pointers. Implement mkdir, ls, readContentFromFile, writeToFile. Handle path parsing via splitting on slash '/' and traversing nodes cleanly.

Q2: Reverse Nodes in k-Group in a Linked List.
Answer: Use iterative pointer manipulation with dummy head. Process list in blocks of k nodes. Keep track of previous group tail and next group head. Space O(1), Time O(N).

Q3: Difference between Thread vs Process and handling synchronization in OS.
Answer: Process has independent memory space (code, data, heap, stack). Threads share process memory space but have individual stack and program counter. Mutex locks prevent race conditions, while Semaphores manage resource counting pools.`
  },

  // ZOHO KNOWLEDGE BASE
  {
    id: "zoho-overview-01",
    company: "Zoho",
    category: "Interview Rounds & Technical Focus",
    title: "Zoho Hiring Process & C/C++/Java Aptitude Expectations",
    content: `Zoho's hiring process is famously practical, hands-on, and code-intensive with minimal focus on abstract resume fluff.
Rounds Breakdown:
Round 1: Written / Online Test - C/C++ Aptitude, Output prediction, Pointer arithmetic, Bitwise operations, Math logic, Data Structures basics.
Round 2: Basic Programming Round - 5-7 coding problems focused on String manipulation, Matrix operations, Pattern printing, Array sorting without built-in library functions.
Round 3: Advanced Programming Round (Design Round) - 3 hours to code a full application in Java/C++/Python (e.g., Railway Reservation System, Dungeon Game, Call Taxi Booking System, Flight Booking System, Splitwise clone).
Round 4: Technical HR - Discussion on code written in Round 3, OOP concepts, Memory allocation (heap vs stack), SQL queries, Database normalizing.
Round 5: General HR - Communication skills, career goals, willingness to work in Zoho offices (Chennai, Tenkasi).`
  },
  {
    id: "zoho-questions-02",
    company: "Zoho",
    category: "Practical Application Design & Code",
    title: "Zoho Advanced Round Machine Coding Examples",
    content: `Zoho Round 3 Machine Coding Task: Design a Railway Ticket Reservation System.
Key Requirements:
- Total berths: Confirmed (Berth split: Lower, Middle, Upper), RAC (Reservation Against Cancellation), Waiting List.
- Features: Ticket Booking with age/gender priority, Ticket Cancellation (auto-promote RAC to Confirmed and WL to RAC), Print booked tickets, Print available berths.
- OOP Design Patterns: Strategy pattern for seat allocation, Singleton for Reservation Manager, Factory pattern for Passenger creation. Data structures: Queues for WL/RAC, Maps for passenger lookup by PNR.

Zoho String Pattern Problem: Print string in Z pattern or Cross Pattern.
Given string "PROGRAM":
P     M
 R   A
  O R
   G
  O R
 R   A
P     M`
  },

  // TCS KNOWLEDGE BASE
  {
    id: "tcs-overview-01",
    company: "TCS (Tata Consultancy Services)",
    category: "NQT, Digital & Prime Recruitment",
    title: "TCS NQT Pattern & Cadre Selection Criteria",
    content: `TCS hires across three major cadres: TCS Ninja, TCS Digital, and TCS Prime.
TCS NQT (National Qualifier Test) Structure:
1. Foundation Section (Aptitude, Numerical Ability, Verbal Ability, Reasoning).
2. Advanced Section (Advanced Quantitative, Advanced Reasoning, Advanced Coding - 2 questions in C/C++/Java/Python).
Interview Rounds:
- Technical Round: Focuses on core Computer Science basics - SQL queries (JOINs, GROUP BY, Indexing), Data Structures (Arrays, Stacks, Queues, Binary Trees), OOP concepts (Inheritance, Polymorphism, Abstraction, Encapsulation), SDLC models (Agile, Waterfall), Web basics (HTML, CSS, JS, REST).
- Managerial Round: Situational questions, project deep dive, team handling.
- HR Round: Shift flexibility, relocation, background verification, bond terms.`
  },
  {
    id: "tcs-questions-02",
    company: "TCS",
    category: "Technical Q&As & SQL Patterns",
    title: "TCS Technical & Coding Round Q&A Collection",
    content: `Q1: Write an SQL query to find the Nth highest salary from Employee table.
Answer:
SELECT DISTINCT Salary FROM Employee e1 
WHERE N-1 = (SELECT COUNT(DISTINCT e2.Salary) FROM Employee e2 WHERE e2.Salary > e1.Salary);
Or using DENSE_RANK():
WITH RankedSalaries AS (
  SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) as rnk FROM Employee
) SELECT Salary FROM RankedSalaries WHERE rnk = N;

Q2: Explain the difference between Method Overloading vs Method Overriding in Java.
Answer: Overloading occurs in the same class with same method name but different parameter list (Compile-time / Static polymorphism). Overriding occurs between parent and child class where child redefines method with exact same signature and return type (Run-time / Dynamic polymorphism).`
  },

  // INFOSYS KNOWLEDGE BASE
  {
    id: "infosys-overview-01",
    company: "Infosys",
    category: "HackWithInfy & Specialist Programmer",
    title: "Infosys Campus Recruitment & Power Programmer Paths",
    content: `Infosys offers roles including Systems Engineer (SE), Digital Specialist Engineer (DSE), and Specialist Programmer (SP / Power Programmer).
Recruitment Streams:
- InfyTQ Certification & HackWithInfy Hackathon.
Technical Evaluation Criteria:
1. Data Structures & Algorithms: Strings, Arrays, Dynamic Programming, Greedy Algorithms.
2. Web Development & Cloud: React/Angular, Node.js, Microservices basics, Docker, AWS/Azure fundamentals.
3. Database Management: Relational DBMS vs NoSQL, ACID properties, Transactions, Normalization (1NF to 3NF/BCNF).
4. Project Explanation: Deep understanding of final year project or internship projects, role played, tech stack justification.`
  },
  {
    id: "infosys-questions-02",
    company: "Infosys",
    category: "Core Computer Science & Web Stack",
    title: "Infosys Technical Interview Questions & Guide",
    content: `Q1: Explain ACID properties in DBMS with real-world banking transaction example.
Answer:
- Atomicity: Money transfer between Account A and B either succeeds fully or fails completely (all-or-nothing).
- Consistency: Database moves from one valid state to another, maintaining balance constraints.
- Isolation: Concurrent transactions execute without interfering with each other (serializability via locks).
- Durability: Once transaction is committed, changes persist even during power loss.

Q2: What is the difference between Virtual DOM and Real DOM in React?
Answer: Real DOM updates directly render to browser, causing expensive reflow and repaint calculations. Virtual DOM is a lightweight JS representation of the UI. React uses a Reconciliation algorithm (Diffing) to calculate minimum necessary DOM updates, applying them in batches for high performance.`
  },

  // META / APPLE / UBER KNOWLEDGE BASE
  {
    id: "meta-overview-01",
    company: "Meta",
    category: "Speed & Scale Architecture",
    title: "Meta (Facebook) Coding Speed & System Design Expectations",
    content: `Meta expects fast execution in coding rounds (solving 2 LeetCode Medium/Hard problems in 45 minutes with working syntax and zero bug tolerance).
System Design Round focuses on social graph scaling, real-time messaging (WhatsApp/Messenger), newsfeed ranking systems, photo storage (Haystack), and GraphQL architecture.`
  },
  {
    id: "uber-overview-01",
    company: "Uber",
    category: "Geospatial & Real-time Architecture",
    title: "Uber Technical Architecture & System Design Focus",
    content: `Uber technical interviews focus on geospatial indexing (Google S2 geometry library, H3 hexagonal hierarchical spatial index), driver-rider matching algorithms, Kafka event streaming, microservices resilience (circuit breakers, rate limiting), and distributed locks.`
  }
];

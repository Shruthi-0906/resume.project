// Curatedpast interview questions, code solutions and RAG guidance

export const INTERVIEW_QUESTIONS = [
  // GOOGLE QUESTIONS
  {
    id: "g-q1",
    company: "Google",
    role: "SDE-II",
    category: "Algorithms & Data Structures",
    topic: "Heaps & Streams",
    difficulty: "Hard",
    frequency: 94,
    question: "Design a data structure that finds the median of a stream of numbers in real time. Optimize for O(1) median retrieval and O(log N) insertion.",
    modelAnswer: `### Approach: Two Heaps (Min-Heap & Max-Heap)
We maintain two heaps:
1. A **Max-Heap** (left side) containing the smaller half of the numbers.
2. A **Min-Heap** (right side) containing the larger half of the numbers.

### Key Operations:
- **addNum(num)**: If the number is less than or equal to the max of Max-Heap, push it to Max-Heap. Otherwise, push it to Min-Heap.
- **Balance**: Ensure size difference between Max-Heap and Min-Heap is at most 1. If unbalanced, pop from one heap and push to the other.
- **findMedian()**: If sizes are equal, return average of the tops. Otherwise, return the top of the heap with more elements.

### Code Solution (Python):
\`\`\`python
import heapq

class MedianFinder:
    def __init__(self):
        # Max-Heap (stores smaller half; invert values for max-heap behavior)
        self.max_heap = []
        # Min-Heap (stores larger half)
        self.min_heap = []

    def addNum(self, num: int) -> None:
        if not self.max_heap or num <= -self.max_heap[0]:
            heapq.heappush(self.max_heap, -num)
        else:
            heapq.heappush(self.min_heap, num)
            
        # Balance heaps
        if len(self.max_heap) > len(self.min_heap) + 1:
            val = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, val)
        elif len(self.min_heap) > len(self.max_heap):
            val = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -val)

    def findMedian(self) -> float:
        if len(self.max_heap) == len(self.min_heap):
            return (-self.max_heap[0] + self.min_heap[0]) / 2.0
        return float(-self.max_heap[0])
\`\`\``,
    ragHint: "Google candidates must state the space complexity is O(N) and time complexity is O(log N) for insertion, and O(1) for retrieval. Emphasize why sorting arrays dynamically takes O(N) insertion, which fails at scale."
  },
  {
    id: "g-q2",
    company: "Google",
    role: "Senior Systems Engineer",
    category: "System Design",
    topic: "Autocomplete & Tries",
    difficulty: "Hard",
    frequency: 88,
    question: "Design a Google Search Autocomplete / Typeahead Suggestion System that scales to 100k queries per second.",
    modelAnswer: `### High-Level Architecture Design
1. **Frontend / Client**: Communicates via WebSockets or long polling. Implements input debouncing (e.g., 150ms) to limit API requests.
2. **Load Balancer (Nginx/HAProxy)**: Routes query requests to nearest edge clusters.
3. **Query Suggestion Service**:
   - Fetches prefix search suggestions.
   - Utilizes an in-memory **Trie** structure for quick prefix matches.
4. **Redis Cache**: Caches top 5 results for common prefixes to avoid searching the complete Trie in real-time.
5. **Aggregation / MapReduce Service**: Processes search history logs in batches to update prefix counts and update the Trie DB weekly.

### Trie Serialization & Key Value Design:
Store the Trie in a persistent key-value store (e.g., RocksDB or Cassandra):
- Key: Prefix (e.g., "sys")
- Value: Top 5 query results list (e.g., ["system design", "systemd", "system update"])`,
    ragHint: "Highlight latency requirements (target < 100ms). Discuss partitioning strategies (partition by search term hash vs alphabetical prefixes)."
  },

  // AMAZON QUESTIONS
  {
    id: "a-q1",
    company: "Amazon",
    role: "SDE-II",
    category: "Behavioral & STAR Method",
    topic: "Customer Obsession & Deliver Results",
    difficulty: "Medium",
    frequency: 95,
    question: "Describe a time when you went above and beyond to solve a customer pain point under a tight deadline.",
    modelAnswer: `### Amazon STAR Response Framework:
- **Situation**: During prime week, our legacy API gateway latency spiked to 2.4 seconds, causing checkout failures for 8% of customers.
- **Task**: I was assigned to diagnose and optimize the latency down to under 300ms within a 48-hour window before final promotion rounds.
- **Action**:
  1. I audited query execution logs and identified a database connection pool starvation issue.
  2. I refactored the connection timeout settings and added a Redis cache layer for static item listings.
  3. I coordinated with the DevOps team to set up automatic pod scaling on AWS ECS.
- **Result**: Reduced average latency from 2.4s to 180ms. The checkout failure rate dropped to 0.05%, preserving an estimated $140k in sales.`,
    ragHint: "Amazon interviewers prioritize candidate-specific actions over team actions. Quantify your actions (e.g., specific cache hit ratios, code lines refactored, latency metrics)."
  },
  {
    id: "a-q2",
    company: "Amazon",
    role: "SDE-II",
    category: "Algorithms & Data Structures",
    topic: "Hashing & Cache",
    difficulty: "Medium",
    frequency: 91,
    question: "Design and implement a Least Recently Used (LRU) Cache with get and put operations in O(1) time complexity.",
    modelAnswer: `### Approach: Doubly Linked List + Hash Map
1. **Hash Map**: Provides O(1) lookup of keys to node pointers.
2. **Doubly Linked List**: Maintains chronological access order.
   - Most recently accessed items are moved to the **head**.
   - Least recently accessed items are evicted from the **tail**.

### Python Implementation:
\`\`\`python
class Node:
    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {} # Map key -> Node
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        prev = node.prev
        nxt = node.next
        prev.next = nxt
        nxt.prev = prev

    def _add(self, node):
        # Insert node at head (MRU position)
        nxt = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = nxt
        nxt.prev = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.cap:
            # Evict tail (LRU node)
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]
\`\`\``,
    ragHint: "Discuss thread-safety considerations. In real-world multithreaded systems, read/write locks or concurrent hash maps are required to prevent data corruption."
  },

  // MICROSOFT QUESTIONS
  {
    id: "m-q1",
    company: "Microsoft",
    role: "SDE-I/II",
    category: "Low-Level Design (LLD)",
    topic: "OOP & File Systems",
    difficulty: "Medium",
    frequency: 89,
    question: "Design an In-Memory File System supporting: mkdir, ls, writeToFile, and readContentFromFile.",
    modelAnswer: `### Object-Oriented Interface Design
Define a base interface/class \`Node\` and derive subclasses \`File\` and \`Directory\`.

\`\`\`java
import java.util.*;

abstract class Node {
    String name;
    abstract boolean isDirectory();
}

class File extends Node {
    StringBuilder content = new StringBuilder();
    boolean isDirectory() { return false; }
}

class Directory extends Node {
    Map<String, Node> children = new TreeMap<>(); // Sorted naturally by name
    boolean isDirectory() { return true; }
}

public class FileSystem {
    private Directory root = new Directory();

    public List<String> ls(String path) {
        Directory curr = navigateToDir(path);
        return new ArrayList<>(curr.children.keySet());
    }

    public void mkdir(String path) {
        navigateToDir(path);
    }

    private Directory navigateToDir(String path) {
        String[] parts = path.split("/");
        Directory curr = root;
        for (String part : parts) {
            if (part.isEmpty()) continue;
            curr.children.putIfAbsent(part, new Directory());
            curr = (Directory) curr.children.get(part);
        }
        return curr;
    }
}
\`\`\``,
    ragHint: "Microsoft interviewers prioritize design patterns (e.g., Composite Pattern for representing file trees) and clean code layout."
  },

  // ZOHO QUESTIONS
  {
    id: "z-q1",
    company: "Zoho",
    role: "Member Technical Staff",
    category: "Machine Coding & C/C++",
    topic: "Railway Systems",
    difficulty: "Hard",
    frequency: 93,
    question: "Round 3 Machine Coding Task: Write a complete Railway Ticket Reservation System with Passenger Priority, RAC promotion, and cancellation queues.",
    modelAnswer: `### Machine Coding Design (Java)
1. **Ticket Booking Engine**: Tracks seat availability across Upper, Middle, and Lower berths. RAC (Reservation Against Cancellation) slots, and Waiting List queues.
2. **Passenger Priority**: Senior citizens (age > 60) and children get allocated lower berths dynamically if available.
3. **Queue Promotion Logic**: Upon ticket cancellation:
   - RAC passenger promoted to Confirmed seat.
   - First waiting list passenger promoted to RAC.

\`\`\`java
import java.util.*;

class Passenger {
    static int pnrCounter = 1;
    int pnr;
    String name;
    int age;
    String preferredBerth;
    String allocatedBerth;
    
    public Passenger(String name, int age, String preferredBerth) {
        this.pnr = pnrCounter++;
        this.name = name;
        self.age = age;
        this.preferredBerth = preferredBerth;
    }
}

class TicketSystem {
    private int totalBerths = 3;
    private int racBerths = 1;
    private int wlBerths = 1;
    
    private Map<Integer, Passenger> bookedPassengers = new HashMap<>();
    private Queue<Passenger> racQueue = new LinkedList<>();
    private Queue<Passenger> wlQueue = new LinkedList<>();
    
    public void bookTicket(Passenger p) {
        if (bookedPassengers.size() < totalBerths) {
            p.allocatedBerth = p.preferredBerth;
            bookedPassengers.put(p.pnr, p);
            System.out.println("Booked PNR: " + p.pnr + " | Berth: " + p.allocatedBerth);
        } else if (racQueue.size() < racBerths) {
            p.allocatedBerth = "RAC";
            racQueue.add(p);
            System.out.println("RAC Assigned PNR: " + p.pnr);
        } else if (wlQueue.size() < wlBerths) {
            p.allocatedBerth = "WL";
            wlQueue.add(p);
            System.out.println("WL Assigned PNR: " + p.pnr);
        } else {
            System.out.println("Tickets Sold Out!");
        }
    }
}
\`\`\``,
    ragHint: "Zoho assessors run this program locally during reviews. Make sure code compiles in single-file format, has a readable console menu, and does not require complex libraries."
  }
];
export default INTERVIEW_QUESTIONS;

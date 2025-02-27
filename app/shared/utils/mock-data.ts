import { TaskPriority, TaskStatus } from "../types/enums";
import type { Task } from "../types/task";

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Write project proposal",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 2,
    title: "Fix login page bug",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.NONE,
  },
  {
    id: 3,
    title: "Design homepage layout",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 4,
    title: "Update API documentation",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 5,
    title: "Refactor user authentication",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 6,
    title: "Optimize database queries",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.LOW,
  },
  {
    id: 7,
    title: "Review PR #345",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 8,
    title: "Implement dark mode",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 9,
    title: "Schedule team meeting",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
  },
  {
    id: 10,
    title: "Prepare monthly report",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NONE,
  },
  {
    id: 11,
    title: "Fix CSS styling issue",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 12,
    title: "Set up CI/CD pipeline",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 13,
    title: "Test new feature deployment",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 14,
    title: "Debug performance issues",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NONE,
  },
  {
    id: 15,
    title: "Create marketing email template",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.URGENT,
  },
  {
    id: 16,
    title: "Write unit tests for authentication",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 17,
    title: "Optimize frontend rendering",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
  },
  {
    id: 18,
    title: "Update dependency versions",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 19,
    title: "Research competitor products",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 20,
    title: "Draft feature roadmap",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 21,
    title: "Create onboarding guide",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 22,
    title: "Prepare client presentation",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
  },
  {
    id: 23,
    title: "Configure analytics tracking",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NONE,
  },
  {
    id: 24,
    title: "Conduct code review session",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 25,
    title: "Fix mobile responsiveness issues",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.NONE,
  },
  {
    id: 26,
    title: "Improve error handling",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NONE,
  },
  {
    id: 27,
    title: "Set up monitoring alerts",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 28,
    title: "Design new logo",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
  },
  {
    id: 29,
    title: "Analyze customer feedback",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 30,
    title: "Write blog post on best practices",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.NONE,
  },
  {
    id: 31,
    title: "Document REST API endpoints",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 32,
    title: "Refactor checkout flow",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 33,
    title: "Optimize image loading",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 34,
    title: "Update security policies",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.NONE,
  },
  {
    id: 35,
    title: "Develop user profile page",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 36,
    title: "Fix broken links in footer",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NONE,
  },
  {
    id: 37,
    title: "Set up automated email responses",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NONE,
  },
  {
    id: 38,
    title: "Improve site accessibility",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 39,
    title: "Create A/B test experiment",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 40,
    title: "Conduct usability testing",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 41,
    title: "Write post-mortem for outage",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NONE,
  },
  {
    id: 42,
    title: "Fix pagination issues",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 43,
    title: "Build dashboard charts",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
  },
  {
    id: 44,
    title: "Write test cases for search functionality",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.URGENT,
  },
  {
    id: 45,
    title: "Improve onboarding flow",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
  },
  {
    id: 46,
    title: "Optimize SQL queries",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 47,
    title: "Deploy new microservice",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NONE,
  },
  {
    id: 48,
    title: "Fix UI inconsistencies",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.NONE,
  },
  {
    id: 49,
    title: "Update payment gateway integration",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
  },
  {
    id: 50,
    title: "Investigate slow API response times",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 51,
    title: "Prepare for product launch",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
  },
  {
    id: 52,
    title: "Write user documentation",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
  },
  {
    id: 53,
    title: "Update README file",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 54,
    title: "Fix session expiration bug",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.URGENT,
  },
  {
    id: 55,
    title: "Develop chat feature",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 56,
    title: "Research AI integration",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.LOW,
  },
  {
    id: 57,
    title: "Improve website SEO",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 58,
    title: "Analyze error logs",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.URGENT,
  },
  {
    id: 59,
    title: "Redesign settings page",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
  },
  {
    id: 60,
    title: "Enhance form validation",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
  },
  {
    id: 61,
    title: "Update email templates",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.LOW,
  },
  {
    id: 62,
    title: "Set up feature flags",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.LOW,
  },
  {
    id: 63,
    title: "Fix typos in UI copy",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
  },
  {
    id: 64,
    title: "Refactor old legacy code",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 65,
    title: "Prepare training slides",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 66,
    title: "Create FAQ section",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
  },
  {
    id: 67,
    title: "Fix timezone issues",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.NONE,
  },
  {
    id: 68,
    title: "Add 2FA authentication",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.NONE,
  },
  {
    id: 69,
    title: "Implement search autocomplete",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 70,
    title: "Improve cache strategy",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 71,
    title: "Update terms of service",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NONE,
  },
  {
    id: 72,
    title: "Research new frontend framework",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 73,
    title: "Enhance error messages",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 74,
    title: "Fix memory leak issue",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 75,
    title: "Develop new admin panel",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 76,
    title: "Review customer support tickets",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 77,
    title: "Run load tests",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 78,
    title: "Write Cypress tests",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 79,
    title: "Create interactive tutorial",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 80,
    title: "Fix API CORS issues",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NONE,
  },
  {
    id: 81,
    title: "Enhance keyboard navigation",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 82,
    title: "Update user avatars",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NONE,
  },
  {
    id: 83,
    title: "Test backup recovery",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 84,
    title: "Update mobile app version",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.LOW,
  },
  {
    id: 85,
    title: "Monitor server logs",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 86,
    title: "Fix infinite scroll bug",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 87,
    title: "Improve site speed",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NONE,
  },
  {
    id: 88,
    title: "Write migration script",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 89,
    title: "Develop feature toggles",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 90,
    title: "Refactor modal components",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
  },
  {
    id: 91,
    title: "Conduct A11y audit",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 92,
    title: "Test WebSocket connections",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 93,
    title: "Optimize database indexing",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 94,
    title: "Fix missing translations",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.URGENT,
  },
  {
    id: 95,
    title: "Investigate 500 errors",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NONE,
  },
  {
    id: 96,
    title: "Update dark mode styling",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 97,
    title: "Review legal compliance",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NONE,
  },
  {
    id: 98,
    title: "Write changelog updates",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NONE,
  },
  {
    id: 99,
    title: "Deploy security patches",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 100,
    title: "Refactor Redux state",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 101,
    title: "Fix sidebar navigation",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 102,
    title: "Improve touch gestures",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
  },
  {
    id: 103,
    title: "Update typography guidelines",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.LOW,
  },
  {
    id: 104,
    title: "Test push notifications",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.LOW,
  },
  {
    id: 105,
    title: "Fix dropdown positioning",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.LOW,
  },
  {
    id: 106,
    title: "Develop new analytics dashboard",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
  },
  {
    id: 107,
    title: "Reduce bundle size",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 108,
    title: "Refactor date parsing functions",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.URGENT,
  },
  {
    id: 109,
    title: "Improve modal animations",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.URGENT,
  },
  {
    id: 110,
    title: "Run penetration tests",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.HIGH,
  },
  {
    id: 111,
    title: "Implement JWT authentication",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
  },
  {
    id: 112,
    title: "Improve logging strategy",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NONE,
  },
  {
    id: 113,
    title: "Optimize Redis caching",
    status: TaskStatus.NOT_STARTED,
    priority: TaskPriority.HIGH,
  },
];

export default mockTasks;

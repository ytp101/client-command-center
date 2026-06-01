import { create } from "zustand";

export type MilestoneStatus = "Pending" | "In Progress" | "Approved";
export type DeliverableType = "Invoice" | "Design" | "Code" | "Document";
export type DeliverableStatus = "Approved" | "Awaiting Review" | "Draft";

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  dueDate: string;
}

export interface Deliverable {
  id: string;
  fileName: string;
  type: DeliverableType;
  dateAdded: string;
  status: DeliverableStatus;
  fileSize: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description: string;
  daysUntilDelivery: number;
  milestones: Milestone[];
  deliverables: Deliverable[];
}

export interface Client {
  id: string;
  name: string;
  company: string;
}

interface ProjectState {
  clients: Client[];
  projects: Project[];
  activeClientId: string;
  activeProjectId: string;
  setActiveProject: (clientId: string, projectId: string) => void;
  updateMilestoneStatus: (id: string, status: MilestoneStatus) => void;
  updateDeliverableStatus: (id: string, status: DeliverableStatus, feedback: string) => void;
}

// Initial relational mock data
const initialClients: Client[] = [
  { id: "c-1", name: "Sarah Jenkins", company: "Acme Corporation" },
  { id: "c-2", name: "Marcus Thorne", company: "Velo Digital" }
];

const initialProjects: Project[] = [
  // Client 1 Projects
  {
    id: "p-1a",
    clientId: "c-1",
    name: "SaaS Command Center",
    description: "Establish the foundational SaaS dashboard layout, milestones kanban tracker, and deliverables vault.",
    daysUntilDelivery: 5,
    milestones: [
      {
        id: "ms-1a-1",
        title: "Wireframing & Interactive Prototypes",
        description: "Map user journeys, build full-page wireframes, and design active prototyping screens.",
        status: "Approved",
        dueDate: "June 3, 2026",
      },
      {
        id: "ms-1a-2",
        title: "Database Schema Design & Migration",
        description: "Design relational models, index critical lookup columns, and seed development databases.",
        status: "In Progress",
        dueDate: "June 7, 2026",
      },
      {
        id: "ms-1a-3",
        title: "Tailwind v4 UI Assembly",
        description: "Develop global styling variables, custom button shapes, and a modular flexbox sidebar framework.",
        status: "Pending",
        dueDate: "June 11, 2026",
      },
      {
        id: "ms-1a-4",
        title: "QA & Integration Testing",
        description: "Examine mobile breakpoint adjustments, run API endpoint queries, and resolve formatting issues.",
        status: "Pending",
        dueDate: "June 15, 2026",
      }
    ],
    deliverables: [
      {
        id: "del-1a-1",
        fileName: "invoice-sprint-01.pdf",
        type: "Invoice",
        dateAdded: "2026-05-15",
        status: "Approved",
        fileSize: "142 KB"
      },
      {
        id: "del-1a-2",
        fileName: "freelance-command-wireframes-v2.fig",
        type: "Design",
        dateAdded: "2026-05-18",
        status: "Approved",
        fileSize: "4.2 MB"
      },
      {
        id: "del-1a-3",
        fileName: "postgres-schema-migration.sql",
        type: "Code",
        dateAdded: "2026-05-22",
        status: "Approved",
        fileSize: "45 KB"
      },
      {
        id: "del-1a-4",
        fileName: "rest-api-endpoints-documentation.md",
        type: "Document",
        dateAdded: "2026-05-24",
        status: "Approved",
        fileSize: "18 KB"
      },
      {
        id: "del-1a-5",
        fileName: "high-fidelity-ui-dashboard-mockups.fig",
        type: "Design",
        dateAdded: "2026-05-28",
        status: "Awaiting Review",
        fileSize: "28.5 MB"
      },
      {
        id: "del-1a-6",
        fileName: "oauth2-auth-context-provider.tsx",
        type: "Code",
        dateAdded: "2026-05-30",
        status: "Awaiting Review",
        fileSize: "12 KB"
      },
      {
        id: "del-1a-7",
        fileName: "invoice-sprint-02-draft.pdf",
        type: "Invoice",
        dateAdded: "2026-05-31",
        status: "Draft",
        fileSize: "148 KB"
      },
      {
        id: "del-1a-8",
        fileName: "client-usability-testing-feedback.pdf",
        type: "Document",
        dateAdded: "2026-06-01",
        status: "Approved",
        fileSize: "1.2 MB"
      },
      {
        id: "del-1a-9",
        fileName: "freelance-contract-amendment-signed.docx",
        type: "Document",
        dateAdded: "2026-06-01",
        status: "Awaiting Review",
        fileSize: "95 KB"
      },
      {
        id: "del-1a-10",
        fileName: "kanban-milestones-column-view.tsx",
        type: "Code",
        dateAdded: "2026-06-02",
        status: "Draft",
        fileSize: "24 KB"
      }
    ]
  },
  {
    id: "p-1b",
    clientId: "c-1",
    name: "Brand Strategy Kit",
    description: "Develop global vector logos, typographies, and digital strategy guides for Acme's new corporate identity.",
    daysUntilDelivery: 12,
    milestones: [
      {
        id: "ms-1b-1",
        title: "Moodboards & Creative Concept Selection",
        description: "Assemble color boards, layout styles, and typographical combinations for stakeholder reviews.",
        status: "Approved",
        dueDate: "June 8, 2026"
      },
      {
        id: "ms-1b-2",
        title: "Vector Logo Marks Development",
        description: "Design scaleable SVG vector assets, dark/light variations, and secondary horizontal mark locks.",
        status: "Approved",
        dueDate: "June 12, 2026"
      },
      {
        id: "ms-1b-3",
        title: "Global Typographic Styling Guidelines",
        description: "Define heading hierarchies, fallback font stacks, and custom font integration details.",
        status: "In Progress",
        dueDate: "June 18, 2026"
      },
      {
        id: "ms-1b-4",
        title: "Marketing & Collateral Assembly",
        description: "Develop mock templates for business cards, print brochures, and digital presentations.",
        status: "Pending",
        dueDate: "June 25, 2026"
      }
    ],
    deliverables: [
      {
        id: "del-1b-1",
        fileName: "brand-invoice-sprint-01.pdf",
        type: "Invoice",
        dateAdded: "2026-05-20",
        status: "Approved",
        fileSize: "115 KB"
      },
      {
        id: "del-1b-2",
        fileName: "acme-corporate-logos-pack.zip",
        type: "Design",
        dateAdded: "2026-05-24",
        status: "Approved",
        fileSize: "8.4 MB"
      },
      {
        id: "del-1b-3",
        fileName: "acme-typography-styleguide.pdf",
        type: "Document",
        dateAdded: "2026-05-29",
        status: "Awaiting Review",
        fileSize: "2.1 MB"
      },
      {
        id: "del-1b-4",
        fileName: "brochure-print-layouts-draft.indd",
        type: "Design",
        dateAdded: "2026-06-01",
        status: "Draft",
        fileSize: "32.0 MB"
      }
    ]
  },
  // Client 2 Projects
  {
    id: "p-2a",
    clientId: "c-2",
    name: "E-Commerce Storefront",
    description: "Build custom product catalogs, Stripe payment checkouts, and automated fulfillment dashboards for Velo's shop.",
    daysUntilDelivery: 8,
    milestones: [
      {
        id: "ms-2a-1",
        title: "Fulfillment & Stripe Webhook Integrations",
        description: "Set up merchant webhooks, signature authentications, and automated database order logs.",
        status: "In Progress",
        dueDate: "June 10, 2026"
      },
      {
        id: "ms-2a-2",
        title: "Checkout Flow & Cart Management",
        description: "Build client-side state hooks for item quantity changes, shipping selectors, and promo validations.",
        status: "Pending",
        dueDate: "June 15, 2026"
      },
      {
        id: "ms-2a-3",
        title: "Catalog Inventory Auto-Sync",
        description: "Integrate background cron schedules to update product stock counts with ERP inventories.",
        status: "Pending",
        dueDate: "June 20, 2026"
      }
    ],
    deliverables: [
      {
        id: "del-2a-1",
        fileName: "velo-shop-sprint-01-invoice.pdf",
        type: "Invoice",
        dateAdded: "2026-05-22",
        status: "Approved",
        fileSize: "128 KB"
      },
      {
        id: "del-2a-2",
        fileName: "stripe-webhook-api-schema.json",
        type: "Code",
        dateAdded: "2026-05-28",
        status: "Awaiting Review",
        fileSize: "14 KB"
      },
      {
        id: "del-2a-3",
        fileName: "shop-inventory-sync-cron.ts",
        type: "Code",
        dateAdded: "2026-06-02",
        status: "Draft",
        fileSize: "8 KB"
      }
    ]
  },
  {
    id: "p-2b",
    clientId: "c-2",
    name: "Mobile iOS Application",
    description: "Develop the Swift iOS application, hook up APNS notifications, and prepare App Store submission metadata.",
    daysUntilDelivery: 20,
    milestones: [
      {
        id: "ms-2b-1",
        title: "Apple Developer Profile & Provisions Setup",
        description: "Configure bundle IDs, create provisioning profiles, and generate push certs.",
        status: "Approved",
        dueDate: "June 5, 2026"
      },
      {
        id: "ms-2b-2",
        title: "SwiftUI Dashboard Views Assembly",
        description: "Build mock SwiftUI navigation grids, chart blocks, and profile settings pages.",
        status: "In Progress",
        dueDate: "June 14, 2026"
      },
      {
        id: "ms-2b-3",
        title: "APNS Push Notifications Hooking",
        description: "Implement Swift push registers and backend node-apns triggers for real-time customer alerts.",
        status: "Pending",
        dueDate: "June 25, 2026"
      }
    ],
    deliverables: [
      {
        id: "del-2b-1",
        fileName: "apple-developer-license-receipt.pdf",
        type: "Document",
        dateAdded: "2026-05-20",
        status: "Approved",
        fileSize: "84 KB"
      },
      {
        id: "del-2b-2",
        fileName: "swiftui-dashboard-views-prototype.zip",
        type: "Design",
        dateAdded: "2026-05-28",
        status: "Awaiting Review",
        fileSize: "14.8 MB"
      },
      {
        id: "del-2b-3",
        fileName: "apns-push-trigger-service.ts",
        type: "Code",
        dateAdded: "2026-06-01",
        status: "Draft",
        fileSize: "11 KB"
      }
    ]
  }
];

export const useProjectStore = create<ProjectState>((set) => ({
  clients: initialClients,
  projects: initialProjects,
  activeClientId: "c-1",
  activeProjectId: "p-1a",
  
  setActiveProject: (clientId, projectId) =>
    set(() => ({
      activeClientId: clientId,
      activeProjectId: projectId
    })),

  updateMilestoneStatus: (id, status) =>
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === state.activeProjectId) {
          return {
            ...p,
            milestones: p.milestones.map((m) =>
              m.id === id ? { ...m, status } : m
            ),
          };
        }
        return p;
      }),
    })),

  updateDeliverableStatus: (id, status, _feedback) => {
    if (_feedback) {
      console.log(`Frictionless review feedback received: "${_feedback}"`);
    }
    return set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === state.activeProjectId) {
          return {
            ...p,
            deliverables: p.deliverables.map((d) =>
              d.id === id ? { ...d, status } : d
            ),
          };
        }
        return p;
      }),
    }));
  }
}));

// Derived State Selectors for client components

export const selectActiveProject = (state: ProjectState): Project => {
  const active = state.projects.find((p) => p.id === state.activeProjectId);
  if (!active) {
    throw new Error(`Critical State Error: Active Project ${state.activeProjectId} not found.`);
  }
  return active;
};

export const selectActiveClient = (state: ProjectState): Client => {
  const active = state.clients.find((c) => c.id === state.activeClientId);
  if (!active) {
    throw new Error(`Critical State Error: Active Client ${state.activeClientId} not found.`);
  }
  return active;
};

export const selectProjectCompletionPercentage = (state: ProjectState): number => {
  const active = state.projects.find((p) => p.id === state.activeProjectId);
  if (!active || active.milestones.length === 0) return 0;
  
  const approved = active.milestones.filter((m) => m.status === "Approved").length;
  return Math.round((approved / active.milestones.length) * 100);
};
